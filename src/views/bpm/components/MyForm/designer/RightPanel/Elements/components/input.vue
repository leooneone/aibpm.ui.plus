<template>
  
  <el-form-item v-if="props.data.maxlength !== undefined" label="最多输入">
            <el-input v-model="props.data.maxlength" placeholder="请输入字符长度">
              <template #append>个字符</template>
            </el-input>
          </el-form-item>
     <!--
          
   <el-input
            v-model="props.data.defaultValue"
              :value="setDefaultValue(props.data.defaultValue)"
              placeholder="请输入默认值"
              @input="onDefaultValueInput"
            /> -->
          
       <template v-if="props.data.__slot__">
        <el-form-item label="前缀">
            <el-input v-model="props.data.__slot__.prepend" placeholder="请输入前缀" />
          </el-form-item>
          <el-form-item   label="后缀">
            <el-input v-model="props.data.__slot__.append" placeholder="请输入后缀" />
          </el-form-item>
        </template>
          <el-form-item v-if="props.data['prefix-icon']!==undefined" label="前图标">
            <el-input v-model="props.data['prefix-icon']" placeholder="请输入前图标名称">
              <el-button #append icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="props.data['suffix-icon'] !== undefined" label="后图标">
            <el-input v-model="props.data['suffix-icon']" placeholder="请输入后图标名称">
              <el-button #append icon="el-icon-thumb" @click="openIconsDialog('suffix-icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item> 
       
</template>

<script lang="ts" setup> 
 

 import { isNumberStr } from "../../../utils/index.js";
const props=defineProps(['data']     )

const      onDefaultValueInput=(str) =>{  
      return
      if (Array.isArray(props.data.defaultValue)) {
        // 数组
         
          props.data["defaultValue"]=          str.split(",").map(val => (isNumberStr(val) ? +val : val));
      } else if (["true", "false"].indexOf(str) > -1) {
        // 布尔
         props.data["defaultValue"]= JSON.parse(str);
      } else {
        // 字符串和数字
         
          props.data["defaultValue"] = isNumberStr(str) ? +str : str
         
      }
    }
 
</script>