<template>
    This is a audio page！
<VueAudioInput :isReadOnly="false"></VueAudioInput>

</template>

<script lang="ts" setup>
 
import {defineAsyncComponent} from 'vue'
//import VueAudioInput from 'vue-audio-input'
 
import 'vue-audio-input/dist/vue-audio-input.css';

const VueAudioInput = defineAsyncComponent(() => import('vue-audio-input'))
</script>