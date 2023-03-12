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
        <el-tabs v-model="state.activeTabName" :stretch="true">
          <el-tab-pane label="定制组件" name="custom">
            <div class="components-list">
              <div class="components-title">工作流组件</div>
              <Draggable
                class="components-draggable"
                v-model="state.customComponents"
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
                      <SvgIcon :name="`/assets/bpm/svg/` + element.tagIcon + `.svg`" class="svg-icon" size="18" color="var(--el-color-primary)" />
                      {{ element.label }}
                    </div>
                  </div></template
                >
              </Draggable>

              <div class="components-title">组合型组件</div>
              <Draggable
                class="components-draggable"
                :list="state.customGroupComponents"
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
                      <SvgIcon :name="`/assets/bpm/svg/` + element.tagIcon + `.svg`" class="svg-icon" size="18" color="var(--el-color-warning)" />

                      {{ element.label }}
                    </div>
                  </div></template
                >
              </Draggable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="基础组件" name="common">
            <div class="components-list">
              <div class="components-title">输入型组件</div>
              <Draggable
                class="components-draggable"
                v-model="state.inputComponents"
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
                      <SvgIcon :name="`/assets/bpm/svg/` + element.tagIcon + `.svg`" class="svg-icon" size="18" color="var(--el-color-primary)" />
                    </div></div
                ></template>
              </Draggable>

              <div class="components-title">选择型组件</div>
              <Draggable
                class="components-draggable"
                :list="state.selectComponents"
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
                      <SvgIcon :name="`/assets/bpm/svg/` + element.tagIcon + `.svg`" class="svg-icon" size="18" color="var(--el-color-primary)" />
                    </div></div
                ></template>
              </Draggable>
              <div class="components-title">布局型组件</div>
              <Draggable
                class="components-draggable"
                :list="state.layoutComponents"
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
                      <SvgIcon :name="`/assets/bpm/svg/` + element.tagIcon + `.svg`" class="svg-icon" size="18" color="var(--el-color-danger)" />
                    </div></div
                ></template>
              </Draggable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <el-button-group style="padding-top: 10px">
          <el-button @click="state.drawerSize = '390px'" icon="ele-Cellphone" title="手机">手机 </el-button>

          <el-button @click="state.drawerSize = '100%'" icon="ele-Monitor" title="电脑">电脑</el-button>
          <el-button icon="ele-View" plain @click="preview" title="预览">预览</el-button>
          <el-button icon="ele-Delete" plain @click="empty" title="清空">清空</el-button>
        </el-button-group>
      </div>
      <div id="device" ref="device">
        <div class="outerdevice" :class="[state.deviceMode]" :style="{ width: state.drawerSize }">
          <div class="devicebody">
            <div class="devicescreen">
              <el-scrollbar class="center-scrollbar" style="">
                <el-form
                  :model="state.formConf.model"
                  class="drawing-board"
                  :size="state.formConf.size"
                  :label-position="state.formConf.labelPosition"
                  :disabled="state.formConf.disabled"
                  :label-width="state.formConf.labelWidth + 'px'"
                >
                  <RenderPanel
                    :list="state.drawingList"
                    :animation="200"
                    group="componentsGroup"
                    @end="onMianDragEnd"
                    tag="el-row"
                    :conf="state.formConf"
                    :style="{ marginLeft: 0, alignContent: 'start', height: '100%' }"
                    :gutter="state.formConf.gutter"
                  ></RenderPanel>
                </el-form>
                <div v-show="!state.drawingList.length" class="empty-info">从左侧拖入或点选组件进行表单设计</div>
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
      :active-data="state.activeData"
      :form-conf="state.formConf"
      :show-field="state.drawingList && state.drawingList.length"
      :could-change-require="!isProCondition(state.activeData)"
      :list="state.drawingList"
      @tag-change="tagChange"
    />

    <input id="copyNode" type="hidden" />
  </div>

  <el-dialog v-model="state.isErrorShow" title="验证提示">
    <el-alert type="error" v-for="item in state.validResults" :title="item" style="margin-bottom: 10px"></el-alert>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.isErrorShow = false">知道了</el-button>
      </span>
    </template>
  </el-dialog>
  <PreviewPanel ref="previewPanelRef" />
