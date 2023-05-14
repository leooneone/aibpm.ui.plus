<template>
  <el-drawer v-if="node" :title="`$t('message.layout.configTitle')`" v-model="isDrawer" direction="rtl" isModal="false" destroy-on-close size="600px">
    <template #header="{ close, titleId, titleClass }" v-if="curNode && curNode.type == 'start'">
      {{ curNode.title }}
    </template>
    <template #header="{ close, titleId, titleClass }" v-else>
      <span @click="showTitleInput" v-show="!titleInputVisible" style="cursor: pointer;">
        {{ curNode.title }} 
        <el-icon style="font-size:1.5em"><ele-Edit /></el-icon>
      </span>
      <el-input ref="titleInput" size="small" v-model="curNode.title" placeholder="请输入节点标签" v-show="titleInputVisible" @blur="onTitleChange"></el-input>
      
    </template>
    <el-tabs type="border-card" style="height: calc(100vh - 95px)">
      <el-tab-pane label="条件" v-if="curNode.type === 'condition'"
        ><condition ref="conditionPanel" :fields="fields" :conditions="conditions" :data="curNode.condition"
      /></el-tab-pane>

      <el-tab-pane label="参与人设置" v-if="['approve','deal'].includes( curNode.type ) "
        ><participant ref="approvePanel" :fields="fields" :data="curNode.approve"
      /></el-tab-pane>
      <el-tab-pane label="表单权限" v-if="['approve','start','deal'].includes( curNode.type ) "
        ><permission ref="permissionPanel" :fields="fields" :data="curNode.permission"
      /></el-tab-pane>

      <el-tab-pane label="传阅" v-if="curNode.type === 'circulate'"
        ><circulate ref="circulatePanel" :fields="fields" :data="curNode.circulate"
      /></el-tab-pane>
      <el-tab-pane label="说明"  
        > 
        <div v-if=" curNode.type==='start'">
          每个流程只允许一个启动节点
    </div>
    <div v-else-if=" curNode.type==='end'">
      每个流程只允许一个结束节点；
      结束节点可以有一条或者多条入向连接，但没有出向连接。
    </div>
    <div v-else  >
      这里是节点说明
    </div>
      </el-tab-pane>
      <!--<el-tab-pane label="操作权限"   
        ><operation ref="operationPanel"  :data="curNode.operation"
      /></el-tab-pane>-->

      <el-tab-pane label="通用" v-if="false">
        <el-select v-model="curNode.type">
          <el-option v-for="item in workflowTypes" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.value }}</span></el-option
          >
        </el-select>
      </el-tab-pane> 
    </el-tabs>

    <template #footer>
      <div style="flex: auto">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Permission from './Permission.vue'
import Operation from './Operation.vue'
import Participant from './Participant.vue'
import Condition from './Condition.vue'
import Circulate from './Circulate.vue'

import { ClickOutside } from 'element-plus'
export default {
  inject: ['titleChange'],
  directives: {
    ClickOutside,
  },
  components: {
    Permission,
    Participant,
    Condition,
    Circulate,
    Operation
  },
  props: {
    fields: { type: Array, default: () => {} },
    conditions: { type: Array, default: () => {} },
    node: { type: Object, default: () => {} },
  },
  data() {
    return {
      titleInputVisible: false,
      curNode: {},
      isDrawer: false,
      workflowTypes: [
        { label: '开始', value: 'start' },
        { label: '结束', value: 'end' },
        { label: '条件', value: 'condition' },
        { label: '传阅', value: 'circulate' },
        { label: '审批', value: 'approver' },
      ],
    }
  },
  watch: {
    isDrawer(val) {
      if (val) {
        this.$nextTick(() => {
          this.curNode = JSON.parse(JSON.stringify(this.node))
        })
      } else {
        this.curNode = {}
      }
    },
  },
  methods: {
    showTitleInput(){
      
      this.titleInputVisible = true;
      this.$nextTick(() => this.$refs.titleInput.focus()) 

    },
    onTitleChange() {
       this.titleChange(this.curNode.title)
      this.titleInputVisible = false
    },
    onConfirm() {
      this.node.approve = this.$refs['approvePanel']?.onConfirm()

      this.node.permission = this.$refs['permissionPanel']?.onConfirm()
      this.node.condition = this.$refs['conditionPanel']?.onConfirm()
      this.node.circulate = this.$refs['circulatePanel']?.onConfirm()
      console.log('  panel confirmed')
      this.close()
    },

    close() {
      this.isDrawer = false
    },
    open() {
      this.isDrawer = true

      this.$nextTick(() => {
        //document.getElementById('myProp').appendChild(document.getElementsByClassName('geFormatContainer')[0]);
      })
      // { "title": "leo", "id": "2", "type": "approve", "assigneeType": "role", "approve": { "ouCollection": { "user": [], "role": [ { "id": 340428577087557, "parentId": 336557508276293, "name": "IT", "code": "it", "type": 2, "sort": 2, "description": "", "tagName": "role", "tagType": "danger" } ], "org": [] }, "participants": [], "assigneeType": "role", "formOperates": [], "SignType": "string", "optionalMultiUser": false, "optionalRange": "ALL" }, "permission": [] }
      //JSON.parse(JSON.stringify(this.node))
      // this.isDrawer=false
    },
  },
}
</script>
