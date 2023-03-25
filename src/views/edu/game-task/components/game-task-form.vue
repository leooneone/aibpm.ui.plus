<template>user
  <div>
    <el-dialog v-model="state.showDialog" destroy-on-close :title="title" draggable width="769px">
      <el-form ref="formRef" :model="form" size="default" label-width="80px">
        <el-row :gutter="35">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="问题" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }]">
              <AudioInput v-model="form.question" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="答案" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }]">
              <AudioInput v-model="form.answer" autocomplete="off" />
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
import { reactive, toRefs, getCurrentInstance, ref, watch, defineAsyncComponent } from 'vue'
import { gameTaskAddInput, gameTaskUpdateInput, OrgListOutput, RoleGetListOutput } from '/@/api/edu/data-contracts'
import { GameTaskApi } from '/@/api/edu/GameTask'
import { listToTree, treeToList } from '/@/utils/tree'
import { cloneDeep } from 'lodash-es'
import { testMobile, testEmail } from '/@/utils/test'
import eventBus from '/@/utils/mitt'

// 引入组件 

defineProps({
  title: {
    type: String,
    default: '',
  },
})

const { proxy } = getCurrentInstance() as any

const orgTreeSelectRef = ref()
const formRef = ref()
const state = reactive({
  showDialog: false,
  sureLoading: false,
  form: {
    orgIds: [] as any,
    roleIds: [] as any,
  } as gameTaskAddInput & gameTaskUpdateInput,
  orgs: [] as any,
  orgTreeData: [] as OrgListOutput[],
  roleTreeData: [] as RoleGetListOutput[],
})
const { form } = toRefs(state)

watch(
  () => state.form.orgIds,
  (value) => {
    if (value && value.length > 0) {
      let orgs = [] as any
      treeToList(cloneDeep(state.orgTreeData)).forEach((a: any) => {
        if (value.some((b) => a.id === b)) {
          orgs.push(a)
        }
      })
      state.orgs = orgs
    } else {
      state.orgs = []
    }
  },
  {
    immediate: true,
  }
)

watch(
  () => state.orgs,
  () => {
    if (state.orgs?.some((a: any) => a.id === state.form.orgId)) {
      return
    }
    state.form.orgId = state.orgs && state.orgs.length > 0 ? state.orgs[0].id : undefined
  },
  {
    immediate: true,
    deep: true,
  }
)
 
 

// 打开对话框
const open = async (row: any = {}) => {
  proxy.$modal.loading()
 

  if (row.id > 0) {
    const res = await new GameTaskApi().get({ id: row.id }).catch(() => {
      proxy.$modal.closeLoading()
    })

    if (res?.success) {
      state.form = res.data as gameTaskAddInput & gameTaskUpdateInput
    }
  } else {
    state.form = {
      orgIds: [] as any,
      roleIds: [] as any,
      staff: {},
    } as gameTaskAddInput & gameTaskUpdateInput
  }

  proxy.$modal.closeLoading()
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
      res = await new GameTaskApi().update(state.form, { showSuccessMessage: true }).catch(() => {
        state.sureLoading = false
      })
    } else {
      res = await new GameTaskApi().add(state.form, { showSuccessMessage: true }).catch(() => {
        state.sureLoading = false
      })
    }
    state.sureLoading = false

    if (res?.success) {
      eventBus.emit('refreshgameTask')
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
  name: 'admin/game-task/form',
})
</script>
