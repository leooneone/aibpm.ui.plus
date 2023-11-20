<template>
  <section class="my-condition">
    <el-switch v-model="props.data.isDefault" active-text="默认/其他条件" inactive-text="指定条件"></el-switch>
    <el-empty v-if="props.data.isDefault" description="无需配置条件"></el-empty>
    <el-tree
      v-else
      :data="[state.dataTree]"
      :props="state.defaultProps"
      :expand-on-click-node="false"
      :default-expand-all="true"
      :indent="16"
      class="my-search-filter"
    >
      <template #default="{ node, data }">
        <template v-if="data.logic && !data.field">
          <span>
            <el-radio-group v-model="data.logic">
              <el-radio label="And">并且</el-radio>
              <el-radio label="Or">或者</el-radio>
            </el-radio-group>
            <el-button type="text" icon="el-icon-plus" @click="onAddGroup(data)">分组</el-button>
            <el-button type="text" icon="el-icon-plus" @click="onAddCondition(data)">条件</el-button>
            <el-icon v-if="!data.root" @click="onDelete(node, data)" style="margin-left: 8px"><ele-Delete /></el-icon>
          </span>
        </template>
        <template v-else>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-select v-model="data.field" :loading="state.loading" filterable @change="(value) => onChangeField(value, data)">
                <el-option v-for="(o, index) in props.conditions" :key="index" :label="o.label" :value="o.vModel" />
              </el-select>
            </el-col>

            <el-col :span="4" v-show="getOperators(data.type).length > 1">
              <el-select v-model="data.operator" @change="(value) => onChangeOperator(value, data)">
                <el-option v-for="(op, index) in getOperators(data.type)" :key="index" :label="op.label" :value="op.value" />
              </el-select>
            </el-col>
            <el-col :span="11">
              <ai-ou-select v-if="data.tag === 'ai-ou-select'" v-model="data.value" :tabList="['user']" />
              <template v-else-if="data.tag === 'fc-amount' || data.tag === 'el-input-number'">
                <el-input-number style="margin-left: 5px" v-model="data.value"></el-input-number>
              </template>
              <template v-else-if="data.tag === 'el-select'">
                <el-select v-model="data.value" placeholder="请选择">
                  <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>

              <template v-else-if="data.tag === 'el-radio-group'">
                <el-radio-group v-model="data.value" class="radio-group">
                  <el-radio v-for="item in data.options" :label="item.label" :key="item.label">{{ item.label }}</el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="data.type === 'date'">
                <el-date-picker
                  v-if="data.config.type.indexOf('range') >= 0"
                  v-model="data.value"
                  :type="data.config.type"
                  unlink-panels
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  :default-time="data.config.defaultTime"
                  :format="data.config.format"
                  :value-format="data.config.valueFormat"
                  :picker-options="state.datePickerOptions"
                  style="margin-left: 5px"
                />
                <el-date-picker
                  v-else
                  v-model="data.value"
                  :type="data.config.type"
                  :format="data.config.format"
                  :value-format="data.config.valueFormat"
                  :picker-options="state.datePickerOptions"
                  style="margin-left: 5px"
                />
              </template>
              <el-input-number
                v-else-if="data.type === 'number'"
                v-model="data.value"
                controls-position="right"
                style="width: 120px; margin-left: 5px"
              />
              <el-switch v-else-if="data.type === 'bool'" v-model="data.value" />
              <el-input v-else v-model="data.value" /> </el-col
            ><el-col :span="1">
              <el-icon @click="onDelete(node, data)" style="margin-left: 5px"><ele-Delete /></el-icon>
            </el-col>
          </el-row>
        </template>
      </template>
    </el-tree>
  </section>
</template>
    
    <script lang="ts" setup name="condition">
import { reactive,  watch } from 'vue' 

const props = defineProps({
  // {field: '', label: '', value: '', type: 'string', config: {type: '', format:'', valueFormat:''}}
  // 默认字段 default: true
  // 字段类型 type: 'string:字符串 | date:日期 | number:数字 | bool:布尔'
  // 日期操作符 operator: 'datetimerange'
  // 日期控件配置 config: {type: 'datetimerange', format:''YYYY-MM-DD HH:mm'', valueFormat:''YYYY-MM-DD HH:mm'', defaultTime : ['00:00:00', '00:00:00']}
  fields: {
    type: Array,
    default() {
      return []
    },
  },

  conditions: {
    type: Array,
    default() {
      return []
    },
  },
  data: {
    type: Object,
    default() {
      return { isDefault: true }
    },
  },
})

const operators = {
  equal: { label: '等于', value: 'Equal' },
  notEqual: { label: '不等于', value: 'NotEqual' },
  contains: { label: '包含', value: 'Contains' },
  notContains: { label: '不包含', value: 'NotContains' },
  startsWith: { label: '开始以', value: 'StartsWith' },
  notStartsWith: { label: '开始不是以', value: 'NotStartsWith' },
  endsWith: { label: '结束以', value: 'EndsWith' },
  notEndsWith: { label: '结束不是以', value: 'NotEndsWith' },
  lessThan: { label: '小于', value: 'LessThan' },
  lessThanOrEqual: { label: '小于等于', value: 'LessThanOrEqual' },
  greaterThan: { label: '大于', value: 'GreaterThan' },
  greaterThanOrEqual: { label: '大于等于', value: 'GreaterThanOrEqual' },
  dateRange: { label: '时间段', value: 'dateRange' },
  any: { label: '在列表', value: 'Any' },
  notAny: { label: '不在列表', value: 'NotAny' },
}

