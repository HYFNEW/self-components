<template>
  <div>
    <div class="photo-container">
      <div class="photo">
        <canvas width="300" height="200" ref="photo"></canvas>
      </div>
      <div ref="blockContainer" class="photo-block">
        <canvas width="300" height="200" ref="photoBlock"></canvas>
      </div>
      <div class="refresh" @click="refresh">
        <i class="el-icon-refresh-right"></i>
      </div>
    </div>
    <slider ref="slider" :left.sync="left" :canBack="false" :successLeft="successLeft" style="width:296px;margin-top:10px"></slider>
  </div>
</template>

<script>
import Slider from './Slider'

export default {
  name: 'SliderPhoto',
  components: {Slider},
  data () {
    return {
      left: 0,
      successLeft: -1
    }
  },
  watch:{
    left (value) {
      let container = this.$refs.blockContainer
      container.style.left = value - this.successLeft + 'px'
    }
  },
  methods: {
    getCanvas (name) {
      let canvas = this.$refs[name]
      return canvas
    },
    clearArea (context) {
      let left = ~~(Math.random() * 100) + 140
      let top = ~~(Math.random() * 100) + 25
      let number = ~~(Math.random() * 100) % 4
      for(let i=0;i<=number;i++) {
        let position = (~~(Math.random() * 100)) % 4 // 0 1 2 3 代表自上逆时针旋转
        let cx,cy
        if (position % 2 === 0) {
          cx = left + 25
          cy = top + position * 25
        }
        if (position % 2 === 1) {
          cx = left + (position - 1) * 25
          cy = top + 25
        }
        context.clearArc(cx,cy,10,0,2*Math.PI,true)
      }
      context.clearRect(left,top,50,50)

      return {left,top}
    },
    addArea (context, {left, top}) {
      context.globalCompositeOperation = 'source-over'
      let number = ~~(Math.random() * 100) % 4
      for(let i=0;i<=number;i++) {
        let position = (~~(Math.random() * 100)) % 4 // 0 1 2 3 代表自上逆时针旋转
        let cx,cy
        if (position % 2 === 0) {
          cx = left + 25
          cy = top + position * 25
        }
        if (position % 2 === 1) {
          cx = left + (position - 1) * 25
          cy = top + 25
        }
        // context.clearArc(cx,cy,10,0,2*Math.PI,true)
        context.beginPath();
        context.fillStyle = 'black';
        context.arc(cx, cy, 11, 0, 2*Math.PI);
        context.fill();
        context.closePath();
      }
    },
    setDefaultValue (left) {
      this.successLeft = left - 10
      this.$refs['blockContainer'].style.left = -left + 10 + 'px'
      console.log(this.successLeft,left,this.$refs['blockContainer'].style.left)
    },
    initCanvas () {
      let canvas = this.getCanvas('photo')
      let canvasBlock = this.getCanvas('photoBlock')
      let cxt = canvas.getContext('2d')
      let cxtBlock = this.getCanvas('photoBlock').getContext('2d')
      cxt.clearRect(0,0,300,200)
      cxtBlock.clearRect(0,0,300,200)
      let img = new Image()
      img.onload = ()=>{
        cxt.drawImage(img, 0, 0, 300, 200)
        let position = this.clearArea(cxt)
        this.setDefaultValue(position.left)
        this.addArea(cxt,position)
        //绘制滑块
        cxtBlock.drawImage(img, 0, 0, 300, 200)
        cxtBlock.globalCompositeOperation = 'destination-out'
        cxtBlock.drawImage(canvas, 0, 0, 300, 200)
        //绘制图片
        cxt.drawImage(img, 0, 0, 300, 200)
        cxt.globalCompositeOperation = 'destination-out'
        cxt.drawImage(canvasBlock, 0, 0, 300, 200)

        cxtBlock.globalCompositeOperation = 'source-over'
        cxt.globalCompositeOperation = 'source-over'
      }
      img.crossOrigin = 'anonymous'
      let src = [
        'https://img2.baidu.com/it/u=4167581070,3859984764&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500',
        'https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&fmt=auto&app=138&f=JPEG?w=632&h=500',
        'https://img0.baidu.com/it/u=3879724579,2384271901&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675',
        'https://img2.baidu.com/it/u=3883958425,2588455774&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
        'https://img0.baidu.com/it/u=2876897023,2562420884&fm=253&fmt=auto&app=120&f=JPEG?w=1132&h=800',
        'https://img1.baidu.com/it/u=1935115852,1159533026&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
      ]
      img.src = src[~~(Math.random()*100) % src.length]
    },
    refresh () {
      this.initCanvas()
      this.$refs.slider.refresh()
    }
  },
  mounted () {
    CanvasRenderingContext2D.prototype.clearArc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
      this.beginPath();
      this.globalCompositeOperation = 'destination-out';
      this.fillStyle = 'black';
      // 绘制新图形
      this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      // 参数分别是：圆心横坐标、纵坐标、半径、开始的角度、结束的角度、是否逆时针
      this.fill();
      this.closePath();
    };
    this.initCanvas()
  }
}
</script>

<style scoped>
.photo-container {
  position: relative;
}
.photo {
  width: 300px;
  height: 200px;
}
.photo-block {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10;
  width: 300px;
  height: 200px;
}
.photo-block canvas {
  filter: drop-shadow(0px 0px 5px);
}
.refresh {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 20;
  cursor: pointer;
  filter: drop-shadow(0px 0px 8px #000);
}
.el-icon-refresh-right {
  font-size: 20px;
  color:#fff;
  transition: 1s;
}
.el-icon-refresh-right:hover {
  transform: rotate(360deg);
}
</style>
