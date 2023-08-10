<template>
  <div v-if="item.showLabel">{{ item.label }}</div>
  <el-table class="drawing-layout-item" v-bind="item" :data="item.data">
    <template v-for="(col, index) in item.cols">
      <el-table-column v-bind="col" v-if="col.isShow" :prop="col.prop" :formatter="(r,c)=>{return formatter(r,c, col)  }"> </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts" setup name="ai-data-table">
import { inject, provide, defineAsyncComponent } from 'vue'
import dayjs from 'dayjs'
import numeral  from 'numeral'
const RenderPanel = defineAsyncComponent(() => import('../RenderPanel.vue'))

const props = defineProps({
  activeId: String || Number,
  item: Object,
  conf: Object,
})
const className = 'drawing-layout-item'
function tranNumber(num, point){
   // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
   let numStr = num.toString().split('.')[0]
   if(numStr.length<6) { // 判断数字有多长,如果小于6,,表示10万以内的数字,让其直接显示
       console.log(numStr);
       return numStr;
     }else if(numStr.length>=6 && numStr.length<=8){ // 如果数字大于6位,小于8位,让其数字后面加单位万
        let decimal = numStr.substring(numStr.length-4, numStr.length-4+point)
        console.log(decimal);
        // 由千位,百位组成的一个数字
        return parseFloat(parseInt(num / 10000)+'.'+decimal)+'万'  
   }else if(numStr.length >8){ // 如果数字大于8位,让其数字后面加单位亿
        let decimal = numStr.substring(numStr.length-8, numStr.length-8+point);
        console.log(decimal);
        return parseFloat(parseInt(num/100000000)+'.'+decimal)+'亿'
   }
}

 
const formatDate=(cellValue,formatString)=>
{ 
  return dayjs(cellValue).format(formatString)//'YYYY-MM-DD HH:mm:ss'
}  
const formatNumber=(cellValue,formatString)=>
{ 
  return numeral(cellValue).format(formatString)//'YYYY-MM-DD HH:mm:ss'
} 
const formatter = (row,col,colConfig) => {
  var val=row[col.property]
  if (colConfig.formatString!==undefined) {
    if(colConfig.formatType==='number')
    return formatNumber(val,colConfig.formatString)
    else if(colConfig.formatType==='date') 
    return formatDate(val,colConfig.formatString)
    else 
    return colConfig.formatString
  } else 
  {  
    return val
  }
}
const activeFormItem = inject('activeFormItem')
provide('activeFormItem', activeFormItem)
</script>
<style scoped>
.drawing-layout-item {
  position: relative;
  cursor: move;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 1px dashed #ccc;
  border-radius: 3px;
  margin-bottom: 15px;
}
</style>
