<template>
  <el-tabs class="workflow" v-model="state.activeName"  type="border-card" style="height:100%"    >
    <el-tab-pane label="待办任务" name="todo-item"  >
      <work-item :state="nvActivityState['待办']" :is-myself="false" ></work-item>
    </el-tab-pane> 
    <el-tab-pane label="超时任务" name="timeout-item"     >
     
     <work-item :state="nvActivityState['超时']"></work-item>
   </el-tab-pane>


   <el-tab-pane label="已完成的流程" name="finshed-instance" >
     <Instance :state="nvInstanceState['已完成']"></Instance>
   </el-tab-pane>
   <el-tab-pane label="进行中的流程" name="runing-instance" >
     <Instance :state="nvInstanceState['运行中']"></Instance>
   </el-tab-pane>
   <el-tab-pane label="超时的流程" name="timout-instance" >
     <Instance :state="nvInstanceState['超时']"></Instance>
   </el-tab-pane>

   <el-tab-pane label="异常的流程" name="exception-instance" >
     <Instance :state="nvInstanceState['异常']"></Instance>
   </el-tab-pane>
  </el-tabs>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue'
  import { ResultOutputWorkItemGetPageOutput, PageInputWorkItemGetPageDto,nvActivityState,nvInstanceState } from '/@/api/bpm/data-contracts'
  
  const WorkItem = defineAsyncComponent(() => import('../../management/workItem.vue'))
  const Instance = defineAsyncComponent(() => import('../../management/instance.vue'))
  
   
  // 引入组件
  const { proxy } = getCurrentInstance() as any
 

  const state = reactive({
    activeName: 'todo-item',
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