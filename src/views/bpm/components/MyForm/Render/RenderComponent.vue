<template>
  <my-select v-if="item.tag === 'el-select'" v-bind="$attrs" v-model="conf.model[item.vModel]"></my-select>
  <my-upload v-else-if="item.tag === 'el-upload'" v-bind="$attrs" v-model="conf.model[item.vModel]"></my-upload>
  <my-radio-group v-else-if="item.tag === 'el-radio-group'" v-bind="$attrs" v-model="conf.model[item.vModel]"></my-radio-group>
  <my-checkbox-group v-else-if="item.tag === 'el-checkbox-group'" v-bind="$attrs" v-model="conf.model[item.vModel]"></my-checkbox-group>
  
  <my-text v-else-if="item.tag === 'my-text'"  v-bind="$attrs" v-model="conf.model[item.vModel]"></my-text>
  <component v-else :is="item.disTag??item.tag" v-bind="$attrs" :form-data="conf.model" v-model="conf.model[item.vModel]">
    <template v-for="(val, name) in item.__slot__" v-slot:[name]>
      {{ val }}
    </template>
  </component>
</template>

<script lang="ts" setup name="render-component">
import { defineAsyncComponent, computed, ref, watch, inject, reactive, h } from 'vue'

const MySelect = defineAsyncComponent(() => import('./Elements/MySelect/index.vue'))
const MyUpload = defineAsyncComponent(() => import('./Elements/MyUpload/index.vue'))
const MyRadioGroup = defineAsyncComponent(() => import('./Elements/MyRadioGroup/index.vue'))
const MyText = defineAsyncComponent(() => import('./Elements/MyText.vue'))
const MyCheckboxGroup = defineAsyncComponent(() => import('./Elements/MyCheckboxGroup/index.vue'))
const props = defineProps({
  item: Object,
  attrs: Object,
  conf: Object,
})
let vm = ref(props.item.defaultValue)
if (props.conf !== undefined) {
  if(props.conf.model[props.item.vModel]===undefined)
    props.conf.model[props.item.vModel] = ref(props.item.defaultValue)
  vm.value = props.conf.model[props.item.vModel]
}
const editModelValue = function (e) {
  //  console.log(e);
  vm.value = e
}
</script>