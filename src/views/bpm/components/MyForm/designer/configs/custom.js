
import PROVINCE from './province.js'
import  * as basics from  './basic.js'
///定制组件
export const customComponents=[
  {
    label: '组织单元',
    showLabel: true,
    tag: 'ai-ou-select',
    tagIcon: 'dept',
    defaultValue: {'user':[],'role':[],'org':[]}, 
    tabs:['user'],
    buttonType: 'button',
    title: '组织机构',
    searchable: true,
    maxNum: 1,
    collapseTags:1,
    tagConfig: {
      type: 'info',
      closable: true,
      'disable-transitions': false,
      hit: false,
      color: undefined,
      size: 'small',
      effect: 'light'
    },
    style: { width: '100%' },
    span: 24,
    labelWidth: null,
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    proCondition: true,
    asSummary: false
  },
     
    {
      label: '金额',
      showLabel: true,
      dataType:'number',
      tag: 'fc-amount',
      tagIcon: 'amount',
      placeholder: '请输入',
      defaultValue: undefined,
      style: { width: null },
      span: 24,
      labelWidth: null,
      min: undefined,
      max: undefined,
      step: undefined,
      'step-strictly': false,
      precision: undefined,
      'controls-position': 'right',
      disabled: false,
      required: true,
      regList: [],
      changeTag: true,
      proCondition: true,
      showChinese: true
    },{ 
        label: '编辑器',
        showLabel: true,
        changeTag: true,
        labelWidth: null,
        tag: 'tinymce',
        tagIcon: 'rich-text',
        defaultValue: null,
        span: 24,
        layout: 'colFormItem',
        required: true,
        regList: [],
        document: 'http://tinymce.ax-z.cn',
       
      placeholder: '请输入',
      height: 300, // 编辑器高度
      branding: false // 隐藏右下角品牌烙印
    },
    
    {
      label: '省市区',
      showLabel: true,
      tag: 'el-cascader',
      type:'select',
      tagIcon: 'area',
      placeholder: '请选择',
      defaultValue: [],
      span: 24,
      labelWidth: null,
      style: { width: '100%' },
      props: {
          
        props: {
          multiple: false,
        }
      },
      'show-all-levels': true,
      disabled: false,
      clearable: true,
      filterable: false,
      required: true,
      options: PROVINCE,
      dataType: 'static',
      labelKey: 'label',
      valueKey: 'value',
      childrenKey: 'children',
      separator: '/',
      regList: [],
      changeTag: true,
      proCondition: false,
      asSummary: false
    },
    {
      label: '计算公式',
     // type: 'calculate',
      type:'number',
      showLabel: true,
      tag: 'fc-calculate',
      showChinese: true,
      tagIcon: 'calculate',
      defaultValue: null,
      labelWidth: null,
      disabled: false,
      required: true,
      changeTag: true,
      expression: [],
      proCondition: true,
      asSummary: false
    },{
      layout: 'rowFormItem',
      orgtag:'el-table',
      rowType: 'table',
      tagIcon: 'table',
      showLabel: true,
      tag: 'fc-input-table',
      type: 'table', // list
      justify: 'start',
      align: 'top',
      label: '表格/明细',
      layoutTree: false,
      children: [],
      actionText: '添加',
      tableConf: {},
      'show-summary': true,
      defaultValue: []
    },
  ]


  const getConfigByTag = ( targetList, tag ) => targetList.find( t => t.tag === tag )
  const copyConfigAsCustom = ( rowConf, childrenConf ) => {
    const clone = ( target, conf = {} ) => {
      const template = JSON.parse( JSON.stringify( target ) )
      return Object.assign( {}, template, { cmpType: 'custom' }, conf )
    }
    const defaultRow = clone( basics.layoutComponents[0], rowConf )
    defaultRow.children = childrenConf.map( t => clone( t.target, t.config ) )
    return defaultRow
  }
  // 定制组合组件
export const customGroupComponents = [
    copyConfigAsCustom( { label: '请假组件', explain: null }, [
      {
        target: getConfigByTag( basics.selectComponents, 'el-select' ),
        config: {
          label: "请假类型",
          required: true,
          options: [
            {
              label: "病假",
              value: "病假"
            },
            {
              label: "事假",
              value: "事假"
            },
            {
              label: "婚假",
              value: "婚假"
            },
            {
              label: "丧假",
              value: "丧假"
            },
            {
              label: "产假",
              value: "产假"
            },
            {
              label: "年假",
              value: "年假"
            }
          ],
        }
      },
      {
        target: getConfigByTag( basics.selectComponents, 'fc-date-duration' ),
        config: {
          required: true,
          label: "日期范围",
          showDuration: true,
        }
      }
    ] ),
    copyConfigAsCustom( { label: "出差组件", explain: null }, [
      {
        target: getConfigByTag( basics.inputComponents, 'el-input' ),
        config: {
          label: "出差事由",
          required: true
        }
      },
      {
        target: getConfigByTag( basics.selectComponents, 'el-select' ),
        config: {
          label: "交通工具",
          required: true,
          options: [
            {
              label: "火车",
              value: "火车"
            },
            {
              label: "飞机",
              value: "飞机"
            },
            {
              label: "汽车",
              value: "汽车"
            },
            {
              label: "其他",
              value: "其他"
            }
          ]
        }
      },
      {
        target: getConfigByTag( basics.selectComponents, 'el-select' ),
        config: {
          label: "单程往返",
          required: true,
          options: [
            {
              label: "单程",
              value: "单程"
            },
            {
              label: "往返",
              value: "往返"
            }
          ]
        }
      },
      {
        target: getConfigByTag( basics.inputComponents, 'el-input' ),
        config: {
          label: "出发城市",
          required: true
        }
      },
      {
        target: getConfigByTag( basics.inputComponents, 'el-input' ),
        config: {
          label: "目的城市",
          required: true
        }
      },
      {
        target: getConfigByTag( basics.selectComponents, 'fc-date-duration' ),
        config: {
          label: "日期范围",
          showLabel: true,
    tag: "fc-date-duration",
          showDuration: true,
          required: true
        }
      },
      {
        target: getConfigByTag(basics. inputComponents, 'el-input' ),
        config: {
          label: "出差备注",
          required: false
        }
      },
      {
        target: getConfigByTag(basics. inputComponents, 'el-input' ),
        config: {
          label: "同行人",
          required: false
        }
      }
    ] )]


    export default {

      customComponents,customGroupComponents
    }