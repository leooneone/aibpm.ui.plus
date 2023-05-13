import { TRUE } from "sass"

export const extComponents = [ 
   
  { 
    label: '文字',
    tag:'my-text',
    dataType:'string', 
    textAlign:'center',
    fontSize:'12px',
    tagIcon: 'static-text',
    content:'静态文本',
    defaultValue: '静态文本',
    span: 24,
    style: { width: '100%' },
    maxlength: null,
    __slot__:{},
  },

  {
    label: '按钮',
        showLabel: true,
        changeTag: true,
        labelWidth: null,
        tag: 'el-button',
        tagIcon: 'button',
        defaultValue: undefined,
        span: 24,
        __slot__: {
          default: '主要按钮'
        },
        layout: 'colFormItem',
        type: 'primary',
        icon: 'ele-Search',
        round: false,
        size: 'medium',
        plain: false,
        circle: false,
        disabled: false,
        document: 'https://element.eleme.cn/#/zh-CN/component/button'
  }
  ]

  export default {

    extComponents
  }