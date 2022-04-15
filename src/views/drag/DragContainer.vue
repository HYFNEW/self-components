<template>
  <div class="drag-container" ref="dragContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'DragContainer',
  props: {
    showAnimation:{ //是否展现动画效果
      type:Boolean,
      default:false
    },
    sortMode: { //排序模式
      type:String,
      default:'line' // line代表插入当前位置，change代表与当前位置的元素交换
    },
    canDrag: { //能否拖动
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      childrenNode:[]
    }
  },
  watch: {
    canDrag:{
      immediate:true,
      handler(value){
        let fun = value ? 'addMouseDownEvent' : 'removeMouseDownEvent'
        setTimeout(()=>{
          this.childrenNode.forEach(item=>{
            item.__vue__[fun]()
            item.__vue__.canDrag = value
          })
        },0)
      }
    }
  },
  methods: {
    resetPosition(item){//重新设置拖动元素位置
      let newArr = this.getPositionByMode(item)
      this.childrenNode = []
      if(this.showAnimation){
        this.addAnimation(newArr)
      }
      this.setPosition(newArr)
    },
    addAnimation(arr) { //设置动画效果
      arr.forEach(element => {
        element.style.transition = '1s'
      });
      setTimeout(()=>{
        arr.forEach(element => {
          element.style.transition = null
        });
      },1100)
    },
    getPositionByMode(item) {//根据模式获取排序后的新数组
      let arr = []
      let left = parseFloat(item.style.left)
      let top = parseFloat(item.style.top)
      if(this.sortMode === 'line') {
        this.childrenNode.splice(this.childrenNode.indexOf(item),1) //删去自身
        for(let i = 0; i < this.childrenNode.length; i++) {
          let centerX = this.childrenNode[i].clientWidth / 2 + parseFloat(this.childrenNode[i].style.left)
          let centerY = this.childrenNode[i].clientHeight / 2 + parseFloat(this.childrenNode[i].style.top)
          if(left < centerX && top < centerY && this.childrenNode[i]!==item) {
            arr.push(item,...this.childrenNode.slice(i))
            break
          }
          else {
            arr.push(this.childrenNode[i])
          }
        }
        if(arr.length === this.childrenNode.length){
          arr.push(item)
        }
      }
      if(this.sortMode === 'change') {
        arr = [...this.childrenNode]
        const itemIndex = this.childrenNode.indexOf(item)
        const centerX = item.clientWidth / 2 + parseFloat(item.style.left)
        const centerY = item.clientHeight / 2 + parseFloat(item.style.top)
        // this.childrenNode.splice(itemIndex,1) //删去自身
        const changedItemIndex = this.childrenNode.findIndex((value)=>{
          let x = {
            min:parseFloat(value.style.left),
            max:value.clientWidth + parseFloat(value.style.left)
          }
          let y = {
            min:parseFloat(value.style.top),
            max:value.clientHeight + parseFloat(value.style.top)
          }
          if(value === item){
            return false
          }
          if(x.min < centerX && centerX < x.max && y.min < centerY && centerY < y.max) {
            return true
          }
        })
        if(changedItemIndex >= 0) {
          arr.splice(itemIndex,1,this.childrenNode[changedItemIndex])
          arr.splice(changedItemIndex,1,this.childrenNode[itemIndex])
        }
      }
      return arr
    },
    setPosition(arr){// 拖动元素必须等高
      let width = 0
      let height = arr[0].clientHeight
      for (let i = 0; i < arr.length; i++) {
        if (width + arr[i].clientWidth > this.$refs.dragContainer.clientWidth) {
          width = arr[i].clientWidth
          height += arr[i].clientHeight
        }
        else {
          width += arr[i].clientWidth
        }
        arr[i].style.left = width - arr[i].clientWidth + 'px'
        arr[i].style.top = height - arr[i].clientHeight + 'px'
        this.childrenNode.push(arr[i])
      }
    }
  },
  mounted () {
    this.$nextTick(()=>{
      let children = this.$refs.dragContainer.children
      this.setPosition(children)
      this.$refs.dragContainer.style.height = children[children.length-1].clientHeight + parseFloat(children[children.length-1].style.top) + 'px'
    })
  }
}
</script>
<style scoped>
.drag-container {
  position: relative;
  width: 100%;
}
</style>