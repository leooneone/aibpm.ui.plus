<template>
  <div  > 
    <div class="t1ags" v-if="tabList.includes('user')"> 
      
      
      <el-button     @click="onClick"   ><!----><!---->
                  <span>
                    <el-icon  ><SvgIcon name="fa fa-user-plus"     /></el-icon> 
          
 
                    <slot />
                  </span>
                </el-button> 
                <el-link   style="margin-left:20px" @click="selectedData=[]">清空</el-link> 
           
                <ai-tag-input v-if="selectedData.length"  v-model="selectedData"   :collapseTags="5"/>
           
    </div> 
    <org-select 
         ref="orgSelect"
        @cancel="show=false" 
        :show="show"
        :data="data"
        :selectedList="selectedData"
        @on-nav="onNavigate"
        @on-submit="onConfirm"
        @on-search="onSearch"   
    ></org-select> 
    <el-tree-select v-if="tabList.includes('role')"
                v-model="roleIds"
                placeholder="请选择角色"
                :data="roleTreeData"
                node-key="id"
                :props="{ label: 'name' }"
                default-expand-all
                render-after-expand
                fit-input-width
                clearable
                multiple
                collapse-tags
                collapse-tags-tooltip
                class="w100"
              />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import OrgSelect from './box.vue'  
import {getRoles} from './config.js'

import { RoleApi } from '/@/api/admin/Role'
import { listToTree, treeToList } from '/@/utils/tree'
export default defineComponent({
  
  name:'ou-org-select',
  components:{OrgSelect}, 
  props:{
    showTags:{type:Boolean,default:true},
  
    modelValue:{
      type: Object ,
      required: true,
     
    }, 
    tabList: {
      type: Array,
      default: ()=>(['user'])
    },
    iconOnly:{type:Boolean,default:false},
    title: {
      type: String,
      default: '组织机构'
    },
    buttonType: {
      type: String,
      default: 'link'
    }, // or input
    searchable: {
      type: Boolean,
      default: true
    },
    maxNum: {
      type: Number,
      default: 99
    },
    tagConfig:{
      type: Object,
      default: () => ({
        type: 'info',
        closable: true,
        'disable-transitions': false,
        hit: false,
        color: undefined,
        size: 'small',
        effect: 'light'
      })
    },
  },
  data(){
    return {
      tags:[{id:1,name:'AAA'},{id:2,name:'BBB'}],
      data:[],
      tabKeys:[] as Array<string>,
      show: false,
      innerValue: {},
      selectedData: [],
      roleIds:[],
      roleTreeData: []

    }
  },
  mounted(){ 
    this.getAllRoles()
  },
  watch:{
    modelValue: {
    immediate: true,
    handler(val) {
      this.tabKeys = []  
        var that =this
        this.tabList.forEach((key:string) => {
          that.tabKeys.push(key)
        }  )
      window.console.log('----------------')
        if(!val) return
        this.reloadCmpData()
    }
  },
     
  //   tabLis1t: {
  //     handler:function (val:Array) {
  //       this.tabKeys = [] 
  //       var that =this
  //       val.forEach((key:string) => {
  //         console.log(key)
  //         that.tabKeys.push(key)
  //       }  )
  //      // this.reloadCmpData()
  //     },
  //     immediate: true,
  //   }
   },
 
  computed:{   
    selectedItems(){
      return this.selectedData.map((t:any) => t)
       
    },
    selectedLabels(){
      return this.selectedData.map((t:any) => t.label).join(',')
    }
  },
  methods:{
    onSubmit(data:Object){
      this.innerValue = {role:data}
    },


    
    async getAllRoles () {
  const res = await new roleApi().getList() 
  if (res?.success && res.data && res.data.length > 0) {
      this.roleTreeData = listToTree(res.data)
  } else {
    this.roleTreeData = []
  }
},
    async onSearch(key:String){
      

      window.console.log(key)
    },
   async onNavigate(nodeId){
      this.data=  await  getRoles({parentId:nodeId})
    },
    async  onClick(){
          this.data=  await  getRoles()
          this.show=true
          this.$refs.orgSelect.isShow=true
    },
    reloadCmpData(){
      this.innerValue = {}
     
      this.tabKeys.forEach(key => {
        this.innerValue[key] = this.modelValue && this.modelValue[key] ? JSON.parse(JSON.stringify(this.modelValue[key])) : []
      })

      // transfer 可能还未加载成功
      this.$nextTick(() => {
        this.initSelectedData()
      })
    },

    initSelectedData(){
      this.selectedData = this.tabKeys.reduce((res, key) => {
        
        if(this.innerValue[key]===undefined) return []
        return res.concat(this.innerValue[key].map(t => ({
          tabKey: key,
          id:t.id,
          name:t.name
        })))
      }, [])


    },

      
    onClose (item:Object) { 
      const list = this.innerValue[item.tabKey]
   
      const index = list.findIndex(t =>t.id=== item.id)
      index > -1 && list.splice(index, 1)
      this.initSelectedData()
      this.$emit('input', this.innerValue)
      this.$emit('confirm', this.innerValue)
    },
    
    onConfirm (data:Object) {
      this.innerValue = data
      this.initSelectedData()
      this.$emit('input', this.innerValue)
      this.$emit('confirm', this.innerValue)
    }
  }
})
</script>
<style lang="scss" scoped>

 
.tags {
  .input-box.as-input{
    border: 1px solid #DCDFE6;
    padding-left: 6px;
    font-size: 12px;
    min-height: 27px;
    line-height: 25px;
    border-radius: 4px;
    background: white;
    color:  #606266;
    cursor:  pointer;
  }
  .org-tag{
    margin-right: 6px;
    max-width: 6rem;  
    overflow: hidden;
    text-overflow:  ellipsis;
    position : relative;
    padding-right:  1rem;
    vertical-align:  middle;

    :deep(.el-tag__close){
      position: absolute;
      right: 2px;
      top: 50%;
      margin-top: -7px;
    }
  }
}
</style>