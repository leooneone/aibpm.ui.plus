<template>
  <div class="editMainContainer">
    <div
      v-show="state.isPropPanel"
      style="position: absolute; top: 41px; right: 0px; z-index: 20; font-size: 12px !important; width: 640px; background-color: white"
    > 
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
        
        show-icon
        v-for="(item, index) in state.validResults"
        :type="item.type || 'error'"
        :key="index"
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
     </div>
</template>
<script lang="ts" setup>
import {   ref, reactive, getCurrentInstance, onMounted, watch, nextTick, defineAsyncComponent, provide } from 'vue'
 
 const EditCellProperty = defineAsyncComponent(() => import('./EditCellProperty/index.vue'))  
import './styles/reset.css'
import './styles/grapheditor.css'

import coordinateSvg from '/@/assets/coordinate.svg'
 
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

  conf: { type: Object, default: () => {} },
  fields: { type: Array, default: ()=>[] },
  conditions: { type: Array, default:()=> [] },
  enableEditing: { type: Boolean, default: true },
})

const state = reactive({
  isShowApproval: true,
  enableEditing: true,
  isErrorShow: false,
  validResults: [] as any,
  startActivityId: 0,
  nodes: {},
  lines: [],
  curNode: {},

  curCellType: '',
  ///是否使用属性面板
  isPropPanel: true,
  graph: null as any,
  saveCurrentTopo: false,
  cellProperty: false,
  importFile: false,
  cellData: {},

  curCellId: {},
})

// 修改节点文本内容
const textValueChange = (value:any) => {
  var cells = state.graph.getSelectionCells()
  state.graph.cellLabelChanged(cells[0], value)
}
provide('titleChange', textValueChange)
  

const getSetting = () => {
  return new Promise((resolve, reject) => {
    let res =[]

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