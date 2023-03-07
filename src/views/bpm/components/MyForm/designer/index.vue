/**
 *Copyright: Copyright (c) 2023
 *Author:Leo
 *Version 1.0
 *Title: Element Plus 表单设计器
 *GitHub: https://github.com/leo.one.tt/aibpm
 */

<template>
  <div class="container">
    <div class="left-board">
      <!-- <div class="logo-wrapper">
        <div class="logo">创建表单</div>
      </div>-->
      <el-scrollbar class="left-scrollbar">
        <el-tabs v-model="activeTabName" :stretch="true">
          <el-tab-pane label="定制组件" name="custom">
            <div class="components-list">
              <div class="components-title">  工作流组件</div>
              <draggable
                class="components-draggable"
                v-model="customComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
                item-key="index"
              >
                <template #item="{ element, index }">
                  <div :key="index" class="components-item" @click="addComponent(element)">
                    <div class="components-body"> 
        <SvgIcon :name="`/assets/bpm/svg/`+element.tagIcon+`.svg`"  class="svg-icon" size="18" color="var(--el-color-primary)" /> 
                      {{ element.label }}
                      
                    </div>
                  </div></template
                >
              </draggable>

              <div class="components-title">  组合型组件</div>
              <draggable
                class="components-draggable"
                :list="customGroupComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
                item-key="id"
              >
                <template #item="{ element, index }">
                  <div :key="index" class="components-item custom-component" @click="addComponent(element)">
                    <div class="components-body">
        <SvgIcon :name="`/assets/bpm/svg/`+element.tagIcon+`.svg`"  class="svg-icon" size="18" color="var(--el-color-warning)"  /> 
                      
                      {{ element.label }}
                    </div>
                  </div></template
                >
              </draggable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="基础组件" name="common">
            <div class="components-list">
              <div class="components-title">  输入型组件</div>
              <draggable
                class="components-draggable"
                v-model="inputComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
                item-key="index"
              >
                <template #item="{ element, index }">
                  <div :key="index" class="components-item" @click="addComponent(element)">
                    <div class="components-body"> 
                      {{ element.label }}
        <SvgIcon :name="`/assets/bpm/svg/`+element.tagIcon+`.svg`" class="svg-icon"  size="18" color="var(--el-color-primary)" /> 
                    </div>
                  </div></template
                >
              </draggable>

              <div class="components-title"> 选择型组件</div>
              <draggable
                class="components-draggable"
                :list="selectComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
              >
                <template #item="{ element, index }">
                  <div :key="index" class="components-item" @click="addComponent(element)">
                    <div class="components-body"> 
                      {{ element.label }}
        <SvgIcon :name="`/assets/bpm/svg/`+element.tagIcon+`.svg`" class="svg-icon" size="18" color="var(--el-color-primary)" /> 
                    </div>
                  </div></template
                >
              </draggable>
              <div class="components-title"> 布局型组件</div>
              <draggable
                class="components-draggable"
                :list="layoutComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
              >
                <template #item="{ element, index }">
                  <div :key="index" class="components-item" @click="addComponent(element)">
                    <div class="components-body"> 
                      {{ element.label }}
        <SvgIcon :name="`/assets/bpm/svg/`+element.tagIcon+`.svg`"  class="svg-icon" size="18"  color="var(--el-color-danger)"  /> 
                    </div>
                  </div></template
                >
              </draggable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
   
    <div class="center-board">
      <div class="action-bar">
        
       
    <el-button-group style="padding-top:10px;" >
          <el-button @click="drawerSize = '390px'"   icon="ele-Cellphone" title="手机">手机 </el-button>
      
          <el-button @click="drawerSize = '100%'" icon="ele-Monitor" title="电脑">电脑</el-button>
          <el-button   icon="ele-View"    plain @click="preview" title="预览">预览</el-button>
        <el-button   icon="ele-Delete" plain @click="empty" title="清空">清空</el-button>
        </el-button-group>  
        
      </div>
      <div id="device" ref="device" >
        <div class="outerdevice" :class="[deviceMode]" :style="{width:drawerSize}">
          <div class="devicebody" >
            <div class="devicescreen">
              <el-scrollbar class="center-scrollbar" style="">
                <el-form
                  :model="formConf.model"
                  class="drawing-board"
                  :size="formConf.size"
                  :label-position="formConf.labelPosition"
                  :disabled="formConf.disabled"
                  :label-width="formConf.labelWidth + 'px'"
                >
                  <render-panel
                    :list="drawingList"
                    :animation="200"
                    group="componentsGroup"
                    @end="onMianDragEnd"
                    
                    tag="el-row"
                    :conf="formConf"
                    :style="{ marginLeft: 0, alignContent: 'start', height: '100%' }"
                    :gutter="formConf.gutter"
                  ></render-panel>
                </el-form>
                <div v-show="!drawingList.length" class="empty-info">从左侧拖入或点选组件进行表单设计</div>
              </el-scrollbar>
            </div>
            <div class="devicecamera" />
            <el-tooltip effect="dark" content="切换横/竖模式" placement="top">
              <div class="devicehomebutton" @click="deviceMode = deviceMode === 'landscape' ? 'portrait' : 'landscape'" />
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <right-panel
      :active-data="activeData"
      :form-conf="formConf"
      :show-field="drawingList&&drawingList.length"
      :could-change-require="!isProCondition(activeData)"
      :list="drawingList"
      @tag-change="tagChange"
    />
 
    <input id="copyNode" type="hidden" />
  </div>

  <el-dialog v-model="isErrorShow" title="验证提示" >
