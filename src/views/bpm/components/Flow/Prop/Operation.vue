<template> 
  <el-form>

    <el-checkbox v-for="op in operations" v-model="operationForm[op.code]">{{ op.name }}</el-checkbox> 
  </el-form>
 </template>
<script   lang="ts"> 

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
     
  },
  data() {
    return {
      operations:[{name:'驳回到开始',code:'return'},{name:'评论',code:'comment'},{name:'传阅',code:'circulate'}],
      operationForm: JSON.parse(JSON.stringify(this.data || { particpants: {} })),
    }
  },
  methods: {
    onConfirm() {
      return this.operationForm //this.formOperates
    },
  },
}
</script>
