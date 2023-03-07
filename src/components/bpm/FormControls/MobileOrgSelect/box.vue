<template>  

<el-drawer v-model="isShow"  direction="rtl" size="50%" title="选择用户">

  <template #header="{ close, titleId, titleClass }">
    
    <el-breadcrumb separator="/">
      <el-breadcrumb-item  @click="handleCurrentListClick(0)" ><el-link>根目录</el-link></el-breadcrumb-item>
      <el-breadcrumb-item  v-for="(item, index) in currentData"  :key="item[nodeKey]"  @click="handleCurrentListClick(item[nodeKey],index)"       > 
        <el-link>{{ item[label] }}</el-link> </el-breadcrumb-item> 
    </el-breadcrumb> 
      <h4 :id="titleId" :class="titleClass">选择用户</h4>
       
    </template>
    <div @touchstart="gtouchstart" @touchend="gtouchend" class="mobile-org">
      <!-- 上方搜索栏 -->
      <div class="search">
      
    <el-input
        type="search"
            :placeholder="searchPlaceholder"
            v-model="searchKey"
            @input="handleSearch"
            @compositionstart="handleComposionstart"
            @compositionend="handleComposionend"
        ></el-input>
       
      </div>
      <!-- 下方内容显示区 -->
      <div class="org-content"> 
       
    
     
    <div class="org-content__warp">
          <ul class="org-content__ul">
          
            <template v-if="renderData.length > 0">
              <slot name="content-area" :renderData="renderData">

                 <li
                  class="org-content__item"
                  v-for="item in renderData"
                  :key="item[nodeKey]"
                >
                  <!-- 复选框 -->
                  <input
                    v-if="item.type===2"
                    type="checkbox"
                    @click="handleItemClick(item)"
                    :checked="isChecked(item)"
                    name="check"
                    class="item-checkbox"
                    :style="{
                      'border-radius': checkboxStyle === 'square' ? '' : '50%',
                    }"
                  />
                  <!-- 头像 -->
                  <img
                    v-if="isShowIcon"
                    @click="handleItemClick(item)"
                    class="avatar"
                    :style="{
                      visibility: item[icon] || defaultIcon ? '' : 'hidden',
                    }"
                    :src="item[icon] || defaultIcon"
                  />
                  <!--  名称显示 -->
                  <span
                    @click="handleItemClick(item)"
                    class="org-content__item-text"
                  >
                  <el-link  class="iconfont icon-juxingkaobei"> {{ item[label] }}</el-link>
                  </span>
                  <!-- 下级按钮 -->
                


                  <span
                    v-if="item.type===1"
                    @click="handleItemChildClick(item)"
                  
                  > <el-link  class="iconfont icon-juxingkaobei">下级</el-link>
                 
                  </span>
                </li>
              </slot>
            </template>
            <!-- 无数据提示:两种：1.数据源压根儿没数据 2.搜索结果没数据 -->
            <template v-else>
              <slot name="empty-tips">
                <li class="empty">
                  <small
                    >暂无{{
                      searchKey ? `与 '${searchKey}' 相关` : ""
                    }}数据</small
                  >
                </li>
              </slot>
            </template>
          </ul>
        </div>
 
        <!-- 内容显示区 -->
       
      
        
     <ai-tag-input  v-model="renderSelectedData"></ai-tag-input> 
         
      </div>
    </div>
    
    <template #footer>
<div style="display: flex;justify-content:space-between">
      <span   class="input-box as-input"   key="" :offset="2">
       
      </span> 
      <span  >
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span></div>
    </template>
  </el-drawer>
  </template>
  <script> 
 
