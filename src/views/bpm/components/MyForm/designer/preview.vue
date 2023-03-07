/**
 *Copyright: Copyright (c) 2023
 *Author:Leo
 *Version 1.0
 *Title: form-generator/Element Plus 表单解析器
 *GitHub: https://github.com/leo.one.tt/aibpm
 */

<template>
  <!--强制全部重新加载表单-->
  <section v-if="state.isShow">
    <el-drawer v-model="state.isShow" direction="rtl" :size="state.drawerSize">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">{{ state.title }}</h4>
        <el-button-group>
          <el-button @click="state.drawerSize = '390px'" icon="ele-Cellphone" title="手机"> </el-button>
      
          <el-button @click="state.drawerSize = '100%'" icon="ele-Monitor" title="电脑"></el-button>
        </el-button-group>  
   
</template>   
      <form-parser :conf="state.conf" ref="formRef"  ></form-parser>

   
      <template #footer > 
  <div style="flex: auto; background-color: #eeeeee; padding: 5px 5px 5px 5px"  > 
    <el-button type="primary"   plain @click="submitForm()">提交</el-button> 
    <el-button type="info"  plain @click="state.isShow=false">取消</el-button>
  </div>
</template>
</el-drawer></section>
 

</template>
 
<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent, provide } from 'vue'
  
const FormParser = defineAsyncComponent(() => import('/@/views/bpm/components/MyForm/designer/FormParser.vue'))
 
const formRef = ref() 

const { proxy } = getCurrentInstance() as any
const props = defineProps({})
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
  optional:[],
  conf:JSON.parse(JSON.stringify(defautConf))
})  
const submitForm = (extPs) => {
  formRef.value.submitForm((model) => {
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
 
        proxy.$modal.msgSuccess(`模拟提交成功`)
        
  })
}

provide('submitForm', submitForm)
  
const open = async (data) => {
  state.loading = true
  state.conf=JSON.parse(JSON.stringify(defautConf))
  state.conf.data=data
  state.isShow=true
  state.loading = false
}
// 页面加载时
onMounted(() => {})

defineExpose({
  open,
})
</script> 
<style >

.tox-tinymce-aux{
    z-index: 3000 !important;
    }
</style>