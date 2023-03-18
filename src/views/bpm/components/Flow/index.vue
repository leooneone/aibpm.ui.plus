<template>
  <div class="editMainContainer">
    <div
      v-show="state.isPropPanel"
      style="position: absolute; top: 41px; right: 0px; z-index: 20; font-size: 12px !important; width: 640px; background-color: white"
    >
      <NodeProp ref="propPanelRef" :node="state.curNode" :fields="props.fields" :conditions="props.conditions"/>
    </div>
    <div class="editLegendHeader" v-if="props.enableEditing">
      <div @click="handleThumbnail" class="legendItem">
        <img :src="coordinateSvg" width="10" alt="" />
        缩略图
      </div>

      <div class="legendItem">
        <el-tooltip effect="light">
          <template #content>
            <div style="font-size: 22px">🦉🦉🦉🦉🦉🦉🦉🦉</div>
            <div>点击图形中节点/元素后</div>
            <div>如果当前设置为审批面板，则弹出审批设置面板</div>
            <div>如果当前设置为格式面板，则显示图形格式调整面板</div>
            <div>格式面板主要用于调整图形外观尺寸，颜色等，与流程设置无关。</div>
            <div>如果需要调整样式建议使用工作流组件和网关栏下的图形组件,其他栏组件均为可替换图片。</div>
          </template>
          <el-switch v-model="state.isShowApproval" inline-prompt inactive-color="rgb(0, 130, 207)" active-text="审批面板" inactive-text="格式面板" />
        </el-tooltip>
      </div>
    </div>
    <div class="graphEditorContainer" ref="editorContainerRef" @keydown="bindEvents"></div>

    <EditCellProperty
      :isVisible="state.cellProperty"
      :detailData="state.cellData"
      v-on:onDialogClose="
        () => {
          state.cellProperty = false
          state.cellData = {}
        }
      "
      v-on:onDialogConfirm="saveActiveCell"
    />
    <el-dialog v-model="state.isErrorShow" title="流程设计器验证">
      <el-alert
        :type="item.type || 'error'"
        show-icon
        v-for="item in state.validResults"
        :title="`【` + (item.group || '全局') + `】` + item.msg"
        style="margin-bottom: 10px"
        :closable="false"
        :close-text="`【` + item.group + `】`"
      ></el-alert>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.isErrorShow = false">知道了</el-button>
        </span>
      </template>
    </el-dialog>
    <SaveTopology :isVisible="state.saveCurrentTopo" v-on:onDialogClose="state.saveCurrentTopo = false" v-on:onDialogConfirm="exportTopology" />
    <ImportFile :isVisible="state.importFile" v-on:onDialogClose="state.importFile = false" v-on:onDialogConfirm="parseXmlFile" />
  </div>
</template>
<script lang="ts" setup>
import { inject, ref, reactive, getCurrentInstance, onMounted, computed, watch, nextTick, defineAsyncComponent, provide } from 'vue'

const SaveTopology = defineAsyncComponent(() => import('./SaveTopology/index.vue'))
const EditCellProperty = defineAsyncComponent(() => import('./EditCellProperty/index.vue'))
const NodeProp = defineAsyncComponent(() => import('./Prop/index.vue'))
const ImportFile = defineAsyncComponent(() => import('./ImportFile/index.vue'))
import './styles/reset.css'
import './styles/grapheditor.css'

import coordinateSvg from '/@/assets/coordinate.svg'
import editSvg from '/@/assets/edit.svg'
import saveSvg from '/@/assets/save.svg'

import { NodeUtils } from './nodeUtils.js'

interface NodeInfo {
  title: string
  id: number
  //assigneeType: string
  message: string
  type: string
}

const { proxy } = getCurrentInstance() as any
const editorContainerRef = ref()

const propPanelRef = ref()
const props = defineProps({

  conf: { type: Object, default: (_) => {} },
  fields: { type: Array, default: [] },
  conditions: { type: Array, default: [] },
  enableEditing: { type: Boolean, default: true },
})

const state = reactive({
  isShowApproval: true,
  enableEditing: true,
  isErrorShow: false,
  validResults: [],
  startActivityId: 0,
  nodes: {},
  lines: [],
  curNode: {},

  curCellType: '',
  ///是否使用属性面板
  isPropPanel: true,
  graph: null,
  saveCurrentTopo: false,
  cellProperty: false,
  importFile: false,
  cellData: {},

  curCellId: {},
})

