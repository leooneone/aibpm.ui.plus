<template>
 
 <el-form-item v-if="props.data.min !== undefined" label="最小值">
            <el-input-number v-model="props.data.min" placeholder="最小值" />
          </el-form-item>
          <el-form-item v-if="props.data.max !== undefined" label="最大值">
            <el-input-number v-model="props.data.max" placeholder="最大值" />
          </el-form-item>
          <el-form-item v-if="props.data.step !== undefined" label="步长">
            <el-input-number v-model="props.data.step" placeholder="步数" />
          </el-form-item>
          <el-form-item v-if="['el-input-number','fc-amount'].includes(props.data.tag)" label="精度">
            <el-input-number v-model="props.data.precision" :min="0" placeholder="精度" />
          </el-form-item> 
          <el-form-item v-if="['el-input-number','fc-amount'].includes(props.data.tag)" label="是否显示按钮">
            <el-switch v-model="props.data['controls']" placeholder="是否显示按钮"   />
          </el-form-item>
          <el-form-item v-if="['el-input-number','fc-amount'].includes(props.data.tag)" label="按钮位置">
            <el-radio-group v-model="props.data['controls-position']">
              <el-radio-button label>默认</el-radio-button>
              <el-radio-button label="right">右侧</el-radio-button>
            </el-radio-group>
          </el-form-item>
</template>

<script lang="ts" setup> 
  
const props=defineProps(['data']     )
 
</script>