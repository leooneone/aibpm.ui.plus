<template>
  <div class="graphCellProperty">
    <div class="property-header">
        组件属性
        <i class="el-icon-close" @click="dialogClose"></i>
      </div>
      <div class="property-content">
       <el-form
          ref="dialogForm"
          :model="formData"
          label-position="top"
          label-width="80px"
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
            <el-input type="textarea" :rows="2" placeholder="请输入" clearable></el-input>
          </el-form-item>
       </el-form>
      </div>
      <div class="property-footer">
        <el-button size="small" @click="dialogClose">取消</el-button>
        <el-button type="primary" size="small" @click="dialogConfirm">确定</el-button>
      </div>
  </div>
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
  name: 'editCellProperty',
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
  methods: {
    dialogClose() {
      this.$emit('onDialogClose');
    },
    dialogConfirm() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$message.success('保存成功');
          this.$emit('onDialogConfirm');
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.graphCellProperty{
  width: 300px;
  height: calc(100% - 42px);
  position: absolute;
  right: -1px;
  top: 40px;
  background: white;
  border: 1px solid #EBEBEB;
  .el-icon-close{
    position: absolute;
    right: 15px;
    top: 12px;
    cursor: pointer;
  }
  .property-header{
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-right: 30px;
    color: #2D3E53;
    font-weight: 500;
    border-bottom: 1px solid #EBEBEB;
  }
  .property-content{
    height: calc(100% - 117px);
    padding: 20px 20px 0;
    overflow-y: scroll;
  }
  .property-footer{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    border-top: 1px solid #EBEBEB;
    position: absolute;
    padding-right: 30px ;
  }
}
</style>
