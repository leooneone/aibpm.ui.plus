<template>
  <ou-select title="传阅人" ref="circulate" v-model="cirulateForm.particpants" :tabs="['org', 'user', 'role']" multiple>传阅人</ou-select>
</template>
<script   lang="ts">
import OuSelect from '../../OU/index.vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    OuSelect,
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
