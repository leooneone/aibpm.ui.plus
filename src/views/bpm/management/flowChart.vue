<template>
  <section>
  
    <div ref="graphContainer" style="height: 100%" />
  </section>
</template>

<script lang="ts" setup>
import { genGraph } from './graph/Graph.js'
 
import { ref, reactive, computed, onMounted, watch, getCurrentInstance, onUnmounted, defineAsyncComponent, provide } from 'vue'
 
 
  
const graphContainer = ref()

const props = defineProps({
  data:{type:Object,default:()=>{}},
  id: { type: Number }, 
})
let graph = null 
// /设置光标
 
const state = reactive({ 
  shapes: {}, 
  prop: 'tickerTime',
  idForm: { oldId: null, newId: '', show: false }, 
  myGraph: null,
  form: {}, 
 
})
 


onMounted((id: any) => {
   
  if (!mxClient.isBrowserSupported()) {
    // Displays an error message if the browser is not supported.
    mxUtils.error('Browser is not supported!', 200, false)
  } 
 
 
   
        state.form = props.data 
    //    mxConstants.SHADOWCOLOR = '#e0e0e0'
        graph = genGraph(graphContainer.value) // new mxGraph(state.$refs.graphContainer)//

        // Adds a highlight on the cell under the mousepointer
        // new mxCellTracker(graph)

    //    graph.setPanning(true)
 
        state.myGraph = graph
        // graph.setTooltips(true)
        // graph.setEnabled(false)
        // graph.setHtmlLabels(true) 
        graph.importModelXML(props.data )
     

        window.addEventListener('resize', function () {
           
          state.myGraph.center(true, false)

          state.myGraph.fit() 
        })

       
        // graph.addListener(window.mxEvent.CLICK, (_sender, _evt) => {
        //   // state.eventDebug(_evt);
        //   if (_evt.properties.cell) {
        //     const mxcell = _evt.properties.cell
        //     const shapeId = mxcell.id

            

        //     window.curCell = mxcell
        //     window.graph = graph 

        //     window.myState = graph.view.getState(mxcell) 
          
        //   }
        // })
     
   
  
})
 

 
  
defineExpose({
   
})
</script> 