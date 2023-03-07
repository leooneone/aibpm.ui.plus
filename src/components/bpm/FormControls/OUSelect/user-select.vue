<template> 
<!--<el-tag
  :key="item[state.UID]"
  v-for="(item, index) in state.selectedList"
  closable
  @close="removeItemByIndex(index, item)"
>
  {{ item.name }}
</el-tag> -->
    <div style="padding: 0px 0px 8px 8px; background-color: var(--ba-bg-color)">
      <el-row :gutter="8" style="width: 100%">
        <el-col :xs="24" :sm="9">
          <div class="my-flex-column h100">
            <org-menu @node-click="onOrgNodeClick" class="my-flex-fill"></org-menu>
          </div>
        </el-col>
        <el-col :xs="24" :sm="15">
          <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
            <el-form :model="state.filterModel" :inline="true">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="state.filterModel.name" placeholder="姓名" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
              </el-form-item>
            </el-form>
          </el-card>

          <el-card shadow="never" style="margin-top: 8px">
            <el-table
              ref="userTableRef"
              :data="state.userListData"
              style="width: 100%"
              v-loading="state.loading"
              row-key="id"
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              :highlight-current-row="!multiple"
              @row-click="onRowClick"
              @row-dblclick="onRowDbClick"
              @select="selectChange"
              @select-all="selectAllChange"
            >
              <el-table-column v-if="multiple" type="selection"    width="55" />
              <el-table-column prop="name" label="姓名" min-width="80" show-overflow-tooltip />
              <el-table-column prop="mobile" label="手机号" min-width="120" show-overflow-tooltip />
              <!-- <el-table-column prop="email" label="邮箱" min-width="120" show-overflow-tooltip /> -->
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
                layout="total, sizes, prev, pager, next"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div> 
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { ElTable } from 'element-plus'
import { UserGetPageOutput, PageInputUserGetPageDto, OrgListOutput } from '/@/api/admin/data-contracts'
import {  UserApi } from '/@/api/admin/User'
import OrgMenu from '/@/views/admin/org/components/org-menu.vue'

interface User {
  id: number
  name: string
}
// interface Props {
//   modelValue: number[] | null | undefined
//   checkedKeys: number[] | null | undefined
//   selectFirstNode: boolean
// }

 
// const props = withDefaults(defineProps<Props>(), {


//   checkedKeys: () => [],
//   selectFirstNode: false,
// })

const props = defineProps({

  modelValue:  {
    type: Array,
    default: [] as UserGetPageOutput[] ,
  },
  title: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  sureLoading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue','sure'])

const userTableRef = ref<InstanceType<typeof ElTable>>()

const updateMark=()=> {
      let selectedMarkList = state.selectedList.map((item) => item[state.UID]);

      state.userListData.forEach((row) => {
        if (selectedMarkList.includes(row[state.UID])) {
          // toggleRowSelection 需在$nextTick中使用！

           nextTick(() => {
            userTableRef.value!.toggleRowSelection(row);
          });
        }
      });
    }

 

 // 单行前的勾选状态切换
 const selectChange=(selectedRows:UserGetPageOutput[], row:UserGetPageOutput)=>{
      // true为选中, 0或false为取消选中
      let selected = selectedRows.length && selectedRows.indexOf(row) !== -1;
      if (selected) {
        addItem(row);
      } else {
        removeItem(row);
      } 
      console.log('update:modelValue', state.selectedList)
      emits('update:modelValue', state.selectedList) 
    } 
    // 全选/取消全选
  const  selectAllChange=(selectedRows:UserGetPageOutput[])=> {
      let selectedMarkList = state.selectedList.map((item) => item[state.UID]);
      // 当前页选中行的标记列表
      let pageSelectedMarkList = Array.isArray(selectedRows)
        ? selectedRows.map((item) => item[state.UID])
        : [];

        state.userListData.forEach((row:UserGetPageOutput) => {
        if (pageSelectedMarkList.includes(row[state.UID])) {
          if (!selectedMarkList.includes(row[state.UID])) {
             addItem(row);
          }
        } else if (selectedMarkList.includes(row[state.UID])) {
           removeItem(row);
        }
      });
      console.log('update:modelValue', state.selectedList)
    emits('update:modelValue', state.selectedList) 
    } 
// 新增选中项
const addItem=(item:UserGetPageOutput)=> {
      state.selectedList.push(item);
    }
    // 移除选中项
    const   removeItem=(item:UserGetPageOutput) =>{
      for (let [index, itemTemp] of state.selectedList.entries()) {
        if (itemTemp[state.UID] === item[state.UID]) {
          removeItemByIndex(index);
          break;
        }
      }
    } 

    const removeTag=(item:UserGetPageOutput)=>{


      var idx=state.selectedList.indexOf(item)  
      removeItemByIndex(idx,item)
    }
 // 根据下标移除选中项
 const removeItemByIndex=(index:number, item:UserGetPageOutput)=> {
      state.selectedList.splice(index, 1);

      // 若有item,则是点击标签上的关闭按钮，移除选中项
      if (item) {
        nextTick(() => {
          userTableRef.value!.toggleRowSelection(
            // 此处必须在 tableData 中查找对应的数据，否则 toggleRowSelection 会失效
            state.userListData.find((row) => {
              return row[state.UID] === item[state.UID];
            }),
            false
          );
        });
      }
    }  
const state = reactive({
  UID: "id",
  selectedList:props.modelValue as Array<UserGetPageOutput>,
  showDialog: true,
  loading: false,
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

// 打开对话框
const open = () => {
  state.showDialog = true
  if (state.pageInput.filter) {
    state.pageInput.filter.orgId = null
  }

  onQuery()
}

// 关闭对话框
const close = () => {
  state.showDialog = false
}

const onQuery = async () => {
  state.loading = true
  const res = await new UserApi().getPage(state.pageInput)

  state.userListData = res?.data?.list ?? []
  state.total = res.data?.total ?? 0
  updateMark()
  state.loading = false
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

 
defineExpose({
  open,
  close,removeTag,
  userTableRef
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'bpm/components/user-select',
})
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  padding: 5px 10px;
}
</style>