</template>

<script lang="ts" setup >
// import { saveAs } from 'file-saver'
// import beautifier from 'beautifier'
// import ClipboardJS from 'clipboard'
// import FormDrawer from './FormDrawer'

import configs from './configs'
import { exportDefault, beautifierConf, isNumberStr, titleCase, deepClone } from './utils/index'
// import CodeTypeDialog from './CodeTypeDialog'

import {
  getDrawingList,
  saveDrawingList,
  // getIdGlobal,
  // saveIdGlobal,
  getFormConf,
} from './utils/db'

import { inject, ref, reactive, getCurrentInstance, onMounted, computed, watch, nextTick, defineAsyncComponent, provide } from 'vue'

const RenderPanel = defineAsyncComponent(() => import('../Render/RenderPanel.vue'))
const PreviewPanel = defineAsyncComponent(() => import('./preview.vue'))
const RightPanel = defineAsyncComponent(() => import('./RightPanel.vue'))

const Draggable = defineAsyncComponent(() => import('vuedraggable'))
const emptyActiveData = { style: {}, autosize: {} }

const formConfInDB = getFormConf()
// const idGlobal = getIdGlobal();
const props = defineProps({ conf: Object })

const { proxy } = getCurrentInstance() as any
const updateFlow = inject('updateFlow')

const getInitSetting = inject('getInitSetting')
const updateFormItemList = inject('updateFormItemList')
const previewPanelRef = ref()
const storageList = getDrawingList()
//    const drawingList = [] // Array.isArray(storageList) && storageList.length ? storageList : drawingDefalut
const state = reactive({
  isErrorShow: false,
  validResults: [],
  // idGlobal,
  formConf: configs.formConf,
  customComponents: configs.customComponents,
  inputComponents: configs.inputComponents,
  selectComponents: configs.selectComponents,
  layoutComponents: configs.layoutComponents,
  // commonComponents:configs.commonComponents,
  customGroupComponents: configs.customGroupComponents,
  labelWidth: 100,
  drawingList: [],
  drawingData: {},
  activeId: '',
  drawerVisible: false,
  generateConf: null,
  activeData: {},
  activeTabName: 'custom',
  deviceMode: 'portrait',

  drawerSize: '490px',
  flowConditions: [],
  bpm: { flowCondicitons: [] },
  tempActiveData: {},
})

const created = () => {
  if (typeof props.conf === 'object' && props.conf !== null) {
    state.drawingList = props.conf.formItems || []
    Object.assign(state.formConf, props.conf)
  } else {
    // const drawingListInDB =  getDrawingList()
    // const hasStorage = Array.isArray(drawingListInDB) && drawingListInDB.length > 0
    // state.drawingList = drawingDefalut // hasStorage ? drawingListInDB : drawingDefalut
    formConfInDB && (state.formConf = formConfInDB)
  }
  state.formConf.model = {}
  state.formConf.mode = 'designer'
  // activeFormItem(state.drawingList[0])
  nextTick((_) => getDeviceMode())
}
onMounted(() => {}) 
watch(
  () => props.conf,
  (conf) => {
    // var conf= getInitSetting('formSetting')

    if (typeof conf === 'object' && conf !== null) {
      state.drawingList = conf.formItems || []
      Object.assign(state.formConf, conf)
    }
  }
)

created()

