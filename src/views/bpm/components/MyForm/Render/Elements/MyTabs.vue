<template> 
  <el-tabs v-bind="item" v-model="item.defaultValue"   class="drawing-layout-item" >
    <el-tab-pane v-for="pane in item.children" :key="pane.value" :label="pane.label" :name="pane.value">
      <render-panel
      :active-id="activeId"
      :list="pane.children"
      tag="el-row"
      :conf="conf"
      :gutter="pane.gutter" 
      justify="left"
    >
    </render-panel>
    </el-tab-pane>
  </el-tabs> 
</template>

<script lang="ts" setup name="my-tabs">
import { defineAsyncComponent,computed} from 'vue' 
 

const RenderPanel = defineAsyncComponent(() => import('../RenderPanel.vue'))
const tabs = computed(() => {
  return props.item.tabpanes
})
 const props=defineProps({
    parent: Object, 
    activeId: String || Number,  
    item: Object,
    conf: Object
    
  } );
   
   
</script>