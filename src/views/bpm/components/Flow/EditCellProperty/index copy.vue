<template>
  <el-dialog
    title="组件属性"
    class="odialog"
    :model-value="isVisible"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    width="500px"
  >
    <el-form
      ref="dialogForm"
      :model="formData"
      label-position="right"
      label-width="110px"
      :rules="actionDialogRules"
    >
      <el-form-item label="组件名称" prop="name">
            <el-input v-model="formData.name" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="网络类型" prop="type">
            <el-input v-model="formData.type" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="网元类型" prop="neType">
            <el-select
              v-model="formData.neType"
              style="width:100%" placeholder="请选择" clearable filterable>
              <el-option value="BMW" label="BMW">BMW</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联网元名称" prop="relateNe">
            <el-input v-model="formData.relateNe" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark" type="textarea" :rows="2" placeholder="请输入" clearable></el-input>
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
const inputRequire = { required: true, message: '请输入', trigger: 'change' };
const selectRequire = { required: true, message: '请选择', trigger: 'change' };

const actionDialogRules = {
  name: [inputRequire],
  type: [inputRequire],
  neType: [selectRequire],
  relateNe: [inputRequire],
};

export default {
  name: 'saveEdit',
  props: {
    isVisible: Boolean || false,
    detailData: Object || {},
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
    detailData(cellData) {
      if (this.isVisible) {
        if (cellData.value) {
          const formData = {};
          cellData.value.getAttributeNames().forEach((v) => {
            formData[v] = cellData.value.getAttribute(v);
          });
          this.formData = formData;
        } else this.formData = {};
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
          this.$message.success('保存成功');
          this.$emit('onDialogConfirm', this.formData);
        }
      });
    },
  },
};
</script>
