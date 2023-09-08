<template>
  <section>
    <el-result v-if="state.isShowResult" icon="success" title="提交成功" sub-title="Please follow the instructions">
      <template #extra>
        <el-button type="primary" @click="close">关闭</el-button>
      </template>
    </el-result>
    <div v-else class="design-page" v-auth="'api:bpm:template:publish'">
      <header class="page__header">
        <div class="page-actions">
          <div style="border-right: 1px solid #c5c5c5; cursor: pointer" @click="exit">
            <el-icon>
              <ele-Close />
            </el-icon>
          </div>
          <div>流程设计器</div>
        </div>
        <div class="step-tab">
          <div
            v-for="(item, index) in state.steps"
            :key="index"
            class="step"
            :class="[state.activeStep == item.key ? 'active' : '']"
            @click="changeSteps(item)"
          >
            <span class="step-index">{{ index + 1 }}</span>
            {{ item.label }}
          </div>
          <div class="ghost-step step" :style="{ transform: translateX }"></div>
        </div>
        <el-button-group>
          <el-button size="small"  class="publish-btn" @click="submit(false)">草稿</el-button>
          <el-button size="small" class="publish-btn" @click="submit(true)">发布</el-button>
        </el-button-group>
      </header>
      <section class="page__content" v-if="state.data">
        <BasicSetting ref="basicSetting" :conf="state.data.basicSetting" v-show="state.activeStep === 'basicSetting'" tabName="basicSetting" />

        <AdvancedSetting ref="advancedSetting" :conf="state.data.advancedSetting" v-show="state.activeStep === 'advancedSetting'" />

        <FlowChart ref="flowDesign" :conf="state.data.flowSetting" :fields="state.fields" :conditions="state.conditions" v-show="state.activeStep === 'flowDesign'" />

        <MyForm  ref="formDesign" :conf="state.data.formSetting" @ok="onOk" v-show="state.activeStep === 'formDesign'" tabName="formDesign" />
   
      </section>
    </div>
 
  </section>
</template>


<script  lang="ts" setup>
import { defineAsyncComponent, reactive, computed,   onBeforeMount,   ref, getCurrentInstance, provide } from 'vue'
import { WorkflowTemplateApi as TPLApi } from '/@/api/bpm/WorkflowTemplate'
 
