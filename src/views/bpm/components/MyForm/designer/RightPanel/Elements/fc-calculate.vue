<template>
          <el-form-item v-if="props.data.expression !== undefined" label="计算公式">
            <div @click="state.expDialogVisible = true;" 
            class="pane-calc-preview" style="width:100%">
              <span 
                v-for="(item, index) in props.data.expression"
                :key="index"
                :class="{'calc-btn': typeof item !== 'string',
                'error': typeof item !== 'string' && item.label === '无效的值'}" >
                  {{typeof item !== 'string' ? item.label : item}}
              </span>
            </div>
          </el-form-item>



          
    <el-dialog
      title="编辑计算公式"
      custom-class="calc-dialog"
      v-model="state.expDialogVisible"
      width="600px">
      <div class="calc-box">
        <el-alert v-show="!state.expValid" title="编辑的公式不符合计算法则，无法计算" type="error" show-icon> </el-alert>
        <div class="calc-preview" :class="{error: !state.expValid}">
          计算公式 = 
          <span 
            v-for="(item, index) in state.expressionTemp" 
            :key="index"
            :class="{'calc-btn': typeof item !== 'string',
            'error': typeof item !== 'string' && item.label === '无效的值'}"
            >
          {{typeof item !== 'string' ? item.label : item}}
          </span>
          <div class="preview-actions">
           <el-icon style="transform: rotate(-90deg);"  @click="state.expressionTemp.pop()"> <ele-PriceTag /></el-icon>
           <el-icon   @click="state.expressionTemp = []"> <ele-Delete /></el-icon>
           
          </div>
        </div>
        <div class="calc-tip">编辑计算公式可用来完成审批单内数据的自动结算，例如：采购单内设置计算公式“合计=单价×数量”，发起人填写单价、数量后，组件将自动计算出合计金额，免手动计算</div>
        <div>
          <span>计算对象：</span>
          <span 
            v-for="item in calculateCmps" 
            :key="item.vModel"
            @click="state.expressionTemp.push(item)"
            class="calc-btn" >
          {{item.label}}
          </span>
        </div>
        <div style="margin: 10px 0;">
          <span>计算符号：</span>
          <span 
          v-for="item in ['+', '-', '×', '÷', '(', ')']" 
          class="calc-btn" 
          :key="item"
          @click="state.expressionTemp.push(item)">{{item}}</span>
        </div>

        <div style="margin: 10px 0;">
          <span style="float: left;">数字键盘：</span>
          <div style="width: 110px;line-height: 2.5;overflow: hidden;">
            <span 
              :key="item"
              class="calc-btn" 
              v-for="item in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']" 
              @click="state.expressionTemp.push(item)" >{{item}}</span>
            </div>
        </div>
      </div>
      <template #footer  >
      <span  class="dialog-footer">
        <el-button @click="state.expDialogVisible = false;state.expressionTemp = []" size="small">取 消</el-button>
        <el-button type="primary" @click="checkExpression"  size="small">确 定</el-button>
      </span>
    </template>
    </el-dialog>
</template>


<script lang="ts" setup> 
import { computed, reactive,watch } from "vue"


import {mergeNumberOfExps, validExp, toRPN, calcRPN} from '/@/utils/bpm/index.js' 

const props=defineProps(['data','list']     )


const calculateCmps =computed(()=> {
      const calcList = []
      const loop = (data, parent) => {
        if(!data) return
        if(Array.isArray(data.children)) {
          loop(data.children, data)
        }
        if(Array.isArray(data)) data.forEach(d => loop(d, parent)) 
        if (['el-input-number', 'fc-amount'].includes(data.tag)){
          const isTableChild = parent && parent.rowType === 'table'
          calcList.push({
            vModel: isTableChild ? parent.vModel + '.' + data.vModel : data.vModel,
            label: isTableChild ? parent.label + '.' + data.label : data.label
          })
        }
      }
      loop(props.list)
     // loop(this.bpm.formItemList)
      return calcList
    })

  
const checkExpression=()=>{
      let formatExp = mergeNumberOfExps(state.expressionTemp)
      const temp = formatExp.map(t => typeof t === 'object' ? 1 : t)
      state.expValid = validExp(temp, false)
      if(state.expValid) {
        props.data.expression = state.expressionTemp // calcRPN(toRPN(formatExp))
        state.expDialogVisible = false
      }
    } 
 const state= reactive({

   expressionTemp: [],
      expValid: true,
  expDialogVisible:false,
 })


 
 const reloadExpressionTemp=()=>{
      const isValid = (d) => {
        const target = calculateCmps.value.find(cmp => cmp.vModel === d.vModel && cmp.label === d.label)
        return target ? true : false
      }
      state.expressionTemp = props.data.expression.map(t => {
        return typeof t === 'string' || isValid(t) ? t : { vModel: t.vModel, label: '无效的值'}
      })
      props.data.expression = state.expressionTemp
    } 


    watch(
  () =>  props.data,
  (val) => { 
    console.log('+++++++++++++++++++++++++++')
      reloadExpressionTemp()
  },
  {immediate:true}
)
</script>


<style lang="scss">

.calc-btn {
	padding: 4px 8px;
	margin: 0 6px;
	background: #e5e5e5;
	cursor: pointer;
	&.error {
		background: #f56c6c;
		color: #fff;
	}
	&:hover {
		background: #f5f5f5;
	}
}
.pane-calc-preview {
	padding: 0 10px;
	cursor: pointer;
	min-height: 32px;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	font-size: 12px;
}

.calc-dialog {
	& >  {
		& >  {
			& > .el-dialog__body {
				padding-top: 0;
			}
		}
	}
	.calc-box {
		font-size: 12px;
		line-height: 2;
		.calc-tip {
			margin: 10px 0;
			font-size: 12px;
			color: #aaa;
		}
		.calc-preview {
			border: 1px solid #e5e5e5;
			border-radius: 4px;
			min-height: 60px;
			padding: 4px 10px;
			position: relative;
			&.error {
				border: 1px solid #f00;
			}
			.preview-actions {
				position: absolute;
				bottom: 0;
				right: 0;
				& > i {
					font-size: 14px;
					margin-right: 8px;
					cursor: pointer;
					&:hover {
						color: #f00;
					}
				}
			}
		}
	}
}
 
.calc-dialog  .el-dialog__body{
  padding-top: 0;
  padding-bottom: 0;
}
</style>