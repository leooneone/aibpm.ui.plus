<template>
        <NumberInputFormItems :data="props.data"></NumberInputFormItems>
        <el-form-item   label="严格步数">
            <el-switch v-model="props.data['step-strictly']" />
          </el-form-item> 
</template>


<script lang="ts" setup> 




import  {defineAsyncComponent} from 'vue'

const props=defineProps(['data']     )

const NumberInputFormItems = defineAsyncComponent(() => import('./components/number.vue'))
 

 
 
</script>