<el-alert  type="error" v-for="item in validResults" :title="item" style="margin-bottom:10px"></el-alert> 

<template #footer>
      <span class="dialog-footer">
        <el-button @click="isErrorShow = false">知道了</el-button> 
         
      </span>
    </template>
</el-dialog>
  <PreviewPanel ref="previewPanelRef" />
</template>

<script>
import draggable from 'vuedraggable'
// import { saveAs } from 'file-saver'
// import beautifier from 'beautifier'
// import ClipboardJS from 'clipboard'
// import FormDrawer from './FormDrawer'
import RightPanel from './RightPanel.vue'

import configs from './configs'
import { exportDefault, beautifierConf, isNumberStr, titleCase, deepClone } from './utils/index'
import { makeUpHtml, vueTemplate, vueScript, cssStyle } from '../components/generator/html'
import { makeUpJs } from '../components/generator/js'
import { makeUpCss } from '../components/generator/css'
// import CodeTypeDialog from './CodeTypeDialog'
import RenderPanel from '../Render/RenderPanel.vue'
import PreviewPanel from './preview.vue'
import {
  getDrawingList,
  saveDrawingList,
  // getIdGlobal,
  // saveIdGlobal,
  getFormConf,
} from './utils/db'

import { debounce } from '/@/utils/bpm/index.js'


import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent, provide } from 'vue'
    