// 修改节点文本内容
const textValueChange = (value) => {
  var cells = state.graph.getSelectionCells()
  state.graph.cellLabelChanged(cells[0], value)
}
provide('titleChange', textValueChange)

const addEventHandler = () => {
  // 给graph添加事件
  // 监听自定义事件
  // state.graph.addListener(mxEvent.NORMAL_TYPE_CLICKED, (sender, evt) => {
  //   let cell = evt.properties.cell.state.cell;
  //   state.currentNormalType = cell;
  // });
  // state.graph.addListener(mxEvent.VERTEX_START_MOVE, (sender, evt) => {
  //   console.log('VERTEX_START_MOVE', sender, evt);
  // });
  var that = this
  state.graph.addListener(mxEvent.CELLS_ADDED, (sender, evt) => {
    const cell = evt.properties.cells[0]

    if (state.graph.isPart(cell)) {
      return
    }

    if (cell.vertex) {
      addCell(cell)
    } else if (cell.edge) {
      addCell(cell, 'condition')
      //  proxy.$modal.msg('添加了一条线，起点：' + cell.source.id + '，终点：' + cell.target.id)
      NodeUtils.addLine(state.lines, { id: cell.id, fromId: cell.source.id, toId: cell.target.id })
    }
  })

  // 画布平移事件
  // state.graph.addListener(mxEvent.PAN, (sender, evt) => {
  //   console.log('画布平移了', sender, evt)
  // })
  var that = this
  var cellLabelChanged = state.graph.cellLabelChanged
  state.graph.cellLabelChanged = function (cell, newValue, autoSize) {
    if (state.nodes[cell.id].title !== newValue) state.nodes[cell.id].title = newValue
    cellLabelChanged.apply(this, arguments)
  }
  var that = this
  // state.graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt){
  //   var cell = evt.getProperty('cell');

  //   if (cell!=null){
  //     state.activeCell(cell.id)
  //     state.openPropPanel()
  //     return
  //     if (cell.vertex!=null && cell.vertex==1){
  //       //console.log(cell.userData);
  //       if (cell.userData && cell.userData.isGroup){	//custom
  //         //is group, do nothing
  //       }else{
  //         //is cell, open cell edit panel
  //         openCell(cell);
  //       }
  //     }else if (cell.edge!=null && cell.edge==1){
  //       //is edge, open edge edit
  //       openEdge(cell);
  //     }
  //   }
  // });
  // // 新增节点事件
  // state.graph.addListener(mxEvent.ADD_CELLS, (sender, evt) => {

  //   state.$nextTick(() => {

  //     console.log('mxEvent.ADD_CELLS,')
  //     let addCell = evt.properties.cells[0];
  //     if (addCell.vertex) {
  //       // 判断是否为组节点
  //       if (addCell.isGroup) {
  //         proxy.$modal.msg('添加了一个组');
  //         let groupObj = _.pick(addCell, ['id', 'title', 'parent', 'geometry']);
  //         state.jsonData['cells']['groups'].push(groupObj);
  //       } else {
  //         let nodeObj = _.pick(addCell, ['id', 'title', 'parent', 'geometry']);
  //         state.jsonData['cells']['nodes'].push(nodeObj);
  //         proxy.$modal.msg('添加了一个节点');
  //       }
  //       //  向jsonData中更新数据
  //     } else if (addCell.edge) {
  //       console.log(addCell)
  //       let lineObj = _.pick(addCell, ['id', 'edge', 'source', 'parent', 'geometry', 'value']);
  //       state.jsonData['edges'].push(lineObj);
  //       proxy.$modal.msg('添加了一条线');
  //     }
  //   })
  // });

  //连线改变
  state.graph.addListener(mxEvent.CONNECT_CELL, (sender, evt) => {
    let edge = evt.properties.edge
    //线改到其他连接点
    if (evt.properties.previous.id !== evt.properties.terminal.id) {
      NodeUtils.changeLine(state.lines, edge.id, { id: edge.id, fromId: edge.source.id, toId: edge.target.id }, state.nodes)
    }
  })
  // 删除节点触发事件
  state.graph.addListener(mxEvent.CELLS_REMOVED, (sender, evt) => {
    nextTick(() => {
      let removeCells = evt.properties.cells

      removeCells.forEach((item) => {
        // 拿每一个cellId在jsonData中进行遍历,并进行移除
        if (item.vertex) {
          // 判断是否为组节点
          if (item.isGroup) {
            //  proxy.$modal.msg(`移除了组${item.id}`)
            //    state.jsonData['cells']['groups'].splice(state.jsonData['cells']['groups'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
          } else {
            //  proxy.$modal.msg(`移除节点${item.id}`)
            ///移除线
            rmCells(NodeUtils.removeNode(state.nodes, item.id, state.lines))
            //    state.jsonData['cells']['nodes'].splice(state.jsonData['cells']['nodes'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
          }
        } else if (item.edge) {
          //  proxy.$modal.msg('移除了线')

          NodeUtils.removeLine(state.lines, item.id, state.nodes)
          //   state.jsonData['edges'].splice(state.jsonData['edges'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
        }
        // state.jsonData.forEach(item)
      })
    })
  })
}

