<template>
  <div class="fc-amount">
    <el-input-number style="width: 100%;"   v-model="innerValue" v-bind="$attrs"  @input="handleInput"></el-input-number>
    <div class="explain-text" v-if="showChinese">大写：{{chinese}}</div>
  </div>
</template>
<script>
import {getAmountChinese} from '/@/utils/bpm'
export default {
  //model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: ["modelValue"  ],
  name: 'fc-amount',
  data () {
    return {
      innerValue: this.modelValue
    }
  },
  computed:{
    chinese(){
      return this.showChinese ? getAmountChinese(this.innerValue) : ''
    }
  },
  methods: {
    handleInput (val) {
      this.$emit('change', val)   
    },
  },
  watch:{
    
    modelValue (val) {
      if (val !== this.innerValue) {
        this.innerValue = val
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