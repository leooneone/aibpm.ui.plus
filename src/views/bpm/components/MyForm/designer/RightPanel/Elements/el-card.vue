<template>

<el-form-item v-if="props.data.header !== undefined" label="标题">
    <el-input v-model="props.data.header" placeholder="请输入标题" />
  </el-form-item>

  <el-form-item v-if="props.data.shadow !== undefined" label="是否显示阴影">
    <el-switch v-model="props.data.shadow" placeholder="是否显示阴影"   />
  </el-form-item> 


  <el-form-item
            v-if="props.data.shadow !== undefined "
            label="是否显示阴影"
          >
            <el-select v-model="props.data.shadow" :style="{ width: '100%' }">
              <el-option label="always" value="always" />
              <el-option label="never" value="never" />
              <el-option label="hover" value="hover" />
            </el-select>
          </el-form-item>
  </template>
  
  
  <script lang="ts" setup> 
   
  const props=defineProps(['data']     )
  
  
  
   
   
  </script>