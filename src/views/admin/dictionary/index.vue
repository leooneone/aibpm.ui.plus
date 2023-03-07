<template>
  <div style="padding: 0px 0px 8px 8px">
    <el-row :gutter="8" style="width: 100%">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <dictionary-type></dictionary-type>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <dictionary></dictionary>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

// 引入组件
const DictionaryType = defineAsyncComponent(() => import('./dictionary-type.vue'))
const Dictionary = defineAsyncComponent(() => import('./dictionary.vue'))
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'bpm/dict',
})
</script>

<style scoped lang="scss"></style>
