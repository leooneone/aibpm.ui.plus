<template>
  
  <el-radio-group v-bind="$attr">
    <template v-for="item in $attrs.options">
      <el-radio-button v-if="$attrs.optionType === 'button'" :label="item.value">{{ item.label }}</el-radio-button>
      <el-radio v-else :border="$attrs.border" :label="item.value">{{ item.label }}</el-radio>
    </template>
  </el-radio-group>
</template>
<script lang="ts" setup name="my-radio-group">  
import {reactive} from 'vue' 


const state=reactive({ selected:props.modelValue})
const props = defineProps({
  modelValue:Array
})
// const state = reactive({
//     options1:[{label:'A',value:'A'}]
// })

     
</script>