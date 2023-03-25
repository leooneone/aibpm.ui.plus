<template>
  <div style="padding: 0px 0px 8px 8px">
    <el-row :gutter="8" style="width: 100%">
      <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
        <div class="my-flex-column h100">
          
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
              <el-button v-auth="'api:edu:gameTask:add'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
            </el-form-item>
          </el-form>
        </el-card>

       
      </el-col>
    </el-row>
    <el-card shadow="never" style="margin-top: 8px">
          <el-table v-loading="state.loading" :data="state.gameTaskListData" row-key="id" style="width: 100%">
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
                <el-button v-auth="'api:edu:gameTask:update'" icon="ele-EditPen" size="small" text type="primary" @click="onEdit(row)">编辑</el-button>
                <my-dropdown-more v-auths="['api:edu:gameTask:set-manager', 'api:edu:gameTask:reset-password', 'api:edu:gameTask:delete']">
                  <template #dropdown>
                    <el-dropdown-menu>
                     
                       <el-dropdown-item v-if="auth('api:edu:gameTask:delete')" @click="onDelete(row)">删除用户</el-dropdown-item>
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
        <GameTaskForm ref="gameTaskFormRef"></GameTaskForm>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, defineAsyncComponent } from 'vue'
import { GameTaskGetPageOutput, PageInputGameTaskGetPageDto } from '/@/api/edu/data-contracts'
import { GameTaskApi } from '/@/api/edu/GameTask'
import eventBus from '/@/utils/mitt'

// 引入组件
const GameTaskForm = defineAsyncComponent(() => import('./components/game-task-form.vue'))
const { proxy } = getCurrentInstance() as any

const gameTaskFormRef = ref()

const state = reactive({
  loading: false,
  gameTaskFormTitle: '',
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
  } as PageInputGameTaskGetPageDto,
  gameTaskListData: [] as Array<GameTaskGetPageOutput>,
})
onMounted(() => {
  eventBus.on('refreshGameTask', async () => {
    onQuery()
  })
})

onUnmounted(() => {
  eventBus.off('refreshGameTask')
})

const onQuery = async () => {
  state.loading = true
  const res = await new GameTaskApi().page(state.pageInput)

  state.gameTaskListData = res?.data?.list ?? []
  state.total = res.data?.total ?? 0
  state.loading = false
}

const onAdd = () => {
  state.gameTaskFormTitle = '新增用户'
  gameTaskFormRef.value.open()
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
  