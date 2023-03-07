<template>
  <el-dialog
    title="导入文件"
    :model-value="isVisible"
    width="400px"
    :before-close="handleClose"
  >
    <el-upload
      action="#"
      accept=".xml"
      :show-file-list="false"
      :on-change="onUploadChange"
      style="display: inline-block"
    >
      <el-button class="obutton ml10" size="mini" icon="el-icon-download" plain
        >导入</el-button
      >
    </el-upload>
    <div class="note">(*当前<el-link type="danger">画布将被合并</el-link>，暂时只支持导入xml文件)</div>
  </el-dialog>
</template>
<script>
export default {
  name: 'importFile',
  emits: ['onDialogClose', 'onDialogConfirm'],
  props: {
    isVisible: Boolean || false,
  },
  data() {
    return {

    };
  },
  methods: {
    onUploadChange(file) {
      if (file.status === 'ready') return;
      if (file && file.raw) {
        const reader = new FileReader();
        reader.readAsText(file.raw);
        reader.onload = () => {
          this.$emit('onDialogConfirm', reader.result);
        };
        this.dialogVisible = false;
      } else this.$message.error('文件解析失败');
    },
    handleClose() {
      this.$emit('onDialogClose');
    },
  },
};
</script>
<style scoped>
.note{
  margin-top: 15px;
  font-size: 12px;
}
.note-warn{
  color: ;
}
</style>
