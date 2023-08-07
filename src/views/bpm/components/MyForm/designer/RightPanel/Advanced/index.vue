<template>
     <el-tabs v-model="state.currentTab" class="center-tabs">
 
    <el-tab-pane label="栅格" name="span">
      <br/>
        <!--<el-form-item  label="栅格间隔"  v-if="props.data.tag==='el-row'">
            <el-input-number v-model="props.data.gutter" :min="0" placeholder="栅格间隔" />
            <el-slider v-model="props.data.gutter" :max="500" :min="0"    />
          </el-form-item>-->
      <el-form-item v-if="props.data.span !== undefined" label="表单栅格">
            <el-slider v-model="props.data.span" :max="24" :min="1" :marks="{12:''}" @change="spanChange" />
          </el-form-item>
         
          <el-form-item v-if="props.data.span !== undefined" label="左侧间隔">
            <el-slider v-model="props.data.offset" :max="24" :min="0" :marks="{12:''}" />
          </el-form-item>

          <el-form-item v-if="props.data.span !== undefined" label="右移格数">
            <el-slider v-model="props.data.push" :max="24" :min="0" :marks="{12:''}" />
          </el-form-item>
          <el-form-item v-if="props.data.span !== undefined" label="左移格数">
            <el-slider v-model="props.data.pull" :max="24" :min="0" :marks="{12:''}" />
          </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="事件" name="event">
      <br/>
 待开发
</el-tab-pane>

    <el-tab-pane label="CSS" name="css">
      <br/>
      待开发
</el-tab-pane>
   </el-tabs>
         
</template>

<script lang="ts" setup>
import { reactive,ref } from "vue"


const props=defineProps(['data']     )

 
     

    const state=reactive({

        currentTab:'span'
    })
</script>
