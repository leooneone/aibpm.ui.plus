<template>
 <el-form-item v-if="props.data['active-color'] !== undefined" label="开启颜色">
            <el-color-picker v-model="props.data['active-color']" />
          </el-form-item>
          <el-form-item v-if="props.data['inactive-color'] !== undefined" label="关闭颜色">
            <el-color-picker v-model="props.data['inactive-color']" />
          </el-form-item>  
      <el-form-item v-if="props.data['active-text'] !== undefined" label="开启提示">
            <el-input v-model="props.data['active-text']" placeholder="请输入开启提示" />
          </el-form-item>
          <el-form-item v-if="props.data['inactive-text'] !== undefined" label="关闭提示">
            <el-input v-model="props.data['inactive-text']" placeholder="请输入关闭提示" />
          </el-form-item>
          <el-form-item v-if="props.data['active-value'] !== undefined" label="开启值">
            <el-input
              :value="setDefaultValue(props.data['active-value'])"
              placeholder="请输入开启值"
              @input="onSwitchValueInput($event, 'active-value')"
            />
          </el-form-item>
          <el-form-item v-if="props.data['inactive-value'] !== undefined" label="关闭值">
            <el-input
              :value="setDefaultValue(props.data['inactive-value'])"
              placeholder="请输入关闭值"
              @input="onSwitchValueInput($event, 'inactive-value')"
            />
          </el-form-item> 
</template>


<script lang="ts" setup> 

import { isNumberStr,setDefaultValue } from "../../utils/index.js"; 

const props=defineProps(['data']     )
 
const onSwitchValueInput=(val, name) =>{
      if (["true", "false"].indexOf(val) > -1) {
        props.data[name] = JSON.parse(val);
      } else {
        props.data[ name]=( isNumberStr(val) ? +val : val);
      }
    }
 
</script>