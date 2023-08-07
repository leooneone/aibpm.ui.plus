<template>
        
        <el-form-item v-if="props.data.tag==='el-row'" label="栅格间隔">
            <el-input-number v-model="props.data.gutter" :min="0" placeholder="栅格间隔" />
            <el-slider v-model="props.data.gutter" :max="500" :min="0"    />
          </el-form-item>

          <el-form-item
            v-if="props.data.justify !== undefined && props.data.type==='flex'"
            label="水平排列"
          >
            <el-select v-model="props.data.justify" placeholder="请选择水平排列" :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in justifyOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="props.data.align!==undefined && props.data.type==='flex'" label="垂直排列">
            <el-radio-group v-model="props.data.align">
              <el-radio-button label="top" />
              <el-radio-button label="middle" />
              <el-radio-button label="bottom" />
            </el-radio-group>
          </el-form-item>
</template>


<script lang="ts" setup> 


const props=defineProps(['data']     )
const justifyOptions= [
        {
          label: "start",
          value: "start"
        },
        {
          label: "end",
          value: "end"
        },
        {
          label: "center",
          value: "center"
        },
        {
          label: "space-around",
          value: "space-around"
        },
        {
          label: "space-between",
          value: "space-between"
        }
      ] 

 
 
</script>