//切换横竖屏
const getDeviceMode = () => {
  // const { clientHeight, clientWidth } = this.$refs.device
  //state.deviceMode = clientWidth * 0.74 > clientHeight ? 'landscape' : 'portrait'
}
//--start-----------------------流程相关 --------------------
const getSetting = () => {
  return new Promise((resolve, reject) => {
    state.validResults = []
    if (state.drawingList.length === 0) {
      state.validResults.push('表单不允许为空')
    }

    if (isEmptyRowContainer()) {
      state.validResults.push('您的行容器中没有组件')
    }
    if (state.validResults.length > 0) {
      state.isErrorShow = true
      reject()
    }
    if (state.drawingList && state.drawingList.length > 0)
      resolve({
        ...state.formConf,
        formItems: JSON.parse(JSON.stringify(state.drawingList)),
      })

    resolve(false)
  })

  proxy.$modal.msg('验证表单设计')
}
const hasCondition = (formId, needIndex = false) => {
  let index = state.flowConditions.findIndex((d) => d.formId === formId)
  return needIndex ? index : index > -1
}
//添加预置条件
const addPCondition = (data) => {
  if (data.formId === null || data.formId === undefined) return
  if (!hasCondition(data.formId)) {
    state.flowConditions.unshift(data)
  }
  updateFlow({ list: state.drawingList, conditions: state.flowConditions }) //(this.flowConditions)
}
//删除指定form
const delPCondition = (formId) => {
  if (formId === null || formId === undefined) return
  let index = hasCondition(formId, true)
  let cons = state.flowConditions
  index > -1 && cons.splice(index, 1)
}
//清除预置条件
const clearPCondition = () => {
  state.flowConditions = []
}
//--end-----------------------流程相关 --------------------

//当list改变时
const handlerListChange = (val) => {
  clearPCondition()
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
      canUsedAsPCon(data, parent) ? addPCondition(data) : delPCondition(data.formId)
    }
  }
  loop(state.drawingList)
  saveDrawingList(state.drawingList)
  updateFormItemList(state.drawingList)
  // if (val.length === 0) this.idGlobal = 100;
}
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
const shouldClone = (to, from, target, event, conf) => {
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
    if (isFilledPCon([targetConf.formId])) return false
  }
  return true
}
//激活form item 存储当前元素数据和Id
const activeFormItem = (element) => {
  if (element) {
    state.activeData = element
    state.formConf.activeId = element.formId
  }
}
//组件拖放结束，激活新预算为当前元素
const onEnd = (obj, a) => {
  if (obj.from !== obj.to) {
    state.activeId = state.tempActiveData.formId
    state.activeData = state.tempActiveData
  }
}
//form内拖放结束
const onMianDragEnd = (obj, a) => {
  activeFormItem(state.drawingList[obj.newIndex])
}
//getSameTagCmpNum
const getSameTagCmpNum = (tag) => {
  return state.drawingList.reduce((count, item) => {
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
}
const createCmpLabel = (cmp) => {
  const len = getSameTagCmpNum(cmp.tag)
  return len ? cmp.label + len : cmp.label
}
///新增组件
const addComponent = (item) => {
  const clone = cloneComponent(item)
  state.drawingList.push(clone)
  activeFormItem(clone)
}
//获取最大Id 新增组件需要考虑兼容， 不如直接时间简单高效
const getMaxId = () => {
  if (state.drawingList.length) {
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
    loop(state.drawingList)

    return maxId
  }
  return 0
}
//创建一个id

const getNextId = () => {
  return new Date().getTime()
  const maxId = getMaxId() + 1
  return maxId
}
//克隆组件
const cloneComponent = (origin) => {
  const clone = JSON.parse(JSON.stringify(origin))
  clone.formId = `${getNextId()}`
  // clone.span = formConf.span;
  if (!clone.layout) clone.layout = 'colFormItem'
  if (clone.layout === 'colFormItem') {
    clone.label = createCmpLabel(clone)
    clone.vModel = `field${clone.formId}`
    clone.placeholder !== undefined && (clone.placeholder += clone.label)
    state.tempActiveData = clone
  } else if (clone.layout === 'rowFormItem') {
    if (clone.rowType === 'table') {
      clone.vModel = `field${clone.formId}`
    }
    // delete clone.label;
    clone.componentName = `row${clone.formId}`
    clone.gutter = state.formConf.gutter
    cloneChildrenOfRowFormItem(clone)
    state.tempActiveData = clone
  }
  return state.tempActiveData
}
//克隆rowformitem子组件
const cloneChildrenOfRowFormItem = (rowFormItem) => {
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
        clone.gutter = state.formConf.gutter
        cloneChildrenOfRowFormItem(clone)
      }
    })
  }
}
//是否空的行容器
const isEmptyRowContainer = () => {
  const rowContainer = state.drawingList.find((t) => t.layout === 'rowFormItem')
  if (rowContainer) {
    return rowContainer.children.length === 0
  }
}

