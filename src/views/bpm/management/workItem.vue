<template> 
    <div style="padding: 0px 0px 8px 8px">
      <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
        <el-form :model="state.filterModel" :inline="true">
          <el-form-item prop="name">
            <el-input v-model="state.filterModel.name" placeholder="工作项名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
          </el-form-item>
        </el-form>
      </el-card>
  
      <el-card shadow="never" style="margin-top: 8px">
        <el-table v-loading="state.loading" :data="state.listData" row-key="id" style="width: 100%" border>
           
        <el-table-column type="index" width="60"  label="序号"  />
          <el-table-column prop="activityName" label="工作项名称" min-width="120" show-overflow-tooltip >
            <template #default="{ row }">
          <el-link  @click="open(row)">{{ row.activityName }}</el-link>
          </template>
            </el-table-column>  
            <el-table-column prop="referenceNo" label="单号" show-overflow-tooltip width="120" />
          <el-table-column prop="instanceName" label="流程名称" show-overflow-tooltip width="120" />
          <el-table-column prop="state" label="工作项状态" width="100">
            <template #default="{ row }">  
              <el-tag disable-transitions :type="vnDisplayType[row.state&127].toLowerCase()">{{ vnActivityState[row.state] }}</el-tag> 
              
            </template>
          </el-table-column>
          <el-table-column prop="initiator" label="创建人"   show-overflow-tooltip  width="120"/>
          <el-table-column prop="participant" label="审核人"   show-overflow-tooltip  width="120"/>
          <el-table-column prop="executor" label="处理人"   show-overflow-tooltip  width="120"/>
          <el-table-column prop="startTime" label="创建时间" :formatter="formatterTime" width="180" />
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
              <el-button v-auth="'api:bpm:template:run'" icon="ele-Promotion" size="small" text type="primary" @click="onRun(row)">执行</el-button>
              <el-button v-auth="'api:bpm:template:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
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
    
 <my-form  ref="formRef"></my-form>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue'
  import { ResultOutputWorkItemGetPageOutput, PageInputWorkItemGetPageDto,vnActivityState, vnDisplayType } from '/@/api/bpm/data-contracts'
  import { WorkItemApi } from '/@/api/bpm/WorkItem'
  import dayjs from 'dayjs'
  const MyForm = defineAsyncComponent(() => import('./myForm.vue'))
  
  const props= defineProps({
    state: {
      type: String,
      default: null,
    },
    //是否自己为工作项负责人
    isMyself: {
      type: Boolean,
      default: true,
    }, abc: {
      type: Boolean,
      default: true,
    },
  })
 const formRef=ref()
  // 引入组件
  const { proxy } = getCurrentInstance() as any

   
  const state = reactive({
    loading: false,
    filterModel: {
      name: '',
    },
    total: 0,
    pageInput: {
      currentPage: 1,
      pageSize: 20,
      Filter:{State:props.state,
        isMyself:props.isMyself,
    Name:''}
    } as PageInputWorkItemGetPageDto,
    listData: [] as Array<ResultOutputWorkItemGetPageOutput>,
    
  })
  onMounted(() => {
    onQuery()
  })
 const open=(row)=>{
  formRef.value.open({type:1,workItemId:row.id,templateId:row.workflowTemplateId})
 }
  const formatterTime = (row: any, column: any, cellValue: any) => {
    return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
  }
  const onQuery = async () => {
    state.loading = true
    const res = await new WorkItemApi().page(state.pageInput)
    state.listData = res?.data?.list ?? []
    state.total = res.data?.total ?? 0
    state.loading = false
  }


  const onStart = (row: ResultOutputWorkItemGetPageOutput) => {
    proxy.$modal
      .confirmDelete(`确定要启动【${row.name}】工作项?`)
      .then(async () => {
        await new WorkItemApi().resume({ id: row.id as string }, { loading: true, showSuccessMessage: true })
        onQuery()
      })
      .catch(() => {})
  }
  const onDelete = (row: ResultOutputWorkItemGetPageOutput) => {
    proxy.$modal
      .confirmDelete(`确定要删除【${row.name}】工作项?`)
      .then(async () => {
        await new WorkItemApi().delete({ id: row.id as string }, { loading: true, showSuccessMessage: true })
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