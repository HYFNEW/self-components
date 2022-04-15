<template>
  <div>
    <drag-container :showAnimation="true" :sortMode="'change'" :canDrag="true">
      <drag-item>
        <el-button>默认按钮</el-button>
      </drag-item>
      <drag-item>
        <el-button type="primary">默认按钮</el-button>
      </drag-item>
      <drag-item>
        <el-button type="success">默认按钮</el-button>
      </drag-item>
      <drag-item>
        <el-button type="info">默认按钮</el-button>
      </drag-item>
      <drag-item>
        <el-button type="warning">默认按钮</el-button>
      </drag-item>
       <drag-item>
        <el-button type="danger">默认按钮</el-button>
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
</style>