const blink = (cell, times, blinkColor, curColor) => {
  let color = state.nodes[cell.id].storkeColor
  let nextColor = color
  if (color === curColor) nextColor = blinkColor
  state.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, curColor, [cell])

  if (times <= 0) return
  setTimeout(function () {
    blink(cell, --times, blinkColor, nextColor)
  }, 300)
}

const validChart = () => {
  let findStart = 0
  let findEnd = 0
  let checkResults = []
  let dicFromLines = {}
  let dicToLines = {}
  const addValidResult = (msg, group) => {
    checkResults.push({ msg, group })
  }
  state.lines.forEach((line) => {
    if (!dicFromLines.hasOwnProperty(line.fromId)) dicFromLines[line.fromId] = []
    if (!dicToLines.hasOwnProperty(line.toId)) dicToLines[line.toId] = []
    dicFromLines[line.fromId].push(line)
    dicToLines[line.toId].push(line)
  })
  ///校验非条件节点
  for (let key in state.nodes) {
    let node = state.nodes[key]
    if (node.type === 'condition') continue

    if (node.type === 'start') state.startActivityId = node.id

    if (node.type === 'start') {
      ///找到开始节点
      findStart++
    } else if (node.type === 'end') {
      findEnd++
    }
    if (!['copy', 'end', 'inclusiveGw', 'exclusiveGw', 'parallelGw'].includes(node.type) && node.permission && node.permission.length === 0) {
      addValidResult(`请配置节点表单数据权限`, node.title)
    }
    if (['approve', 'deal'].includes(node.type) && node.approve.hasOwnProperty('participants')) {
      if (!['myself', 'optional', 'director', 'supervisor', 'form', 'title'].includes(node.approve.assigneeType))
        if (
          node.approve.participants.user.length === 0 &&
          node.approve.participants.role.length === 0 &&
          node.approve.participants.org.length === 0
        ) {
          addValidResult(`请配置节点审批人员`, node.title)
        }
    }

    ///只有开始节点不一定要入向连接
    if (!['start'].includes(node.type)) {
      if (!dicToLines[node.id] || dicToLines[node.id].length === 0) {
        addValidResult(`节点需要入向连接`, node.title)
      }
    }
    ///只有结束节点只需要入向连接
    if (node.type === 'end') {
      if (dicFromLines[node.id] && dicFromLines[node.id].length > 0) {
        addValidResult(`结束节点应只存在入向连接`, node.title)
      }
    } else {
      if (!dicFromLines[node.id] || dicFromLines[node.id].length === 0) {
        addValidResult(`节点需要出向连接`, node.title)
      }
    }
  }
  if (findStart == 0 || findStart > 1) {
    addValidResult('流程必须包含开始节点且唯一')
  }
  if (findEnd == 0 || findEnd > 1) {
    addValidResult('流程必须包含结束节点且唯一')
  }

  let dicRoutine = {}
  ///简单验证流程线路可行性
  if (state.startActivityId > 0) {
    let isOk = false
    const checkRoutine = (nextId: any, lineId: any) => {
      var outNode = state.nodes[nextId]
      var inNode = JSON.parse(JSON.stringify(outNode))
      if (lineId) inNode = state.nodes[lineId]
      if (dicRoutine[nextId] && lineId) {
        // if (!node.condition || !node.condition.filters || node.condition.filters.length === 0)
        //  //出向不存在
        //   if (true) {
        //     addValidResult('存在未设置条件的循环路线，请排查', node.title)
        //   }
        return
      }
      dicRoutine[nextId] = true

      if (outNode.type === 'parallelGw' || inNode?.type === 'parallelGw') {
        isOk = true
        return
      } else if (dicFromLines[nextId]) {
        let lines = dicFromLines[nextId]

        let defaults = []
        ///存在多条出向线必须设置条件
        lines.forEach((line: any) => {
          var nodeLine = state.nodes[line.id]
          //  var outNode=state.nodes[line.fromId]

          var condition = -1
          if (!nodeLine.condition) {
            condition = -1
          } else if (!nodeLine.condition.isDefault) {
            if (!nodeLine.condition.filters || nodeLine.condition.filters.length === 0) {
              condition = -1
            } else condition = 1
          } else {
            condition = 0
            defaults.push(line)
          }
          if (lines.length > 1) {
            if (condition === -1) {
              if (nodeLine.title === '') {
                {
                  nodeLine.title = '条件_' + nodeLine.id
                  setCellLabel(nodeLine.id, nodeLine.title)
                }
              }
              addValidResult('节点存在多条出向连线，请点击连线[' + nodeLine.title + ']配置条件', outNode.title)
            }
          } else {
            if (condition === 1) addValidResult('节点仅一条出向连线，请点击连线[' + nodeLine.title + ']取消条件配置', outNode.title)
          }
          // if(nodeLine.condition&&!nodeLine.condition.isDefault){

          //   }else {//默认节点

          //     defaults.push(line)
          //   }
          //   if (!nodeLine.condition || !nodeLine.condition.filters ||(nodeLine.condition.filters.length === 0) ) {
          //     if (nodeLine.title === '') {
          //       {
          //         nodeLine.title = '条件_' + nodeLine.id
          //          setCellLabel(nodeLine.id, nodeLine.title)
          //       }
          //     }
          //     addValidResult('节点存在多条出向连线，请点击连线['+nodeLine.title+']配置条件', outNode.title)
          //   }

          if (state.nodes[line.toId].type !== 'end') {
            checkRoutine(line.toId, line.id)
          } else {
            isOk = true

            return
          }
        })
        if (lines.length > 1) {
          if (defaults.length === 0) addValidResult('节点未设置默认条件，存在无法到达后续节点风险', outNode.title)
          else if (defaults.length > 1) addValidResult('节点默认条件只允许1个', outNode.title)
        }
      }
    }
    checkRoutine(state.startActivityId)
    if (!isOk) {
      addValidResult('流程路线不完整')
    }
  }

  state.validResults = checkResults
  if (state.validResults.length > 0) state.isErrorShow = true
  else {
    //      proxy.$modal.msg({
    //   message: '恭喜，校验通过！',
    //   type: 'success',
    // })
  }
  return checkResults
}

