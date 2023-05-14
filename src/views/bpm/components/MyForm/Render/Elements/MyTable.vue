<template>
  <div  :class="className" style="margin-left: 0" v-if="conf.mode === 'designer'" >
    <span class="component-name">{{ item.label }} </span>

    <render-panel 
      :active-id="activeId"
      :list="item.children"
      tag="el-row"
      :conf="conf"
      :gutter="item.gutter"
      
      
    >
    </render-panel>
    
  <div style="text-align: center; background: white; color: #4e79ff; padding: 0.4rem 1rem">
    <el-icon><ele-Plus></ele-Plus></el-icon> {{ item.actionText }}
  </div>
</div><fc-input-table v-else  :ref="setRef" :form-data="conf.model"   :config="item" v-model="conf.model[item.vModel]"></fc-input-table>
</template>
<script lang="ts" setup name="my-table">
import { inject, provide, defineAsyncComponent } from 'vue'

const RenderPanel = defineAsyncComponent(() => import('../RenderPanel.vue'))

const props = defineProps({
  activeId: String || Number,
  item: Object,
  conf: Object,
  index: String || Number,
})

const setRef=(el)=>{
   
  if(!props.conf.tableRefs)
    props.conf.tableRefs={}
  props.conf.tableRefs[props.item.vModel]=el
 // return item.vModel
}

const className = 'drawing-layout-item'

const activeFormItem = inject('activeFormItem')
provide('activeFormItem', activeFormItem)
</script>