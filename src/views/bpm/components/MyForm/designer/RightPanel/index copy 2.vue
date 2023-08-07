/**
 *Copyright: Copyright (c) 2020
 *Author:JakHuang
 *Version 1.0 
 *Title: form-generator/Element UI表单设计及代码生成器 
 *GitHub: https://github.com/JakHuang/form-generator
 *Modify
 */
 <template>
  

  <div class="right-board" v-if="false">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />  
    </el-tabs>
    <div class="field-box">
      <!-- <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
        <i class="el-icon-link" />
      </a>-->
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="currentTab==='field' && showField" size="small" label-width="90px" >
          <!-- <el-form-item v-if="activeData.changeTag" label="组件类型">
            <el-select
              v-model="activeData.tagIcon"
              placeholder="请选择组件类型"
              :style="{width: '100%'}"
              @change="tagChange"
            >
              <el-option-group v-for="group in tagList" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.tagIcon"
                >
                  <svg-icon class="node-icon" :icon-class="item.tagIcon" />
                  <span> {{ item.label }}</span>
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>-->
          
        
         
          
     
          
      
       
          <!-- <el-form-item v-if="activeData.action !== undefined" label="上传地址">
            <el-input v-model="activeData.action" placeholder="请输入上传地址" clearable />
          </el-form-item> -->
          
         
       
         
          
        
          
         


          
          <!-- draggable -->
          <!--  <template  >
            <el-divider>布局结构树</el-divider>
            <el-tree
              :data="[activeData]"
              :props="layoutTreeProps"
              node-key="renderKey"
              default-expand-all
            >
            <template #default="{ node, data }">
              <span  >
                <span class="node-label">
                  <svg-icon class="node-icon" :icon-class="data.tagIcon" />
                  {{ node.label }}
                </span>
              </span></template>
            </el-tree>
          </template>  -->

         
 
        </el-form>
     
      </el-scrollbar>
    </div>

  </div>
</template>

<script lang="jsx">
// import {
//   inputComponents,
//   selectComponents,
//   layoutComponents
// } from "../components/generator/config.js";

import configs from "../configs";
 
import { saveFormConf } from "../utils/db";
import draggable from "vuedraggable"; 
import {defineAsyncComponent} from 'vue' 

const AdvancedPanel = defineAsyncComponent(() => import('./Advanced/index.vue'))

export default {
  components: {
    TreeNodeDialog,
    IconsDialog,
    draggable
  }, 
  props: ["showField", "activeData", "formConf", "couldChangeRequire","list"],
  data() {
    return {
      bpm:{formItemList:[]},
      proConditionCmp: ["el-input-number", "el-select", "el-radio-group"], // 可作为流程图条件的组件
      currentTab: "field",
  
    
     
      layoutTreeProps: {
        label(data, node) {
          return data.componentName || `${data.label}: ${data.vModel}`;
        }
      }
    };
  },
  computed: {

     
       
    // documentLink() {
    //   return (
    //     this.activeData.document
    //     || 'https://element.eleme.cn/#/zh-CN/component/installation'
    //   )
    // },
    
    tagList() {
      return [
        {
          label: "输入型组件",
          options: configs.inputComponents
        },
        {
          label: "选择型组件",
          options: configs.selectComponents
        }
      ];
    },
   
  },
  watch: {
    formConf: {
      handler(val) {
        saveFormConf(val);
      },
      deep: true
    },
    activeData (val) {
      if (val.tag !== 'fc-calculate') return
      this.reloadExpressionTemp()
   
    }
  },
  methods: {

    setDefault(v){this.activeData.defaultValue=v}, 
    notObject(val) {
       
      return val === null || val === undefined || Object(val) !== val
    },
   
   
   
 
  
   
    
  
   
    tagChange(tagIcon) {
      let target =configs. inputComponents.find(item => item.tagIcon === tagIcon);
      if (!target)
        target =configs. selectComponents.find(item => item.tagIcon === tagIcon);
      this.$emit("tag-change", target);
    }
  }
};
</script>
<Style lang="scss">
.right-board {
	border-left: 1px solid #f1e8e8;
	width: 350px;
	position: absolute;
	right: 0;
	top: 0;
	padding-top: 3px;
	.field-box {
		position: relative;
		height: calc(100vh - 42px);
		box-sizing: border-box;
		overflow: hidden;
	}
	.el-scrollbar {
		height: calc(100% - 48px);
	}
}
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
.select-line-icon {
	line-height: 32px;
	font-size: 22px;
	padding: 0 4px;
	color: #777;
}
.option-drag {
	cursor: move;
}
.document-link {
	position: absolute;
	display: block;
	width: 26px;
	height: 26px;
	top: 0;
	left: 0;
	cursor: pointer;
	background: #409eff;
	z-index: 1;
	border-radius: 0 0 6px 0;
	text-align: center;
	line-height: 26px;
	color: #fff;
	font-size: 18px;
}
.node-label {
	font-size: 14px;
}
.node-icon {
	color: #bebfc3;
}
</style>
