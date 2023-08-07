<template>

<el-form-item v-if="props.data['allow-half'] !== undefined" label="允许半选">
            <el-switch v-model="props.data['allow-half']" />
          </el-form-item>
          <el-form-item v-if="props.data['show-text'] !== undefined" label="辅助文字">
            <el-switch v-model="props.data['show-text']" @change="rateTextChange" />
          </el-form-item>
         <el-form-item v-if="props.data['show-score'] !== undefined" label="显示分数">
            <el-switch v-model="props.data['show-score']" @change="rateScoreChange" />
          </el-form-item>
</template>


<script lang="ts" setup> 


const props=defineProps(['data']     )

const rateTextChange=(val) =>{
      if (val) props.data["show-score"] = false;
    } 
    const  rateScoreChange=(val) =>{
      if (val) props.data["show-text"] = false;
    } 
 

 
 
</script>