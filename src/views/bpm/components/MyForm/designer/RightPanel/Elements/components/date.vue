<template >


<el-form-item
            v-if="props.data.type !== undefined "
            label="时间类型"
          >
            <el-select
              v-model="props.data.type"
              placeholder="请选择时间类型"
              :style="{ width: '100%' }"
              @change="dateTypeChange"
            >
              <el-option
                v-for="(item, index) in dateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        
         
          <el-form-item v-if="props.data['range-separator'] !== undefined" label="分隔符">
            <el-input v-model="props.data['range-separator']" placeholder="请输入分隔符" />
          </el-form-item>
          <el-form-item v-if="props.data['picker-options'] !== undefined" label="时间段">
            <el-input v-model="props.data['picker-options'].selectableRange" placeholder="请输入时间段" />
          </el-form-item>
          <el-form-item v-if="props.data.format !== undefined" label="时间格式">
            <el-input
            v-model="props.data.format"
              placeholder="请输入时间格式"
              @input="setTimeValue"
            />
          </el-form-item> 
          <el-form-item v-if="props.data['showDuration'] !== undefined" label="计算时长">
            <el-switch v-model="props.data['showDuration']" placeholder="自动计算时长" @change="requireChange" />
          </el-form-item>

 

</template> 

<script lang="ts" setup> 
import { computed, inject, reactive } from "vue";



const props=defineProps(['data']     )

const dateTimeFormat = {
  date: "YYYY-MM-DD",
  week: "yyyy 第 WW 周",
  month: "yyyy-MM",
  year: "yyyy",
  datetime: "YYYY-MM-DD HH:mm:ss",
  daterange: "YYYY-MM-DD",
  monthrange: "yyyy-MM",
  datetimerange: "YYYY-MM-DD HH:mm:ss"
};

const addPCondition=inject('addPCondition')
const delPCondition=inject('delPCondition')
const dateOptions=computed( ()=>{
      if (
        props.data.type !== undefined &&
        ['el-date-picker','fc-date-duration'].includes(props.data.tag)
      ) {
        if (props.data["start-placeholder"] === undefined) {
          return state.dateTypeOptions;
        }
        return state.dateRangeTypeOptions;
      }
      return [];
    })

 
  const     requireChange=(required) =>{
      // 下拉 单选 计数 日期区间 时间区间 需要写进流程条件中
      if (!props.data.proCondition) return;
      if (required && !props.data.multiple) {
        // 没有设置时长的时间范围组件不能作为流程条件
        const isRangeCmp = ['fc-date-duration','fc-time-duration'].includes(props.data.tag)
        const showDuration = props.data.showDuration
        if( isRangeCmp && !showDuration){
          delPCondition(props.data.formId);
          return 
        }
        addPCondition( props.data);
      } else {
         delPCondition( props.data.formId);
      }
    }

    const setTimeValue=() =>{
       
      var val=props.data.format
      var type=props.data.type
  const valueFormat = type === "week" ? dateTimeFormat.date : val;
   props.data[ "defaultValue"]= null;
   props.data[ "value-format"]= valueFormat;
   props.data["format"]= val;
}
 const  dateTypeChange=(val) =>{
       setTimeValue(dateTimeFormat[val], val);
    } 

    const state =reactive({

      dateTypeOptions: [
        {
          label: "日(date)",
          value: "date"
        },
        {
          label: "周(week)",
          value: "week"
        },
        {
          label: "月(month)",
          value: "month"
        },
        {
          label: "年(year)",
          value: "year"
        },
        {
          label: "日期时间(datetime)",
          value: "datetime"
        }
      ],
      dateRangeTypeOptions: [
        {
          label: "日期范围(daterange)",
          value: "daterange"
        },
        {
          label: "月范围(monthrange)",
          value: "monthrange"
        },
        {
          label: "日期时间范围(datetimerange)",
          value: "datetimerange"
        }
      ],
   
    })

    const rangeChange=(val) =>{
    
    props.data["defaultValue"]=
    val ? [props.data.min, props.data.max] : props.data.min;
   
} 
</script>
<style lang="scss">


.time-range {
	.el-date-editor {
		width: 227px;
	}
	:deep(.el-icon-time) {
			display: none;
		}
	}
}
</style>