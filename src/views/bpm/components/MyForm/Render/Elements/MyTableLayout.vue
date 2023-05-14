<template>
<!-- <table class="table-layout" :ref="setRef" :config="item">
    <tbody>
      <tr v-for="(row, rowIndex) in item.children" :key="rowIndex">
        <template v-for="(col, colIndex) in row.children" :key="colIndex">
          <td>{{ (col.state&1)>0?1:0 }}:{{ (col.state&2)>0?1:0 }}:{{ (col.state&4)>0?1:0 }}</td>
        </template>
      </tr>
    </tbody>
  </table>--> 
  <table class="table-layout" :ref="setRef" :config="item" :disabled="item.disabled">
    <caption><span  v-if="item.showLabel">{{ item.label }} </span></caption>
    <tbody>
      <tr v-for="(row, rowIndex) in item.children" :key="rowIndex">
        <template v-for="(col, colIndex) in row.children" :key="colIndex">
          <table-cell :item="col" :table-data="item" :col-index="colIndex" :row-index="rowIndex" :conf="conf"></table-cell>
        </template>
      </tr>
    </tbody>
  </table> 
</template>
<script lang="ts" setup name="my-table-layout">
import { inject, provide, defineAsyncComponent, reactive } from 'vue'

const TableCell = defineAsyncComponent(() => import('./TableCell.vue'))

const props = defineProps({
  activeId: String || Number,
  item: Object,
  conf: Object,
  index: String || Number,
})
const state = reactive({
  activeCell: { row: 0, col: 0 },
})
const onActiveCell = (rowIdx, colIdx) => {
  state.activeCell = { row: rowIdx, col: colIdx }
}
provide('onActiveCell', onActiveCell)

const IsActiveCell = (r, c) => {
  return props.conf.activeId === props.item.formId && state.activeCell.row === r && state.activeCell.col === c
}

provide('IsActiveCell', IsActiveCell)
provide('onActiveCell', onActiveCell)

