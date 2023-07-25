<template>
  <div class="personal layout-pd" v-loading="state.loading">
    <el-row>
      
 
      <!-- 更新信息 -->
      <el-col :span="24">
        <el-card shadow="hover" class="mt15 personal-edit" header="工作流设置">
          <el-form ref="formRef" :model="bpmSettingForm" size="default" label-width="120px" class="mt35 mb35"> 
          <div class="personal-edit-title">流水号设置</div>
            <el-row :gutter="35">
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <el-form-item label="模式" prop="referenceNoSetting.type" :rules="[{ required: true, message: '请选择模式', trigger: ['blur', 'change'] }]">
                <el-select v-model="bpmSettingForm.referenceNoSetting.type">
                  <el-option :key="0" :value="0"  label="全局"></el-option>
                  <el-option  :key="1" :value="1" label="按模板" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <el-form-item label="日期格式" prop="referenceNoSetting.dateFormat" :rules="[{ required: true, message: '请输入日期格式', trigger: ['blur', 'change'] }]">
                  <el-input v-model="bpmSettingForm.referenceNoSetting.dateFormat" placeholder="请输入姓名" clearable ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <el-form-item label="长度" prop="referenceNoSetting.length" :rules="[{ required: true, message: '请输入长度', trigger: ['blur', 'change'] }]">
                  <el-input-number min="10" max="20" v-model="bpmSettingForm.referenceNoSetting.length"    ></el-input-number>
                </el-form-item>
              </el-col>
           
            </el-row>

          <div class="personal-edit-title mb15">  异常管理员{{ bpmSettingForm.adminName }} </div>
          
          <el-row :gutter="35">
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-if="!state.loading">
                <el-form-item label="异常管理员" prop="adminId" :rules="[{ required: true, message: '请选择异常管理员', trigger: ['blur', 'change'] }]">
                
                  <my-select-user  v-model="bpmSettingForm.adminId" :name="bpmSettingForm.adminName" placeholder="请选择异常管理员" ></my-select-user>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="16" :lg="18" :xl="20">
                当某个任务没有找到合适的人员来执行（比如：以前设计的人员已离职等），则将该任务发送给异常管理员
              </el-col>
              
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                  <el-popconfirm title="确定要更新信息吗？" hide-icon hide-after="0" width="180" @confirm="onUpdateBasic">
                    <template #reference>
                      <el-button :loading="state.updateLoading" type="primary">
                        <el-icon>
                          <ele-Position />
                        </el-icon>
                        更新
                      </el-button>
                    </template>
                  </el-popconfirm>
                </el-form-item>
              </el-col>
            </el-row>
        </el-form>
          
        </el-card>
      </el-col>
    </el-row>

    <change-password-form ref="changePasswordFormRef" title="修改密码"></change-password-form>
  </div>
</template>

<script setup lang="ts" name="personal">
import { reactive, computed, onMounted, toRefs, ref, getCurrentInstance, defineAsyncComponent } from 'vue' 
import { BpmSettingApi } from '/@/api/bpm/BpmSetting'
import { BPMSettingEntity } from '/@/api/bpm/data-contracts' 


const MySelectUser = defineAsyncComponent(() => import('/@/views/admin/user/components/my-select-user.vue'))
const { proxy } = getCurrentInstance() as any

// 定义变量内容
const state = reactive({
  loading: false,
  updateLoading:false, 
 
  bpmSettingForm: {
    referenceNoSetting:{
      type:0,
    length:10,
    dateFormat:'YYYY'
  },
  adminId:null,
  adminName:'', 
  } 
})

const { bpmSettingForm } = toRefs(state)
const changePasswordFormRef = ref()
const formRef = ref() 
 
   
onMounted(() => {
  initData()
})

// 初始化数据
const initData = async () => {
  state.loading = true
  const res = await new BpmSettingApi().get()
  if (res?.success) {
    state.bpmSettingForm  = res.data  as BPMSettingEntity 
  }
  state.loading = false
}
  

// 更新个人信息
const onUpdateBasic = async () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    state.updateLoading = true
    const res = await new BpmSettingApi().update(state.bpmSettingForm, { showSuccessMessage: true }).catch(() => {
      state.updateLoading = false
    })
    state.updateLoading = false

    if (res?.success) {
      
    }
  })
}

 
</script>

<style scoped lang="scss">
@import '/@/theme/mixins/index.scss';
.personal {
  .personal-user {
    height: 130px;
    display: flex;
    align-items: center;
    .personal-user-left {
      width: 100px;
      height: 130px;
      border-radius: 3px;
      :deep(.el-upload) {
        height: 100%;
      }
      .personal-user-left-upload {
        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
        &:hover {
          img {
            animation: logoAnimation 0.3s ease-in-out;
          }
        }
      }
    }
    .personal-user-right {
      flex: 1;
      padding: 0 15px;
      .personal-title {
        font-size: 18px;
        @include text-ellipsis(1);
      }
      .personal-item {
        display: flex;
        align-items: center;
        font-size: 13px;
        .personal-item-label {
          color: var(--el-text-color-secondary);
          @include text-ellipsis(1);
        }
        .personal-item-value {
          @include text-ellipsis(1);
        }
      }
    }
  }
  .personal-info {
    .personal-info-more {
      float: right;
      color: var(--el-text-color-secondary);
      font-size: 13px;
      &:hover {
        color: var(--el-color-primary);
        cursor: pointer;
      }
    }
    .personal-info-box {
      height: 130px;
      overflow: hidden;
      .personal-info-ul {
        list-style: none;
        .personal-info-li {
          font-size: 13px;
          padding-bottom: 10px;
          .personal-info-li-title {
            display: inline-block;
            @include text-ellipsis(1);
            color: var(--el-text-color-secondary);
            text-decoration: none;
          }
          & a:hover {
            color: var(--el-color-primary);
            cursor: pointer;
          }
        }
      }
    }
  }
  .personal-recommend-row {
    .personal-recommend-col {
      .personal-recommend {
        position: relative;
        height: 100px;
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          i {
            right: 0px !important;
            bottom: 0px !important;
            transition: all ease 0.3s;
          }
        }
        i {
          position: absolute;
          right: -10px;
          bottom: -10px;
          font-size: 70px;
          transform: rotate(-30deg);
          transition: all ease 0.3s;
        }
        .personal-recommend-auto {
          padding: 15px;
          position: absolute;
          left: 0;
          top: 5%;
          color: var(--next-color-white);
          .personal-recommend-msg {
            font-size: 12px;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .personal-edit {
    .personal-edit-title {
      position: relative;
      padding-left: 10px;
      color: var(--el-text-color-regular);
      &::after {
        content: '';
        width: 2px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: var(--el-color-primary);
      }
    }
    .personal-edit-safe-box {
      border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
      padding: 15px 0;
      .personal-edit-safe-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .personal-edit-safe-item-left {
          flex: 1;
          overflow: hidden;
          .personal-edit-safe-item-left-label {
            color: var(--el-text-color-regular);
            margin-bottom: 5px;
          }
          .personal-edit-safe-item-left-value {
            color: var(--el-text-color-secondary);
            @include text-ellipsis(1);
            margin-right: 15px;
          }
        }
      }
      &:last-of-type {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
}
</style>
