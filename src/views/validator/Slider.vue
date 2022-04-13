<template>
  <div ref="slideContainer" class="slide-container">
    <div ref="blockContainer" :class="{'block-container':true,moving,success}">
      <div ref="block" :class="{'block':true, 'moving':moving,success}" @mousedown="beforeMove">
        <i class="el-icon-check" v-if="success"></i>
        <i class="el-icon-right" v-else></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props:{
    left:{
      type:Number,
      default:0
    },
    canBack: { //未成功是否回退
      type:Boolean,
      default:true
    },
    successLeft:{ //移动到那里算是成功
      type:Number,
      default:-1
    },
  },
  data () {
    return {
      container: null,
      blockContainer: null,
      block: null,
      canMove: false,
      startX: 0,
      moving: false,
      success: false,
      timer: null
    }
  },
  methods: {
    beforeMove (event) {
      let left = 0
      if (this.block.style.left) {
        left = parseFloat(this.block.style.left)
      }
      this.startX = event.clientX - left
      this.canMove = true
      document.onmousemove = this.move
      document.onmouseup = this.afterMove
      clearTimeout(this.timer)
    },
    move (event) {
      if (this.canMove) {
        let left = event.clientX - this.startX
        if (left < 0) {
          left = 0
        }
        if (left > this.container.clientWidth - 39) {
          left = this.container.clientWidth - 39
        }
        this.block.style.left = left + 'px'
        this.$emit('update:left',left)
        this.blockContainer.style.width = left + 39 + 'px'
        this.moving = left > 0
      }
    },
    afterMove () {
      this.canMove = false
      this.validate()
      if (!this.success && this.canBack) { // 回退回远点
        this.backToOrigin()
      }
    },
    backToOrigin () {
      let step = Math.ceil(parseFloat(this.block.style.left) * 60 / 1000 / 3)
      let that = this
      // eslint-disable-next-line no-inner-declarations
      function animation () {
        let left = parseFloat(that.block.style.left) - step
        if (left <= 0) {
          left = 0
          that.moving = false
        }
        that.block.style.left = left + 'px'
        that.blockContainer.style.width = left + 39 + 'px'
        clearTimeout(that.timer)
        if (left > 0) {
          that.timer = setTimeout(animation, 1000 / 60)
        }
      }
      that.timer = setTimeout(animation, 1000 / 60)
    },
    validate () {
      if (this.successLeft >= 0) {
        let temp = parseFloat(this.block.style.left)
        if(temp > this.successLeft - 8 && temp < this.successLeft + 8) {
          this.success = true
        }
        else {
          this.success = false
        }
      }
      else {
        this.success = parseFloat(this.block.style.left) === this.container.clientWidth - 39
      }
    },
    refresh () {
      this.backToOrigin()
      this.success = false
    }
  },
  mounted () {
    this.block = this.$refs.block
    this.blockContainer = this.$refs.blockContainer
    this.container = this.$refs.slideContainer
  }
}
</script>

<style scoped>
:root{
  --block-border-radius: 2px;
}

.slide-container {
  height: 40px;
  width: 100%;
  border: 2px solid #eee;
  background: #fafafa;
  border-radius: var(--block-border-radius);
  position:relative;
}
.block-container {
  height: 40px;
  width: 39px;
  background: rgb(214,228,255);
  margin-top: -2px;
  margin-left: -2px;
  border-radius: var(--block-border-radius);
}
.block-container.moving {
  border:2px solid rgb(42,108,254);
}
.block-container.success {
  background: rgb(210,245,239);
  border:2px solid rgb(82,205,189);
}


.block {
  background: #fff;
  user-select: none;
  border:1px solid #ddd;
  border-radius: var(--block-border-radius);
  box-shadow: 0 0 5px 2px #eee;
  height: 40px;
  width: 40px;
  position: absolute;
  top:0;
  left:0;
  cursor: pointer;
  line-height: 40px;
  box-sizing: border-box;
}
.el-icon-right, .el-icon-check{
  font-size: 20px;
}
.block.moving {
  border:1px solid rgb(42,108,254);
  background: rgb(42,108,254);
  box-shadow: none;
}
.block.moving .el-icon-right, .el-icon-check {
  color: #fff;
}
.block.success {
  background: rgb(82,205,189);
  border:1px solid rgb(82,205,189);
}
</style>
