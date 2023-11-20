/**
 *Copyright: Copyright (c) 2023
 *Author:Leo
 *Version 1.0
 *Title: form-generator/Element Plus 表单解析器
 *GitHub: https://github.com/leo.one.tt/aibpm
 */

<template>
  <!--强制全部重新加载表单-->
  <template v-if="state.isShow" >
    <el-drawer v-model="state.isShow" direction="rtl" :size="state.drawerSize">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">{{ state.title }}</h4>
        <el-button-group>
          <el-button @click="state.drawerSize = '390px'" icon="ele-Cellphone" title="手机"> </el-button>
      
          <el-button @click="state.drawerSize = '100%'" icon="ele-Monitor" title="电脑"></el-button>
        </el-button-group>  
   
</template> 
<el-tabs v-model="state.curTab"   type="border-card"  class="my-tabs" v-loading="state.loading" >
  <el-tab-pane name="form" label="表单内容" >
  
     <!-- <form-parser :conf="state.conf" ref="formRef" :loading="state.submitLoading" ></form-parser>-->

     <AiFormParser :conf="state.conf" ref="formRef" :loading="state.submitLoading" ></AiFormParser>

    </el-tab-pane>
    <el-tab-pane name="record" label="审批记录"  v-if="state.conf.items.length>0" > <tempate >
      <el-timeline style="font-size:0.8em" >
    <el-timeline-item 
      v-for="(activity, index) in state.conf.items"
      :key="index"
      :type=" getType(activity)"
      :icon="getIcon(activity)" 
    >  
        <h5> {{ activity.title }} </h5>
        <p>开始时间: {{formatterTimeValue(activity.startTime)}}</p>
        <p>参与人员：{{ activity.participant }}  
        </p>
        
        <p v-if="dayjs(activity.finishTime).year()>2020">
           完成时间：{{ formatterTimeValue(activity.finishTime) }}
        
       </p>
        <p>
        处理结果： <el-tag :type="getType(activity)">
           {{ getState(activity)}}</el-tag> 
          </p>
         
           <p v-if="!!activity.comment">
           处理意见：{{ activity.comment }}
        
       </p>
    </el-timeline-item>
  </el-timeline> 
    </tempate></el-tab-pane>
    <el-tab-pane name="history" label="审批历史"  v-if="state.conf.items.length>0"> <tempate >
      <el-table :data="state.conf.items" style="font-size:0.9em">
        <el-table-column prop="title" label="名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="name" label="操作人" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip width="120"  :formatter="formatterTime" ></el-table-column>
        <el-table-column prop="finishTime" label="完成时间" show-overflow-tooltip width="120"  :formatter="formatterTime" >
          <template #default="{ row }" > 
            <span v-show="dayjs(row.finishTime).year()>2020">{{formatterTimeValue(row.finishTime)  }}</span> 
          </template>

        </el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip width="120">
          <template #default="{ row }">
            <el-tag disable-transitions :type="vnDisplayType[row.state&127].toLowerCase()">{{ vnActivityState[row.state] }}</el-tag> 
          </template>
        </el-table-column>  <el-table-column prop="comment" label="意见" show-overflow-tooltip width="120">
          <template #default="{ row }">
         {{row.comment}}
        </template>
        </el-table-column>
      </el-table>

    </tempate></el-tab-pane>

    <el-tab-pane name="chart" label="流程图"  v-if="!!state.chartData"  > 
 
      <FlowChartPanel ref="flowChartPanelRef"  :data="state.chartData"  ></FlowChartPanel>

    </el-tab-pane>
  </el-tabs>
      <template #footer > 
  <div style="flex: auto; background-color: #eeeeee; padding: 5px 5px 5px 5px" v-if="state.conf.activity.type">
    <el-button type="warning" v-if="state.conf.activity.type !== 'Copy'" plain @click="submitForm({isSaveOnly:true})">保存</el-button>
    <el-button type="success" v-if="['Start','Deal'].includes(state.conf.activity.type) " :loading="state.submitLoading" plain @click="submitForm()">提交</el-button>
    <el-button type="danger" v-if="false" plain @click="openApprove()">驳回</el-button>
    <el-button type="success" v-if="state.conf.activity.type === 'Approve'" plain @click="openApprove()">审批</el-button>
  </div>
</template>
</el-drawer></template>
<ApprovePanel  :approve-setting="state.conf.approveSetting" ref="approvePanelRef"    ></ApprovePanel>
<OptionalPanel ref="optionalPanelRef"  :optional="state.optional" ></OptionalPanel>

