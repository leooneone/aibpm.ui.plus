<template>
     <el-form size="small" label-width="90px">
          <el-form-item label="表单名">
            <el-input v-model="props.formConf.formRef" placeholder="请输入表单名（ref）" />
          </el-form-item>
          <el-form-item label="表单尺寸">
            <el-radio-group v-model="props.formConf.size">
              <el-radio-button label="medium">中等</el-radio-button>
              <el-radio-button label="small">较小</el-radio-button>
              <el-radio-button label="mini">迷你</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="props.formConf.labelPosition">
              <el-radio-button label="left">左对齐</el-radio-button>
              <el-radio-button label="right">右对齐</el-radio-button>
              <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
          </el-form-item>

         
          <el-form-item label="标签宽度">
            <el-input-number v-model="props.formConf.labelWidth" placeholder="标签宽度" />
          </el-form-item>
          <el-form-item label="栅格间隔">
            <el-input-number v-model="props.formConf.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <!-- <el-form-item label="禁用表单">
            <el-switch v-model="formConf.disabled" />
          </el-form-item> 
          <el-form-item label="表单按钮">
            <el-switch v-model="formConf.formBtns" />
          </el-form-item>
          <el-form-item label="显示未选中组件边框">
            <el-switch v-model="formConf.unFocusedComponentBorder" />
          </el-form-item>-->

          
        </el-form>
</template>
<script lang="ts" setup> 
 
 const props=defineProps(['formConf'])
</script>