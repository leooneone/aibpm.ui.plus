<template>

  
          <!-- <el-form-item v-if="props.data.tag === 'el-cascader'" label="选项分隔符">
            <el-input v-model="props.data.separator" placeholder="请输入选项分隔符" />
          </el-form-item>-->
          <el-form-item   label="是否多选">
            <el-switch v-model="props.data.props.props.multiple" />
          </el-form-item>
          <!-- <el-form-item v-if="props.data.tag === 'el-cascader'" label="展示全路径">
            <el-switch v-model="props.data['show-all-levels']" />
          </el-form-item>-->
          <el-form-item label="可否筛选">
            <el-switch v-model="props.data.filterable" />
          </el-form-item>

          <template v-if="['el-cascader'].indexOf(props.data.tag) > -1">
            <el-divider>选项</el-divider>
            <el-form-item label="数据类型">
              <el-radio-group v-model="props.data.dataType" size="small">
                <el-radio-button label="dynamic">动态数据</el-radio-button>
                <el-radio-button label="static">静态数据</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <template v-if="props.data.dataType === 'dynamic'">
              <el-form-item label="标签键名">
                <el-input v-model="props.data.labelKey" placeholder="请输入标签键名" />
              </el-form-item>
              <el-form-item label="值键名">
                <el-input v-model="props.data.valueKey" placeholder="请输入值键名" />
              </el-form-item>
              <el-form-item label="子级键名">
                <el-input v-model="props.data.childrenKey" placeholder="请输入子级键名" />
              </el-form-item>
            </template>
            <el-tree
              v-if="props.data.dataType === 'static'"
              draggable
              :data="props.data.options"
              node-key="value"
              :expand-on-click-node="false"
              :render-content="renderContent"
            />
            <div v-if="props.data.dataType === 'static'" style="margin-left: 20px">
              <el-button
                style="padding-bottom: 0"
                icon="ele-CirclePlus"
                type="text"
                @click="addTreeItem"
              >添加父级</el-button>
            </div>
            <el-divider />
          </template>
        
    <treeNode-dialog v-model="dialogVisible" title="添加选项" @commit="addNode" />
</template>


 


 
<script lang="jsx"  > 

import TreeNodeDialog from "../TreeNodeDialog.vue";
export default { 
  props: ["data"], 
  data(){

    return {
      
      currentNode: null,
      dialogVisible: false,
    }
  },
  methods:{
    append(data) {
      if (!data.children) {
        data.children= [];
      }
      this.dialogVisible = true;
      this.currentNode = data.children;
    },
    remove(node, data) {
      const { parent } = node;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id=data.id||d.value === data.value);
      children.splice(index, 1);
    },
    addNode(data) {
      this.currentNode.push(data);
    },
    addTreeItem() {
    //   ++this.idGlobal;
    this.dialogVisible = true;
    this.currentNode = this.activeData.options;
    },
    
    renderContent(h, { node, data, store }) {
      // console.log(node)
      // return   h('div',{class:'custom-tree-node'},
      //   [h('span',null,node.label),
      //   [h('span',{class:'node-operation'},
      //   [h('el-icon',null,
      //         [h('ele-Plus')]),
      //        h('el-icon',null,[h('ele-Delete')])])]])
return(
        <div class="custom-tree-node"  >
          <span>{node.label}</span>
          <span class="node-operation">
            <el-icon onClick={() => this.append(data)} title="添加" ><ele-Plus  /></el-icon>
            <el-icon onClick={() => this.remove(node, data)} title="删除" ><ele-Delete /></el-icon>
           
          </span>
        </div>
      );
    }
 
  }
}
</script>