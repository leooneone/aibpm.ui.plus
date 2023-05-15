<template><div v-show="false" >
  {{ item.size }}</div>
    
  <el-checkbox-group v-model="conf.model[item.vModel]" :size="item.size" :disabled="item.disabled" 
  :required="item.required" :min="item.max" :max="item.max" >
    <template v-for="item in $attrs.options" >
      <el-checkbox-button v-if="$attrs.optionType === 'button'" :label="item.value"    >{{ item.label }}</el-checkbox-button>
      <el-checkbox v-else :border="$attrs.border" :label="item.value "  >{{ item.label }}</el-checkbox>
    </template>
  </el-checkbox-group>
</template>
<script lang="ts" setup name="my-radio-group">  
import {reactive} from 'vue' 


const state=reactive({ checked:false,abc:[]})
const props = defineProps({
  item: Object,
  conf: Object,
})
 
     
</script>