const preview = () => {
  var data = JSON.parse(JSON.stringify(state.drawingList))
  previewPanelRef.value?.open(data)
  // const routeData = this.$router.resolve({ name: 'jsxPreview', query: { formData: this.formData } })
  // window.open(routeData.href, '_blank')
}

const empty = () => {
  if (isFilledPCon()) {
    proxy.$modal.msgWarning('尚有组件已作为流程判断条件，无法删除')
    return
  }
  proxy.$modal.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(() => {
    state.drawingList = []
    // this.idGlobal = 100;
    clearPCondition()
  })
}
const createIdAndKey = (item) => {
  item.formId = getNextId()

  if (item.layout === 'colFormItem') {
    item.vModel = `field${item.formId}`
  } else if (item.layout === 'rowFormItem') {
    item.componentName = `row${item.formId}`
  }
  if (Array.isArray(item.children)) {
    item.children = item.children.map((childItem) => createIdAndKey(childItem))
  }
  return item
}
//是否流程条件
const isFilledPCon = (formIds) => {
  return ///*待重新开发
  const processCmp = this.$parent.$children.find((t) => t.isProcessCmp)
  return processCmp && processCmp.isFilledPCon(formIds)
}
const checkColItem = (cmp) => {
  if (!cmp) return false
  const isPcon = !!state.bpm.flowCondicitons.find((t) => t.formId == cmp.formId)
  return isPcon && isFilledPCon([cmp.formId])
}
// 判断是否已被流程图作为条件必填项了
const isProCondition = (cmp) => {
  if (Array.isArray(cmp.children) && cmp.children.length) {
    // 容器组件需要检查子元素
    if (cmp.rowType === 'table') return false // 表格的子元素不可能为流程条件
    let flag = false
    const loop = (el) => {
      if (flag) return // flag === true 代表找到了一个了 不需要再找下一个
      if (Array.isArray(el)) {
        el.some((e) => {
          if (e.children) loop(e.children)
          return checkColItem(e)
        }) && (flag = true)
      }
    }
    loop(cmp.children)
    return flag
  } else {
    return checkColItem(cmp)
  }
}

const drawingItemCopy = (item, parent) => {
  let clone = deepClone(item)

  clone = createIdAndKey(clone)
  parent.push(clone)
  activeFormItem(clone)
}

//删除项目时判断是否已经被流程占用
const drawingItemDelete = (index, parent) => {
  // 首先判断是否是流程条件 再判断是否有节点使用过
  if (isProCondition(parent[index])) {
    proxy.$modal.msgWarning('该组件已作为流程判断条件，无法删除')
    return
  }
  delPCondition(parent[index].formId)
  parent.splice(index, 1)
  nextTick(() => {
    const len = state.drawingList.length
    if (len) {
      activeFormItem(state.drawingList[len - 1])
    }
  })
}
const run = () => {
  state.operationType = 'run'
}
// copy() {
//   this.showFileName = false
//   this.operationType = 'copy'
// },
//tag变化
const tagChange = (newTag) => {
  newTag = cloneComponent(newTag)
  newTag.vModel = state.activeData.vModel
  newTag.formId = state.activeId
  newTag.span = state.activeData.span
  delete state.activeData.tag
  delete state.activeData.tagIcon
  //   delete state.activeData.document;
  Object.keys(newTag).forEach((key) => {
    if (state.activeData[key] !== undefined && typeof state.activeData[key] === typeof newTag[key]) {
      newTag[key] = state.activeData[key]
    }
  })
  state.activeData = newTag
  updateDrawingList(newTag, state.drawingList)
}
const updateDrawingList = (newTag, list) => {
  const index = list.findIndex((item) => item.formId === state.activeId)
  if (index > -1) {
    list.splice(index, 1, newTag)
  } else {
    list.forEach((item) => {
      if (Array.isArray(item.children)) {
        updateDrawingList(newTag, item.children)
      }
    })
  }
}

provide('activeFormItem', activeFormItem)
//provide('deleteItem', deleteItem)
//provide('copyItem', copyItem)
provide('addPCondition', addPCondition)
provide('delPCondition', delPCondition)

// 将这个方法暴露出去,这样父组件就可以使用了哈
defineExpose({
  getSetting 
})
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
    background-color: white; // rgba(239, 239, 239, 0.6);
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