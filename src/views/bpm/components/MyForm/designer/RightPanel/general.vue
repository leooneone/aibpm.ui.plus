<template>
  <el-form-item v-if="props.data.vModel !== undefined" label="字段名">
    <el-input v-model="props.data.vModel" placeholder="请输入字段名（v-model）" />
  </el-form-item>
  <!-- <el-form-item
            v-if="props.data.componentName!==undefined"
            label="组件名"
          >{{ props.data.componentName }}</el-form-item> -->
  <el-alert v-if="props.data.description" type="info">{{ props.data.description }}</el-alert>
  <el-form-item v-if="props.data.label !== undefined" label="标题">
    <el-input v-model="props.data.label" placeholder="请输入标题" />
  </el-form-item> 
  <el-form-item label="默认值" v-if="props.data.layout!==undefined&&!props.data.customDefaultValue" >
    <el-input v-if="props.data.tag === 'my-text'" v-model="props.data.defaultValue" placeholder="请输入文本内容" />

    <component v-else :is="props.data.tag" v-model="props.data.defaultValue"> </component>
  </el-form-item>
  <el-form-item v-if="props.data.placeholder !== undefined" label="占位提示">
    <el-input v-model="props.data.placeholder" placeholder="请输入占位提示" />
  </el-form-item>
  <el-form-item v-if="props.data['start-placeholder'] !== undefined" label="开始占位">
    <el-input v-model="props.data['start-placeholder']" placeholder="请输入占位提示" />
  </el-form-item>
  <el-form-item v-if="props.data['end-placeholder'] !== undefined" label="结束占位">
    <el-input v-model="props.data['end-placeholder']" placeholder="请输入占位提示" />
  </el-form-item>

  <el-form-item v-if="props.data.label !== undefined" label="显示标签">
    <el-switch v-model="props.data.showLabel" />
  </el-form-item>
  <!--<el-form-item v-if="props.data.branding !== undefined" label="品牌烙印">
            <el-switch v-model="props.data.branding" @input="changeRenderKey" />
          </el-form-item>-->

  <el-form-item v-if="props.data.range !== undefined" label="范围选择">
    <el-switch v-model="props.data.range" @change="rangeChange" />
  </el-form-item>
  <!-- <el-form-item
            v-if="props.data.border !== undefined && props.data.optionType === 'default'"
            label="是否带边框"
          >
            <el-switch v-model="props.data.border" />
          </el-form-item>-->

  <!-- <el-form-item v-if="props.data.readonly !== undefined" label="是否只读">
            <el-switch v-model="props.data.readonly" />
          </el-form-item>
          <el-form-item v-if="props.data.disabled !== undefined" label="是否禁用">
            <el-switch v-model="props.data.disabled" />
          </el-form-item>-->

  <el-form-item v-if="props.data.showChinese !== undefined" label="显示大写">
    <el-switch v-model="props.data.showChinese" />
  </el-form-item>

  <el-form-item
    v-if="
      props.data.size !== undefined &&
      (props.data.optionType === 'button' || props.data.border || props.data.tag === 'el-color-picker' || props.data.tag === 'el-button')
    "
    label="组件尺寸"
  >
    <el-radio-group v-model="props.data.size">
      <el-radio-button label="large">较大</el-radio-button>
      <el-radio-button label="default">默认</el-radio-button>
      <el-radio-button label="small">较小</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="作为摘要" v-if="props.data.asSummary !== undefined">
    <el-switch v-model="props.data.asSummary" />
  </el-form-item>

  <el-form-item v-if="props.data.cmpType === 'custom'" label="组件说明">
    <el-input type="textarea" v-model="props.data.explain" />
  </el-form-item>

  <el-form-item label="对齐方式" v-if="props.data.textAlign !== undefined">
    <el-radio-group v-model="props.data.textAlign">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="center">居中</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
    </el-radio-group>
  </el-form-item>

  <el-form-item v-if="props.data['preWrap'] !== undefined" label="自动换行">
    <el-switch v-model="props.data['preWrap']" />
  </el-form-item>

  <el-form-item v-if="props.data['show-word-limit'] !== undefined" label="输入统计">
    <el-switch v-model="props.data['show-word-limit']" />
  </el-form-item>

  <el-form-item v-if="props.data.readonly !== undefined" label="是否只读">
    <el-switch v-model="props.data.readonly" />
  </el-form-item>
  <el-form-item v-if="props.data.disabled !== undefined" label="是否禁用">
    <el-switch v-model="props.data.disabled" />
  </el-form-item>

  <el-form-item v-if="props.data.show !== undefined" label="是否顯示">
    <el-switch v-model="props.data.show" />
  </el-form-item>

  <!-- <el-form-item v-if="props.data.clearable !== undefined" label="能否清空">
            <el-switch v-model="props.data.clearable" />
          </el-form-item>-->
  <el-form-item v-if="props.data.showTip !== undefined" label="显示提示">
    <el-switch v-model="props.data.showTip" />
  </el-form-item>
  <el-form-item v-if="props.data.required !== undefined" label="是否必填">
    <el-switch v-model="props.data.required" @change="requireChange" :disabled="!props.couldChangeRequire" />
    <el-tooltip class="item" effect="dark" placement="top-start">
      <template #content>
        <div>
          流程条件：流程设计里可用于区分流程走向
          <br />
          例如：金额大于500需要主管+经理审批；小于500只需要主管审批。
        </div>
      </template>

      <span v-show="props.data.proCondition" style="font-size:12px;color#aaa;">&nbsp;(勾选后可作为流程条件)</span>
    </el-tooltip>
  </el-form-item>

  <el-form-item v-if="props.data.showDivider !== undefined" label="显示分割线">
    <el-switch v-model="props.data.showDivider" />
  </el-form-item>

  <!-- <el-form-item v-if="props.data.layout==='rowFormItem'" label="布局模式">
            <el-radio-group v-model="props.data.type">
              <el-radio-button label="default" />
              <el-radio-button label="flex" />
            </el-radio-group>
          </el-form-item>-->

  <el-form-item v-if="props.data.labelWidth !== undefined" label="标签宽度">
    <el-input-number v-model.number="props.data.labelWidth" placeholder="请输入标签宽度" />
  </el-form-item>
  <el-form-item v-if="props.data.style && props.data.style.width !== undefined" label="组件宽度">
    <el-input v-model="props.data.style.width" placeholder="请输入组件宽度" clearable />
  </el-form-item>
  <el-form-item v-if="props.data.fontSize !== undefined" label="字体大小">
    <el-input v-model="props.data.fontSize" placeholder="请输入字体大小" clearable />
  </el-form-item>
  <!-- <template v-if="props.data.layout === 'colFormItem'">
            <el-divider>正则校验</el-divider>
            <div
              v-for="(item, index) in props.data.regList"
              :key="index"
              class="reg-item"
            >
              <span class="close-btn" @click="props.data.regList.splice(index, 1)">
                <i class="el-icon-close" />
              </span>
              <el-form-item label="表达式">
                <el-input v-model="item.pattern" placeholder="请输入正则" />
              </el-form-item>
              <el-form-item label="错误提示" style="margin-bottom:0">
                <el-input v-model="item.message" placeholder="请输入错误提示" />
              </el-form-item>
            </div>
            <div style="margin-left: 20px">
              <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
                添加规则
              </el-button>
            </div>
          </template>-->
</template>

<script lang="ts" setup>
import IconsDialog from '../IconsDialog.vue'
const props = defineProps(['data', 'couldChangeRequire'])

const multipleChange = (val) => {
  props.data['defaultValue'] = val ? [] : ''
}

const notObject = (val) => {
  return val === null || val === undefined || Object(val) !== val
}

const addReg = () => {
  props.data.regList.push({
    pattern: '',
    message: '',
  })
}
</script>
