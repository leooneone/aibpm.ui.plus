<template>
  <div style="padding: 0px 0px 8px 8px">
    <el-row :gutter="8" style="width: 100%">
      <el-col :span="24" :xs="24">
        <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
          <el-form :model="state.filterModel" :inline="true" @submit.stop.prevent>
            <el-form-item label="视图名称" prop="name">
              <el-input v-model="state.filterModel.name" placeholder="视图名称" @keyup.enter="onQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
              <el-button v-auth="'api:admin:view:add'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card shadow="never" style="margin-top: 8px">
          <el-table
            :data="state.viewTreeData"
            style="width: 100%"
            v-loading="state.loading"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="label" label="视图名称" min-width="120" show-overflow-tooltip />
            <el-table-column prop="name" label="视图命名" min-width="120" show-overflow-tooltip />
            <el-table-column prop="path" label="视图地址" min-width="120" show-overflow-tooltip />
            <el-table-column prop="sort" label="排序" width="80" align="center" show-overflow-tooltip />
            <!-- <el-table-column prop="description" label="视图描述" min-width="120" show-overflow-tooltip /> -->
            <el-table-column label="状态" width="80" align="center" show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag type="success" v-if="row.enabled">启用</el-tag>
                <el-tag type="danger" v-else>禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right" header-align="center" align="center">
              <template #default="{ row }">
                <el-button v-auth="'api:admin:view:update'" icon="ele-EditPen" size="small" text type="primary" @click="onEdit(row)">编辑</el-button>
                <el-button v-auth="'api:admin:view:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <view-form ref="viewFormRef" :title="state.viewFormTitle" :view-tree-data="state.viewTreeData"></view-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, defineAsyncComponent } from 'vue'
import { ViewListOutput } from '/@/api/admin/data-contracts'
import { ViewApi } from '/@/api/admin/View'
import { listToTree } from '/@/utils/tree'
import { cloneDeep } from 'lodash-es'
import eventBus from '/@/utils/mitt'

// 引入组件
const ViewForm = defineAsyncComponent(() => import('./components/view-form.vue'))

const viewFormRef = ref()
const { proxy } = getCurrentInstance() as any

const state = reactive({
  loading: false,
  viewFormTitle: '',
  filterModel: {
    name: '',
  },
  viewTreeData: [] as Array<ViewListOutput>,
  formViewTreeData: [] as Array<ViewListOutput>,
})

onMounted(() => {
  onQuery()
  eventBus.on('refreshView', async () => {
    onQuery()
  })
})

onUnmounted(() => {
  eventBus.off('refreshView')
})

const onQuery = async () => {
  state.loading = true
  const res = await new ViewApi().getList()
  if (res.data && res.data.length > 0) {
    state.viewTreeData = listToTree(cloneDeep(res.data))
  } else {
    state.viewTreeData = []
    state.formViewTreeData = []
  }
  state.loading = false
}

const onAdd = () => {
  state.viewFormTitle = '新增视图'
  viewFormRef.value.open()
}

const onEdit = (row: ViewListOutput) => {
  state.viewFormTitle = '编辑视图'
  viewFormRef.value.open(row)
}

const onDelete = (row: ViewListOutput) => {
  proxy.$modal
    .confirmDelete(`确定要删除视图【${row.label}】?`)
    .then(async () => {
      await new ViewApi().delete({ id: row.id }, { loading: true })
      onQuery()
    })
    .catch(() => {})
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin/view',
})
</script>

<style scoped lang="scss"></style>
