/**
 *Copyright: Copyright (c) 2023
 *Author:Leo
 *Version 1.0
 *Title: form-generator/Element Plus 表单解析器
 *GitHub: https://github.com/leooneone/aibpm.ui.plus
 */

<template>
  <el-form
    :model="formConf.model"
    ref="myForm"
    :size="formConf.size"
    :label-position="formConf.labelPosition"
    :disabled="loading||formConf.disabled"
    :label-width="formConf.labelWidth + 'px'"
    :gutter="formConf.gutter"
    :rules="formRules"
  >
    <render-panel
      :list="conf.data"
      :animation="200"
      group="componentsGroup"
      tag="el-row"
      :conf="formConf"
      :style="{ marginLeft: 0, alignContent: 'start', height: '100%' }"
      :gutter="conf.gutter"
    ></render-panel>
  </el-form>
</template>

<script lang="ts"> 
// import CodeTypeDialog from './CodeTypeDialog'
import RenderPanel from '../Render/RenderPanel.vue'
import { 
  // getIdGlobal,
  // saveIdGlobal,
  getFormConf,
} from './utils/db'

import { trigger } from './configs/trigger.js'
const formConfInDB = getFormConf()

export default {
  components: {
    RenderPanel,
    // FormDrawer,
    // CodeTypeDialog,
  },
  props: ['conf','loading'],
  data() {  
    return {
      // idGlobal, 
      formConf: {  tableRefs: {},model:JSON.parse(JSON.stringify(this.conf.model))},
      formRules: {},
     
      labelWidth: 100, 
      drawerVisible: false,  
    }
  },
 
  watch: {
    // conf(val){

    //   formConf: {  tableRefs: {},model:JSON.parse(JSON.stringify(this.conf.model))},
    // }
    // eslint-disable-next-line func-names
  },
  created() {
    if (typeof this.conf === 'object' && this.conf !== null) {
 
      Object.assign(this.formConf, this.conf)
    } else { 
      

      formConfInDB && (this.formConf = formConfInDB)
    }
 
    this.formConf.mode = 'parser'

    this.getFields(this.formConf.data)
    this.$nextTick((_) => {
      //干点什么呢
    })
  },

  computed: {
    bpm() {
      return { processConditions: [] }
    },
  },
  methods: {
    getFields(el) {
      // if (flag) return // flag === true 代表找到了一个了 不需要再找下一个
      if (Array.isArray(el)) {
        el.forEach((e) => {
          if (e.children) this.getFields(e.children)

          if (e.vModel) {
           // e.rules = this.buildRules(e)
            this.formRules[e.vModel] = this.buildRules(e) 
          }

          return e
        }) // && (flag = true)
      }
    },

    ///检查表格数据
    checkTableData() {
      let valid = true
      Object.keys(this.formConf.tableRefs).forEach((vModel) => {
        const ref=this.formConf.tableRefs[vModel]
        const res = ref.submit() // 返回false或表单数据
        res ? (this.formConf.model[vModel] = res) : (valid = false)
      })
      return valid
    },
    submitForm(callback) {
      let formEl = this.$refs['myForm']
      if (!formEl) return

      const isTableValid = this.checkTableData()

      formEl.validate((valid) => {
        if (valid) {
           if (!isTableValid) return false 
            if(callback){
              callback(this.formConf.model)
            }
         // this.$message.success('提交到后台')
        } else {
          this.$message.error('验证失败')
          return false
        }
      }) 
    },
 
 /**
 * 组织单元必填规则 
 */
  setOUSelectRule  ( conf ) {
  return { 
    validator: (rule, value, callback) => {
      var val =value// ctx.formModel[rule.field]
      if (Object.keys(val || {}).length === 0) {
        callback()
        return
      }
      var count = 0
      conf.tabs.forEach(key => {
        val && Array.isArray(val[key]) && (count += val[key].length)
      })
      callback(count ? undefined : new Error(`${conf.title}不能为空`))
    }, 
    trigger: trigger[conf.tag],
    type: 'object',
    required: true, 
  }
},
    /**
     * 收集表单必填项并组装成ElementUI表单校验得rules选项
     * 表格除外 表格自带校验
     */
    buildRules(item:any) {
      if (item.vModel === undefined || !trigger[item.tag]) return
      const rules = [] 
      //如果禁用了设置为非必填
      if(item.disabled)
      item.required=false
      if (item.required) {
        const type = Array.isArray(item.defaultValue) ? 'array' : undefined
        let message = Array.isArray(item.defaultValue) ? `请至少选择一个` : item.placeholder //'请输入'+item.label//
        if (message === undefined) message = `${item.label}不能为空` 
        if(item.tag==='ai-ou-select')
        {
          rules.push( this.setOUSelectRule( item ) )

        }else 
        {  
           let rule={ required: true, message, trigger: trigger[item.tag] }
          if(type)
            rule['type']=type
          rules.push(rule)
        }
       
      }
      // 自定义正则匹配
      if (item.regList && Array.isArray(item.regList)) {
        item.regList.forEach((item:any) => {
          if (item.pattern) {
            rules.push({ pattern: eval(item.pattern), message: item.message, trigger: trigger[item.tag] })
          }
        })
      }
      return rules
      /// ctx.ruleList[item.vModel] = rules
    },
 
 
 
 
  },
   
}
</script>
