<template v-if="['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(props.data.tag) > -1">
  <el-form-item v-if="props.data.optionType !== undefined" label="选项样式">
    <el-radio-group v-model="props.data.optionType">
      <el-radio-button label="default">默认</el-radio-button>
      <el-radio-button label="button">按钮</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-divider>选项</el-divider>

  <el-radio-group
    v-if="props.data.tag === 'el-radio-group' || (props.data.tag === 'el-select' && !props.data.multiple)"
    v-model="props.data.defaultValue"
    @change="emitDefaultValueChange"
    style="line-height: 30px"
  >
    <draggable :list="props.data.options" :animation="340" group="selectItem" handle=".option-drag"
      ><template #item="{ element, index }">
        <el-radio :label="element.value">
          <div :key="index" class="select-item">
            <div class="select-line-icon option-drag">
              <el-icon><ele-Operation></ele-Operation></el-icon>
            </div>
            <el-input v-model="element.label" placeholder="选项名" size="small" />
            <el-input placeholder="选项值" size="small" v-model="element.value" />
            <div class="close-btn select-line-icon" @click="props.data.options.splice(index, 1)">
              <el-icon><ele-Remove></ele-Remove></el-icon>
            </div>
          </div>
        </el-radio>
      </template>
    </draggable>
  </el-radio-group>

  <el-checkbox-group
    v-if="props.data.tag === 'el-checkbox-group' || (props.data.tag === 'el-select' && props.data.multiple)"
    v-model="props.data.defaultValue"
    @change="emitDefaultValueChange"
    style="line-height: 30px"
  >
    <draggable :list="props.data.options" :animation="340" group="selectItem" handle=".option-drag"
      ><template #item="{ element, index }">
        <el-checkbox :label="element.value">
          <div :key="index" class="select-item">
            <div class="select-line-icon option-drag">
              <el-icon><ele-Operation></ele-Operation></el-icon>
            </div>
            <el-input v-model="element.label" placeholder="选项名" size="small" />
            <el-input placeholder="选项值" size="small" v-model="element.value" />
            <div class="close-btn select-line-icon" @click="props.data.options.splice(index, 1)">
              <el-icon><ele-Remove></ele-Remove></el-icon>
            </div>
          </div>
        </el-checkbox>
      </template>
    </draggable>
  </el-checkbox-group>
  <div style="margin-left: 20px">
    <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="addSelectItem">添加选项</el-button>
  </div>
  <el-divider />
</template>

<script lang="ts" setup>
import { isNumberStr } from '../../../utils/index.js'

import draggable from 'vuedraggable'
const props = defineProps(['data'])

const setOptionValue = (item, val) => {
  let res = isNumberStr(val) ? +val : val
  item.label = res
  item.value = res
}

const addSelectItem = () => {
  props.data.options.push({
    label: '',
    value: '',
  })
}
</script>
<style lang="scss">
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  .el-input {
    & + .el-input {
      margin-left: 4px;
    }
  }
  & + .select-item {
    margin-top: 4px;
  }
  &.sortable-chosen {
    border: 1px dashed #409eff;
  }
}
.option-drag {
  cursor: move;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
</style>
