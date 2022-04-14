<template>
  <div>
    <canvas width="150" height="60" ref="canvas" @click="initCanvas"></canvas>
  </div>
</template>
<script>
export default {
  name:'ValidatorCode',
  data () {
    return {}
  },
  methods:{
    addCircle(context,number){
      for(let i=0;i<number;i++) {
        let x = ~~(Math.random() * 1000) % 150
        let y = ~~(Math.random() * 100) % 60
        context.beginPath()
        context.fillStyle = `rgb(${~~(Math.random() * 1000) % 256},${~~(Math.random() * 1000) % 256},${~~(Math.random() * 1000) % 256})`
        context.arc(x, y, 1, 0, 2*Math.PI)
        context.fill()
        context.closePath()
      }
    },
    initCanvas() {
      let canvas = this.$refs.canvas
      let cxt = canvas.getContext('2d')
      cxt.clearRect(0,0,150,60)
      let number1 = ~~(Math.random() * 100)
      let number2 = ~~(Math.random() * 100)
      let operator = ['+','-'][~~(Math.random() * 100) % 2]
      cxt.font = "italic 24px serif"
      cxt.fillStyle = "purple"; 
      cxt.save()
      cxt.rotate((~~(Math.random() * 100) % 20 / 100 - 0.1) * Math.PI);
      cxt.scale((~~(Math.random() * 100) % 20 / 100 - 0.1) + 1,(~~(Math.random() * 100) % 20 / 100 - 0.1) + 1)
      cxt.fillText(number1, 20, 40);
      cxt.restore()

      cxt.save()
      cxt.font = "bold italic 24px serif"
      cxt.translate(~~(Math.random() * 100) % 16 - 8, ~~(Math.random() * 100) % 16 - 8)
      cxt.fillText(operator, 55, 40);
      cxt.restore()

      cxt.save()
      cxt.rotate((~~(Math.random() * 100) % 10 / 100 - 0.05) * Math.PI);
      cxt.scale((~~(Math.random() * 100) % 20 / 100 - 0.1) + 1,(~~(Math.random() * 100) % 20 / 100 - 0.1) + 1)
      cxt.fillText(number2, 85, 40);
      cxt.restore()
      cxt.fillText('=', 120, 40);
      this.addCircle(cxt,200)
    }
  },
  mounted () {
    this.initCanvas()
  }
}
</script>
<style scoped>

</style>