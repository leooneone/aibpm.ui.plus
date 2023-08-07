<template>


<InputFormItems :data="props.data"></InputFormItems>

<el-form-item v-if="props.data.autosize !== undefined" label="最小行数">
            <el-input-number v-model="props.data.autosize.minRows" :min="1" placeholder="最小行数" />
          </el-form-item>
          <el-form-item v-if="props.data.autosize !== undefined" label="最大行数">
            <el-input-number v-model="props.data.autosize.maxRows" :min="1" placeholder="最大行数" />
          </el-form-item>
</template>


<script lang="ts" setup> 


import  {defineAsyncComponent} from 'vue'

const props=defineProps(['data']     )

const InputFormItems = defineAsyncComponent(() => import('./components/input.vue'))
 
 
</script>