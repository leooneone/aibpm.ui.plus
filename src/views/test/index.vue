<template>
<!--   This is a test page！
<AudioInput :isReadOnly="false"></AudioInput>
--> 


<TestPanel />
</template>

<script lang="ts" setup>
  
import {defineAsyncComponent} from 'vue'
//const TestPanel = defineAsyncComponent(() => import('./audio.vue'))

  const TestPanel = defineAsyncComponent(() => import('/@/views/edu/game-task/index.vue'))

</script>