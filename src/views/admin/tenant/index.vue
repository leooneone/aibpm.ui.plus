<template>
  <div style="padding: 0px 0px 8px 8px">
    <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
      <el-form :model="state.filterModel" :inline="true" @submit.stop.prevent>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="state.filterModel.name" placeholder="姓名" @keyup.enter="onQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
          <el-button v-auth="'api:admin:tenant:add'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" style="margin-top: 8px">
      <el-table v-loading="state.loading" :data="state.tenantListData" row-key="id" style="width: 100%">
        <el-table-column prop="name" label="企业名称" min-width="120" show-overflow-tooltip />
        <el-table-column prop="code" label="企业编码" width="120" show-overflow-tooltip />
        <el-table-column prop="realName" label="姓名" width="120" show-overflow-tooltip />
        <el-table-column prop="phone" label="手机号" width="120" show-overflow-tooltip />
        <el-table-column prop="email" label="邮箱" min-width="120" show-overflow-tooltip />
        <el-table-column label="操作" width="160" fixed="right" header-align="center" align="center">
          <template #default="{ row }">
            <el-button v-auth="'api:admin:tenant:update'" icon="ele-EditPen" size="small" text type="primary" @click="onEdit(row)">编辑</el-button>
            <my-dropdown-more v-auths="['api:admin:permission:assign', 'api:admin:tenant:delete']">
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="auth('api:admin:permission:assign')" @click="onSetTenantMenu(row)">菜单权限</el-dropdown-item>
                  <el-dropdown-item v-if="auth('api:admin:tenant:delete')" @click="onDelete(row)">删除租户</el-dropdown-item>
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

    <tenant-form ref="tenantFormRef" :title="state.tenantFormTitle"></tenant-form>
    <set-tenant-menu ref="setTenantMenuRef"></set-tenant-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, defineAsyncComponent } from 'vue'
import { TenantListOutput, PageInputTenantGetPageDto } from '/@/api/admin/data-contracts'
import { TenantApi } from '/@/api/admin/Tenant'
import eventBus from '/@/utils/mitt'
import { auth } from '/@/utils/authFunction'

// 引入组件
const TenantForm = defineAsyncComponent(() => import('./components/tenant-form.vue'))
const MyDropdownMore = defineAsyncComponent(() => import('/@/components/my-dropdown-more/index.vue'))
const SetTenantMenu = defineAsyncComponent(() => import('./components/set-tenant-menu.vue'))

const { proxy } = getCurrentInstance() as any

const tenantFormRef = ref()
const setTenantMenuRef = ref()

const state = reactive({
  loading: false,
  tenantFormTitle: '',
  filterModel: {
    name: '',
  },
  total: 0,
  pageInput: {
    currentPage: 1,
    pageSize: 20,
  } as PageInputTenantGetPageDto,
  tenantListData: [] as Array<TenantListOutput>,
})

onMounted(() => {
  onQuery()
  eventBus.on('refreshTenant', async () => {
    onQuery()
  })
})

onUnmounted(() => {
  eventBus.off('refreshTenant')
})

const onQuery = async () => {
  state.loading = true
  const res = await new TenantApi().getPage(state.pageInput)

  state.tenantListData = res?.data?.list ?? []
  state.total = res.data?.total ?? 0
  state.loading = false
}

const onAdd = () => {
  state.tenantFormTitle = '新增租户'
  tenantFormRef.value.open()
}

const onEdit = (row: TenantListOutput) => {
  state.tenantFormTitle = '编辑租户'
  tenantFormRef.value.open(row)
}

const onDelete = (row: TenantListOutput) => {
  proxy.$modal
    .confirmDelete(`确定要删除【${row.name}】?`)
    .then(async () => {
      await new TenantApi().delete({ id: row.id }, { loading: true, showSuccessMessage: true })
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

const onSetTenantMenu = (tenant: TenantListOutput) => {
  if (!((tenant?.id as number) > 0)) {
    proxy.$modal.msgWarning('请选择租户')
    return
  }
  setTenantMenuRef.value.open(tenant)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin/tenant',
})
</script>

<style scoped lang="scss"></style>
