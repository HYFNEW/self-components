<template>
  <div>
    <drag-container :showAnimation="true" :sortMode="'change'" :canDrag="true">
      <drag-item>
        <div class="card">测试使用1</div>
      </drag-item>
      <drag-item>
        <div class="card" style="width:620px">测试使用2</div>
      </drag-item>
      <drag-item>
        <div class="card">测试使用3</div>
      </drag-item>
      <drag-item>
        <div class="card">测试使用4</div>
      </drag-item>
      <drag-item>
        <div class="card">测试使用5</div>
      </drag-item>
       <drag-item>
        <div class="card">测试使用6</div>
      </drag-item>
    </drag-container>
  </div>
</template>
<script>
import DragContainer from './DragContainer.vue'
import DragItem from './DragItem.vue'
export default {
  name:'Index',
  components:{DragContainer, DragItem},
  data(){
    return {}
  }
}
</script>
<style scoped>
.card {
  width:300px;
  height:200px;
  box-shadow: 0 0 1px 4px #fafafa;
  border-radius: 5px;
  border:1px solid #ccc;
  background: white;
}
</style>