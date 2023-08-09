


<template>
  <el-card v-bind="item"   class="drawing-layout-item" >
     
    <span  class="component-name" v-if="item.showLabel">{{ item.label }} </span>
    <render-panel
      :active-id="activeId"
      :list="item.children"
      tag="el-row"
      :conf="conf"
      space="15"
      justify="left"
    >
    </render-panel>
  </el-card> 
</template>

<script lang="ts" setup name="my-row">
import { inject, provide, defineAsyncComponent } from 'vue'

const RenderPanel = defineAsyncComponent(() => import('../RenderPanel.vue'))

const props = defineProps({
  activeId: String || Number,
  item: Object,
  conf: Object
});
const className='drawing-layout-item';
 
const activeFormItem = inject('activeFormItem')
provide('activeFormItem', activeFormItem)
</script>
<style scoped>


.drawing-layout-item {
    position: relative;
    cursor: move;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 1px dashed #ccc;
    border-radius: 3px;
    margin-bottom: 15px;
}
</style>