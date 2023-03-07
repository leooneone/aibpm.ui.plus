<template>
  <div style="padding: 0px 0px 8px 8px">
    <el-row :gutter="8" style="width: 100%">
      <el-col :span="24" :xs="24">
        <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
          <el-form :model="state.filterModel" :inline="true" @submit.stop.prevent>
            <el-form-item label="接口名称" prop="name">
              <el-input v-model="state.filterModel.name" placeholder="接口名称" @keyup.enter="onQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
              <el-button v-auth="'api:admin:api:add'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
              <el-popconfirm title="确定要同步接口" hide-icon width="180" hide-after="0" @confirm="onSync">
                <template #reference>
                  <el-button v-auth="'api:admin:api:sync'" :loading="state.syncLoading" type="primary" icon="ele-Refresh"> 同步 </el-button>
                </template>
              </el-popconfirm>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card shadow="never" style="margin-top: 8px">
          <el-table
            :data="state.apiTreeData"
            style="width: 100%"
            v-loading="state.loading"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :expand-row-keys="state.expandRowKeys"
          >
            <el-table-column prop="label" label="接口名称" min-width="120" show-overflow-tooltip />
            <el-table-column prop="path" label="接口地址" min-width="120" show-overflow-tooltip />
            <el-table-column prop="description" label="接口描述" min-width="120" show-overflow-tooltip />
            <el-table-column label="状态" width="80" align="center" show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag type="success" v-if="row.enabled">启用</el-tag>
                <el-tag type="danger" v-else>禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right" header-align="center" align="center">
              <template #default="{ row }">
                <el-button v-auth="'api:admin:api:update'" icon="ele-EditPen" size="small" text type="primary" @click="onEdit(row)">编辑</el-button>
                <el-button v-auth="'api:admin:api:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <api-form ref="apiFormRef" :title="state.apiFormTitle" :api-tree-data="state.formApiTreeData"></api-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, defineAsyncComponent } from 'vue'
import { ApiListOutput } from '/@/api/admin/data-contracts'
import { ApiApi } from '/@/api/admin/Api'
import { ApiApi as ApiExtApi } from '/@/api/admin.extend/Api'
import { listToTree, treeToList } from '/@/utils/tree'
import { cloneDeep, isArray } from 'lodash-es'
import eventBus from '/@/utils/mitt'

// 引入组件
const ApiForm = defineAsyncComponent(() => import('./components/api-form.vue'))

const { proxy } = getCurrentInstance() as any

const apiFormRef = ref()

const state = reactive({
  loading: false,
  syncLoading: false,
  apiFormTitle: '',
  filterModel: {
    name: '',
  },
  apiTreeData: [] as Array<ApiListOutput>,
  formApiTreeData: [] as Array<ApiListOutput>,
  expandRowKeys: [] as string[],
})

onMounted(async () => {
  await onQuery()
  state.expandRowKeys = treeToList(cloneDeep(state.apiTreeData))
    .filter((a: ApiListOutput) => a.parentId === 0)
    .map((a: ApiListOutput) => a.id + '') as string[]
  eventBus.on('refreshApi', async () => {
    onQuery()
  })
})

onUnmounted(() => {
  eventBus.off('refreshApi')
})

const onQuery = async () => {
  state.loading = true
  const res = await new ApiApi().getList()
  if (res.data && res.data.length > 0) {
    state.apiTreeData = listToTree(cloneDeep(res.data))
    state.formApiTreeData = listToTree(res.data.filter((a) => a.parentId === 0))
  } else {
    state.apiTreeData = []
    state.formApiTreeData = []
  }
  state.loading = false
}

const onAdd = () => {
  state.apiFormTitle = '新增接口'
  apiFormRef.value.open()
}

const onEdit = (row: ApiListOutput) => {
  state.apiFormTitle = '编辑接口'
  apiFormRef.value.open(row)
}

const onDelete = (row: ApiListOutput) => {
  proxy.$modal
    .confirmDelete(`确定要删除接口【${row.label}】?`, { type: 'info' })
    .then(async () => {
      await new ApiApi().delete({ id: row.id }, { loading: true })
      onQuery()
    })
    .catch(() => {})
}

const syncApi = async (swaggerResource: any) => {
  const res = await new ApiExtApi().getSwaggerJson(swaggerResource.url, { showErrorMessage: false })
  if (!res) {
    return
  }

  const tags = res.tags
  const paths = res.paths
  const apis = []
  const urls = swaggerResource.url.split('/')
  const code = urls.length >= 2 ? urls[urls.length - 2] : ''
  if (code === '') {
    return
  }
  apis[apis.length] = {
    label: swaggerResource.name,
    path: code,
  }
  // tags
  if (tags && tags.length > 0) {
    tags.forEach((t: any) => {
      apis[apis.length] = {
        label: t.description,
        path: t.name,
        parentPath: code,
      }
    })
  }
  // paths
  if (paths) {
    for (const [key, value] of Object.entries(paths)) {
      const keys = Object.keys(value as any)
      const values = Object.values(value as any)
      const v = values && values.length > 0 ? values[0] : ({} as any)
      const parentPath = v.tags && v.tags.length > 0 ? v.tags[0] : ''
      apis[apis.length] = {
        label: v.summary,
        path: key,
        parentPath,
        httpMethods: keys.join(','),
      }
    }
  }

  return await new ApiApi().sync({ apis })
}

const onSync = () => {
  state.syncLoading = true
  const swaggerResources = ['/swagger-resources']
  const lastSwaggerResourcesIndex = swaggerResources.length - 1
  swaggerResources.forEach(async (swaggerResource, swaggerResourcesIndex) => {
    const resSwaggerResources = await new ApiExtApi().getSwaggerResources(swaggerResource, { showErrorMessage: false }).catch(() => {
      state.syncLoading = false
    })
    if (isArray(resSwaggerResources) && (resSwaggerResources?.length as number) > 0) {
      for (let index = 0, len = resSwaggerResources.length, last = len - 1; index < len; index++) {
        const swaggerResource = resSwaggerResources[index]
        const resSyncApi = await syncApi(swaggerResource).catch(() => {
          proxy.$modal.msgSuccess(`同步${swaggerResource.name}失败`)
        })
      }
    }

    if (swaggerResourcesIndex === lastSwaggerResourcesIndex) {
      state.syncLoading = false
      proxy.$modal.msgSuccess(`同步完成`)
      onQuery()
    }
  })
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin/api',
})
</script>

<style scoped lang="scss"></style>
