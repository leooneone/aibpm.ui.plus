<template>
  <div class="editMainContainer">
    <div
      v-show="isPropPanel"
      style="position: absolute; top: 41px; right: 0px; z-index: 20; font-size: 12px !important; width: 640px; background-color: white"
    >
      <NodeProp ref="propPanelRef" :node="curNode" :fields="fields" />
    </div>
    <div class="editLegendHeader" v-if="enableEditing">
      <div @click="handleThumbnail" class="legendItem">
        <img :src="coordinateSvg" width="10" alt="" />
        缩略图{{ Object.keys(nodes).length }}|{{ lines.length }}
      </div>

      <div class="legendItem" @click="openEditCellDialog">
        <img :src="editSvg" width="10" alt="" />
        <el-button plain type="primary" icon="ele-Edit">审批节点配置</el-button>
      </div>
    </div>
    <div class="graphEditorContainer" ref="editorContainer" @keydown="bindEvents"></div>

    <EditCellProperty
      :isVisible="cellProperty"
      :detailData="cellData"
      v-on:onDialogClose="
        () => {
          cellProperty = false
          cellData = {}
        }
      "
      v-on:onDialogConfirm="saveActiveCell"
    />
    <el-dialog v-model="isErrorShow" title="流程设计器验证">
      <el-alert
        :type="item.type || 'error'"
        show-icon
        v-for="item in validResults"
        :title="`【` + (item.group || '全局') + `】` + item.msg"
        style="margin-bottom: 10px"
        :closable="false"
        :close-text="`【` + item.group + `】`"
      ></el-alert>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isErrorShow = false">知道了</el-button>
        </span>
      </template>
    </el-dialog>
    <SaveTopology :isVisible="saveCurrentTopo" v-on:onDialogClose="saveCurrentTopo = false" v-on:onDialogConfirm="exportTopology" />
    <ImportFile :isVisible="importFile" v-on:onDialogClose="importFile = false" v-on:onDialogConfirm="parseXmlFile" />
  </div>
</template>
<script lang="ts">
import SaveTopology from './SaveTopology/index.vue'
import EditCellProperty from './EditCellProperty/index.vue'
import NodeProp from './Prop/index.vue'
import './styles/reset.css'
import './styles/grapheditor.css'

