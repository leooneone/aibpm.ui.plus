<template>
  <GraphEdit
    :enableEditing="true"
  />
</template>

<script>
import GraphEdit from './components/Flow/index.vue';

export default {
  name: 'Home',
  components: {
    GraphEdit,
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 30px;
  line-height: 30px;
  color: #475669;
  border-bottom: 1px solid #ccd5e0;
  padding: 0px 8px;
  overflow: hidden;
  font-size: 12px;
}
</style>
