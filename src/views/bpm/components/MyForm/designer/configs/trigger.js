// 组件rule的触发方式，无触发方式的组件不生成rule
// inputTable组件也有一份此常量的copy 如有改动 最好同步
export const trigger = {
    'el-input': 'blur',
    'el-input-number': 'blur',
    'el-select': 'change',
    'el-radio-group': 'change',
    
    'el-slider':'change',
    'el-color-picker':'change',
    'el-upload':'change',
    'el-checkbox-group': 'change',
    'el-cascader': 'change',
    'el-time-picker': 'change',
    'el-date-picker': 'change',
    'el-rate': 'change',
    'fc-amount': 'change',
    'fc-time-duration': 'change',
    'fc-date-duration': 'change',
    'ai-ou-select': 'input'
  }