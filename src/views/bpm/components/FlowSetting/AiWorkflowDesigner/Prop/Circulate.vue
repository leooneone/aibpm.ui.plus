<template>
  <AiOuSelect title="传阅人" ref="circulate" v-model="cirulateForm.particpants" :tabs="['org', 'user', 'role']" multiple>传阅人</AiOuSelect>
</template>
<script   lang="ts"> 

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  
  data() {
    return {
      cirulateForm: JSON.parse(JSON.stringify(this.data || { particpants: {} })),
    }
  },
  methods: {
    onConfirm() {
      return this.cirulateForm //this.formOperates
    },
  },
}
</script>