const getSetting = () => {
  return new Promise((resolve, reject) => {
    let res = validChart()

    if (res.length === 0)
      resolve({
        nodes: state.nodes,
        lines: state.lines,
        startActivityId: state.startActivityId,
        chartData: getChartXml(),
        //  ActivitiesContext: JSON.stringify(res),
        // LinesContext: JSON.stringify(dicLines),
        // LinesContext: JSON.stringify(state.lines),
      })
    else {
      reject({ msg: '流程校验错误', target: 'flowDesign' })
    }
  })
}
const openPropPanel = () => {
  if (state.curNode !== undefined) propPanelRef.value?.open()
  else {
    proxy.$modal.msgWarning('请先选中单个节点再点编辑')
  }
}
const rmCells = (ids:string) => {
  var cells = []   
  ids.forEach((id:string) => {
    var cell = getCell(id)
    if (cell) cells.push(cell)
  })

  state.graph.removeCells(cells)
}
const addCell = (cell, defineType) => {
  if (cell !== undefined) {
    var id = cell.id

    var style = state.graph.getCellStyle(cell)
    //  console.log('style:'+cell.style)
    var type = defineType || mxUtils.getValue(style, 'type', '') //cell.style//
    if (type === '') type = ''
    if (type !== '') {
      state.curCellType = type

      //       {
      //   type: "approver",
      //   content: "请设置审批人",
      //   properties: { title: '审批人',participants:{} }
      // },

      let nodeInfo: NodeInfo = {
        title: type + '_' + id,
        id: id,
        type: type,
        //   assigneeType: 'user',
        approve: {},
        condition: {},
        permission: [],
        // cellStyle:style
      }
      if (nodeInfo.type === 'start') nodeInfo.title = '开始'
      else if (nodeInfo.type === 'end') nodeInfo.title = '结束'
      else if (nodeInfo.type === 'deal') nodeInfo.title = '人工_' + nodeInfo.id
      else if (nodeInfo.type === 'approve') nodeInfo.title = '审批_' + nodeInfo.id
      else if (nodeInfo.type === 'parallelGw') nodeInfo.title = '并行_' + nodeInfo.id
      else if (nodeInfo.type === 'exclusiveGw') nodeInfo.title = '排他_' + nodeInfo.id
      else if (nodeInfo.type === 'condition') nodeInfo.title = ''

      NodeUtils.addNode(state.nodes, nodeInfo)
      setCellLabel(nodeInfo.id, nodeInfo.title)
      activeCell(id)
      // proxy.$modal.msg('添加了一个流程节点')
    } else proxy.$modal.msgWarning('添加了一个非流程节点图形')
    //  console.log(mxUtils.getValue(style,'html','none'))
  }
}
const setCellLabel = (id, label) => {
  const cell = getCell(id)
  if (cell !== null) state.graph.cellLabelChanged(cell, label)
}
const activeCell = (id) => {
  if (state.nodes[id]) {
    state.curNode = state.nodes[id]
    if (state.isShowApproval) openPropPanel()
  }
}

