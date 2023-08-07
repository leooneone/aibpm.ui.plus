<template>
          <el-form-item v-if="props.data.tag === 'el-color-picker'" label="颜色格式">
            <el-select
              v-model="props.data['color-format']"
              placeholder="请选择颜色格式"
              :style="{ width: '100%' }"
              @change="colorFormatChange"
            >
              <el-option
                v-for="(item, index) in colorFormatOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

         

         
         
    
</template>


<script lang="ts" setup> 


const props=defineProps(['data']     )

const colorFormatOptions= [
        {
          label: "hex",
          value: "hex"
        },
        {
          label: "rgb",
          value: "rgb"
        },
        {
          label: "rgba",
          value: "rgba"
        },
        {
          label: "hsv",
          value: "hsv"
        },
        {
          label: "hsl",
          value: "hsl"
        }
      ] 

 const    colorFormatChange=(val)=> {
      props.data.defaultValue = null;
      props.data["show-alpha"] = val.indexOf("a") > -1;
      props.data.renderKey = props.data.formId + new Date().getTime(); // 更新renderKey,重新渲染该组件
    }
 
</script>