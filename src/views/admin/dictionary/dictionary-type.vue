<template>
  <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
    <el-form :model="state.filterModel" :inline="true">
      <el-form-item prop="name">
        <el-input v-model="state.filterModel.name" placeholder="名称或编码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
        <el-button  v-auth="'api:admin:dictionary:add'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card shadow="never" style="margin-top: 8px">
    <el-table
      ref="tableRef"
      v-loading="state.loading"
      :data="state.dictionaryTypeListData"
      row-key="id"
      highlight-current-row
      style="width: 100%"
      @current-change="onTableCurrentChange"
    >
      <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip />
      <el-table-column prop="code" label="编码" width="80" show-overflow-tooltip />
      <el-table-column label="状态" width="80" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag type="success" v-if="row.enabled">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right" header-align="center" align="center">
        <template #default="{ row }">
          <el-button v-auth="'api:admin:dictionary:update'" icon="ele-EditPen" size="small" text type="primary" @click="onEdit(row)">编辑</el-button>
          <el-button v-auth="'api:admin:dictionary:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
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

  <dictionary-type-form ref="dictionaryTypeFormRef" :title="state.dictionaryTypeFormTitle"></dictionary-type-form>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, nextTick, defineAsyncComponent } from 'vue'
import { DictionaryTypeListOutput, PageInputDictionaryTypeGetPageDto } from '/@/api/admin/data-contracts'
import { DictionaryTypeApi } from '/@/api/admin/DictionaryType'
import eventBus from '/@/utils/mitt'

// 引入组件
const DictionaryTypeForm = defineAsyncComponent(() => import('./components/dictionary-type-form.vue'))

const { proxy } = getCurrentInstance() as any

const tableRef = ref()
const dictionaryTypeFormRef = ref()

const state = reactive({
  loading: false,
  dictionaryTypeFormTitle: '',
  filterModel: {
    name: '',
  },
  total: 0,
  pageInput: {
    currentPage: 1,
    pageSize: 20,
  } as PageInputDictionaryTypeGetPageDto,
  dictionaryTypeListData: [] as Array<DictionaryTypeListOutput>,
})

onMounted(() => {
  onQuery()
  eventBus.on('refreshDictType', () => {
    onQuery()
  })
})

onUnmounted(() => {
  eventBus.off('refreshDictType')
})

const onQuery = async () => {
  state.loading = true
  state.pageInput.filter = state.filterModel
  const res = await new DictionaryTypeApi().getPage(state.pageInput)
  state.dictionaryTypeListData = res?.data?.list ?? []
  state.total = res.data?.total ?? 0
  if (state.dictionaryTypeListData.length > 0) {
    nextTick(() => {
      tableRef.value!.setCurrentRow(state.dictionaryTypeListData[0])
    })
  }
  state.loading = false
}

const onAdd = () => {
  state.dictionaryTypeFormTitle = '新增字典分类'
  dictionaryTypeFormRef.value.open()
}

const onEdit = (row: DictionaryTypeListOutput) => {
  state.dictionaryTypeFormTitle = '编辑字典分类'
  dictionaryTypeFormRef.value.open(row)
}

const onDelete = (row: DictionaryTypeListOutput) => {
  proxy.$modal
    .confirmDelete(`确定要删除【${row.name}】?`)
    .then(async () => {
      await new DictionaryTypeApi().delete({ id: row.id }, { loading: true, showSuccessMessage: true })
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

const onTableCurrentChange = (currentRow: DictionaryTypeListOutput) => {
  eventBus.emit('refreshDict', currentRow)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'bpm/dictType',
})
</script>

<style scoped lang="scss"></style>
