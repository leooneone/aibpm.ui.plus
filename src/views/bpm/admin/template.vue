<template>
  <div style="padding: 0px 0px 8px 8px">
    <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
      <el-form :model="state.filterModel" :inline="true">
        <el-form-item prop="name">
          <el-input v-model="state.filterModel.name" placeholder="模板名称" /> </el-form-item
        ><el-form-item prop="name">
          <el-select v-model="state.filterModel.states" clearable multiple collapse-tags collapse-tags-tooltip>
            <el-option v-for="(value, name) in nvTemplateState" :key="value" :label="name" :value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
          <el-button type="success" icon="ele-Plus"  v-auth="'api:bpm:template:control'" @click="newBPM"> 新增 </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" style="margin-top: 8px">
      <el-table v-loading="state.loading" :data="state.listData" row-key="id" style="width: 100%" border>
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="name" label="模板名称" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">
            <el-link @click="open(row)">{{ row.name }}</el-link>
          </template>
        </el-table-column>

        <el-table-column prop="groupId" label="流程分组" show-overflow-tooltip width="120">
          <template #default="{ row }">
            {{ dic_bpm_group[row.groupId] }}
          </template>
        </el-table-column>
        <el-table-column prop="version" width="60" label="版本" />
        <el-table-column prop="state" label="模板状态" width="100">
          <template #default="{ row }">
            <el-tag type="primary" disable-transitions> {{ vnTemplateState[row.state] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="创建人" show-overflow-tooltip width="120" />
        <el-table-column prop="createdTime" label="创建时间" :formatter="formatterTime" width="180" />
        <el-table-column label="操作" width="180" fixed="right" header-align="center" align="center">
          <template #default="{ row }">
            <el-button icon="ele-CaretRight" size="small" text type="primary" @click="open(row)">进入</el-button>
            <el-button v-auth="'api:bpm:template:control'" icon="ele-EditPen" size="small" text type="primary" @click="onEdit(row)">编辑</el-button>
            <el-button v-auth="'api:bpm:template:control'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue'
import {
  ResultOutputPageOutputWorkflowTemplateListOutput,
  PageInputWorkflowTemplateEntity,
  vnTemplateState,
  nvTemplateState,
  vnDisplayType,
} from '/@/api/bpm/data-contracts'
import { WorkflowTemplateApi as TPLApi } from '/@/api/bpm/WorkflowTemplate'
import dayjs from 'dayjs'
const Iframes = defineAsyncComponent(() => import('/@/layout/routerView/iframes.vue'))

// 引入组件
const { proxy } = getCurrentInstance() as any

const { dic_bpm_group } = proxy.$dict('bpm-group')
const state = reactive({
  loading: false,
  filterModel: {
    name: '',
    states: ['0', '1'],
  },
  total: 0,
  pageInput: {
    currentPage: 1,
    pageSize: 10,
  } as PageInputWorkflowTemplateEntity,
  listData: [] as Array<ResultOutputPageOutputWorkflowTemplateListOutput>,
})
onMounted(() => {
  onQuery()
})

const onOpenDiagram = (url) => {
  var border = 0
  var iframe = document.createElement('iframe')
  iframe.style.zIndex = '9999'
  iframe.style.position = 'absolute'
  iframe.style.top = border + 'px'
  iframe.style.left = border + 'px'

  if (border === 0) {
    iframe.setAttribute('frameborder', '0')
  }

  var resize = function () {
    iframe.setAttribute('width', document.body.clientWidth - 2 * border)
    iframe.setAttribute('height', document.body.clientHeight - 2 * border)
  }

  window.addEventListener('resize', resize)
  resize()
  var receive = function (evt) {
    if (evt.data === 'close') {
      window.removeEventListener('resize', resize)
      window.removeEventListener('message', receive)
      document.body.removeChild(iframe)
    }
  }

  window.addEventListener('message', receive)
  iframe.setAttribute('src', url)
  document.body.appendChild(iframe)
}
const open = (row) => {
  const url = '/bpm/designer?id=' + row.id

  onOpenDiagram(url)
  // window.open(url)
}
const newBPM = () => {
  onOpenDiagram('/bpm/designer')
  //window.open('/bpm/designer')
}

const formatterTime = (row: any, column: any, cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}
const onQuery = async () => {
  state.loading = true
  state.pageInput.filter = state.filterModel
  const res = await new TPLApi().getPage(state.pageInput)
  state.listData = res?.data?.list ?? []
  state.total = res.data?.total ?? 0
  state.loading = false
}

const onStart = (row: ResultOutputPageOutputWorkflowTemplateListOutput) => {
  proxy.$modal
    .confirmDelete(`确定要启动【${row.name}】模板?`)
    .then(async () => {
      await new TPLApi().resume({ id: row.id as string }, { loading: true, showSuccessMessage: true })
      onQuery()
    })
    .catch(() => {})
}
const onDelete = (row: ResultOutputPageOutputWorkflowTemplateListOutput) => {
  proxy.$modal
    .confirmDelete(`确定要删除【${row.name}】模板?`)
    .then(async () => {
      await new TPLApi().delete({ id: row.id as string }, { loading: true, showSuccessMessage: true })
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
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'bpm/template',
})
</script>

<style scoped lang="scss"></style>