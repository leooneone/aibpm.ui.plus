<template>
  <icons-dialog v-model="state.iconsVisible" :current="props.data[currentIconModel]" @select="setIcon" />
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const props = defineProps(['data'])

const openIconsDialog = (model) => {
  state.iconsVisible = true
  state.currentIconModel = model
}
const setIcon = (val) => {
  props.data[state.currentIconModel] = val
}

const state = reactive({
  iconsVisible: false,
  currentIconModel: null,
})
</script>
