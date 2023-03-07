<template>
  <div style="padding: 0px 0px 8px 8px">
    <el-row :gutter="8" style="width: 100%">
      <el-col :span="24" :xs="24">
        <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
          <el-form :model="state.filterModel" :inline="true" @submit.stop.prevent>
            <el-form-item label="组织名称" prop="name">
              <el-input v-model="state.filterModel.name" placeholder="组织名称" @keyup.enter="onQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
              <el-button v-auth="'api:admin:org:add'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card shadow="never" style="margin-top: 8px">
          <el-table
            :data="state.orgTreeData"
            style="width: 100%"
            v-loading="state.loading"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="name" label="组织名称" min-width="120" show-overflow-tooltip />
            <el-table-column prop="code" label="组织编码" min-width="120" show-overflow-tooltip />
            <el-table-column prop="value" label="组织类型" min-width="80" show-overflow-tooltip >
              <template #default="{row}">
              {{ dic_ou_type[row.type] }}
              </template>

              </el-table-column>
            <el-table-column prop="sort" label="排序" width="80" align="center" show-overflow-tooltip />
            <el-table-column label="状态" width="80" align="center" show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag type="success" v-if="row.enabled">启用</el-tag>
                <el-tag type="danger" v-else>禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right" header-align="center" align="center">
              <template #default="{ row }">
                <el-button v-auth="'api:admin:org:update'" icon="ele-EditPen" size="small" text type="primary" @click="onEdit(row)">编辑</el-button>
                <el-button v-auth="'api:admin:org:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <org-form ref="orgFormRef" :title="state.orgFormTitle" :org-tree-data="state.orgTreeData"></org-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, defineAsyncComponent } from 'vue'
import { OrgListOutput } from '/@/api/admin/data-contracts'
import { OrgApi } from '/@/api/admin/Org'
import { listToTree } from '/@/utils/tree'
import eventBus from '/@/utils/mitt' 
// 引入组件
const OrgForm = defineAsyncComponent(() => import('./components/org-form.vue'))

const { proxy } = getCurrentInstance() as any

const {   dic_ou_type  } = proxy.$dict("ou-type"); 
const orgFormRef = ref()

const state = reactive({
  loading: false,
  orgFormTitle: '',
  filterModel: {
    name: '',
  },
  orgTreeData: [] as Array<OrgListOutput>,
})

onMounted(() => {
  onQuery()
  eventBus.on('refreshOrg', () => {
    onQuery()
  })
})

onUnmounted(() => {
  eventBus.off('refreshOrg')
})

const onQuery = async () => {
  state.loading = true
  const res = await new OrgApi().getList()
  if (res.data && res.data.length > 0) {
    state.orgTreeData = listToTree(res.data)
  } else {
    state.orgTreeData = []
  }
  state.loading = false
}

const onAdd = () => {
  state.orgFormTitle = '新增组织'
  orgFormRef.value.open()
}

const onEdit = (row: OrgListOutput) => {
  state.orgFormTitle = '编辑组织'
  orgFormRef.value.open(row)
}

const onDelete = (row: OrgListOutput) => {
  proxy.$modal
    .confirmDelete(`确定要删除组织【${row.name}】?`)
    .then(async () => {
      await new OrgApi().delete({ id: row.id }, { loading: true })
      onQuery()
    })
    .catch(() => {})
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin/org',
})
</script>

<style scoped lang="scss"></style>
