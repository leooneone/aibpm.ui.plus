<template>
     <el-form-item v-if="props.data['show-summary'] !== undefined" label="显示合计">
            <el-switch v-model="props.data['show-summary']" />
          </el-form-item>
    
         
        
</template>



<script lang="ts" setup> 
 

const props=defineProps(['data']     )
 
 
 
</script>