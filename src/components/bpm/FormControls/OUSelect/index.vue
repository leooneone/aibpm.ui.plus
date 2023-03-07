<template>
<el-button @click="open" v-if="props.buttonType === 'button' && state.showTags.length === 0" icon="ele-Plus" plain type="success">{{
  props.title
}}</el-button> 
  <ai-tag-input v-else v-model="state.showTags" :nullTips="props.nullTips"  @click="open"  ><slot></slot> </ai-tag-input>
 
  <el-dialog v-model="state.showDialog" destroy-on-close :title="props.title" append-to-body draggable width="780px" >
    <template #title><slot></slot></template>
        <el-tabs type="border-card"    > 
  <el-tab-pane label="用户" v-if="props.tabs.includes('user')" >     <user-select v-model="state.selected['user']"  ref="myUser" title="添加员工" multiple   ></user-select> </el-tab-pane>
  <el-tab-pane label="组织" v-if="props.tabs.includes('org')" >   <org-select ref="myOrg"  v-model="state.selected['org']"   ></org-select>   </el-tab-pane>
  <el-tab-pane label="角色" v-if="props.tabs.includes('role')" >    <role-select v-model="state.selected['role']"  ref="myRole"   ></role-select>       </el-tab-pane></el-tabs>

  <ai-tag-input v-model="state.tags"  @remove-tag="removeTag" :closable="true" :collapseTags="100" ></ai-tag-input>

  <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel" size="default">取 消</el-button>
        <el-button type="primary" @click="onSure" size="default" :loading="sureLoading">确 定</el-button>
      </span>
    </template>
</el-dialog>
</template>
<script  lang="ts" setup name="ai-ou-select">
import UserSelect from './user-select.vue'
import OrgSelect from './org-select.vue'
import RoleSelect from './role-select.vue'
import {reactive,ref ,watch} from 'vue'

const emits = defineEmits(['sure','update:modelValue'])
// 定义父组件传过来的值

const props = defineProps({ 

  buttonType: { type: String, default: 'button' },
  disabled:{type:Boolean,default:_=>false},
  tabs:{type:Array,default:()=>['user']},
  modelValue:{
    type:Object,
    default:()=>{ return {user:[],role:[],org:[]}}
  },
  nullTips:{type:String,
  default:'暂无选择'},
  title: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  sureLoading: {
    type: Boolean,
    default: false,
  },
})

const state= reactive({

  showDialog:false,
  selected:{}
//   { "user": props.tabs&1? props.modelValue.filter((item)=>item.tagName==='user'):[],
//  "ou":  props.tabs&2? props.modelValue.filter((item)=>item.tagName==='org'):[], 
//  "role":props.tabs&4? props.modelValue.filter((item)=>item.tagName==='role'):[ ]
//  }
,
tags: [],
showTags:[] 
});


const myOrg=ref()
const myRole=ref()
const myUser=ref()
 
// 打开对话框
const open = () => {
  if(!props.disabled)
   state.showDialog = true
  // if (state.pageInput.filter) {
  //   state.pageInput.filter.orgId = null
  // }

  //onQuery()
}

// 关闭对话框
const close = () => {
  state.showDialog = false
}


// 取消
const onCancel = () => {
  state.showDialog = false
}
const getLabels=()=>{
  return state.tags.map(item=>item.name).join(',')
}
// 确定
const onSure = () => {
  const selectionRows =state.tags
  
  emits('update:modelValue',JSON.parse(JSON.stringify(state.selected)) )
  state.showTags=state.tags
  
  emits('sure', props.multiple ? selectionRows : selectionRows.length > 0 ? selectionRows[0] : null)
   close()
}
const removeTag=(val)=>{
    if(val.tagName==='user')
    {
        myUser.value.removeTag(val)
    }else  if(val.tagName==='org')
    {  const  index = state.selected['org'].indexOf(val)
        state.selected['org'].splice(index, 1)
        myOrg.value.   orgMenuRef.setCheckedNodes(state.selected['org'])
    }else  if(val.tagName==='role')
    {
        try{
        const  index = state.selected['role'].indexOf(val)
        state.selected['role'].splice(index, 1)
        myRole.value.   orgMenuRef.setCheckedNodes(state.selected['role'])
    }catch(ex){console.log('ex')}
    }  
   



    //myUser.value.   userTableRef.toggleRowSelection(val, false)
}


const getTags=(selected)=>{

let res:object[]= []
  if(Array.isArray(selected))
    res = selected;
   else 
   {
      for(var key in selected)
      {
        var items=selected[key]
    
        if(Array.isArray(items)){
         
          items.forEach((item)=>    { 
            item.tagName=key;
            if(key==='user')
              item.tagType='success'
            else    if(key==='org')
              item.tagType='warning'
            else    if(key==='role')
              item.tagType='danger'
            res.push(item)}       
            )
      }
      // res=  res.concat( selected[key])

      }
   }
   return res
}
watch(
  () => props.modelValue,
  () => { 
  state.selected=JSON.parse(JSON.stringify(props.modelValue))
    state.tags=getTags(state.selected)
    state.showTags=state.tags
  }, 
  {
    deep: true,immediate:true
  } 
)
watch(()=>state.selected,
 
      (val)=> {
 
     
       state.tags=getTags(val)
     }, 
  {
    deep: true,immediate:true
  } ) 


defineExpose({
  open,
  close,getLabels
})
</script>
<style scoped>

.el-tabs--card {
  height: calc(100vh - 510px);
  min-height: 200px;
  /* overflow-y: auto; */
}
.el-tab-pane {
  height: calc(100vh - 510px);
  min-height: 200px;
  overflow-y: auto;
} 
</style>