const emptyActiveData = { style: {}, autosize: {} }
let tempActiveData
const formConfInDB = getFormConf()
// const idGlobal = getIdGlobal();
export default {
  name: 'ai-form-designer',
  components: {
    draggable,
    RightPanel, 
    RenderPanel,
    PreviewPanel
    // FormDrawer,
    // CodeTypeDialog,
  },
  props: ['tabName', 'conf'],
  inject: ['updateFlow', 'updateFormItemList'],
  data() {
    const storageList = getDrawingList()
    const drawingList =[];// Array.isArray(storageList) && storageList.length ? storageList : drawingDefalut
    return {
      isErrorShow:false,
      validResults:[],
      // idGlobal,
      formConf: configs.formConf,
      customComponents: configs.customComponents,
      inputComponents: configs.inputComponents,
      selectComponents: configs.selectComponents,
      layoutComponents: configs.layoutComponents,
      // commonComponents:configs.commonComponents,
      customGroupComponents: configs.customGroupComponents,
      labelWidth: 100,
      drawingList,
      drawingData: {},
      activeId:  '',
      drawerVisible: false, 
      dialogVisible: false,
      generateConf: null,
      showFileName: false,
      activeData: {},
      activeTabName: 'custom',
      deviceMode: 'portrait',
      
  drawerSize: '490px',
      flowConditions: [],
    }
  },
  watch: {
    // eslint-disable-next-line func-names

   
    drawingList: {
      handler(val) {
        if (!val) return
        if (!this.afterDrawingChange) {
          this.afterDrawingChange = debounce(this.handlerListChange, 400) // 使用了deep 所以刷新会比较频繁
        }
        this.afterDrawingChange()
      },
      deep: true,
      immediate: true,
    },
    // idGlobal: {
    //   handler(val) {
    //     saveIdGlobal(val);
    //   },
    //   immediate: true
    // }
  },
  created() {
    if (typeof this.conf === 'object' && this.conf !== null) {
      this.drawingList = this.conf.formItems||[]
      Object.assign(this.formConf, this.conf)
    } else {
      // const drawingListInDB =  getDrawingList()
      // const hasStorage = Array.isArray(drawingListInDB) && drawingListInDB.length > 0
      // this.drawingList = drawingDefalut // hasStorage ? drawingListInDB : drawingDefalut
      formConfInDB && (this.formConf = formConfInDB)
    }
    this.formConf.model = {}
    this.formConf.mode = 'designer' 
    //this.activeFormItem(this.drawingList[0])
    this.$nextTick((_) => this.getDeviceMode())

 
  },

  computed: {
    bpm() {
      return { flowCondicitons: [] }
    },
  },
  provide() {
    return {
      activeFormItem: this.activeFormItem,
      deleteItem: this.drawingItemDelete, // 传递一个引用类型函数过去
      copyItem: this.drawingItemCopy,
      addPCondition: this.addPCondition,
      delPCondition: this.delPCondition,
    }
  },
  methods: {
    

    //切换横竖屏
    getDeviceMode() {
     // const { clientHeight, clientWidth } = this.$refs.device
      //this.deviceMode = clientWidth * 0.74 > clientHeight ? 'landscape' : 'portrait'
    },
    //--start-----------------------流程相关 --------------------
    getSetting() {


     
      return new Promise((resolve, reject) => {
        this.validResults=[]
        if (this.drawingList.length === 0) {
          this.validResults.push( '表单不允许为空')
           
        }

        if (this.isEmptyRowContainer()) {

          
          this.validResults.push( '您的行容器中没有组件')
       
        }
        if(this.validResults.length>0)
        {
          this.isErrorShow=true
          reject()

        }
        if(this.drawingList&&this.drawingList.length>0)
        resolve( {
        ...this.formConf,
        formItems: JSON.parse(JSON.stringify(this.drawingList)),
      })

        resolve(false)
      })
      
      this.$message.info('验证表单设计')
    },
    hasCondition(formId, needIndex = false) {
      let index = this.flowConditions.findIndex((d) => d.formId === formId)
      return needIndex ? index : index > -1
    },
    //添加预置条件
    addPCondition(data) {
      if (data.formId === null || data.formId === undefined) return
      if (!this.hasCondition(data.formId)) {
        this.flowConditions.unshift(data)
      }
      this.updateFlow({list:this.drawingList,conditions:this.flowConditions}) //(this.flowConditions)
    },
    //删除指定form
    delPCondition(formId) {
      if (formId === null || formId === undefined) return
      let index = this.hasCondition(formId, true)
      let cons = this.flowConditions
      index > -1 && cons.splice(index, 1)
    },
    //清除预置条件
    clearPCondition() {
      this.flowConditions = []
    },
    //--end-----------------------流程相关 --------------------

    //当list改变时
    handlerListChange(val) {
      const vm = this

      this.clearPCondition()
      //是否可以用作流程条件
      const canUsedAsPCon = (conf, parent) => {
        const isRangeCmp = ['fc-date-duration', 'fc-time-duration'].includes(conf.tag)
        if (isRangeCmp && !conf.showDuration) return false
        if (parent && parent.rowType === 'table') return false
        if (!conf.proCondition || !conf.required) return false
        if (conf.tag === 'el-select' && conf.multiple) return false
        return true
      }
      //循环判断子组件是否可以作为流程条件（流程可使用的字段）
      const loop = (data, parent) => {
        if (!data) return
        Array.isArray(data.children) && data.children.forEach((child) => loop(child, data))
        if (Array.isArray(data)) {
          data.forEach(loop)
        } else {
          canUsedAsPCon(data, parent) ? this.addPCondition(data) : this.delPCondition(data.formId)
        }
      }
      loop(this.drawingList)
      saveDrawingList(this.drawingList)
      this.updateFormItemList(this.drawingList)
      // if (val.length === 0) this.idGlobal = 100;
    },
    /**
     * 判断是否是常用组件
     * 非常用组件即套餐组件  不能新填或删除子组件
     */
    // isCommonCmp(name) {
    //   return this.commonComponents.findIndex(t => t.label === name) > -1
    // },
    /**
     * 阻止表格中嵌套行容器
     * 定制组件不能添加子组件
     */
    shouldClone(to, from, target, event, conf) {
      // .drawing-layout-item —— 行容器的类名 device里面的组件才会带有
      // 直接拖拽的行容器 最外层含有.drawing-layout-item
      // 定制组件 内部含有.drawing-layout-item
      // const hasRow = target.classList.contains('.drawing-layout-item') || target.querySelector('.drawing-layout-item') !== null
      // const isRowContainer = ['布局容器', '表格/明细'].includes(target.innerText) //是阻止从左侧拖拽嵌套
      // const isCusFromLeft = target.classList.contains('custom-component')
      const targetConf = target._underlying_vm_
      const isRowContainer = conf.cmpType === 'common' && conf.rowType === 'layout'
      if (isRowContainer) return true
      if (conf.cmpType === 'custom') return false
      if (conf.rowType === 'table') {
        if (targetConf.layout === 'rowFormItem') return false
        if (this.isFilledPCon([targetConf.formId])) return false
      }
      return true
    },
    //激活form item 存储当前元素数据和Id
    activeFormItem(element) {
      if (element) {
        this.activeData = element
        this.formConf.activeId = element.formId
        
      }
    },
    //组件拖放结束，激活新预算为当前元素
    onEnd(obj, a) {
      if (obj.from !== obj.to) {
        this.activeId = tempActiveData.formId
        this.activeData = tempActiveData
      }
    },
    //form内拖放结束
    onMianDragEnd(obj, a) {
      this.activeFormItem(this.drawingList[obj.newIndex])
    },
    //getSameTagCmpNum
    getSameTagCmpNum(tag) {
      return this.drawingList.reduce((count, item) => {
        if (item.children) {
          return (
            count +
            item.children.reduce((c, t) => {
              return t.tag === tag ? c + 1 : c
            }, 0)
          )
        }
        return item.tag === tag ? count + 1 : count
      }, 0)
    },
    createCmpLabel(cmp) {
      const len = this.getSameTagCmpNum(cmp.tag)
      return len ? cmp.label + len : cmp.label
    },
    ///新增组件
    addComponent(item) {
      const clone = this.cloneComponent(item)
      this.drawingList.push(clone)
      this.activeFormItem(clone)
    },
    //获取最大Id 新增组件需要考虑兼容， 不如直接时间简单高效
    getMaxId() {
      if (this.drawingList.length) {
        let maxId = 0
        const loop = (data, parent) => {
          if (!data) return
          Array.isArray(data.children) && data.children.forEach((child) => loop(child, data))
          if (Array.isArray(data)) {
            data.forEach(loop)
          } else {
            maxId = Math.max(data.formId, maxId)
          }
        }
        loop(this.drawingList)

        return maxId
      }
      return 0
    },
    //创建一个id
    getNextId() {
      return new Date().getTime()
      const maxId = this.getMaxId() + 1
      return maxId
    },
    //克隆组件
    cloneComponent(origin) {
      const clone = JSON.parse(JSON.stringify(origin))
      clone.formId = `${this.getNextId()}`
      // clone.span = formConf.span;
      if (!clone.layout) clone.layout = 'colFormItem'
      if (clone.layout === 'colFormItem') {
        clone.label = this.createCmpLabel(clone)
        clone.vModel = `field${clone.formId}`
        clone.placeholder !== undefined && (clone.placeholder += clone.label)
        tempActiveData = clone
      } else if (clone.layout === 'rowFormItem') {
        if (clone.rowType === 'table') {
          clone.vModel = `field${clone.formId}`
        }
        // delete clone.label;
        clone.componentName = `row${clone.formId}`
        clone.gutter = this.formConf.gutter
        this.cloneChildrenOfRowFormItem(clone)
        tempActiveData = clone
      }
      return tempActiveData
    },
    //克隆rowformitem子组件
    cloneChildrenOfRowFormItem(rowFormItem) {
      if (rowFormItem.children && rowFormItem.children.length) {
        const children = rowFormItem.children
        children.forEach((clone, index) => {
          clone.formId = rowFormItem.formId + index + 1
          // clone.span = formConf.span;
          clone.__ID = clone.formId + new Date().getTime() // 改变__ID后可以实现强制更新组件
          if (!clone.layout) clone.layout = 'colFormItem'
          if (clone.layout === 'colFormItem') {
            clone.vModel = `field${clone.formId}`
            clone.placeholder !== undefined && (clone.placeholder += clone.label)
          } else if (clone.layout === 'rowFormItem') {
            delete clone.label
            clone.componentName = `row${clone.formId}`
            clone.gutter = this.formConf.gutter
            this.cloneChildrenOfRowFormItem(clone)
          }
        })
      }
    },
    //是否空的行容器
    isEmptyRowContainer() {
      const rowContainer = this.drawingList.find((t) => t.layout === 'rowFormItem')
      if (rowContainer) {
        return rowContainer.children.length === 0
      }
    }, 
     
    preview() {
      var data=JSON.parse(JSON.stringify(this.drawingList))
      this.$refs['previewPanelRef'].open(data)
     // const routeData = this.$router.resolve({ name: 'jsxPreview', query: { formData: this.formData } })
     // window.open(routeData.href, '_blank')
    },
    generate(data) {
      const func = this[`exec${titleCase(this.operationType)}`]
      this.generateConf = data
      func && func(data)
    },
    // execRun(data) {
    //   this.AssembleFormData()
    //   this.drawerVisible = true
    // },
    // execDownload(data) {
    //   const codeStr = this.generateCode()
    //   const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
    //   saveAs(blob, data.fileName)
    // },
    execCopy(data) {
      document.getElementById('copyNode').click()
    },
    empty() {
      if (this.isFilledPCon()) {
        this.$message.warning('尚有组件已作为流程判断条件，无法删除')
        return
      }
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(() => {
        this.drawingList = []
        // this.idGlobal = 100;
        this.clearPCondition()
      })
    },
    createIdAndKey(item) {
      item.formId = this.getNextId()
       
      if (item.layout === 'colFormItem') {
        item.vModel = `field${item.formId}`
      } else if (item.layout === 'rowFormItem') {
        item.componentName = `row${item.formId}`
      }
      if (Array.isArray(item.children)) {
        item.children = item.children.map((childItem) => this.createIdAndKey(childItem))
      }
      return item
    },
    //是否流程条件
    isFilledPCon(formIds) {
      return ///*待重新开发
      const processCmp = this.$parent.$children.find((t) => t.isProcessCmp)
      return processCmp && processCmp.isFilledPCon(formIds)
    },
    checkColItem(cmp) {
      if (!cmp) return false
      const isPcon = !!this.bpm.flowCondicitons.find((t) => t.formId == cmp.formId)
      return isPcon && this.isFilledPCon([cmp.formId])
    },
    // 判断是否已被流程图作为条件必填项了
    isProCondition(cmp) {
      if (Array.isArray(cmp.children) && cmp.children.length) {
        // 容器组件需要检查子元素
        if (cmp.rowType === 'table') return false // 表格的子元素不可能为流程条件
        let flag = false
        const loop = (el) => {
          if (flag) return // flag === true 代表找到了一个了 不需要再找下一个
          if (Array.isArray(el)) {
            el.some((e) => {
              if (e.children) loop(e.children)
              return this.checkColItem(e)
            }) && (flag = true)
          }
        }
        loop(cmp.children)
        return flag
      } else {
        return this.checkColItem(cmp)
      }
    },

    drawingItemCopy(item, parent) {
      let clone = deepClone(item)

      clone = this.createIdAndKey(clone)
      parent.push(clone)
      this.activeFormItem(clone)
    },

    //删除项目时判断是否已经被流程占用
    drawingItemDelete(index, parent) {
      // 首先判断是否是流程条件 再判断是否有节点使用过
      if (this.isProCondition(parent[index])) {
        this.$message.warning('该组件已作为流程判断条件，无法删除')
        return
      }
      this.delPCondition(parent[index].formId)
      parent.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    }, 
    run() {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'run'
    },
    // copy() {
    //   this.dialogVisible = true
    //   this.showFileName = false
    //   this.operationType = 'copy'
    // },
    //tag变化
    tagChange(newTag) {
      newTag = this.cloneComponent(newTag)
      newTag.vModel = this.activeData.vModel
      newTag.formId = this.activeId
      newTag.span = this.activeData.span
      delete this.activeData.tag
      delete this.activeData.tagIcon
      //   delete this.activeData.document;
      Object.keys(newTag).forEach((key) => {
        if (this.activeData[key] !== undefined && typeof this.activeData[key] === typeof newTag[key]) {
          newTag[key] = this.activeData[key]
        }
      })
      this.activeData = newTag
      this.updateDrawingList(newTag, this.drawingList)
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex((item) => item.formId === this.activeId)
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach((item) => {
          if (Array.isArray(item.children)) {
            this.updateDrawingList(newTag, item.children)
          }
        })
      }
    },
  },
}
</script>

