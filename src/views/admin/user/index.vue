<template>
  <div style="padding: 0px 0px 8px 8px">
    <el-row :gutter="8" style="width: 100%">
      <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
        <div class="my-flex-column h100">
          <org-menu @node-click="onOrgNodeClick" class="my-flex-fill" select-first-node></org-menu>
        </div>
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="18" :xl="20">
        <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
          <el-form :model="state.filterModel" :inline="true" @submit.stop.prevent>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="state.filterModel.name" placeholder="姓名" @keyup.enter="onQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
              <el-button v-auth="'api:admin:user:add'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card shadow="never" style="margin-top: 8px">
          <el-table v-loading="state.loading" :data="state.userListData" row-key="id" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="120" show-overflow-tooltip>
              <template #default="{ row }"> {{ row.name }} <el-tag v-if="row.isManager" type="success">主管</el-tag> </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="120" show-overflow-tooltip />
            <el-table-column prop="email" label="邮箱" min-width="120" show-overflow-tooltip />
            <el-table-column prop="roleNames" label="角色" min-width="120" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.roleNames ? row.roleNames.join(',') : '' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right" header-align="center" align="center">
              <template #default="{ row }">
                <el-button v-auth="'api:admin:user:update'" icon="ele-EditPen" size="small" text type="primary" @click="onEdit(row)">编辑</el-button>
                <my-dropdown-more v-auths="['api:admin:user:set-manager', 'api:admin:user:reset-password', 'api:admin:user:delete']">
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item v-if="auth('api:admin:user:set-manager')" @click="onSetManager(row)"
                        >{{ row.isManager ? '取消' : '设置' }}主管</el-dropdown-item
                      >
                      <el-dropdown-item v-if="auth('api:admin:user:reset-password')" @click="onResetPwd(row)">重置密码</el-dropdown-item>
                      <el-dropdown-item v-if="auth('api:admin:user:delete')" @click="onDelete(row)">删除用户</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </my-dropdown-more>
              </template>
            </el-table-column>
          </el-table>
          <div class="my-flex my-flex-end" style="margin-top: 20px">
            <el-pagination
              v-model:currentPage="state.pageInput.currentPage"
              v-model:page-size="state.pageInput.pageSize"
              :total="state.total"
              :page-sizes="[10, 20, 50, 100]"
              small
              background
              @size-change="onSizeChange"
              @current-change="onCurrentChange"
              layout="total, sizes, prev, pager, next, jumper"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <user-form ref="userFormRef" :title="state.userFormTitle"></user-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, defineAsyncComponent } from 'vue'
import { UserGetPageOutput, PageInputUserGetPageDto, OrgListOutput, UserSetManagerInput, UserResetPasswordInput } from '/@/api/admin/data-contracts'
import { UserApi } from '/@/api/admin/User'
import eventBus from '/@/utils/mitt'
import { auth } from '/@/utils/authFunction'

// 引入组件
const UserForm = defineAsyncComponent(() => import('./components/user-form.vue'))
const OrgMenu = defineAsyncComponent(() => import('/@/views/admin/org/components/org-menu.vue'))
const MyDropdownMore = defineAsyncComponent(() => import('/@/components/my-dropdown-more/index.vue'))

const { proxy } = getCurrentInstance() as any

const userFormRef = ref()

const state = reactive({
  loading: false,
  userFormTitle: '',
  filterModel: {
    name: '',
  },
  total: 0,
  pageInput: {
    currentPage: 1,
    pageSize: 20,
    filter: {
      orgId: null,
    },
  } as PageInputUserGetPageDto,
  userListData: [] as Array<UserGetPageOutput>,
})

onMounted(() => {
  eventBus.on('refreshUser', async () => {
    onQuery()
  })
})

onUnmounted(() => {
  eventBus.off('refreshUser')
})

const onQuery = async () => {
  state.loading = true
  const res = await new UserApi().getPage(state.pageInput)

  state.userListData = res?.data?.list ?? []
  state.total = res.data?.total ?? 0
  state.loading = false
}

const onAdd = () => {
  state.userFormTitle = '新增用户'
  userFormRef.value.open()
}

const onEdit = (row: UserGetPageOutput) => {
  state.userFormTitle = '编辑用户'
  userFormRef.value.open(row)
}

const onDelete = (row: UserGetPageOutput) => {
  proxy.$modal
    .confirmDelete(`确定要删除【${row.name}】?`)
    .then(async () => {
      await new UserApi().delete({ id: row.id }, { loading: true, showSuccessMessage: true })
      onQuery()
    })
    .catch(() => {})
}

const onResetPwd = (row: UserGetPageOutput) => {
  proxy.$modal
    .prompt(`确定要给【${row.name}】重置密码?`, { inputPlaceholder: '选填，不填则使用系统默认密码', autofocus: false })
    .then(async ({ value }: { value: string }) => {
      const res = await new UserApi().resetPassword({ id: row.id, password: value } as UserResetPasswordInput, { loading: true })
      if (res?.success) {
        proxy.$modal.msgSuccess(`重置密码成功，密码为：${res.data}`)
      }
      onQuery()
    })
    .catch(() => {})
}

const onSetManager = (row: UserGetPageOutput) => {
  if (!((state.pageInput.filter?.orgId as number) > 0)) {
    proxy.$modal.msgWarning('请选择部门')
    return
  }

  const title = row.isManager ? `确定要取消【${row.name}】的主管?` : `确定要设置【${row.name}】为主管?`
  proxy.$modal
    .confirm(title)
    .then(async () => {
      const input = { userId: row.id, orgId: state.pageInput.filter?.orgId, isManager: !row.isManager } as UserSetManagerInput
      await new UserApi().setManager(input, { loading: true, showSuccessMessage: true })
      onQuery()
    })
    .catch(() => {})
}

const onSizeChange = (val: number) => {
  state.pageInput.pageSize = val
  onQuery()
}

const onCurrentChange = (val: number) => {
  state.pageInput.currentPage = val
  onQuery()
}

const onOrgNodeClick = (node: OrgListOutput | null) => {
  if (state.pageInput.filter) {
    state.pageInput.filter.orgId = node?.id
  }
  onQuery()
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin/user',
})
</script>

<style scoped lang="scss"></style>
