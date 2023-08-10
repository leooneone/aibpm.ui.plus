import { TRUE } from "sass"

export const extComponents = [ 
   
{ 
  orgTag:'el-table',
  span:24,
  stripe:true,
  border:false,
  size:'default',
  fit:true,
  showHeader:true,
  highlight:true,
  rowKey:'',
  'show-summary':false,
  tree:false,
  cols:[{type:'',isShow:true,label:'日期',prop:'date',width:'auto',minWidth:undefined,fixed:false,align:'center',},
  {type:'',isShow:true,label:'名称',prop:'name',width:'auto',minWidth:undefined,fixed:false,align:'center',},
  {type:'',isShow:true,label:'地址',prop:'address',width:'auto',minWidth:undefined,fixed:false,align:'center',},

],
  tag:'ai-data-table',
  width:'100%', 
  checkbox:false,
  tagIcon: 'table',
  type: 'default',
  justify: 'start',
  align: 'top',
  label: '数据表格',
  layoutTree: true,
  data: [ {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },],  
  shadow:'always'
},
  { 
    label: '文字',
    tag:'my-text',
    dataType:'string', 
    textAlign:'center',
    fontSize:'12px',
    tagIcon: 'static-text',
    text:'静态文本',
    showLabel:false,
    defaultValue: '静态文本',
    span: 24,
    preWrap:false,
    style: { width: '100%' },
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