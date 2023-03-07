<template>
<div class="open">
  <el-button
    class="open-button"
    type="primary"
    @click="importFile = true"
  >导入文件</el-button>
  <div class="edit-content">
    <GraphEdit
      :enableEditing="false"
      @onInitEditGraph="initEditGraph"
    />
  </div>
  <ImportFile
      :isVisible="importFile"
      v-on:onDialogClose="importFile = false"
      v-on:onDialogConfirm="parseXmlFile"
    />
</div>
</template>
<script>
import './components/Flow/styles/grapheditor.css';
import GraphEdit from './components/Flow/index.vue';
import ImportFile from "./components/Flow/ImportFile/index.vue";

export default {
  name: 'HelloWorld',
  components:{
    GraphEdit,
    ImportFile
  },
  data() {
    return {
      importFile: false,
    };
  },
  methods: {
    initEditGraph(editorUiInit){
      this.editorUiInit = editorUiInit;
    },
    parseXmlFile(xml){
      const doc = window.mxUtils.parseXml(xml);
      this.editorUiInit.editor.graph.setSelectionCells(
        this.editorUiInit.editor.graph.importGraphModel(doc.documentElement)
      );
      this.editorUiInit.actions.get("lockUnlock").funct()
      mxPopupMenu.prototype.enabled = false
      this.importFile = false;
      this.handleRender();
    },
    handleRender(){
      const model = this.editorUiInit.editor.graph.getModel();
      const cells = model.cells || [];
      for(let index in cells){
        if(model.isVertex(cells[index])) {
          const value = model.getValue(cells[index]);
          console.log('这是个图形 图形属性值',value);
        }else console.log('这是个边边');
      }
    }
  },
};
</script>

<style scoped lang="scss" scope>
.open{
  width: 100%;
  height: 100%;
  background: #f9f9f9;
}
.open-button{
  position: fixed;
  left: 5%;
  top: 10px;
}
.edit-content{
  width: 90%;
  height: 600px;
  border: 2px solid #d7dee4;
  margin: 70px auto 0;
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
      background-image: none !important;
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