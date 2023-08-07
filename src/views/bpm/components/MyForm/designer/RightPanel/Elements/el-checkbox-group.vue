<template>
         <el-form-item v-if="props.data.tag==='el-checkbox-group'" label="至少应选">
            <el-input-number
              :value="props.data.min"
              :min="0"
              placeholder="至少应选"
              @input="props.data['min']= $event?$event:undefined"
            />
          </el-form-item>
          <el-form-item v-if="props.data.tag==='el-checkbox-group'" label="最多可选">
            <el-input-number
              :value="props.data.max"
              :min="0"
              placeholder="最多可选"
              @input="props.data['max']= $event?$event:undefined"
            />
          </el-form-item>
</template>


<script lang="ts" setup> 


const props=defineProps(['data']     )

 

 
 
</script>