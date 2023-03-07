<template>
  <div class="setting-container">
    <el-form ref="elFormRef" :model="state.formData" :rules="state.rules" size="medium" label-width="100px" label-position="top">
      <el-form-item label="流程名称" prop="name">
        <el-input v-model="state.formData.name" placeholder="请输入流程名称" clearable :style="{ width: '100%' }"> </el-input>
      </el-form-item>
      <el-form-item label="选择分组" prop="groupId">
        <el-select v-model="state.formData.groupId" placeholder="请选择选择分组" clearable :style="{ width: '100%' }">
          <el-option v-for="(item, index) in bpm_group" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="谁可以发起审批" prop="range">
        <el-select v-model="state.formData.range"  :style="{ width: '100%' }" placeholder="请选择范围">
              <el-option
                 
                :key="0"
                label="所有人"
                :value="0" 
              ></el-option>
              <el-option 
                :key="1"
                label="指定范围"
                :value="1" 
              ></el-option>
            </el-select>
        <ou-select ref="ouSelectRef" v-if="state.formData.range===1" v-model="state.formData.initiators" :tabs="['user', 'role', 'org']" multiple> 默认所有人</ou-select>
      </el-form-item>
      <el-form-item label="模板图标" prop="icon">
        <my-select-icon v-model="state.formData.icon" clearable />
      </el-form-item>
      <el-form-item label="审批说明" prop="remark">
        <el-input
          v-model="state.formData.remark"
          type="textarea"
          placeholder="请输入审批说明"
          :maxlength="100"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 4 }"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts"  setup name="basice-setting">
import { defineAsyncComponent, getCurrentInstance, reactive ,ref} from 'vue'

const MySelectIcon = defineAsyncComponent(() => import('../../components/my-select-icon/index.vue'))
const OuSelect = defineAsyncComponent(() => import('../OU/index.vue'))

const { proxy } = getCurrentInstance();
const {   bpm_group  } = proxy.$dict("bpm-group"); 


const defaultForm={
    name: '',
    icon: '',
    groupId: undefined,
    remark: '',
    range: 0,
    initiators: {},
  }
const props = defineProps({
  tabName: String,
  initiators: {},
  conf: {type:Object  },
})
//dicts:['BPM_GROUP'],
const elFormRef=ref()

const state = reactive({
  dialogVisible: false,
  formData: Object.assign({},defaultForm,  props.conf) ,
  rules: {
    name: [
      {
        required: true,
        message: '请输入审批名称',
        trigger: 'blur',
      },
    ],range: [
      {
        required: true,
        message: '请选择谁可以发起审批',
        trigger: 'change',
      },
    ],icon: [
      {
        required: true,
        message: '请选择图标',
        trigger: 'change',
      },
    ],
    groupId: [
      {
        required: true,
        message: '请选择选择分组',
        trigger: 'change',
      },
    ],
  },
})
 
const getSetting = async  () => {
  return new Promise((resolve, reject) => {
    elFormRef.value.validate((valid) => {
        if (valid) { 
          resolve(state.formData);
        } else { 
         reject({msg:'',target:'basicSetting'})
            //reject("error1111");
          
        }
      });
    }); 
  
 

}
const setSetting = (data) => {
  if (typeof data === 'object' && data !== null) {
    state.formData = data
    state.formData.icon = data.icon
  }
}
// 将这个方法暴露出去,这样父组件就可以使用了哈
defineExpose({
  getSetting,
  setSetting
})
// watch(()=>state.initiators,
// {
//   initiators:{
//     handler (val) {
//       state.formData.initiators = val||{}
//     },
//     immediate: true
//   }
// }
// );
</script>
<style lang="scss" scoped>
.icon-item {
  width: 40px;
  height: 40px;
  margin: 6px;
  position: relative;
  cursor: pointer;
  opacity: 0.5;
  &.active {
    opacity: 1;
  }
  &:hover {
    opacity: 1;
  }
}
.setting-container {
  width: 600px;
  height: 100%;
  margin: auto;
  background: #fff;
  padding: 16px;
  & > {
    & > {
      & > .el-form--label-top {
        .el-form-item__label {
          padding-bottom: 0;
        }
      }
    }
  }
}
</style>>