</template>
 
<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent, provide } from 'vue'
  import {  vnDisplayType, ActivityState,vnActivityState,nvActivityState,nvApprovalResult } from '/@/api/bpm/data-contracts'
import { WorkflowApi } from '/@/api/bpm/Workflow'

import { WorkflowTemplateApi as TPLApi } from '/@/api/bpm/WorkflowTemplate'

import dayjs from 'dayjs' 
const ApprovePanel = defineAsyncComponent(() => import('./approvePanel.vue'))
const OptionalPanel = defineAsyncComponent(() => import('./optionalPanel.vue'))
const FlowChartPanel = defineAsyncComponent(() => import('./flowChart.vue'))

const formRef = ref()
const approvePanelRef = ref()
const optionalPanelRef = ref()

const { proxy } = getCurrentInstance() as any
const defautConf={
    id: undefined,
    data: [],
    model: {
      //    "field2": "选项二", "field1": [ "2023-01-03", "2023-01-17" ], "field1673928917578": 49, "field1673928939297": 4, "field1673928918984": true, "field1673928936079": 16, "field1673928921016": 1, "field1673928930234": "gdfg郭德纲"
    },
    activity: {},
  } 
const state = reactive({
  drawerSize: '390px',
  title: '表单标题',
  isShow: false,
  loading: false,
  submitLoading:false,
  curTab: 'form',
  isShowApprove: false,
  optional:[],
  conf:JSON.parse(JSON.stringify(defautConf)),
  chartData:null
})
const getState = (item) => {

    return  vnActivityState[item.state]
 
}
const getType = (item) => {
 
  if(vnDisplayType[item.state&127])
   return  vnDisplayType[item.state&127].toLowerCase()

    
}

const formatterTimeValue = (val:any) => {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}
const formatterTime = (row: any, column: any, cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}
const getIcon = (item) => {
  var state=item.state&127
   switch(state)
   {
    case 6:
      return `ele-CircleClose` 
    case 3:
      return `ele-CircleCheck`
     
   }
   

    return 'ele-Loading'
  
}
const submitForm =  (extPs) => {
  formRef.value.submitForm(async(model) => {
    var ps = {
      workItemId: state.conf.workItemId,
      instanceId: state.conf.instanceId,
      templateId: state.conf.templateId,
      type: state.conf.type,
      form: model,
      comment: '',
      activityCode: state.conf.activity.id,
      approvalResult: undefined,
      isSaveOnly:false
    }

    state.submitLoading=true
   if (extPs) Object.assign(ps, extPs)  
   var res=await new WorkflowApi().submit(ps,{showErrorMessage:false}) 
      if (res.success) {
        proxy.$modal.msgSuccess(`提交成功`)
        state.isShow = false
      }else{
        if(res.code === '-1')
        {

          openOptional(ps)
          state.optional = res.data.optional ||{range:[]}
        }else 
          proxy.$modal.msgError(res.msg)
       
      }
   
  state.submitLoading=false
   
  })
  
}

provide('submitForm', submitForm)
const openApprove = () => {
  approvePanelRef.value.open()
}
const openOptional=(ps)=>{


  optionalPanelRef.value.open(ps)
}
const open = async (ps) => {
  state.loading = true
  state.conf=JSON.parse(JSON.stringify(defautConf))
  const res = await new WorkflowApi().open(ps)

  //const res = await api.getFormData({ id: id })
  if (res.success) {
    var json = JSON.parse(res.data.form)
    state.conf.id = ps.id
    state.conf.type = ps.type
    state.conf.templateId = ps.templateId
    state.conf.workItemId = ps.workItemId
    state.conf.instanceId = ps.instanceId
    state.conf.data = json.formItems ?? {}
    if (res.data.model) state.conf.model = JSON.parse(res.data.model)
    state.conf.activity = res.data.activity ?? {}
    state.conf.items = res.data.items ?? []
    state.conf.approveSetting=res.data.approveSetting??{}
    state.isShow = true
     
  }
  state.chartData=null
  var tplRes=await new TPLApi().get({id: state.conf.templateId})
  if(  tplRes.success)
  {
    
    state.chartData=JSON.parse(tplRes.data?.flowSetting).chartData
    
  }
  state.loading = false
}
// 页面加载时
onMounted(() => {})

defineExpose({
  open,
})
</script>
<style lang="scss" scoped>
.my-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.my-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.my-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}


</style>
<style >

.tox-tinymce-aux{
    z-index: 3000 !important;
    }
</style>