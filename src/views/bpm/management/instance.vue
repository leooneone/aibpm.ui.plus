<template>
  <section>
  <div style="padding: 0px 0px 8px 8px">
    <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
      <el-form :model="state.filterModel" :inline="true">
        <el-form-item prop="name">
          <el-input v-model="state.filterModel.name" placeholder="流程名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" style="margin-top: 8px">
      <el-table v-loading="state.loading" :data="state.listData" row-key="id" style="width: 100%" border>
        <el-table-column type="index" width="60" label="序号" />

        <el-table-column prop="referenceNo" label="单号" show-overflow-tooltip width="120" />
        <el-table-column prop="name" label="流程名称" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">
            <el-link @click="open(row)">{{ row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="groupId" label="流程分组" show-overflow-tooltip width="120">
          <template #default="{ row }">
            {{ dic_bpm_group[row.groupId] }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="流程状态" width="100">
          <template #default="{ row }">
            <el-tag disable-transitions  :type="vnDisplayType[row.state&127].toLowerCase()">{{ vnInstanceState[row.state] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="initiator" label="创建人" show-overflow-tooltip width="120" />
        <el-table-column prop="createdTime" label="创建时间" :formatter="formatterTime" width="180" />
        <el-table-column label="操作" width="180" fixed="right" header-align="center" align="center">
          <template #default="{ row }">
            <el-button
              
             
              icon="ele-CaretRight"
              size="small"
              text
              type="primary"
              @click="open(row)"
              >进入</el-button
            >
            <el-button v-if="vnInstanceState[row.state]==='运行中'" v-auth="'api:bpm:template:cancel'" icon="ele-Promotion" size="small" text type="primary" @click="onCancel(row)">撤回</el-button>
           
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
  <my-form ref="formRef"></my-form>
</section>
</template>
  
  <script lang="ts" setup  >
import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue'
import { ResultOutputPageOutputInstanceListOutput, PageInputInstanceGetPageDto,vnInstanceState,vnDisplayType } from '/@/api/bpm/data-contracts'
import {  InstanceApi } from '/@/api/bpm/instance'
import dayjs from 'dayjs'

const MyForm = defineAsyncComponent(() => import('./myForm.vue'))
// 引入组件
const { proxy } = getCurrentInstance() as any

//const { dic_InstanceState } = proxy.$dict('InstanceState')

const { dic_bpm_group } = proxy.$dict('bpm-group')
const formRef = ref()
const props=defineProps({
  state:String,
  isHandled:Boolean
})
const state = reactive({
  loading: false,
  filterModel: {
    name: '',
  },
  total: 0,
  pageInput: {
    currentPage: 1,
    pageSize: 20,
  filter: {}
  } as PageInputInstanceGetPageDto,
  listData: [] as Array<ResultOutputPageOutputInstanceListOutput>,
})
onMounted(() => {
  onQuery()
})

const formatterTime = (row: any, column: any, cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}
const onQuery = async () => {
  state.loading = true
  if(props.state)

  state.pageInput.filter.state=props.state

  if(props.isHandled)
  state.pageInput.filter.isHandled=true
  const res = await new InstanceApi().page(state.pageInput)
  state.listData = res?.data?.list ?? []
  state.total = res.data?.total ?? 0
  state.loading = false
}
 
const onCancel = (row: ResultOutputPageOutputInstanceListOutput) => {
  proxy.$modal
    .confirmDelete(`确定要取消【${row.name}】流程?`)
    .then(async () => {
      await new InstanceApi().delete({ id: row.id as string }, { loading: true, showSuccessMessage: true })
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

const open = (row) => {
  formRef.value.open({ type: 3, instanceId: row.id, templateId: row.workflowTemplateId })
}
</script>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'bpm/instance',
  })
  </script>
  
  <style scoped lang="scss"></style>