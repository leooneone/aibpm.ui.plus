<template>
  <draggable
    v-if="conf.mode === 'designer'"
    :list="list"
    :animation="200"
    :group="group"
    tag="el-row"
    justify="center" align="middle"
    :component-data="componentData"
    class="drag-wrapper"
  >
    <template #item="{ element, index }">
      <el-col :span="element.span" :offset="element.offset" :push="element.push" :pull="element.pull">
        <render-item :index="index" :active-id="activeId" :parent="list" :item="element" :conf="conf"> </render-item>
      </el-col>
    </template>
  </draggable>
  <el-row v-else :gutter="componentData.gutter" style="display:flex;"  justify="center" align="middle" >
    <el-col v-for="(element, index) in list"  :span="element.span" :offset="element.offset" :push="element.push" :pull="element.pull">
      <render-item :index="index" :active-id="activeId" :parent="list" :item="element" :conf="conf"> </render-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup name="render-panel">
import { defineAsyncComponent, ref, computed, reactive } from 'vue'

//components: { MyFormItem, draggable },
//const emits = defineEmits( ['update', 'rm', 'deleteItem', 'copyItem'])

const draggable = defineAsyncComponent(() => import('vuedraggable'))
const RenderItem = defineAsyncComponent(() => import('./RenderItem.vue'))

const props = defineProps({
  tag: String,
  gutter: Number,
  list: Object,
  activeId: String || Number,
  conf: Object,
  //style:Object
})
const group = {
  name: 'componentsGroup',
}

const componentData = computed(() => {
  return {
    gutter: props.gutter ?? 5,
    justify: 'start',
    style: { 'margin-left': 0, /*'min-height': '50px',*/ width: '100%', alignContent: 'start', height: '100%' },
  }
})
</script>