import { ElMessage,ElNotification,ElMessageBox } from 'element-plus'
  export default {
    name: "fc-org-transfer1", 
    props: {

        
      data: {
        type: Array,
        default: () => [],
      },
      selectTypes: {
        type: Array,
        default: () => [ 2,"org", "role"] ,
      },
      defaultIcon: {
        type: String,
        default: "",
      },
  
      label: {
        type: String,
        default: "name",
      },
  
      nodeKey: {
        type: String,
        default: "id",
      },
  
      children: {
        type: String,
        default: "children",
      },
  
      icon: {
        type: String,
        default: "avatar",
      },
  
      isShowClearBtn: {
        type: Boolean,
        default: true,
      },
  
      searchPlaceholder: {
        type: String,
        default: "搜索",
      },
  
      submitText: {
        type: String,
        default: "提交",
      },
  
      cancelText: {
        type: String,
        default: "取消",
      },
  
      isShowIcon: {
        type: Boolean,
        default: false,
      },
  
      isMultiple: {
        type: Boolean,
        default: true,
      },
  
      isSelectRequired: {
        type: Boolean,
        default: true,
      },
  
      selectedList: {
        type: Object,
        default: () => [],
      },
  
      slideDistance: {
        type: Number,
        default: 100,
      },
  
      // 显示状态
      defaultShowType: {
        type: String,
        default: "org",
      },
      // 显示状态
      checkboxStyle: {
        type: String,
        default: "round",
      },
  
      orgText: {
        type: String,
        default: "组织",
      },
  
      roleText: {
        type: String,
        default: "角色",
      },
    },
  
    data() {
      return {isShow:false,
        // 当前数据
        currentData: [],
  
        // 已选择的数据集合
        selectedItems: [],
    
        selectedKeys:[],
        // 搜索关键词
        searchKey: "",
  
        // 鼠标按下时候的初始 x 坐标
        startX: "",
  
        showType: "",
  
        isTyping: false,
      };
    },
  
    mounted() {
    
    },
  
    methods: {
      // 手指按下
      gtouchstart(e) {
        // // 获取x 坐标
        // e.targetTouches[0].clientX;
        // // 获取y 坐标
        // e.targetTouches[0].clientX;
        this.startX = e.targetTouches[0].clientX;
      },
  
      // 手指松开
      gtouchend(e) {
        // window.console.log("手指松开啦", e);
        if (e.changedTouches[0].clientX - this.startX >= this.slideDistance) {
          // console.log("移动距离大于" + this.slideDistance, this.currentData);
          this.handleCurrentListClick(0,-1);
          this.$emit("on-slide");
        }
      }, 
      // 是否显示选中状态
      isChecked(data) {
        return this.selectedItems.find((item) => {
          return item[this.nodeKey] == data[this.nodeKey];
        });
      },
  
      // 点击选项
      handleItemClick(row) {
        console.log('handleItemClick')
        if (!this.selectTypes.includes(row.type)) {
          return;
        }
        row['checked']=!row['checked'];
        // 多选
        if (this.isMultiple) {
          const data = JSON.parse(JSON.stringify(row));
          
          var isExist= this.delItemTag(data[this.nodeKey])
          if (isExist) {
            console.log('del:'+JSON.stringify(this.selectedItems))
          } else {
            // 不存在当前项，则将其加入到所选列表中 
            this.selectedItems.push(data);
          }
        } else {
          // 单选
          this.selectedItems = [];
          this.selectedItems.push(row);
        }
        this.$emit("on-select", row);
 
      },
  
      // 点击下级按钮获取下级目录及人员
      handleItemChildClick(row) {
      //  this.renderData=row.children
        this.currentData.push(row);
        this.$emit("on-nav", row[this.nodeKey]);
      },
  
      // 点击面包屑导航触发
      handleCurrentListClick(parentId,index) {
        this.$emit("on-nav", parentId);
       
        // 点击全部的时候index == -1
        // 如果点击当前项则不做任何操作
        if (
          index == this.currentData.length - 1 ||
          (this.currentData.length === 0 && index == -1)
        ) {
          this.searchKey = "";
        //  this.$emit("on-nav", "-1");
          return;
        }
        // 处理导航栏数据
        if (index > -1) {
          this.currentData = this.currentData.slice(0, index + 1);
       //   this.$emit("on-nav", this.currentData[index]);
        } else {
          // 如果当前就是全部则不做任何操作
          this.currentData = [];
    //      this.$emit("on-nav", "-1");
        }
      },
      delItemTag(val) {


        
        let index = this.selectedItems .findIndex(item => {
            if (val == item[this.nodeKey]) {
              return true
            }
          })
          if (index!==-1) {
          
          
          
          this.selectedItems.splice(index, 1)
            return true
        }else 
        return false 
             
      },
  
      // 删除已选列表中的item
      delItem(data) {
        this.delItemTag(data[this.nodeKey])

           
      },
  
      // 提交
      handleSubmit() {
        console.log('handleSubmit')
        if (this.isSelectRequired && !this.selectedItems.length) {
          
          ElNotification({
            title: '提示',
            message: '未做任何选择，请选择后重试。',
            position: 'bottom-right'
          });
          return;
        }
          this.handleCurrentListClick(0,-1);
    //    var res=JSON.parse(JSON.stringify(this.selectedItems))


     
        // 触发父组件绑定事件，将值传回去
        this.$emit("on-submit",{role: this.selectedItems});

        this.isShow=false
        this.$emit("cancel");
         
      },
  
      // 取消
      handleCancel() {
        
     // this.$emit('update:show', false);
        this.isShow=false
        window.console.log('hanlecancel')
        this.$emit("cancel");
      },
  
      // 开始搜索
      handleSearch() {
        if (this.isTyping) {
          return;
        }
        console.log("search");
        this.$emit("on-search", this.searchKey.trim());
      },
  
      // 输入中文ing
      handleComposionstart() {
        this.isTyping = true;
        console.log("input start");
      },
  
      // 输入中文end
      handleComposionend() {
        this.isTyping = false;
        console.log("input end");
      },
   
    },
   computed:{

    renderSelectedData(){
console.log('renderselecteddata')
      if (Array.isArray(this.selectedList) ) {
        this.selectedItems = this.selectedList;
      } 

      this.selectedKeys= this.selectedItems.map((item)=>item[this.nodeKey])
      return this.selectedItems
    }, 
   
    renderData (){

      return this.data
      
    },
   

    },
    
    watch: {
      defaultShowType: {
        handler(newVal, oldVal) {
          this.showType = newVal;
        },
        deep: true,
        immediate: true,
      },
  
    
    },
  };
  </script>
  
  <style scoped>
  
  
  .org-content .org-content__warp .org-content__ul {
    height: calc(100vh - 22rem);
    overflow: auto;
  }
  .org-content .org-content__warp .org-content__item {
    border-bottom: 1px solid #eee;
    height: 38px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    padding: 8px 0;
    box-sizing: border-box;
  }
  
  .org-content .org-content__warp .org-content__item:last-child {
    border: none;
  }
  
  .org-content .org-content__warp .org-content__item:first-child {
    border-top: none;
  }
  
  /*复选框样式 */
  .org-content .org-content__warp .org-content__item .item-checkbox:checked {
    background: #1673ff;
  }
  
  .org-content .org-content__warp .org-content__item .item-checkbox {
    width: 15px;
    height: 15px;
    background-color: #ffffff;
    border: solid 1px #dddddd;
    font-size: 0.8rem;
    margin: 0 5px 0 0;
    padding: 0;
    position: relative;
    display: inline-block;
    vertical-align: top;
    cursor: default;
    -webkit-appearance: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-transition: background-color ease 0.1s;
    transition: background-color ease 0.1s;
  }
  
  .org-content .org-content__warp .org-content__item .avatar {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 5px;
  }
  
  .org-content
    .org-content__warp
    .org-content__item
    .item-checkbox:checked::after {
    content: "";
    top: 3px;
    left: 2px;
    position: absolute;
    background: transparent;
    border: #fff solid 2px;
    border-top: none;
    border-right: none;
    height: 3px;
    width: 7px;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  
  .org-content .org-content__warp .org-content__item input {
    margin-right: 5px;
  }
  
  .org-content .org-content__warp .org-content__item .org-content__item-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .org-content .org-content__warp .org-content__item .org-content__item-count {
    width: 45px;
    padding-right: 5px;
    text-align: center;
    color: #999;
  }
  
  .org-content .org-content__warp .org-content__item .org-content__item-child {
    padding: 0 8px;
    width: max-content;
    color: #409eff;
    border-left: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
    font-weight: 600;
  }
  
  .org-content .org-content__operation {
    display: flex;
    bottom: 0;
    left: 10px;
    right: 10px;
  }
  
  .org-content .org-content__operation .result-display {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0; 
  }
   
  </style>
   