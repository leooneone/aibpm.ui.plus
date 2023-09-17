<template>
  <div>
    <el-time-picker v-model="timeRange" v-bind="$attrs" is-range ></el-time-picker>
    <div v-if="showDuration" class="explain-text">时长: {{duration}}</div>
  </div>
</template>
<script>
import { timeCalculate } from '/@/utils/bpm' 
const defaultVal = ['','']
export default {
  // model:{
  //   prop: 'value',
  //   event: 'change'
  // },
  props:["modelValue",  "showDuration",  
   "defaultValue" ],
  name: 'fc-time-duration',
  data(){
    return {
      timeRange: this.modelValue || this.defaultValue || defaultVal ,
      duration: ''
    }
  },
  watch:{
    'timeRange':{
      handler:  function(val){
        let res = ''
        if (Array.isArray(this.timeRange)) {
          const [start, end] = this.timeRange.slice(0, 2).map( c => new Date('2020/01/01 ' + c).getTime())
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