import ImportFile from './ImportFile/index.vue'
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
export default {
  name: 'flow',
  components: { NodeProp, SaveTopology, EditCellProperty, ImportFile },
  props: {
    conf: Object,
    fields: Array || [],
    enableEditing: { type: Boolean, default: true },
  },

  data() {
    return {
      workflow: {},
      isErrorShow: false,
      validResults: [],
      startActivityId: 0,
      cellType: '',
      nodes: {},
      lines: [],
      curNode: {},
      workflowTypes: [
        { label: '开始', value: 'start' },
        { label: '结束', value: 'end' },
        { label: '条件', value: 'condition' },
        { label: '传阅', value: 'circulate' },
        { label: '审批', value: 'approver' },
      ],
      curCellType: '',
      ///是否使用属性面板
      isPropPanel: true,
      graph: null,
      topoVal: '',
      saveCurrentTopo: false,
      cellProperty: false,
      importFile: false,
      cellData: {},

      curCellId: {},
    }
  },
  computed: {},
  // 父组件中返回要传给下级的数据
  provide() {
    return {
      titleChange: this.textValueChange,
    }
  },
  methods: {
    show() {
      //this.graph.model.execute('show')
    },
    // 修改节点文本内容
    textValueChange(value) {
      var cells = this.graph.getSelectionCells()
      console.log(value, '节点文本新内容', this.graph)
      this.graph.cellLabelChanged(cells[0], value)
    },
    addEventHandler() {
      // 给graph添加事件
      // 监听自定义事件
      // this.graph.addListener(mxEvent.NORMAL_TYPE_CLICKED, (sender, evt) => {
      //   let cell = evt.properties.cell.state.cell;
      //   this.currentNormalType = cell;
      // });
      // this.graph.addListener(mxEvent.VERTEX_START_MOVE, (sender, evt) => {
      //   console.log('VERTEX_START_MOVE', sender, evt);
      // });
      var that = this
      this.graph.addListener(mxEvent.CELLS_ADDED, (sender, evt) => {
        const cell = evt.properties.cells[0]

        if (this.graph.isPart(cell)) {
          return
        }

        if (cell.vertex) {
          that.addCell(cell)
        } else if (cell.edge) {
          that.addCell(cell, 'condition')
          this.$message.info('添加了一条线，起点：' + cell.source.id + '，终点：' + cell.target.id)
          NodeUtils.addLine(this.lines, { id: cell.id, fromId: cell.source.id, toId: cell.target.id })
        }
      })

      // 画布平移事件
      // this.graph.addListener(mxEvent.PAN, (sender, evt) => {
      //   console.log('画布平移了', sender, evt)
      // })
      var that = this
      var cellLabelChanged = this.graph.cellLabelChanged
      this.graph.cellLabelChanged = function (cell, newValue, autoSize) {
        if (that.nodes[cell.id].title !== newValue) that.nodes[cell.id].title = newValue
        cellLabelChanged.apply(this, arguments)
      }
      var that = this
      // this.graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt){
      //   var cell = evt.getProperty('cell');

      //   if (cell!=null){
      //     that.activeCell(cell.id)
      //     that.openPropPanel()
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
      // this.graph.addListener(mxEvent.ADD_CELLS, (sender, evt) => {

      //   this.$nextTick(() => {

      //     console.log('mxEvent.ADD_CELLS,')
      //     let addCell = evt.properties.cells[0];
      //     if (addCell.vertex) {
      //       // 判断是否为组节点
      //       if (addCell.isGroup) {
      //         this.$message.info('添加了一个组');
      //         let groupObj = _.pick(addCell, ['id', 'title', 'parent', 'geometry']);
      //         this.jsonData['cells']['groups'].push(groupObj);
      //       } else {
      //         let nodeObj = _.pick(addCell, ['id', 'title', 'parent', 'geometry']);
      //         this.jsonData['cells']['nodes'].push(nodeObj);
      //         this.$message.info('添加了一个节点');
      //       }
      //       //  向jsonData中更新数据
      //     } else if (addCell.edge) {
      //       console.log(addCell)
      //       let lineObj = _.pick(addCell, ['id', 'edge', 'source', 'parent', 'geometry', 'value']);
      //       this.jsonData['edges'].push(lineObj);
      //       this.$message.info('添加了一条线');
      //     }
      //   })
      // });

      //连线改变
      this.graph.addListener(mxEvent.CONNECT_CELL, (sender, evt) => {
        let edge = evt.properties.edge
        //线改到其他连接点
        if (evt.properties.previous.id !== evt.properties.terminal.id) {
          NodeUtils.changeLine(this.lines, edge.id, { id: edge.id, fromId: edge.source.id, toId: edge.target.id }, this.nodes)
        }
      })
      var that = this
      // 删除节点触发事件
      this.graph.addListener(mxEvent.CELLS_REMOVED, (sender, evt) => {
        this.$nextTick(() => {
          let removeCells = evt.properties.cells

          removeCells.forEach((item) => {
            // 拿每一个cellId在jsonData中进行遍历,并进行移除
            if (item.vertex) {
              // 判断是否为组节点
              if (item.isGroup) {
                this.$message.info(`移除了组${item.id}`)
                //    this.jsonData['cells']['groups'].splice(this.jsonData['cells']['groups'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
              } else {
                this.$message.info(`移除节点${item.id}`)
                ///移除线
                that.removeCells(NodeUtils.removeNode(this.nodes, item.id, this.lines))
                //    this.jsonData['cells']['nodes'].splice(this.jsonData['cells']['nodes'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
              }
            } else if (item.edge) {
              this.$message.info('移除了线')

              NodeUtils.removeLine(this.lines, item.id, this.nodes)
              //   this.jsonData['edges'].splice(this.jsonData['edges'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
            }
            // this.jsonData.forEach(item)
          })
        })
      })
    },
    blink(cell, times, blinkColor, curColor) {
      let color = this.nodes[cell.id].storkeColor
      let nextColor = color
      if (color === curColor) nextColor = blinkColor
      this.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, curColor, [cell])

      if (times <= 0) return
      var that = this
      setTimeout(function () {
        that.blink(cell, --times, blinkColor, nextColor)
      }, 300)
    },

    validChart() {
      let findStart = 0
      let findEnd = 0
      let checkResults = []
      let dicFromLines = {}
      let dicToLines = {}
      const addValidResult = (msg, group) => {
        checkResults.push({ msg, group })
      }
      this.lines.forEach((line) => {
        if (!dicFromLines.hasOwnProperty(line.fromId)) dicFromLines[line.fromId] = []
        if (!dicToLines.hasOwnProperty(line.toId)) dicToLines[line.toId] = []
        dicFromLines[line.fromId].push(line)
        dicToLines[line.toId].push(line)
      })
      ///校验非条件节点
      for (let key in this.nodes) {
        let node = this.nodes[key]
        if (node.type === 'condition') continue

        if (node.type === 'start') this.startActivityId = node.id

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
      if (this.startActivityId > 0) {
        let isOk = false
        const checkRoutine = (nextId: any, lineId: any) => {
          var outNode = this.nodes[nextId]
          var inNode = JSON.parse(JSON.stringify(outNode))
          if (lineId) inNode = this.nodes[lineId]
          if (dicRoutine[nextId] && lineId) {
            // if (!node.condition || !node.condition.filters || node.condition.filters.length === 0)
            //  //出向不存在
            //   if (true) {
            //     addValidResult('存在未设置条件的循环路线，请排查', node.title)
            //   }
            console.log('return')
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
              var nodeLine = this.nodes[line.id]
              console.log('nodeLine', nodeLine)
              //  var outNode=this.nodes[line.fromId]

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
                      this.setCellLabel(nodeLine.id, nodeLine.title)
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
              //         this.setCellLabel(nodeLine.id, nodeLine.title)
              //       }
              //     }
              //     addValidResult('节点存在多条出向连线，请点击连线['+nodeLine.title+']配置条件', outNode.title)
              //   }

              if (this.nodes[line.toId].type !== 'end') {
                checkRoutine(line.toId, line.id)
              } else {
                isOk = true

                console.log('return111')
                return
              }
            })
            if (lines.length > 1) {
              if (defaults.length === 0) addValidResult('节点未设置默认条件，存在无法到达后续节点风险', outNode.title)
              else if (defaults.length > 1) addValidResult('节点默认条件只允许1个', outNode.title)
            }
          }
        }
        checkRoutine(this.startActivityId)
        if (!isOk) {
          addValidResult('流程路线不完整')
        }
      }

      this.validResults = checkResults
      if (this.validResults.length > 0) this.isErrorShow = true
      else {
        //       this.$message({
        //   message: '恭喜，校验通过！',
        //   type: 'success',
        // })
      }
      console.log('checkResults', checkResults)
      return checkResults
    },

    getSetting() {
      return new Promise((resolve, reject) => {
        let res = this.validChart()

        if (res.length === 0)
          resolve({
            nodes: this.nodes,
            lines: this.lines,
            startActivityId: this.startActivityId,
            chartData: this.getChartXml(),
            //  ActivitiesContext: JSON.stringify(res),
            // LinesContext: JSON.stringify(dicLines),
            // LinesContext: JSON.stringify(this.lines),
          })
        else {
          reject({ msg: '流程校验错误', target: 'flowDesign' })
        }
      })
    },
    openPropPanel() {
      if (this.curNode !== undefined) this.$refs['propPanelRef'].open()
      else {
        this.$message.warning('请先选中单个节点再点编辑')
      }
    },
    removeCells(ids) {
      var cells = []
      ids.forEach((id) => {
        var cell = this.getCell(id)
        if (cell) cells.push(cell)
      })

      this.graph.removeCells(cells)
    },
    addCell(cell, defineType) {
      if (cell !== undefined) {
        var id = cell.id

        var style = this.graph.getCellStyle(cell)
        //  console.log('style:'+cell.style)
        var type = defineType || mxUtils.getValue(style, 'type', '') //cell.style//
        if (type === '') type = ''
        if (type !== '') {
          this.curCellType = type

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

          NodeUtils.addNode(this.nodes, nodeInfo)
          this.setCellLabel(nodeInfo.id, nodeInfo.title)
          this.activeCell(id)
          this.$message.info('添加了一个流程节点')
        } else this.$message.warning('添加了一个非流程节点图形')
        //  console.log(mxUtils.getValue(style,'html','none'))
      }
    },
    setCellLabel(id, label) {
      const cell = this.getCell(id)
      if (cell !== null) this.graph.cellLabelChanged(cell, label)
    },
    activeCell(id) {
      if (this.nodes[id]) this.curNode = this.nodes[id]
      // this.openPropPanel()
    },

    updateCellStyle(id, style) {
      this.curNode = this.nodes[id]
      //  this.curNode.style=style
    },
    getCellType(cell) {
      return
      //根据ID获取对应的数据 显示对应的tabpane
      var type = ''
      if (cell !== undefined) {
        var id = cell.id

        var style = this.graph.getCellStyle(cell)
        //  console.log('style:'+cell.style)
        type = mxUtils.getValue(style, 'type', '') //cell.style//

        //  console.log(mxUtils.getValue(style,'html','none'))
      }
      this.curCellType = type

      return type
    },
    togglePropPanel() {
      this.isPropPanel = !this.isPropPanel
    },
    onProp(isProp) {
      if (isProp) {
        //隐藏格式面板,显示属性面板
      }
    },
    handleThumbnail() {
      // console.log('handleThumbnail')
      this.editorUiInit.actions.get('outline').funct()
      this.editorUiInit.refresh()
    },
    downloadFile(filename, text) {
      const element = document.createElement('a')
      element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },

    getChartXml() {
      const graphXml = this.editorUiInit.editor.getGraphXml()
      const xmlObject = new XMLSerializer().serializeToString(graphXml)
      return xmlObject
    },
    exportTopology({ name = 'topology' } = {}) {
      this.downloadFile(`${name}.xml`, this.getChartXml())
      this.saveCurrentTopo = false
    },
    saveActiveCell(cellProperty) {
      const { cell } = this.cellData
      var doc = mxUtils.createXmlDocument()
      var obj = doc.createElement('object')
      Object.keys(cellProperty).forEach((v) => {
        obj.setAttribute(v, cellProperty[v])
      })
      this.editorUiInit.editor.graph.getModel().setValue(cell, obj)
      this.cellProperty = false
      this.cellData = {}
    },
    openEditCellDialog() {
      this.openPropPanel()
      return
      const graph = this.editorUiInit.editor.graph
      const cell = graph.getSelectionCell()
      const value = graph.getModel().getValue(cell)

      // console.log(value)
      if (!cell) {
        this.$message.warning('请先选择组件')
        return
      }
      this.cellProperty = true
      this.cellData = { cell, value }
    },
    importModelXML(xmlTxt) {
      //console.log(xmlTxt)
      this.graph.diagramXml = xmlTxt
      // var xmlTxt=graph.diagramXml
      this.graph.getModel().beginUpdate()
      try {
        const doc = mxUtils.parseXml(xmlTxt)
        const root = doc.documentElement
        const dec = new mxCodec(root.ownerDocument)

        this.graph.getModel().clear()
        // this.view.scale = 1
        dec.decode(root, this.graph.getModel())
        //this.loadExtFont()
        // graph.updateCssTransform()
        // this.selectUnlockedLayer()
      } catch (e) {
        console.log('err', e)
      } finally {
        this.graph.getModel().endUpdate()
      }
      this._restoreModel()
    },

    _restoreModel() {
      Object.values(this.graph.getModel().cells).forEach((cell) => {
        if (cell.vertex && cell.data) {
          cell.data = JSON.parse(cell.data)
        }
      })
    },

    getCell(id) {
      var model = this.graph.getModel()
      var cell = model.getCell(id)

      return cell
    },
    parseXmlFile(xml) {
      this.importModelXML(xml)
      return
      const doc = mxUtils.parseXml(xml)
      //this.editorUiInit.editor.graph.setSelectionCells()
      //这种方法载入ID会变化
      this.editorUiInit.editor.graph.importModelXML(doc.documentElement)
      this.importFile = false
    },
    bindEvents(e) {
      if (e.ctrlKey) {
        if (e.keyCode === 83) {
          this.saveCurrentTopo = true
          e.preventDefault()
        }
        if (e.keyCode == 77) {
          e.preventDefault()
        }
      }
    },
  },
  mounted() {
    const self = this
    const container = this.$refs.editorContainer
    const editorUiInit = EditorUi.prototype.init
    const $Message = this.$message

    EditorUi.prototype.getCellsForShapePicker = function (cell) {
      var createVertex = mxUtils.bind(this, function (style, w, h, value) {
        return this.editor.graph.createVertex(null, null, value || '', 0, 0, w || 120, h || 60, style, false)
      })

      return [
        createVertex('shape=bpmShape;type=parallelGw;verticalLabelPosition=bottom;strokeColor=#0082cf;fillColor=#a6cce5', 50, 50, '并行网关'),
        createVertex('shape=bpmShape;type=exclusiveGw;verticalLabelPosition=bottom;strokeColor=#0082cf;fillColor=#a6cce5', 50, 50, '排他网关'),
      ]
    }
    EditorUi.prototype.init = function () {
      editorUiInit.apply(this, arguments)
      this.actions.get('export').setEnabled(false)
      this.actions.addAction(
        'editData',
        function () {
          self.openEditCellDialog()
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
        this.editorUiInit = new EditorUi(new Editor(urlParams['chrome'] == '0', themes), container)
        this.$emit('onInitEditGraph', this.editorUiInit)

        this.graph = this.editorUiInit.editor.graph

        mxEdgeHandler.prototype.isConnectableCell = () => false

        // 拖拽过程对齐线
        mxGraphHandler.prototype.guidesEnabled = true

        // 禁止游离线条
        this.graph.setDisconnectOnMove(false)
        this.graph.setAllowDanglingEdges(false)
        mxGraph.prototype.isCellMovable = (cell) => !cell.edge
        //禁止重复连接
        this.graph.setMultigraph(false)

        // 允许连线的目标和源是同一元素
        this.graph.setAllowLoops(false)
        // 禁止调整线条弯曲度
        //this.graph.setCellsBendable(false);

        // 禁止从将label从线条上拖离
        mxGraph.prototype.edgeLabelsMovable = false
        // var highlight = new mxCellTracker(this.graph, '#00FF00');
        // 连接边校验 禁止重复的连线
        // mxGraph.prototype.isValidConnection = (source, target) => {

        //   const sourceElementId = source.id;
        //   const targetElementId = target.id;

        //   let res=  this.lines.filter((item)=>{ return item.fromId==sourceElementId&&item.toId==targetElementId} )

        //   if(res.length>0)
        //   {
        //     this.$message('禁止重复的连线')
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
        this.addEventHandler()

        var that = this

        // this.graph.addListener(mxEvent.ADD_CELLS, (sender, evt) => {
        //   console.log('ADD_CELLS')

        // })

        this.graph.addMouseListener({
          currentState: null,
          previousStyle: null,

          mouseDown: (sender, evt) => {
            if (!evt.state) {
              console.log('点击了画布')

              this.curNode = undefined
              return
            } else if (evt.state.cell.edge) {
              console.log('点击了连线')
              return
            }

            const cell = evt.state.cell
            let clickNormalType = false

            this.activeCell(cell.id)
            if (cell.style !== undefined) {
              clickNormalType = cell.style.includes('normalType')
            }
            if (clickNormalType) {
              // 使用 MxGraph 事件中心，触发自定义事件
              this.graph.fireEvent(new MxEventObject(MxEvent.NORMAL_TYPE_CLICKED, 'cell', evt))
            } else {
              return
            }
          },

          mouseMove: (sender, me) => {
            // console.log('mouseMove')
            this.graphX = Math.ceil(me.graphX)
            this.graphY = me.graphY
          },

          mouseUp: (sender, evt) => {
            that.cellData = {}
            if (evt.sourceState == undefined) {
              return
            } else {
              //  this.isPropPanel=true
              var cell = evt.sourceState.cell
              //  var cell = this.graph.getSelectionCell();
              if (cell) {
                cell.vertex ? (this.isNode = true) : (this.isNode = false)
                var getcellStyle = cell.getStyle() ? cell.getStyle() : null
                if (!this.isNode) {
                  getcellStyle ? (this.edgeStyle = getcellStyle) : 'orthogonalEdgeStyle'
                }

                //获取cell
                // const cell = graph.getSelectionCell();
                //const value = that.graph.getModel().getValue(cell);
                //that.curCellId=cell.id
                // that.cellData={cell,value}

                that.getCellType(cell)
                if (getcellStyle) {
                  var arr = getcellStyle.split(';')
                  // arr.pop()
                  var styleObject = {}
                  arr.forEach((item) => {
                    styleObject[item.split('=')[0]] = item.split('=')[1]
                  })
                  this.cellStyle = styleObject

                  this.updateCellStyle(cell.id, this.cellStyle)
                  // if (this.isNode) {

                  // }
                }
              } else {
                this.$message.error('请选择节点或者连线')
              }
            }
          },
        })
        //加载初始化图形
        if (typeof this.conf === 'object' && this.conf.chartData !== undefined) {
          console.log('load line', this.conf)
          // let ls:any=[]
          // for(var key in this.conf.lines)
          // {
          //   console.log(key,ls)
          //   ls.concat( this.conf.lines[key])
          //   console.log(key,ls)
          // }
          this.lines = this.conf.lines
          this.nodes = this.conf.nodes
          this.parseXmlFile(this.conf.chartData)
        }

        //this.eventHandler()
        var that = this
        //  setTimeout(function () {
        this.$nextTick(() => {
          document.getElementsByClassName('geDiagramContainer')[0].style =
            'inset: 41px 240px 0px 220px; touch-action: none; cursor: default; overflow: hidden;'
          document.getElementsByClassName('geSidebarContainer')[0].style = 'left: 0px; top: 41px; width: 220px; bottom: 0px;'
          //   }, 500)
        })
      },
      (e) => {
        $Message.error('当前浏览器不支持')
      }
    )
  },
}
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