const operatorGroups = {
  default: [operators.equal],
  string: [
    operators.equal,
    operators.notEqual,
    operators.contains,
    operators.notContains,
    operators.startsWith,
    operators.notStartsWith,
    operators.endsWith,
    operators.notEndsWith,
  ],
  date: [
    operators.equal,
    operators.notEqual,
    operators.lessThan,
    operators.lessThanOrEqual,
    operators.greaterThan,
    operators.greaterThanOrEqual,
    operators.dateRange,
  ],
  number: [operators.equal, operators.notEqual, operators.lessThan, operators.lessThanOrEqual, operators.greaterThan, operators.greaterThanOrEqual],
  bool: [operators.equal], //, operators.notEqual],
}

let firstField = {
  field: '',
  label: '',
}
if (props.fields && props.fields.length > 0) {
  const field = props.fields.find((a) => a.default === true)
  if (field) {
    firstField = field
  } else {
    firstField = props.fields[0]
  }
}
const state = reactive({
  loading: false,
  key: 1,

  dataTree: {},
  defaultProps: {
    label: '',
    children: 'filters',
  },
  operatorGroups: operatorGroups,
  firstField: firstField,
  datePickerOptions: {
    disabledDate(time) {
      return time.getTime() > Date.now()
    },
  },
})

watch(
  () => props.data,
  (val) => {
    state.dataTree =
      val.root === undefined
        ? {
            root: true,
            logic: 'And',
            filters: [],
          }
        : val
  },
  {
    deep: true,
    immediate: true,
  }
)

const onConfirm = () => {
  if (props.data.isDefault || !state.dataTree.filters || state.dataTree.filters.length == 0) return { isDefault: true }
  var res = { ...state.dataTree, isDefault: props.data.isDefault }

  return res
}

const getOperators = (type) => {
  const ops = state.operatorGroups[type || '']
  return ops && ops.length > 0 ? ops : state.operatorGroups['default']
}
const onChangeField = (value, data) => {
  if (props.fields === undefined) return

  const field = props.fields.find((a) => a.vModel === value)

  data.value = ''
  data.label = field.label
  data.tag = field.tag
  data.type = field.dataType ? field.dataType : ''
  data.options = field.options
  const operators = getOperators(data.type)
  let defaultOprator = ''
  if (field.operator) {
    const operatorIndex = operators.findIndex((a) => a.value === field.operator)
    defaultOprator = operatorIndex >= 0 ? field.operator : ''
  }
  if (!defaultOprator) {
    defaultOprator = operators[0].value
  }
  data.operator = defaultOprator
  data.config = { ...field.config }
  if (data.type === 'date') {
    let dateType = 'date'
    if (data.operator === 'dateRange') {
      dateType = dateType + 'range'
    }
    data.config.type = data.config.type ? data.config.type : dateType
    if (data.config.type.indexOf('range') >= 0) {
      data.operator = 'dateRange'
    }
    data.config.format = data.config.format ? data.config.format : 'YYYY-MM-DD'
    data.config.valueFormat = data.config.valueFormat ? data.config.valueFormat : 'YYYY-MM-DD'
    data.config.defaultTime = data.config.defaultTime ? data.config.defaultTime : ['00:00:00', '00:00:00']
  }
}
const onChangeOperator = (value, data) => {
  if (data.type === 'date') {
    state.key++
    if (value === 'dateRange') {
      data.value = ''
      data.config.type = data.config.type + 'range'
    } else {
      if (data.config.type.indexOf('range') >= 0) {
        data.value = ''
        data.config.type = data.config.type.replace(/range$/, '')
      }
    }
  }
}
const onAddGroup = (data) => {
  const newFilter = {
    logic: 'And',
  }
  if (!data.filters) {
    //  this.$set(data, 'filters', [])
    data['filters'] = []
  }
  data.filters.push(newFilter)
}
const onAddCondition = (data) => {
  const firstOprator = getOperators(data.type)[0]
  const newFilter = {
    field: state.firstField.field,
    label: state.firstField.label,
    operator: firstOprator.value,
    config: { ...state.firstField.config },
    value: state.firstField.value,
  }
  if (!data.filters) {
    //  this.$set(data, 'filters', [])
    data['filters'] = []
  }
  const index = data.filters.findIndex((a) => a.logic && !a.field)
  if (index >= 0) {
    data.filters.splice(index, 0, newFilter)
  } else {
    data.filters.push(newFilter)
  }
}
const onDelete = (node, data) => {
  const parent = node.parent
  const filters = parent.data.filters || parent.data
  const index = filters.findIndex((d) => d === data)
  filters.splice(index, 1)
}
const reset = () => {
  state.dataTree.filters = []
}
const getDynamicFilter = () => {
  return _.cloneDeep(state.dataTree)
}
const type = (obj) => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}
defineExpose({onConfirm})
</script>
    
    <style lang="scss" scoped>
.my-condition{
:deep(.my-search-filter)  {
  .el-tree-node__content {
    height: 30px;
    align-items: stretch;
    margin-bottom: 5px;
  }
  .el-radio {
    margin-right: 10px;
  }
  .el-radio__label {
    padding-left: 5px;
  }
  .el-button [class*='el-icon-'] + span {
    margin-left: 2px;
  }
  .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 160px;
  }
  .el-date-editor--datetime.el-input,
  .el-date-editor--datetime.el-input__inner {
    width: 160px;
  }
  .el-date-editor--monthrange.el-input,
  .el-date-editor--monthrange.el-input__inner {
    width: 180px;
  }
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 210px;
  }
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 280px;
  }
}}
</style>
    