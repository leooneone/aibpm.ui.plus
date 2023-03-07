<template>
  <div>
    <el-dialog v-model="state.showDialog" destroy-on-close :title="title" draggable width="769px">
      <el-form ref="formRef" :model="form" size="default" label-width="80px">
        <el-row :gutter="35">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '请输入企业名称', trigger: ['blur', 'change'] }]">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="编码" prop="code" :rules="[{ required: true, message: '请输入企业编码', trigger: ['blur', 'change'] }]">
              <el-input v-model="form.code" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="值" prop="value" :rules="[{ required: true, message: '请输入企业编码', trigger: ['blur', 'change'] }]">
              <el-input v-model="form.value" autocomplete="off" />
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
import { reactive, toRefs, getCurrentInstance, ref } from 'vue'
import { DictionaryAddInput, DictionaryUpdateInput } from '/@/api/admin/data-contracts'
import { DictionaryApi } from '/@/api/admin/Dictionary'
import eventBus from '/@/utils/mitt'

defineProps({
  title: {
    type: String,
    default: '',
  },
})

const { proxy } = getCurrentInstance() as any

const formRef = ref()
const state = reactive({
  showDialog: false,
  sureLoading: false,
  form: {} as DictionaryAddInput & DictionaryUpdateInput,
})
const { form } = toRefs(state)

// 打开对话框
const open = async (row: any = {}) => {
  if (row.id > 0) {
    const res = await new DictionaryApi().get({ id: row.id }, { loading: true }).catch(() => {
      proxy.$modal.closeLoading()
    })

    if (res?.success) {
      state.form = res.data as DictionaryAddInput & DictionaryUpdateInput
    }
  } else {
    state.form = { dictionaryTypeId: row.dictionaryTypeId } as DictionaryAddInput & DictionaryUpdateInput
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
    if (state.form.id != undefined && state.form.id > 0) {
      res = await new DictionaryApi().update(state.form, { showSuccessMessage: true }).catch(() => {
        state.sureLoading = false
      })
    } else {
      res = await new DictionaryApi().add(state.form, { showSuccessMessage: true }).catch(() => {
        state.sureLoading = false
      })
    }
    state.sureLoading = false

    if (res?.success) {
      eventBus.emit('refreshDict')
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
  name: 'bpm/dictionary/form',
})
</script>
