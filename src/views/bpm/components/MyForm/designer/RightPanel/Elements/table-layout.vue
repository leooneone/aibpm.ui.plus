<template>  
  <el-form-item  v-if="props.data.tag==='table-layout'" label="行列操作">
    <el-button @click="addTableRow"><ele-Edit></ele-Edit>增加一行</el-button>
   
    <el-button @click="addTableColumn">增加一列</el-button>
  </el-form-item>
</template>

<script lang="ts" setup>
import { reactive,ref,watch } from "vue"


const props=defineProps(['data']     )




const state=reactive({

currentTab:'event'
})




const addTableRow=()=>{ 
var item=props.data
var colItem = {  rowType: 'layout',layout:'rowFormItem',colSpan: 1, rowSpan: 1, children: [],state:0 }
var rowItem={
children:[]}   
if(  item.children.length>0)
{
for (var k = 0; k < item.children[0].children.length; k++) 
{
    rowItem.children.push(JSON.parse(JSON.stringify(colItem)))
  } 
item.children.splice(item.children.length, 0, rowItem)
}
} 

const   addTableColumn=()=>{ 
var item=props.data
var colItem = { rowType: 'layout',layout:'rowFormItem', colSpan: 1, rowSpan: 1, children: [],state:0 }

for (var k = 0; k < item.children.length; k++) { 
item.children[k].children.push(JSON.parse(JSON.stringify(colItem)))
}


} 
</script>