<style lang="scss"  >
@import './styles/index.scss';
@import './styles/homepc.scss';
#device {
  height: 100%;
  display: flex;
}
#device .outerdevice,
#device .devicebody,
#device .devicescreen {
  position: relative;
  height: 100%;
}
#device .devicecamera,
#device .devicehomebutton {
  position: absolute;
}

.outerdevice {
  box-shadow: 0 0 13px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: auto;
  &.portrait {
    padding: 45px 25px;
    height: 85% !important;
    width: 90%;
    min-height: 560px;
  }
  
  .devicebody {
    background-color: #fff;
    border-radius: 10px;
    .el-scrollbar__view {
      height: 100%;
    }

    .el-form {
      height: 100%; // calc(100vh - 69px);
      .el-row {
        padding: 12px 12px 15px 1px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
  }
  .devicescreen {
    background-color:white;// rgba(239, 239, 239, 0.6);
  }
  .devicecamera {
    top: -38px;
    left: 50%;
    background-color: #aeaeae;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: -5px;
  }
  .devicehomebutton {
    background-color: #fff;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    border: 1px solid #a8a8a8;
    margin-top: 6px;
    margin-left: -15px;
    left: 50%;
    cursor: pointer;
  }
  .el-radio-group {
    line-height: 2.5;
  }
}
.el-date-editor {
  .el-range-separator {
    box-sizing: content-box;
  }
}
</style>,
<style lang="scss" scoped>

.components-body {
:deep(.svg-icon) {
  width: 18px;
    height: 18px;
   // vertical-align: bottom;
    fill: currentColor;
    overflow: hidden;
    vertical-align: -0.15em;
  float: right;
}
}
</style>