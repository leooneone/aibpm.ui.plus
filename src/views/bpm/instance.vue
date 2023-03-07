<template>
  <el-tabs class="workflow" v-model="state.activeName"  type="border-card" style="height:100%"
    ><el-tab-pane label="我发起的" name="initiate"     >
     
      <Instance :is-handled="false"></Instance>
    </el-tab-pane>

    <el-tab-pane label="我的经办" name="handled" >
     <Instance :is-handled="true"></Instance>
    </el-tab-pane>

     
  </el-tabs>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue'
  import { ResultOutputWorkItemGetPageOutput, PageInputWorkItemGetPageDto,nvActivityState } from '/@/api/bpm/data-contracts'
   
  const Instance = defineAsyncComponent(() => import('./management/instance.vue'))
  
   
  // 引入组件
  const { proxy } = getCurrentInstance() as any
 

  const state = reactive({
    activeName: 'initiate',
})
  onMounted(() => {
     
  }) 
  </script>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'bpm/instance',
  })
  </script>
  
  <style scoped lang="scss"></style>