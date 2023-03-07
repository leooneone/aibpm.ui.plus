<template>
  <GraphEdit
    class="edit-content"
    :enableEditing="false"
    @onInitEditGraph="initEditGraph"
  />
</template>
<script>
import './components/Flow/styles/grapheditor.css';
import GraphEdit from './components/Flow/index.vue';

export default {
  name: 'HelloWorld',
  components: {
    GraphEdit,
  },
  data() {
    return {};
  },
  methods: {
    initEditGraph(editorUiInit) {
      this.editorUiInit = editorUiInit;
      mxPopupMenu.prototype.enabled = false;
      this.parseXmlFile();
    },
    parseXmlFile() {
      const doc = window.mxUtils.parseXml('<mxGraphModel grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="3" value="" style="image;html=1;image=/images/stencils/gNB.png;strokeWidth=2" vertex="1" parent="1"><mxGeometry x="510" y="200" width="80" height="80" as="geometry"/></mxCell><mxCell id="4" value="" style="image;html=1;image=/images/stencils/OLT.png;strokeWidth=2" vertex="1" parent="1"><mxGeometry x="374" y="200" width="80" height="80" as="geometry"/></mxCell><mxCell id="5" value="" style="image;html=1;image=/images/stencils/ONU.png;strokeWidth=2" vertex="1" parent="1"><mxGeometry x="400" y="300" width="80" height="80" as="geometry"/></mxCell><mxCell id="6" value="" style="shape=partialRectangle;whiteSpace=wrap;html=1;bottom=1;right=1;left=1;top=0;fillColor=none;routingCenterX=-0.5;;strokeWidth=2" vertex="1" parent="1"><mxGeometry x="310" y="320" width="286" height="60" as="geometry"/></mxCell><mxCell id="7" value="" style="curved=1;endArrow=classic;html=1;" edge="1" parent="1" source="3" target="6"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="430" y="290" as="sourcePoint"/><mxPoint x="480" y="240" as="targetPoint"/><Array as="points"><mxPoint x="480" y="290"/><mxPoint x="430" y="240"/></Array></mxGeometry></mxCell></root></mxGraphModel>');
      this.editorUiInit.editor.graph.setSelectionCells(
        this.editorUiInit.editor.graph.importGraphModel(doc.documentElement),
      );
      this.handleRender()
      // 网格背景设置 
      this.editorUiInit.editor.graph.setGridEnabled(false);
      // 画布编辑锁定
      // this.editorUiInit.editor.graph.setEnabled(false);
      // this.editorUiInit.actions.get('selectNone').funct();
    },
    addAlarmOverlay(cell){
      const overlay = new mxCellOverlay(new mxImage('images/hs.png', 50, 50), '告警等级');
      overlay.cursor = 'hand';
      overlay.offset = new mxPoint(-4, 8);
		  overlay.align = mxConstants.ALIGN_RIGHT;
		  overlay.verticalAlign = mxConstants.ALIGN_TOP;
      this.editorUiInit.editor.graph.addCellOverlay(cell, mxCellOverlay);
      // console.log('===',cell);
      
    },
    handleRender() {
      const model = this.editorUiInit.editor.graph.getModel();
      const cells = model.cells || [];
      for (const index in cells) {
        if (model.isVertex(cells[index])) {
          this.addAlarmOverlay(cells[i]);
          console.log('加了一个')
          // const value = model.getValue(cells[index]);
          // console.log('这是个图形 图形属性值', value);
        } else console.log('这是个边边');
      }
    },
  },
};
</script>

<style scoped lang="scss" scope>
.edit-content{
  width: 100%;
  height: 100%;
  border: 2px solid #d7dee4;
  border-radius: 4px;
}
:deep{
  .geSidebarContainer{
    display: none;
  }
  .geToolbarContainer{
    display: none;
  }
  .geDiagramContainer{
    inset: 0 !important;
    &>svg{
      background: #F9F9F9 !important;
    }
  }
  .geHsplit{
    display: none;
  }
  div.mxPopupMenu{
    display: none !important;
  }
}
</style>
