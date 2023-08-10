<template>
  <el-form-item v-if="props.data['show-summary'] !== undefined" label="显示合计">
    <el-switch v-model="props.data['show-summary']" />
  </el-form-item>

  <el-form-item v-if="props.data['show-summary'] !== undefined" label="列配置">
    <el-button @click="state.showColConfig = true" icon="ele-Edit"> 编辑...</el-button>
  </el-form-item>
  <!--<ai-code-editor v-model="state.code"></ai-code-editor>-->

  <el-dialog title="列配置" v-model="state.showColConfig" fullscreen>
    <el-table :data="props.data.cols"  >
      <el-table-column prop="label" label="显示标题">
        <template #default="scope"> <el-input v-model="scope.row.label"></el-input></template>
      </el-table-column>

      <el-table-column prop="prop" label="字段名称">
        <template #default="scope"> <el-input v-model="scope.row.prop"></el-input> </template>
      </el-table-column>

      <el-table-column prop="width" label="列的宽度">
        <template #default="scope">
          <el-input v-model="scope.row.width"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="sortable" label="前端排序">
        <template #default="scope"> <el-switch v-model="scope.row.sortable"></el-switch></template>
      </el-table-column>

      <el-table-column prop="sortByServer" label="后端排序">
        <template #default="scope"> <el-switch v-model="scope.row.sortByServer"></el-switch></template>
      </el-table-column>
      <el-table-column prop="isShow" label="是否显示">
        <template #default="scope"> <el-switch v-model="scope.row.isShow"></el-switch></template>
      </el-table-column>

      <el-table-column prop="align" label="对齐">
        <template #default="scope">
          <el-select v-model="scope.row.align">
            <el-option label="左对齐" value="left"></el-option>
            <el-option label="居中" value="center"></el-option>
            <el-option label="右对齐" value="right"></el-option> </el-select
        ></template>
      </el-table-column>

      <el-table-column prop="fixed" label="固定">
        <template #default="scope">
          <el-select
            v-model="scope.row.fixed"
            @change="
              (v) => {
                if (!v) delete scope.row.fixed
              }
            "
          >
            <el-option label="不固定"></el-option>
            <el-option label="固定在左侧" value="left"></el-option>
            <el-option label="固定在右侧" value="right"></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="formatType" label="数据类型">
        <template #default="scope">
          <el-select v-model="scope.row.formatType">
            <el-option label="字符串" :value="'string' || undefined || ''"></el-option>
            <el-option label="数字" value="number"></el-option>
            <el-option label="日期时间" value="date"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="formatString" label="格式">
        <template #default="scope">
          <el-link href="http://numeraljs.com/"></el-link>

          <el-input v-model="scope.row.formatString"></el-input>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">

         
          <el-button circle type="primary" size="small" icon="ele-Plus" @click.prevent="addRow(scope.$index)">  </el-button>
         
          <el-button circle type="danger" size="small" icon="ele-Minus" @click.prevent="deleteRow(scope.$index)">  </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({ showColConfig: false, code: '' })

const props = defineProps(['data'])

const deleteRow = (index: number) => {
  props.data.cols.splice(index, 1)
}

const addRow = (index: number) => {
  props.data.cols.push({fixed:false})
}
</script>
