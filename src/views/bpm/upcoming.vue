<template>
  <el-tabs class="workflow" v-model="state.activeName"  type="border-card" style="height:100%"
    ><el-tab-pane label="我的待办" name="todo"     >
     
      <work-item :state="nvActivityState['待办']"></work-item>
    </el-tab-pane>

   

    <el-tab-pane label="我的传阅" name="copy" >
      <work-item :state="nvActivityState['待阅']"></work-item>
    </el-tab-pane>
    <el-tab-pane label="我的已办" name="finished"     >
     
     <work-item :state="nvActivityState['已完成']"></work-item>
   </el-tab-pane>
     
  </el-tabs>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue'
  import { ResultOutputWorkItemGetPageOutput, PageInputWorkItemGetPageDto,nvActivityState } from '/@/api/bpm/data-contracts'
  
  const WorkItem = defineAsyncComponent(() => import('./management/workItem.vue'))
  const Instance = defineAsyncComponent(() => import('./instance.vue'))
  
   
  // 引入组件
  const { proxy } = getCurrentInstance() as any
 

  const state = reactive({
    activeName: 'todo',
})
  onMounted(() => {
     
  }) 
  </script>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'bpm/template',
  })
  </script>
  
  <style scoped lang="scss"></style>