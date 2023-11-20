<template>
    <section>
      <DiagramFormPanel ref="diagramFormRef" />
 
      <div ref="graphContainer" style="height: 100%" />
    </section>
  </template>
  
  <script lang="ts" setup>
  import { genGraph } from './graph/Graph.js'
  
  import { DiagramApi } from '/@/api/mcs/Diagram'
  import { ref, reactive, computed, onMounted, watch, getCurrentInstance, onUnmounted, defineAsyncComponent, provide } from 'vue'
  import { DeviceListOutput, PageInputDeviceGetPageDto } from '/@/api/mcs/data-contracts'
  
  import eventBus from '/@/utils/mitt'
  import { storeToRefs } from 'pinia'
  import { useMCSInfo } from '/@/stores/mcs'
  import pinia from '/@/stores/index'
  
  import { useAlarmConfig } from '/@/stores/alarm'
  
  const { alarms } = storeToRefs(useAlarmConfig()) // useAlarmConfig(pinia)
  const DiagramFormPanel = defineAsyncComponent(() => import('./components/diagram-form.vue'))
  const diagramFormRef = ref()  
  const graphContainer = ref()
  
  const props = defineProps({
    id: { type: Number },
    isEditMode: { type: Boolean, default: false },
  })
  let graph = null
  const cursors = {}
  // /设置光标
  const setCursor = () => {
    const oldGetCursorForCell = mxGraph.prototype.getCursorForCell
    graph.getCursorForCell = function (...args) {
      const [cell] = args
      if (cursors[cell.id] === undefined || cursors[cell.id] === null) {
        var _devId = cell.getAttribute('devId')
  
        if (_devId !== undefined) {
          cursors[cell.id] = 'pointer'
        } else {
          cursors[cell.id] = ''
        }
      }
      if (cursors[cell.id] === 'pointer') {
        return 'pointer'
      } else {
        oldGetCursorForCell.apply(state, args)
      }
      /*   return cell.style.includes('normalType')
        ? 'pointer'
        : oldGetCursorForCell.apply(state, args)*/
    }
  }
  
  const state = reactive({
    ///用于缓存设备状态
    deviceStates: {},
    shapes: {},
    showIdFormItem: false,
    deviceId: 0,
    prop: 'tickerTime',
    idForm: { oldId: null, newId: '', show: false },
    selectedCell: null,
    myGraph: null,
    form: {},
    showDialog: {
      device: false,
      ant: false,
    },
    moved: false,
    test: 0,
    dialogVisible: false,
    ms: 1000,
    // devices: { 'LTUC01': 243816079835205, 'LTTWTA01': 389274366869573, 'LTACU': 242518810660933,
    //   'LTDTR': 243818724290629, 'LTDC01': 389274366869573, '11259': 249669945020485 },
  
    tpls: {},
  })
  watch(
    () => alarms,
    (val) => {
      setDevice()
       
      return
    },
    {
      //  immediate: true,
      deep: true,
    }
  )
 
  
  onMounted((id: any) => {
    /* setInterval(() => {
        state.test = Math.random()
      }, state.ms)*/
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error('Browser is not supported!', 200, false)
    }
  
    new DiagramApi()
      .get({ id: props.id })
      .then((res) => {
        if (res.success && res.data) {
          state.form = res.data
          state.shapes = JSON.parse(state.form.shapes) || {}
          mxConstants.SHADOWCOLOR = '#e0e0e0'
          graph = genGraph(graphContainer.value) // new mxGraph(state.$refs.graphContainer)//
  
          // Adds a highlight on the cell under the mousepointer
          // new mxCellTracker(graph)
  
          graph.setPanning(true)
  
          setCursor() 
          state.myGraph = graph
          graph.setTooltips(true)
          graph.setEnabled(false)
          graph.setHtmlLabels(true) 
          graph.importModelXML(res.data.content)
       
  
          window.addEventListener('resize', function () {
            state.myGraph.center(true, false)
  
            state.myGraph.fit() 
          })
  
         
          graph.addListener(window.mxEvent.DOUBLE_CLICK, (_sender, _evt) => {
            const mxcell = _evt.properties.cell
            const id = mxcell.id
            if (id === 'Satellite') {
              graph.updateCellId(mxcell, 'Satellite')
            } else {
              console.log('cell：' + id + '被双击')
            }
            // 替换ID
          })
          graph.addListener(window.mxEvent.CLICK, (_sender, _evt) => {
            // state.eventDebug(_evt);
            if (_evt.properties.cell) {
              const mxcell = _evt.properties.cell
              const shapeId = mxcell.id
  
              if (props.isEditMode) {
                state.selectedCell = mxcell
                state.idForm.oldId = shapeId
                state.idForm.show = true
                if (!state.shapes[shapeId]) state.shapes[shapeId] = {}
                diagramFormRef.value.open(id, state.shapes[shapeId])
                return
              }
  
              window.curCell = mxcell
              window.graph = graph
              if (!state.shapes[shapeId]) return
  
              window.myState = graph.view.getState(mxcell)
              window.myShape = state.shapes[shapeId]
              var devId = state.shapes[shapeId].deviceId
              if (devId) {
                //var lbl = mxcell.getAttribute('label')
                state.deviceId = devId 
                return
              }
            }
          })
        }
      })
      .finally(() => {
        /* setTimeout(() => {
         state.cancelLoading = false
        }, 500)*/
      })
    
  })
  
  const setDevice = () => {
    var graph = state.myGraph
    if (graph === undefined || graph === null) {
      return
    } 
    //  var tickerStatus = tickers.value['DeviceStatus']
    // if (tickerStatus)
    {
      ///遍历所有的图形 ，看否有数据更新
      for (var shapeId in state.shapes) {
        var shape = state.shapes[shapeId]
        if (shape.deviceId && shape.deviceId > 0) {
          var dev = alarms.value.mcs?.devices[shape.deviceId]
          if (dev) {
            var sts = { state: 0, level: dev?.maxLevel }
            updateCellLayoutWithLevel(shapeId, dev?.maxLevel)
          } 
          continue
          
        }
      }
    }
    return
    
  } 
  
  const cancel = () => {
    state.idForm.show = false
  } 
  
  const setCellStyle = (cell, color) => {
    var style = graph.getModel().getStyle(cell)
    var newStyle = mxUtils.setStyle(style, mxConstants.STYLE_FILLCOLOR, color)
    var cs = new Array()
    cs[0] = cell
    graph.setCellStyle(newStyle, cs)
  }
  const setCellWarnning = (cell) => {
    //    graph.addOverlay(cell, 'WARNING/ERROR')
    graph.setCellWarning(cell, '<b>Warning:</b>:')
  }
  
  const updateCellLayoutWithLevel = (shapeId, level) => {
    var graph = state.myGraph
  
    if (graph) {
      var cell = graph.getModel().getCell(shapeId)
      graph.clearCellOverlays(cell)
      var color = '#f5f5f5'
      // isconnected
      ///没有启动
  
      if (level >= 4) {
        color = 'red'
        setCellWarnning(cell)
      } else if (level > 0) {
        color = 'yellow'
      } else if (level < 0) {
        color = '#909399'
      } else {
        color = '#dae8fc'
      }
  
      setCellStyle(cell, color)
    }
    // var highlight = new mxCellHighlight(graph, color, 2)
    // highlight.highlight(state)
  }
  
  const updateCellText = (id, content) => {
    var graph = state.myGraph
    if (graph === null || graph === undefined) {
      return
    }
    //	 graph.setTooltips(true);
    var cell = graph.getModel().getCell(id)
    cell.value = content
    graph.model.setValue(cell, content)
    // graph.refresh()
  }
  const test1 = () => {
    var graph = state.myGraph
    graph.editDiagram(state.callback)
  }
  
  const createOverlay = (image, tooltip) => {
    var overlay = new mxCellOverlay(image, tooltip)
  
    // Installs a handler for clicks on the overlay
    overlay.addListener(mxEvent.CLICK, function (sender, evt) {
      mxUtils.alert(tooltip + '\nLast update: ' + new Date())
    })
  
    return overlay
  }
   
  const callback = () => {}
  const getForm = () => {
    state.form.shapes = JSON.stringify(state.shapes)
  
    return state.form
  }
  defineExpose({
    getForm,
  })
  </script>
  <style lang="scss">
  .tbl_des {
    background-color: #fafafa;
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    white-space: normal;
    line-height: normal;
    font-weight: bold;
    font-size: x-small;
    font-style: normal;
    color: -internal-quirk-inherit;
    text-align: right;
    border-spacing: 2px;
    border-color: grey;
    font-variant: normal;
  
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    background-color: #13c313;
    .tbl_td_des {
      background-color: #fafafa;
    }
    td {
      padding: 1px 1px 1px 1px;
    }
  }
  </style>
  