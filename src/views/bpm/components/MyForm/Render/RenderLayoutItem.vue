<template>
  <el-form-item
    
    :label-width="item.showLabel ? `${item.labelWidth || 100}px` : '0px'"
    :label="item.showLabel ? item.label : ''"
    :prop="conf.mode==='designer'?undefined:item.vModel"
    :required="item.required"
  >
    <render-component
      @onInput="(event) => (item['defaultValue'] = event)"
      @update="changeValue"
      :active-id="activeId"
      v-bind="item"
      :item="item"
      :conf="conf"
      class="item-tool-box"
    >
    </render-component>
  </el-form-item> 
</template>

<script lang="ts" setup name="render-form-item">
import { computed, ref, inject, provide, defineAsyncComponent } from 'vue'

const RenderComponent = defineAsyncComponent(() => import('./RenderComponent.vue'))

const changeValue=()=>{}
const props = defineProps({
  activeId: String || Number,
  item: Object,
  conf: Object,
})
const group = {
  name: 'componentsGroup',
  // put:(...arg) =>{ return  put(...arg, element)}
}
const activeFormItem = inject('activeFormItem')
provide('activeFormItem', activeFormItem)
</script>