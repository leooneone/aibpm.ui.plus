<template>
         
          
          <OptionsPanel :data="props.data"></OptionsPanel>
</template>


<script lang="ts" setup> 

import { defineAsyncComponent } from 'vue';
const OptionsPanel = defineAsyncComponent(() => import('./components/options.vue'))
 

const props=defineProps(['data']     )

 

 
 
</script>