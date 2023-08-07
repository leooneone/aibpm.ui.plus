<template>
            <el-form-item v-if="props.data.actionText !== undefined" label="动作文字">
            <el-input v-model="props.data.actionText" placeholder="请输入动作文字" />
          </el-form-item>
</template>


<script lang="ts" setup> 


const props=defineProps(['data']     )

 

 
 
</script>