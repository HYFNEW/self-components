<template>
  <div :class="{'drag-item':true, grab:canDrag, grabbing:canMove}" ref="container">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'DragItem',
  data () {
    return {
      canDrag:true,
      canMove:false,
      startX: null,
      startY: null,
      parent: null,
      left: null,
      top: null,
    }
  },
  methods: {
    beforeDrag (e) {
      this.canMove = true
      this.startX = e.clientX
      this.startY = e.clientY
      this.left = parseFloat(this.$refs.container.style.left)
      this.top = parseFloat(this.$refs.container.style.top)
      this.$refs.container.style.zIndex = 100
      this.parent.addEventListener('mousemove',this.dragging)
      this.parent.addEventListener('mouseup',this.afterDrag)
      this.parent.addEventListener('mouseout',this.cancelDrag)
    },
    dragging (e) {
      if (this.canMove) {
        let distanceX = e.clientX - this.startX
        let distanceY = e.clientY - this.startY
        this.$refs.container.style.left = this.left + distanceX + 'px'

        if(this.left + distanceX + this.$refs.container.clientWidth > this.parent.clientWidth) {
          this.$refs.container.style.left = this.parent.clientWidth - this.$refs.container.clientWidth + 'px'
        }
        else if (this.left + distanceX < 0) {
          this.$refs.container.style.left = '0px'
        }
        else{
          this.$refs.container.style.left = this.left + distanceX + 'px'
        }

        if(this.top + distanceY + this.$refs.container.clientHeight > this.parent.clientHeight) {
          this.$refs.container.style.top = this.parent.clientHeight - this.$refs.container.clientHeight + 'px'
        }
        else if (this.top + distanceY < 0) {
          this.$refs.container.style.top = '0px'
        }
        else{
          this.$refs.container.style.top = this.top + distanceY + 'px'
        }
      }
    },
    afterDrag (e) {
      this.canMove = false
      this.$refs.container.style.zIndex = 1
      this.parent.removeEventListener('mousemove',this.dragging)
      this.parent.removeEventListener('mouseup',this.afterDrag)
      this.parent.removeEventListener('mouseout',this.cancelDrag)
      this.$refs.container.__vue__.$parent.resetPosition(this.$refs.container)
    },
    cancelDrag(e){
      if(e.toElement.contains(this.parent) && e.toElement!==this.parent){
        this.afterDrag(e)
      }
    },
    addMouseDownEvent(){
      this.$refs.container.addEventListener('mousedown',this.beforeDrag)
    },
    removeMouseDownEvent(){
      this.$refs.container.removeEventListener('mousedown',this.beforeDrag)
    }
  },
  mounted () {
    this.$nextTick(()=>{
      this.parent = this.$refs.container.parentElement
    })
  }
}
</script>
<style scoped>
.drag-item {
  position: absolute;
  display: inline-block;
  padding:12px;
  z-index: 1;
}
.grab {
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
  user-select: none;
}
.grab * {
  cursor: -webkit-grab !important;
  cursor: -moz-grab !important;
  cursor: grab !important;
}
.grabbing{
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing;
}
.grabbing *{
  cursor: -webkit-grabbing !important;
  cursor: -moz-grabbing !important;
  cursor: grabbing !important;
}
</style>