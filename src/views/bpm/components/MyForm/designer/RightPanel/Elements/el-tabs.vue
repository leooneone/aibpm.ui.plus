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
<draggable
  :list="props.data.children"
  :animation="340"
  group="selectItem"
  handle=".option-drag"

><template #item="{element,index}">
  <div  :key="index"  >
    <div class="select-line-icon option-drag">
      <el-icon><ele-Operation /></el-icon>
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
  </div></template>
</draggable>
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

const OptionsPanel = defineAsyncComponent(() => import('./components/options.vue'))
 

 

 
 
</script> 