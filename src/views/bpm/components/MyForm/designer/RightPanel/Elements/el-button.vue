<template>
         <el-form-item
            v-if="props.data['icon']!==undefined && props.data.tag === 'el-button'"
            label="按钮图标"
          >
            <el-input v-model="props.data['icon']" placeholder="请输入按钮图标名称">
              <el-button #append icon="el-icon-thumb" @click="openIconsDialog('icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>

           <el-form-item
            v-if="props.data.type !== undefined && props.data.tag === 'el-button'"
            label="按钮类型"
          >
            <el-select v-model="props.data.type" :style="{ width: '100%' }">
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
              <el-option label="text" value="text" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="props.data.buttonText !== undefined"
            v-show="'picture-card' !== props.data['list-type']"
            label="按钮文字"
          >
            <el-input v-model="props.data.buttonText" placeholder="请输入按钮文字" />
          </el-form-item>
          <el-form-item
            v-if="props.data.tag === 'el-button'"
            label="按钮文字"
          >
            <el-input v-model="props.data.__slot__.default" placeholder="请输入按钮文字" />
          </el-form-item>
</template>


<script lang="ts" setup> 


const props=defineProps(['data']     )

 

 
 
</script>