<template>

    <el-form
      ref="formRef"
      :model="conf.model"
      label-width="100px"
      class="demo-ruleForm"
      :rules='formRules'
    >
     <div>
      {{ cfg }}
      <el-form-item
      :label-width="cfg.showLabel ? `${cfg.labelWidth || 100}px` : '0px'"
    :label="cfg.showLabel ? cfg.label : ''"
    :prop="cfg.vModel"
    :required="cfg.required"
    
      >
       

      <component   
      :is="cfg.tag"
        v-bind="cfg"
        v-model="conf.model[cfg.vModel]"  
      >
         
        
      </component>  
    </el-form-item>
</div>
      <el-form-item
   
        label="dateRange"
        prop="dateRange"
        :rules="[
          { required: true, message: '日期 is required' }, 
        ]"
      >
        <el-date-picker
        format="YYYY-MM-DD"
          v-model="conf.model.dateRange"
          type="daterange" 
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance } from 'element-plus'
  
  const cfg={
        "label": "日期范围1",
        "showLabel": true,
        "tag": "fc-date-duration",
        "showDuration": false,
        "tagIcon": "date-range",
        "defaultValue": null,
        "span": 24,
        "labelWidth": null,
        "style": {
            "width": "100%"
        },
        "type": "daterange",
        "range-separator": "至",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        "disabled": false,
        "clearable": true,
        "required": true,
        "format": "YYYY-MM-DD",
        "value-format": "YYYY-MM-DD",
        "readonly": false,
        "regList": [],
        "changeTag": true,
        "proCondition": true,
        "asSummary": false,
        "formId": 10,
        "layout": "colFormItem",
        "vModel": "field10"
    } ;

       const formRef = ref<FormInstance>()
  const formRules={ "field10": [ { "required": true, "message": "日期范围1不能为空", "trigger": "change" } ] }
  const conf = reactive({

    model:{
    age: '',}
  })
  
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  </script>
  