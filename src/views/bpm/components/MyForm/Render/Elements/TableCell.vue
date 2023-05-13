<template>
  <td
    @click="onActive"
    :config="item"
    :class=" conf.mode === 'designer'?'table-cell-designer':'table-cell'"
    v-if="(item.state & 1) == 0"
    :colspan="item.colSpan || 1"
    :rowspan="item.rowSpan || 1"
    :style="{
      width: item.cellWidth + ' !important' || '',
      height: item.cellHeight + ' !important' || '',
      'word-break': !!item.wordBreak ? 'break-all' : 'normal',
    }"
  >
    <!--{{ rowIndex }}:{{ colIndex }}-->
    <render-panel
      :active-id="activeId"
      :list="item.children"
      tag="div"
      :conf="conf"
      :gutter="item.gutter"
      justify="left"
    >
    </render-panel>

    <div class="table-cell-command" v-if="conf.mode === 'designer' && IsActive">
      <el-dropdown trigger="click" @command="handleTableCellCommand" size="small">
        <el-icon title="操作"> <ele-Edit /> </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="insertLeftCol">向左插入1列</el-dropdown-item>
            <el-dropdown-item command="insertRightCol">向右插入1列</el-dropdown-item>
            <el-dropdown-item command="insertAboveRow">向上插入1行</el-dropdown-item>
            <el-dropdown-item command="insertBelowRow">向下插入1行</el-dropdown-item>
            <el-dropdown-item command="mergeRightCol" :disabled="!canMergeRightCol" divided>合并右侧单元格</el-dropdown-item>
            <el-dropdown-item command="mergeBelowRow" :disabled="!canMergeBelowRow">合并下方单元格</el-dropdown-item>
            <el-dropdown-item command="mergeWholeRow" :disabled="!canbMergeWholeRow">合并整行</el-dropdown-item>
            <el-dropdown-item command="mergeWholeCol" :disabled="!canbMergeWholeCol">合并整列</el-dropdown-item>
            <el-dropdown-item command="splitMerged" :disabled="!canSplitMerged" divided>拆分成单元格</el-dropdown-item>
            <el-dropdown-item command="deleteWholeRow" :disabled="!canbMergeWholeRow" divided>删除整行</el-dropdown-item>
            <el-dropdown-item command="deleteWholeCol" :disabled="!canbMergeWholeCol">删除整列</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </td>
</template>
<script lang="ts" setup name="table-cell">
import { number } from 'echarts'
import { inject, provide, defineAsyncComponent, computed, reactive } from 'vue'

const RenderPanel = defineAsyncComponent(() => import('../RenderPanel.vue'))
const props = defineProps({
  activeId: String || Number,
  item: Object,
  conf: Object,
  rowIndex: Number,
  colIndex: Number,
  tableData: Object,
  index: String || Number,
})
// const canMergeLeftCol = computed(() => {
//   ///未完成 完全可以用向右合并代替，不实现了
//   return props.colIndex > 0 && leftCell.rowSpan === rightCell.rowSpan
//   ///左右的colSpan需要相等
// })

const state = reactive({
  isShowMenu: false,
})
const onActiveCell = inject('onActiveCell')
const onActive = () => {
  onActiveCell(props.rowIndex, props.colIndex)
  //state.isShowMenu=true
}

const IsActiveCell = inject('IsActiveCell')

const IsActive = computed(() => {
  return IsActiveCell(props.rowIndex, props.colIndex)
})

const onLeave = () => {
  state.isShowMenu = false
}
const canMergeRightCol = computed(() => {
  var rows = props.tableData.children
  var leftCell = rows[props.rowIndex].children[props.colIndex]

  if (leftCell.colSpan + props.colIndex >= rows[props.rowIndex].children.length) return false
  var rightCell = rows[props.rowIndex].children[props.colIndex + leftCell.colSpan]
  if ((leftCell.state & 2) !== (rightCell.state & 2)) return false

  return true
  // return (leftCell.colSpan + props.colIndex) < props.tableData.children[props.rowIndex].children.length && leftCell.rowSpan === rightCell.rowSpan
})

const canMergeBelowRow = computed(() => {
  var rows = props.tableData.children
  var cell = rows[props.rowIndex].children[props.colIndex]
  //如果下方没有可合并的单元格
  if (cell.rowSpan + props.rowIndex >= rows.length) return false

  var mergedCell = rows[props.rowIndex + cell.rowSpan].children[props.colIndex]
  //如果下方的单元格和上方的colSpan不匹配
  if (mergedCell.colSpan !== cell.colSpan) return false
  return true
})

const canSplitMerged = computed(() => {
  var cell = props.tableData.children[props.rowIndex].children[props.colIndex]
  return cell.colSpan > 1 || cell.rowSpan > 1
})

const canbMergeWholeCol = computed(() => {
  var rows = props.tableData.children
  //已经没有可合并的单元格
  if (rows[0].children[props.colIndex].rowSpan === rows.length) return false

  for (var k = 0; k < rows.length; k++) {
    var cell = rows[k].children[props.colIndex]
    if ((cell.state & 4) !== (rows[0].children[props.colIndex].state & 4)) return false
  }
  return true
})

const canbMergeWholeRow = computed(() => {
  var rows = props.tableData.children
  var row = rows[props.rowIndex]
  //已经没有可合并的单元格
  if (row.children[0].colSpan === row.children.length) return false
  for (var k = 1; k < row.children.length; k++) {
    if ((row.children[k].state & 2) !== (row.children[0].state & 2)) return false
  }
  return true
})

const className = 'drawing-layout-item'

const cellOperate = inject('cellOperate')
//provide('activeFormItem', activeFormItem)

const handleTableCellCommand = (command) => {
  cellOperate(props.rowIndex, props.colIndex, command)
}
</script>

<style lang="scss">
.el-form {
  td{
  .el-col {
    margin-bottom: 0px;
  }

}
}
.table-cell{
  vertical-align:middle;
  display: table-cell;
    height: 36px;
    border: 1px solid #e5e5e5;
    .el-row{
      
  vertical-align:middle;
    }
}
.table-cell-designer { 
  //padding: 3px;
  border: 1px dashed #336699;
  display: table-cell;
  position: relative;
  
  .table-cell-command {
    position: absolute;
    bottom: 0;
    right: -2px;
    height: 15px;
    line-height: 15px;
    background: var(--el-color-primary); 
    z-index: 999;

    display: flex;
    align-items: center;

    i {
      font-size: 14px;
      color: #fff;
      margin: 0 0px;
      cursor: pointer;
    }
  }

  .table-cell-handler {
    position: absolute;
    top: -2px;
    left: -2px;
    height: 22px;
    line-height: 22px;
    background: var(--el-color-primary);
    z-index: 9;

    i {
      font-size: 14px;
      font-style: normal;
      color: #fff;
      margin: 4px;
      cursor: default; //cursor: move;
    }
  }
}

.table-cell-command,
.table-cell-handler {
  :deep(.svg-icon) {
    margin-left: 0.1em;
    margin-right: 0.1em;
  }
}

.table-cell.selected {
  outline: 2px solid var(--el-color-primary) !important;
}
</style>