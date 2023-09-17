<template >
<el-form-item label="选项卡位置" v-if="props.data.tabPosition !== undefined">
      <el-radio-group v-model="props.data.tabPosition">
        <el-radio-button label="top">顶部</el-radio-button>
        <el-radio-button label="right">右侧</el-radio-button>
        <el-radio-button label="bottom">底部</el-radio-button>
        <el-radio-button label="left">左侧</el-radio-button>
      </el-radio-group>
  </el-form-item>

<el-divider>标签面版</el-divider>


<el-radio-group
    
    v-model="props.data.defaultValue"
    style="line-height: 30px"
  >
<draggable
  :list="props.data.children"
  :animation="340"
  group="selectItem"
  handle=".option-drag"

><template #item="{element,index}">  <el-radio :label="element.value">
  <div :key="index" class="select-item">
            <div class="select-line-icon option-drag">
              <el-icon><ele-Operation></ele-Operation></el-icon>
            </div> 
    <!-- <el-input v-model="item.label" placeholder="选项名" size="small" /> -->
    <el-input
      placeholder="面板标签"
      size="small"
      v-model="element.label"  
    /> 
    <div
      class="close-btn select-line-icon"
      @click="props.data.children.splice(index, 1)"
    >
    <el-icon><ele-Remove></ele-Remove></el-icon> 
    </div>
  </div>
</el-radio>
</template>
</draggable>
</el-radio-group>
<div style="margin-left: 20px;">
  <el-button
    style="padding-bottom: 0"
    icon="el-icon-circle-plus-outline"
    type="text"
    @click="props.data.children.push({rowType: 'layout',layout:'rowFormItem',label:'New Tab',value:(new Date()).getTime().toString(),children:[]});"
  >添加面板</el-button>
</div>
<el-divider />
 
</template>


<script lang="ts" setup> 

import draggable from "vuedraggable"; 
import  {defineAsyncComponent} from 'vue'

const props=defineProps(['data']     )

 

 

 
 
</script> 


<style lang="scss">
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  .el-input {
    & + .el-input {
      margin-left: 4px;
    }
  }
  & + .select-item {
    margin-top: 4px;
  }
  &.sortable-chosen {
    border: 1px dashed #409eff;
  }
}
.option-drag {
  cursor: move;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
</style>
