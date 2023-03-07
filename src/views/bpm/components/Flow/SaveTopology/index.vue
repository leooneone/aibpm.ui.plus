<template>
  <el-dialog
    title="保存拓扑"
    class="odialog"
    :model-value="isVisible"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    width="420px"
  >
    <el-form
      ref="dialogForm"
      :model="formData"
      label-position="right"
      label-width="80px"
      :rules="actionDialogRules"
    >
      <el-form-item label="拓扑名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClose" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm" size="small"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
const actionDialogRules = {
  name: [{ required: true, message: '请输入', trigger: 'change' }],
};
export default {
  name: 'saveEdit',
  props: {
    isVisible: Boolean || false,
  },
  data() {
    return {
      formData: {},
      actionDialogRules,
    };
  },
  watch: {
    isVisible(val) {
      if (!val) {
        this.$refs.dialogForm.resetFields();
      }
    },
  },
  methods: {
    dialogClose() {
      this.$emit('onDialogClose');
    },
    dialogConfirm() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$emit('onDialogConfirm', this.formData);
        }
      });
    },
  },
};
</script>
