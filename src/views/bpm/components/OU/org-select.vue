<template>
  <el-card shadow="never" style="margin-top: 8px">
    <template #header>
      <el-input v-model="state.filterText" placeholder="筛选部门" clearable />
    </template>
    <div v-loading="state.loading">
      <el-tree
        ref="orgMenuRef"
        :data="state.orgTreeData"
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        :filter-node-method="onFilterNode"
        highlight-current
        check-strictly
        default-expand-all
        render-after-expand
        :expand-on-click-node="false"
        v-bind="$attrs"
        
        :default-checked-keys="props.modelValue?.map((item)=>item.id)"
        show-checkbox
        @node-click="onNodeClick"
        @check-change="onCheckChange"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch, nextTick } from 'vue'
import { OrgListOutput } from '/@/api/admin/data-contracts'
import {   OrgApi } from '/@/api/admin/Org'
import { listToTree } from '/@/utils/tree'
import { ElTree } from 'element-plus'

interface Props {
  modelValue: number[] | null | undefined
  checkedKeys: number[] | null | undefined
  selectFirstNode: boolean
}

 
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],

  checkedKeys: () => [],
  selectFirstNode: false,
})

const orgMenuRef = ref<InstanceType<typeof ElTree>>()
const state = reactive({
  loading: false,
  filterText: '',
  orgTreeData: [] as Array<OrgListOutput>,
  lastKey: 0,
})
 
 

watch(
  () => state.filterText,
  (val) => {
    orgMenuRef.value?.filter(val)
  }
)

onMounted(() => {
  initData()
})

const emits = defineEmits<{
  (e: 'node-click', node: OrgListOutput | null): void
  (e: 'update:modelValue', node: any[] | undefined | null): void
}>()

const onFilterNode = (value: string, data: OrgListOutput) => {
  if (!value) return true
  return data.name?.indexOf(value) !== -1
}

const onNodeClick = (node: OrgListOutput) => {
  if (state.lastKey === node.id) {
    state.lastKey = 0
    orgMenuRef.value?.setCurrentKey(undefined)
    emits('node-click', null)
  } else {
    state.lastKey = node.id as number
    emits('node-click', node)
  }
}

const onCheckChange = () => {
  emits('update:modelValue', orgMenuRef.value?.getCheckedNodes())
}

const initData = async () => {
  state.loading = true
  const res = await new OrgApi().getList()
  state.loading = false
  if (res?.success && res.data && res.data.length > 0) {
    state.orgTreeData = listToTree(res.data)
    if (props.selectFirstNode) {
      nextTick(() => {
        const firstNode = state.orgTreeData[0]
        orgMenuRef.value?.setCurrentKey(firstNode.id)
        emits('node-click', firstNode)
      })
    }
  } else {
    state.orgTreeData = []
  }
}

defineExpose({
  orgMenuRef,

})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin/org/menu',
})
</script>
