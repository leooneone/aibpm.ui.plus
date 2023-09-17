<template>
          <!-- <el-form-item v-if="props.data.name !== undefined" label="文件字段名">
            <el-input v-model="props.data.name" placeholder="请输入上传文件字段名" />
          </el-form-item>-->
          <el-form-item v-if="props.data.accept !== undefined" label="文件类型">
            <el-select
              v-model="props.data.accept"
              placeholder="请选择文件类型"
              :style="{ width: '100%' }"
              clearable
            >
              <el-option label="图片" value="image/*" />
              <el-option label="视频" value="video/*" />
              <el-option label="音频" value="audio/*" />
              <el-option label="excel" value=".xls,.xlsx" />
              <el-option label="word" value=".doc,.docx" />
              <el-option label="pdf" value=".pdf" />
              <el-option label="txt" value=".txt" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="props.data.fileSize !== undefined" label="文件大小">
            <el-input v-model.number="props.data.fileSize" placeholder="请输入文件大小">
              <template #append>
              <el-select  v-model="props.data.sizeUnit" :style="{ width: '66px' }">
                <el-option label="KB" value="KB" />
                <el-option label="MB" value="MB" />
                <el-option label="GB" value="GB" />
              </el-select>
            </template>
            </el-input>
          </el-form-item>
          <el-form-item  v-if="props.data.action !== undefined" label="上传地址">
            <el-input v-model="props.data.action" placeholder="请输入上传地址">
               
            </el-input>
          </el-form-item>

          
        <el-form-item
            v-if="props.data.tag === 'el-upload' && props.data.multiple !== undefined"
            label="多选文件"
          >
            <el-switch v-model="props.data.multiple" />
          </el-form-item>
          <el-form-item v-if="props.data['auto-upload'] !== undefined" label="自动上传">
            <el-switch v-model="props.data['auto-upload']" />
          </el-form-item>
          <el-form-item v-if="props.data['list-type'] !== undefined" label="列表类型">
            <el-radio-group v-model="props.data['list-type']" size="small">
              <el-radio-button label="text">text</el-radio-button>
              <el-radio-button label="picture">picture</el-radio-button>
              <el-radio-button label="picture-card">picture-card</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="props.data.buttonText !== undefined"
            v-show="'picture-card' !== props.data['list-type']"
            label="按钮文字"
          >
            <el-input v-model="props.data.buttonText" placeholder="请输入按钮文字" />
          </el-form-item>
</template>


<script lang="ts" setup> 

import  {defineAsyncComponent} from 'vue'

const props=defineProps(['data']     )
 
 

 

 
 
</script>