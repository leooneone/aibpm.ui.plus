<template>


  <div :style="props.item.fontSize ? `font-size: ${props.item.fontSize};`: ''">
      <pre :style="{'white-space':props. item.preWrap ? 'pre-wrap' : 'pre', 'text-align': props.item.textAlign ? props.item.textAlign : 'left'}">{{props.item.defaultValue}}</pre>
    </div>

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