const updateCellStyle = (id, style) => {
  state.curNode = state.nodes[id]
  //  state.curNode.style=style
}
const getCellType = (cell) => {
  return
  //根据ID获取对应的数据 显示对应的tabpane
  var type = ''
  if (cell !== undefined) {
    var id = cell.id

    var style = state.graph.getCellStyle(cell)
    //  console.log('style:'+cell.style)
    type = mxUtils.getValue(style, 'type', '') //cell.style//

    //  console.log(mxUtils.getValue(style,'html','none'))
  }
  state.curCellType = type

  return type
}

const handleThumbnail = () => {
  // console.log('handleThumbnail')
  state.editorUiInit.actions.get('outline').funct()
  state.editorUiInit.refresh()
}
const downloadFile = (filename, text) => {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const getChartXml = () => {
  const graphXml = state.editorUiInit.editor.getGraphXml()
  const xmlObject = new XMLSerializer().serializeToString(graphXml)
  return xmlObject
}
const exportTopology = ({ name = 'topology' } = {}) => {
  downloadFile(`${name}.xml`, getChartXml())
  state.saveCurrentTopo = false
}
const saveActiveCell = (cellProperty) => {
  const { cell } = state.cellData
  var doc = mxUtils.createXmlDocument()
  var obj = doc.createElement('object')
  Object.keys(cellProperty).forEach((v) => {
    obj.setAttribute(v, cellProperty[v])
  })
  state.editorUiInit.editor.graph.getModel().setValue(cell, obj)
  state.cellProperty = false
  state.cellData = {}
}

const importModelXML = (xmlTxt) => {
  state.graph.diagramXml = xmlTxt
  // var xmlTxt=graph.diagramXml
  state.graph.getModel().beginUpdate()
  try {
    const doc = mxUtils.parseXml(xmlTxt)
    const root = doc.documentElement
    const dec = new mxCodec(root.ownerDocument)

    state.graph.getModel().clear()
    // state.view.scale = 1
    dec.decode(root, state.graph.getModel())
    //state.loadExtFont()
    // graph.updateCssTransform()
    // state.selectUnlockedLayer()
  } catch (e) {
    console.log('err', e)
  } finally {
    state.graph.getModel().endUpdate()
  }
  _restoreModel()
}

const _restoreModel = () => {
  Object.values(state.graph.getModel().cells).forEach((cell) => {
    if (cell.vertex && cell.data) {
      cell.data = JSON.parse(cell.data)
    }
  })
}

const getCell = (id) => {
  var model = state.graph.getModel()
  var cell = model.getCell(id)

  return cell
}
const parseXmlFile = (xml) => {
  if (state.graph && xml && xml.length > 10) importModelXML(xml)
  return
  const doc = mxUtils.parseXml(xml)
  //state.editorUiInit.editor.graph.setSelectionCells()
  //这种方法载入ID会变化
  state.editorUiInit.editor.graph.importModelXML(doc.documentElement)
  state.importFile = false
}
const bindEvents = (e) => {
  if (e.ctrlKey) {
    if (e.keyCode === 83) {
      state.saveCurrentTopo = true
      e.preventDefault()
    }
    if (e.keyCode == 77) {
      e.preventDefault()
    }
  }
}
onMounted(() => {
  {
    const self = this
    const editorUiInit = EditorUi.prototype.init
    ///后续节点提示
    EditorUi.prototype.getCellsForShapePicker = function (cell) {
      var createVertex = mxUtils.bind(this, function (style, w, h, value) {
        return this.editor.graph.createVertex(null, null, value || '', 0, 0, w || 120, h || 60, style, false)
      })

      return [
        createVertex('shape=bpmShape;type=parallelGw;verticalLabelPosition=bottom;strokeColor=#0082cf;fillColor=#a6cce5', 50, 50),
        createVertex('shape=bpmShape;type=exclusiveGw;verticalLabelPosition=bottom;strokeColor=#0082cf;fillColor=#a6cce5', 50, 50),
      ]
    }
    EditorUi.prototype.init = function () {
      editorUiInit.apply(this, arguments)
      this.actions.get('export').setEnabled(false)
      this.actions.addAction(
        'editData',
        function () {
          openPropPanel()
        },
        null,
        null,
        'Cmd+M'
      )
    }

    mxResources.loadDefaultBundle = false
    const bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) || mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage)

    mxUtils.getAll(
      [bundle, '/resources/default.xml'],
      (xhr) => {
        // 加载汉化文件
        mxResources.parse(xhr[0].getText())
        const themes = {}
        themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement()
        // 启动

        state.editorUiInit = new EditorUi(new Editor(urlParams['chrome'] == '0', themes), editorContainerRef.value)
        //  state.$emit('onInitEditGraph', state.editorUiInit)

        state.graph = state.editorUiInit.editor.graph

        mxEdgeHandler.prototype.isConnectableCell = () => false

        // 拖拽过程对齐线
        mxGraphHandler.prototype.guidesEnabled = true

        // 禁止游离线条
        state.graph.setDisconnectOnMove(false)
        state.graph.setAllowDanglingEdges(false)
        mxGraph.prototype.isCellMovable = (cell) => !cell.edge
        //禁止重复连接
        state.graph.setMultigraph(false)

        // 允许连线的目标和源是同一元素
        state.graph.setAllowLoops(false)
        // 禁止调整线条弯曲度
        //state.graph.setCellsBendable(false);

        // 禁止从将label从线条上拖离
        mxGraph.prototype.edgeLabelsMovable = false
        // var highlight = new mxCellTracker(state.graph, '#00FF00');
        // 连接边校验 禁止重复的连线
        // mxGraph.prototype.isValidConnection = (source, target) => {

        //   const sourceElementId = source.id;
        //   const targetElementId = target.id;

        //   let res=  state.lines.filter((item)=>{ return item.fromId==sourceElementId&&item.toId==targetElementId} )

        //   if(res.length>0)
        //   {
        //     proxy.$modal.msg('禁止重复的连线')
        //       return false;
        //     }
        //   if (sourceElementId === targetElementId) {

        //   return false;
        //   }
        //   // // 如果源点是智爷，终点必须是 皮卡丘 或 我是皮卡丘的超级超级进化
        //   // if (sourceElementId === 1) {
        //   //   return targetElementId === 2 || targetElementId === 3;
        //   // }

        //   // // 如果终点是智爷同理
        //   // if (targetElementId === 1) {
        //   //   return sourceElementId === 2 || sourceElementId === 3;
        //   // }

        //   return true;
        // };
        addEventHandler()

        // state.graph.addListener(mxEvent.ADD_CELLS, (sender, evt) => {
        //   console.log('ADD_CELLS')

        // })

        state.graph.addMouseListener({
          currentState: null,
          previousStyle: null,

          mouseDown: (sender, evt) => {
            if (!evt.state) {
              //  console.log('点击了画布')

              state.curNode = undefined
              return
            } else if (evt.state.cell.edge) {
              activeCell(evt.state.cell.id)
              return
            }
            const cell = evt.state.cell

            let clickNormalType = false

            activeCell(cell.id)
            if (cell.style !== undefined) {
              clickNormalType = cell.style.includes('normalType')
            }
            if (clickNormalType) {
              // 使用 MxGraph 事件中心，触发自定义事件
              state.graph.fireEvent(new MxEventObject(MxEvent.NORMAL_TYPE_CLICKED, 'cell', evt))
            } else {
              return
            }
          },

          mouseMove: (sender, me) => {
            // console.log('mouseMove')
            state.graphX = Math.ceil(me.graphX)
            state.graphY = me.graphY
          },

          mouseUp: (sender, evt) => {
            state.cellData = {}
            if (evt.sourceState == undefined) {
              return
            } else {
              //  state.isPropPanel=true
              var cell = evt.sourceState.cell
              //  var cell = state.graph.getSelectionCell();
              if (cell) {
                cell.vertex ? (state.isNode = true) : (state.isNode = false)
                var getcellStyle = cell.getStyle() ? cell.getStyle() : null
                if (!state.isNode) {
                  getcellStyle ? (state.edgeStyle = getcellStyle) : 'orthogonalEdgeStyle'
                }

                //获取cell
                // const cell = graph.getSelectionCell();
                //const value = state.graph.getModel().getValue(cell);
                //state.curCellId=cell.id
                // state.cellData={cell,value}

                getCellType(cell)
                if (getcellStyle) {
                  var arr = getcellStyle.split(';')
                  // arr.pop()
                  var styleObject = {}
                  arr.forEach((item) => {
                    styleObject[item.split('=')[0]] = item.split('=')[1]
                  })
                  state.cellStyle = styleObject

                  updateCellStyle(cell.id, state.cellStyle)
                  // if (state.isNode) {

                  // }
                }
              } else {
                proxy.$modal.msgError('请选择节点或者连线')
              }
            }
          },
        })
        //state.eventHandler()

        //  setTimeout(function () {
        nextTick(() => {
          document.getElementsByClassName('geDiagramContainer')[0].style =
            'inset: 41px 240px 0px 220px; touch-action: none; cursor: default; overflow: hidden;'
          document.getElementsByClassName('geSidebarContainer')[0].style = 'left: 0px; top: 41px; width: 220px; bottom: 0px;'

          parseXmlFile(props.conf.chartData)
          //   }, 500)
        })
      },
      (e) => {
        proxy.$modal.msgError('当前浏览器不支持')
      }
    )
  }
})

watch(
  () => props.conf,
  (val) => {
    if (typeof val === 'object' && val.chartData !== undefined) {
      // let ls:any=[]
      // for(var key in conf.lines)
      // {
      //   console.log(key,ls)
      //   ls.concat( conf.lines[key])
      //   console.log(key,ls)
      // }
      state.lines = val.lines
      state.nodes = val.nodes
      parseXmlFile(val.chartData)
    }
  },
  {
    immediate: true,
  }
)
const getNodes=()=>{return state.nodes}
// 将这个方法暴露出去,这样父组件就可以使用了哈
defineExpose({
  getSetting,getNodes
})
</script>
<style lang="scss" scoped>
.editMainContainer {
  width: 100%;
  height: 100%;
  position: relative;
  .editLegendHeader {
    position: absolute;
    top: 0;
    left: 350px;
    z-index: 10;
    font-size: 12px;
    height: 40px;
    display: flex;
    color: #2d3e53;
    align-items: center;
    .legendItem {
      cursor: pointer;
      font-size: 12px;
      margin-right: 15px;
      &.disable {
        opacity: 0.2;
      }
    }
  }
}
.graphEditorContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>