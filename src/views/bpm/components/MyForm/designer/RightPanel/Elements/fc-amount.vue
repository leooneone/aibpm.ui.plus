<template>
        <NumberInputFormItems :data="props.data"></NumberInputFormItems>
     
</template>


<script lang="ts" setup> 




import  {defineAsyncComponent} from 'vue'

const props=defineProps(['data']     )

const NumberInputFormItems = defineAsyncComponent(() => import('./components/number.vue'))
 

 
 
</script>