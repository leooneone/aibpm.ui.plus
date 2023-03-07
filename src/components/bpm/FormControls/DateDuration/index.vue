<template>
  <div>
    <el-date-picker v-model="timeRange" v-bind="$attrs"  ></el-date-picker>
    <div v-if="showDuration" class="explain-text">时长: {{duration}}</div>
  </div>
</template>
<script>
import { timeCalculate } from '/@/utils/bpm' 
export default {
  // model:{
  //   prop: 'value',
  //   event: 'change'
  // },
  props:["modelValue","cmpType", "showDuration","tag", "tagIcon", "defaultValue", "labelWidth", "range-separator", "start-placeholder", "end-placeholder", "clearable", "format", "value-format", "regList", "changeTag", "proCondition", "asSummary", "fieldId", "renderKey", "layout", "value"],
  name: 'fc-date-duration',
  data(){
    return {
      timeRange: this.modelValue || this.defaultValue || ['', ''],
      duration: ''
    }
  },
  watch:{
    'timeRange':{
      handler:  function(val){
        let res = ''
        if (Array.isArray(this.timeRange)) {
          const [start, end] = this.timeRange.slice(0, 2).map( c => new Date(c).getTime())
          res = timeCalculate(start, end)
        }
        this.duration = res
        this.$emit('change', val)
        this.$emit('update:modelValue', val)
      },
      immediate: true
    },
    modelValue (val) {
      if (!val) {
        this.timeRange = ['', '']
      } else if (Array.isArray(val) && this.timeRange + '' !== val + '') {
        this.timeRange = val
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.explain-text {
  font-size: 12px;
  color: #aaa;
  line-height: 20px;
}
</style>