import {    ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router' 
 

const { proxy } = getCurrentInstance() as any
const route = useRoute()

const MyForm = defineAsyncComponent(() => import('../components/MyForm/designer/index.vue'))
import BasicSetting from '../components/BasicSetting/index.vue'
const AdvancedSetting = defineAsyncComponent(() => import('../components/AdvancedSetting/index.vue'))

const FlowChart = defineAsyncComponent(() => import('../components/Flow/index.vue'))

 

const updateFormItemList = (data,conditions) => {
  
  state.fields = data||[]
  state.conditions=conditions||[]
}
const close = () => {
  window.parent.postMessage('close')
  window.close()
}
const getInitSetting=(settingName:string)=>{
  return state.data[settingName]
    
   

  
}
provide('updateFormItemList', updateFormItemList) 


provide('getInitSetting', getInitSetting)
const props = defineProps({
  title: {
    type: String,
    default: () => '模板名称12',
  },
})
const formDesign = ref(null)
const flowDesign = ref(null)
const basicSetting = ref(null)
const advancedSetting = ref(null)

const state = reactive({
  isShowResult: false,
  fields: [],
  conditions:[],
  data: { name: '', formSetting: {}, flowSetting: {}, basicSetting: {}, advancedSetting: {} },
  // 可选择诸如 $route.param，Ajax获取数据等方式自行注入
  activeStep: 'basicSetting', // 激活的步骤面板
  //需要懒加载，首次加载如果不可见会导致左侧面板无法正常计算宽度

  steps: [
    { label: '基础设置', key: 'basicSetting' },
    { label: '表单设计', key: 'formDesign' },
    { label: '流程设计', key: 'flowDesign' },
    { label: '高级设置', key: 'advancedSetting' },
  ],
})
const submitToServer = () => {
  var tplId = route.query.id
  state.data.id = tplId
  new TPLApi().save(state.data, { showErrorMessage: true }).then((res: any) => {
    if (res.success) {
      //proxy.$modal.msgSuccess(`提交成功`)
      state.isShowResult = true
    } else {
      proxy.$modal.msgError(res.msg)
    }
  })
}

const isOk=(node)=>{

  

if(node.condition)
{
  return JSON.stringify(node.con)
   console.log('condition',node.condition)

}

}
///判断是否已经被用于流程设计器条件判断，如果是，则不能在表单设计器中删除
const isInUseByCondition=   (ids)=>
{ 
  var nodes =   flowDesign.value?.getNodes() 
  let strConditions=''
  if(nodes)
  { 
    for(var key in nodes) {
      var node =nodes[key]
        if(node.condition)
        {
          strConditions+=JSON.stringify(node.condition)
        }

    }
    
      
    return  ids.some(id=>strConditions.indexOf(id)!==-1)
     
  }
  return false
}

provide('isInUseByCondition',isInUseByCondition)
const submit = async (isPublish: Boolean) => {
  // basicSetting  formDesign flowDesign 返回的是Promise 因为要做校验
  // advancedSetting返回的就是值

  var isvalid = true
  var resBasic = await basicSetting.value?.getSetting().catch((err) => {
    state.activeStep = 'basicSetting'
    isvalid = false
  })

  if (!isvalid) return
  var resForm = await formDesign.value?.getSetting().catch((err) => {
    state.activeStep = 'formDesign'
    isvalid = false
  })
  if (!isvalid) return

  var resFlow = await flowDesign.value?.getSetting().catch((err) => {
    state.activeStep = 'flowDesign'
    isvalid = false
  })
  if (!isvalid) return

  var resAdvanced = await advancedSetting.value?.getSetting().catch((err) => {
    state.activeStep = 'advancedSetting'
    isvalid = false
  })
  if (!isvalid) return

  state.data.basicSetting = resBasic

  state.data.basicContext = JSON.stringify(state.data.basicSetting)

  state.data.advancedContext = JSON.stringify(resAdvanced)

  state.data.flowSetting = JSON.stringify(resFlow)
  state.data.formSetting = JSON.stringify(resForm)
  state.data.isPublish = isPublish

  if (isPublish) {
    proxy.$modal
      .confirm(`此操作将新建或者更新流程版本, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        submitToServer()
      })
      .catch(() => {})
  } else submitToServer()
}

const onOk = (form) => {
  state.data.formSetting = form
}

const translateX = computed(() => {
  return `translateX(${state.steps.findIndex((t) => t.key === state.activeStep) * 100}%)`
})

const changeSteps = (item: any) => {
  //state.fields=[]//formDesign.value.getFields()

  state.activeStep = item.key
}

const exit = () => {
  ElMessageBox.confirm('离开此页面您的修改将会丢失, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      window.parent.postMessage('close')
      window.close()
      // ElMessage({
      //   type: 'success',
      //   message: '模拟返回!',
      // })
    })
    .catch(() => {})
} 


// 页面加载前
  onBeforeMount(async() => {  
  
      var tplId = route.query.id
  if (tplId) {
    const res = await new TPLApi().get({ id: tplId })
    if (res.success) {
      state.data.basicSetting = JSON.parse(res.data.basicContext) ?? {}
      state.data.formSetting = JSON.parse(res.data.formSetting) ?? {}
      state.data.flowSetting = JSON.parse(res.data.flowSetting) ?? {}
      // {
      //   nodes:JSON.parse(res.data.activitiesContext),
      //   lines:JSON.parse(res.data.linesContext),
      //   xml:res.data.chartContext}
      state.data.model = res.data.model ?? {}
      //  console.log('formData:', json.formSetting)

      state.data.advancedSetting = JSON.parse(res.data.advancedContext) ?? {}
      
    }
  } 
  // state.data.basicSetting={}
  // state.data.formSetting={}
})


</script>

<style lang="scss" scoped>
$header-height: 54px;
.design-page {
  width: 100vw;
  height: 100vh;
  padding-top: $header-height;
  box-sizing: border-box;

  .page__header {
    width: 100%;
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    box-sizing: border-box;
    color: white;
    background: var(--el-color-primary); // #3296fa;
    font-size: 14px;
    position: fixed;
    top: 0;

    .page-actions {
      height: 100%;
      text-align: center;
      line-height: $header-height;

      > div {
        height: 100%;
        padding-left: 20px;
        padding-right: 20px;
        display: inline-block;
      }

      i {
        font-size: 22px;
        vertical-align: middle;
      }
    }

    .step-tab {
      display: flex;
      justify-content: center;
      height: 100%;
      position: relative;

      > .step {
        width: 140px;
        line-height: $header-height;
        padding-left: 30px;
        padding-right: 30px;
        cursor: pointer;
        position: relative;

        &.ghost-step {
          position: absolute;
          height: $header-height;
          left: 0;
          z-index: -1;
          background: var(--el-color-primary-light-2); // #4483f2;
          transition: transform 0.5s;

          &::after {
            content: '';
            border-width: 6px 6px 6px;
            border-style: solid;
            border-color: transparent transparent white;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -6px;
          }
        }

        &.active > .step-index {
          background: white;
          color: var(--el-color-primary-light-2); //  #4483f2;
        }

        > .step-index {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 1px solid #fff;
          border-radius: 8px;
          line-height: 18px;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
  }

  .page__content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background: #f5f5f7;
  }
}
.draft-btn {
  margin-right: 20px;
  color: var(--el-color-warning); // #3296fa;
  padding: 7px 20px;
  border-radius: 4px;
  font-size: 14px;
}
.publish-btn {
  margin-right: 20px;
  color: var(--el-color-primary); // #3296fa;
  padding: 7px 20px;
  border-radius: 4px;
  font-size: 14px;
}

.github {
  position: fixed;
  bottom: 10px;
  left: 20px;
}
</style>