<template>
    <el-select v-bind="$attrs">
        <el-option 
      v-for="item in $attrs.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    </el-select>
</template>
<script lang="ts" setup name="my-select">  
import {reactive} from 'vue' 


const props = defineProps({
    
})
const state = reactive({
    options1:[{label:'A',value:'A'}]
})

     
</script>