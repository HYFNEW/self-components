<template>
  <div>
    <div class="content">
      <slider></slider>
    </div>
    <div class="content">
      <slider-photo></slider-photo>
    </div>
    <div class="content">
      <validator-code></validator-code>
    </div>
  </div>
</template>
<script>
import Slider from './Slider.vue'
import SliderPhoto from './SliderPhoto.vue'
import ValidatorCode from './ValidatorCode.vue'
export default {
  name:'Index',
  components:{Slider, SliderPhoto, ValidatorCode},
  data(){
    return {}
  }
}
</script>
<style scoped>
.content {
  width: 300px;
  height: 300px;
}
</style>