<template>
  <div>
    <el-dialog v-model="state.showDialog" destroy-on-close :title="title" draggable width="600px">
      <el-form :model="form" ref="formRef" size="default" label-width="80px">
        <el-row :gutter="35">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="上级组织">
              <el-tree-select
                v-model="form.parentId"
                :data="orgTreeData"
                node-key="id"
                :props="{ label: 'name' }"
                check-strictly
                default-expand-all
                render-after-expand
                fit-input-width
                clearable
                class="w100"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="组织名称" prop="name" :rules="[{ required: true, message: '请输入组织名称', trigger: ['blur', 'change'] }]">
              <el-input v-model="form.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="组织编码" prop="code">
              <el-input v-model="form.code" clearable />
            </el-form-item>
          </el-col>
          <!--<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="组织值" prop="value">
              <el-input v-model="form.value" clearable />
            </el-form-item>
          </el-col>-->

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="组织类型" prop="type"> 

              <el-select v-model="form.type" placeholder="请选择组织类型" clearable :style="{ width: '100%' }">
          <el-option v-for="(item, index) in ou_type" :key="index" :label="item.label" :value="parseInt(item.value)" :disabled="item.disabled"></el-option>
        </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="主管" prop="directorId">
              <my-select-user v-model="form.directorId" :name="form.directorName" clearable></my-select-user>
            </el-form-item>
          </el-col>
           
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="启用">
              <el-switch v-model="form.enabled" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="说明">
              <el-input v-model="form.description" clearable type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel" size="default">取 消</el-button>
          <el-button type="primary" @click="onSure" size="default" :loading="state.sureLoading">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, PropType, getCurrentInstance, defineAsyncComponent } from 'vue'
import { OrgListOutput, OrgUpdateInput } from '/@/api/admin/data-contracts'
import { OrgApi } from '/@/api/admin/Org'
import eventBus from '/@/utils/mitt'

// 引入组件
const MySelectUser = defineAsyncComponent(() => import('../../user/components/my-select-user.vue'))
defineProps({
  title: {
    type: String,
    default: '',
  },
  orgTreeData: {
    type: Array as PropType<OrgListOutput[]>,
    default: () => [],
  },
})

const { proxy } = getCurrentInstance();
const {   ou_type  } = proxy.$dict("ou-type"); 
const formRef = ref()
const state = reactive({
  showDialog: false,
  sureLoading: false,
  form: {
    enabled: true,
  } as OrgUpdateInput,
})

const { form } = toRefs(state)

// 打开对话框
const open = async (row: any = {}) => {
  if (row.id > 0) {
    const res = await new OrgApi().get({ id: row.id }, { loading: true })

    if (res?.success) {
      let formData = res.data as OrgUpdateInput
      formData.parentId = formData.parentId && formData.parentId > 0 ? formData.parentId : undefined
      state.form = formData
    }
  } else {
    state.form = {
      enabled: true,
    } as OrgUpdateInput
  }
  state.showDialog = true
}
// 取消
const onCancel = () => {
  state.showDialog = false
}

// 确定
const onSure = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    state.sureLoading = true
    let res = {} as any
    state.form.parentId = state.form.parentId && state.form.parentId > 0 ? state.form.parentId : undefined
    if (state.form.id != undefined && state.form.id > 0) {
      res = await new OrgApi().update(state.form, { showSuccessMessage: true })
    } else {
      res = await new OrgApi().add(state.form, { showSuccessMessage: true })
    }

    state.sureLoading = false

    if (res?.success) {
      eventBus.emit('refreshOrg')
      state.showDialog = false
    }
  })
}

defineExpose({
  open,
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin/org/form',
})
</script>