const cellOperate = (rIdx, cIdx, comm) => {
  var colItem = { colSpan: 1, rowSpan: 1, children: [],state:0
    //, isColMerged: false, isRowMerged: false 
  }
  ///左侧插入列
  var rows = props.item.children
  if (comm === 'insertLeftCol') {
    for (var k = 0; k < rows.length; k++) {
      rows[k].children.splice(cIdx, 0, JSON.parse(JSON.stringify(colItem)))
    }
  } else if (comm === 'insertRightCol') {
    for (var k = 0; k <rows.length; k++) {
      var cell = rows[k].children[cIdx]
      rows[k].children.splice(cIdx + cell.colSpan, 0, JSON.parse(JSON.stringify(colItem)))
    }
  } else if (comm === 'insertAboveRow') {
    var rowItem = {
      children: [],
    }
    for (var k = 0; k < rows[0].children.length; k++) rowItem.children.push(JSON.parse(JSON.stringify(colItem)))

    rows.splice(rIdx, 0, rowItem)
  } else if (comm === 'insertBelowRow') {
    var rowItem = {
      children: [],
    }
    for (var k = 0; k < rows[0].children.length; k++) {
      rowItem.children.push(JSON.parse(JSON.stringify(colItem)))
    }
    var cell = rows[rIdx].children[cIdx]
    rows.splice(rIdx + cell.rowSpan, 0, rowItem)
  } else if (comm === 'mergeRightCol') {
    if (cIdx < rows[rIdx].children.length - 1) {
      var cell = rows[rIdx].children[cIdx]
      var offset=cell.colSpan
      var mergedItem = rows[rIdx].children[cIdx + offset]

      var mergedOffset=mergedItem.colSpan
      cell.colSpan += mergedOffset
      ///合并后组件也合并
      cell.children.push(...mergedItem.children)
      mergedItem.children = []
      mergedItem.colSpan = 1
      ///mergedItem.isColMerged = true
      ///mergedItem.isHide = true
      mergedItem.state |=5
     // cell.isColMerged = true
      cell.state |=4
      for (var c = 1; c < cell.rowSpan; c++) {
        if (offset === 1) {
         /// rows[rIdx + c].children[cIdx].isColMerged = true
          rows[rIdx + c].children[cIdx ].state |=4
        }
        if (mergedOffset === 1) {
         /// rows[rIdx + c].children[cIdx + offset].isColMerged = true
          
          rows[rIdx + c].children[cIdx + offset].state |=4
        }
      }
    }
    console.log( props.item.children)
  } else if (comm === 'mergeWholeRow') {
    var len = rows[rIdx].children.length
    var cell = rows[rIdx].children[0]
    cell.colSpan = len
    
    if (len > 0){
      //cell.isColMerged=true
      cell.state |=4
      for (var k = 1; k < len; k++) {
        var mergedItem = rows[rIdx].children[k]

        mergedItem.colSpan = 1
        ///合并后组件也合并
        cell.children.push(...mergedItem.children)
        mergedItem.children = []
        /// mergedItem.isColMerged = true
        /// mergedItem.isHide = true 
        mergedItem.state |=5
      }
    }
      console.log(rows)
  } else if (comm === 'mergeBelowRow') {
    if (rIdx < rows.length - 1) {
      var cell = rows[rIdx].children[cIdx]
      var offset=cell.rowSpan
      var mergedItem = rows[rIdx + offset].children[cIdx]
      var mergedOffset=mergedItem.rowSpan
      cell.rowSpan += mergedOffset

      mergedItem.rowSpan = 1
      ///合并后组件也合并
      cell.children.push(...mergedItem.children)
      mergedItem.children = []
      ///mergedItem.isRowMerged = true
      ///mergedItem.isHide = true
      mergedItem.state |=3
      ///cell.isRowMerged = true
      cell.state |=2
      for (var c = 1; c < cell.colspan; c++) {
        if (offset === 1) {
          //rows[rIdx ].children[cIdx+ c].isRowMerged = true
          rows[rIdx ].children[cIdx+ c].state |=2
        }
        if (mergedOffset === 1) {
          ///rows[rIdx +   offset].children[cIdx +c].isRowMerged = true
          rows[rIdx +   offset].children[cIdx +c].state |=2
        }
      }
    }
  } else if (comm === 'mergeWholeCol') {
    if (rows.length > 0) {
      var cell = rows[0].children[cIdx]
      var len = rows.length
      ///cell.isRowMerged = true
      cell.state |=2
      cell.rowSpan = len
      for (var k = 1; k < len; k++) {
        var mergedItem = rows[k].children[cIdx]
        mergedItem.rowSpan = 1
        ///合并后组件也合并
        cell.children.push(...mergedItem.children)
        mergedItem.children = []
        ///mergedItem.isRowMerged = true
        ///mergedItem.isHide=true
        mergedItem.state|=3
      }
    }
    console.log(rows)
  } else if (comm === 'splitMerged') {
    var cell = rows[rIdx].children[cIdx]
    var rowLen = cell.rowSpan
    var colLen = cell.colSpan
    for (var k = 0; k < rowLen; k++) {
      for (var m = 0; m < colLen; m++) {
        var splitItem = rows[rIdx + k].children[cIdx + m]
        /// splitItem.isRowMerged = false
        /// splitItem.isColMerged = false
        /// splitItem.isHide= false
        splitItem.state=0

        splitItem.colSpan = 1
        splitItem.rowSpan = 1
      }
    }
  }
  if (comm === 'deleteWholeRow') {
    rows.splice(rIdx, 1)
  }
  if (comm === 'deleteWholeCol') {
    for (var k = 0; k < rows.length; k++) {
      rows[k].children.splice(cIdx, 1)
    }
  }
}
provide('cellOperate', cellOperate)
const setRef = (el) => {
  if (!props.conf.tableRefs) props.conf.tableRefs = {}
  props.conf.tableRefs[props.item.vModel] = el
  // return item.vModel
}

const className = 'drawing-layout-item'

const activeFormItem = inject('activeFormItem')
provide('activeFormItem', activeFormItem)
</script>
<style lang="scss">
.table-layout {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  table-layout: fixed;
}
</style>