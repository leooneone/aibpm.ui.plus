<template>
  <div style="padding: 0px 0px 8px 8px;width:100%"> 
    
    <el-table v-if="state.fileListData.length>0" v-loading="state.loading" :data="state.fileListData" row-key="id" 
      style="width: 100%" :show-header="false">
      <el-table-column prop="fileName" label="文件名">
        <template #default="{ row }">
          <div class="my-flex">
            <el-image
              v-if="isImage(row.extension)"
              :src="row.linkUrl"
              :preview-src-list="previewImglist"
              :initial-index="getInitialIndex(row.linkUrl)"
              :lazy="true"
              :hide-on-click-modal="true"
              fit="scale-down"
              preview-teleported
              style=" height: 30px"
            />
            <div class="ml10 my-flex-fill my-flex-y-center">
              <el-link
            class="my-el-link mr12 ml12"
            :href="row.linkUrl"
            type="primary"
           
            size="small"
            :underline="false"
            target="_blank"
          >{{ (row.fileName || '') + (row.extension || '') }}</el-link> {{ row.sizeFormat }}
            </div>
          </div>
        </template>
      </el-table-column> 

      <el-table-column v-if="!props.disabled" label="操作" fixed="right" header-align="center" align="center" width="35">
        <template #default="{ row,$index }">
        
          <el-button v-auth="'api:admin:file:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row,$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button v-if="!props.disabled" v-auth="'api:admin:file:upload-file'" type="primary" icon="ele-Upload" @click="onUpload"> 上传 </el-button>
   
    <file-upload ref="fileUploadRef" title="上传文件" @success="onOk"  ></file-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted, defineAsyncComponent, computed,watch, getCurrentInstance } from 'vue'
import { PageInputFileGetPageDto, FileGetPageOutput } from '/@/api/admin/data-contracts'

import dayjs from 'dayjs'
import eventBus from '/@/utils/mitt'
import { isImage } from '/@/utils/test'
import commonFunction from '/@/utils/commonFunction'

const emits = defineEmits(['sure','update:modelValue'])
const { proxy } = getCurrentInstance() as any

const FileUpload = defineAsyncComponent(() => import('./file-upload.vue'))

const fileUploadRef = ref()
const props=defineProps({

  modelValue:Array,
  disabled:Boolean
})
const state = reactive({
  loading: false,
  fileFormTitle: '', 
  fileListData:JSON.parse(JSON.stringify(props.modelValue))||[] as Array<FileGetPageOutput>,
  fileLogsTitle: '',

})
 const onOk=(file)=>{
state.fileListData.push(file)

 }

const previewImglist = computed(() => {
  let imgList = [] as string[]
  state.fileListData.forEach((a) => {
    if (isImage(a.extension as string) && a.linkUrl) {
      imgList.push(a.linkUrl as string)
    }
  })
  return imgList
}) 

watch(
  () => state.fileListData,
  (val) => { 
    emits('update:modelValue',JSON.parse(JSON.stringify(val)))
  }, 
  {
    deep: true
  } 
)
onMounted(() => { 
  //获得上传数据
  eventBus.on('refreshFile', async (data) => {
    
state.fileListData.push(data)
  // proxy.$modal.msgSuccess(msg)
  })
})
const onDelete=(row, idx)=>{
// 删除行,远程删除数据库中的行
state.fileListData.splice(idx, 1)
}
onUnmounted(() => {
  eventBus.off('refreshFile')
})

const formatterTime = (cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}

const getInitialIndex = (imgUrl: string) => {
  return previewImglist.value.indexOf(imgUrl)
}
 
const onUpload = () => {
  fileUploadRef.value.open()
}
 
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin/file',
})
</script>

<style scoped lang="scss">
.my-el-link {
  font-size: 12px;
}
</style>
