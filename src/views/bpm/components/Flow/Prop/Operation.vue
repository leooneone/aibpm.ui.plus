<template> 
  <el-form>
    <el-form-item label="活动开始前任务：">
    <el-select v-model="state.operationForm.beforeActivity">
        <el-option v-for="(item ,index) in state.bizs" :label="item" :value="item" :key="index">
        </el-option >
        </el-select>

      </el-form-item>
    <el-form-item label="活动完成后任务：">
    <el-select v-model="state.operationForm.afterActivity">
        <el-option v-for="(item ,index) in state.bizs" :label="item" :value="item" :key="index">
        </el-option >
        </el-select>

      </el-form-item>
   <!-- <el-checkbox v-for="op in state.operations" v-model="operationForm[op.code]">{{ op.name }}</el-checkbox> -->
  </el-form>
 </template>
<script   lang="ts" setup> 
import { onMounted, reactive } from "vue"

 import { WorkflowTemplateApi as TPLApi } from "/@/api/bpm/WorkflowTemplate"
  const props =defineProps({
    data: {
      type: Object,
      default: () => {},
    },
  }) 
  const state=reactive({
      
      bizs:['mytask'],
      operations:[{name:'驳回到开始',code:'return'},{name:'评论',code:'comment'},{name:'传阅',code:'circulate'}],
      operationForm: JSON.parse(JSON.stringify(props.data || { particpants: {} })),
    }
  )

  onMounted(async ()=>{

   var res= await new TPLApi().getList(); 

   if(res.success)
    state.bizs=res.data
  })

  const onConfirm =()=>{

    return state.operationForm
  }

  defineExpose({
    onConfirm
  })
   
</script>
