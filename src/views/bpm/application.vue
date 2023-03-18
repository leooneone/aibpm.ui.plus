/**
 *Copyright: Copyright (c) 2023
 *Author:Leo
 *GitHub: https://github.com/leooneone
 */

<template>
  <section v-loading="state.loading">
   <!--<test></test>--> 
    

    <el-empty v-if="!state.loading&&state.templates.length === 0" description="没有流程模板可用"
      ><el-button class="ele-Plus" type="primary" v-auth="'api:bpm:template:control'">新建流程模板</el-button></el-empty
    >
    <section v-else class="home-container" style="margin: 10px 10px 10px 10px" v-for="group in state.templates">
      <div style="border-left: 3px solid #409eff; padding-left: 5px; margin-bottom: 5px; font-size: 20px">{{ dic_bpm_group[group[0].groupId] }}</div>

      <el-row :gutter="15" class="home-card-one mb15">
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="6"
          :xl="6"
          v-for="(item, k) in group"
          :key="k"
          style="margin-top: 15px"
          :class="{ 'home-media home-media-lg': k > 1, 'home-media-sm': k === 1 }"
        >
          <div class="home-card-item flex" @click="openForm(item.id)" style="cursor: pointer">
            <div class="flex-margin flex w100"  :class="` home-one-animation${k}`">
              <div class="flex-auto">
                <span class="font22">{{ item.name || '未命名流程' }}</span>
                <span class="ml5 font16" :style="{ color: 'var(--next-color-danger-lighter))' }"
                  ><el-tag>版本：{{ item.version }}</el-tag></span
                >
                <div class="mt10">{{ item.remark }}</div>
              </div>
              <div class="home-card-item-icon flex" :style="{ background: `var(--next-color-success-lighter)` }">
                <SvgIcon
                  class="flex-margin font32"
                  v-if="item.icon.indexOf('ele') === 0"
                  :name="item.icon"
                  :style="{ color: `var(--el-color-success)` }"
                />
                <i v-else class="flex-margin font32" :style="{ color: `var(--el-color-success)` }" :class="item.icon"></i>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
    <my-form ref="formRef"></my-form>
  </section>
</template>
 
<script lang="ts" setup >
import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent,computed } from 'vue'
import { WorkflowTemplateApi as TPLApi } from '/@/api/bpm/WorkflowTemplate'


import { getToken } from '/@/api/admin/http-client'
const Test = defineAsyncComponent(() => import('./test.vue'))
const MyForm = defineAsyncComponent(() => import('./management/myForm.vue'))

const { proxy } = getCurrentInstance() as any
const { dic_bpm_group } = proxy.$dict('bpm-group')
const formRef = ref()

const uploadAction = computed(() => {
  return import.meta.env.VITE_API_URL + '/api/admin/file/upload-file'
})
const uploadHeaders = computed(() => {
  return { Authorization: 'Bearer ' + getToken() }
})
const state = reactive({
  loading: true,
  pageInput: {
    currentPage: 1,
    pageSize: 20,
  },
  templates: [],
})

const groupBy = (array, f) => {
  let groups = {}
  array.forEach(function (o) {
    let group = JSON.stringify(f(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
}
const getTPLs = async () => {
  state.loading = true
  const res = await new TPLApi().listPublished()
  if (res.success) {
    state.templates = groupBy(res.data, function (item) {
      return [item.groupId]
    })
  }

  state.loading = false
}

const openForm = (id) => {
  formRef.value.open({ type: 2, templateId: id })
}
// 页面加载时
onMounted(() => {
  getTPLs()
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'bpm/application',
})
</script>
<style scoped lang="scss">
$homeNavLengh: 8;
.home-container {
  //overflow: hidden;
//  height: 100%;
  .home-card-one,
  .home-card-two,
  .home-card-three {
    .home-card-item {
      width: 100%;
      height: 130px;
      border-radius: 4px;
      transition: all ease 0.3s;
      padding: 20px;
      overflow: hidden;
      background: var(--el-color-white);
      color: var(--el-text-color-primary);
      border: 1px solid var(--next-border-color-light);
      &:hover {
        box-shadow: 0 2px 12px var(--next-color-dark-hover);
        transition: all ease 0.3s;
      }
      &-icon {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        flex-shrink: 1;
        i {
          color: var(--el-text-color-placeholder);
        }
      }
      &-title {
        font-size: 15px;
        font-weight: bold;
        height: 30px;
      }
    }
  }
  .home-card-one {
    @for $i from 0 through 3 {
      .home-one-animation#{$i} {
        opacity: 0;
        animation-name: error-num;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: calc($i/4) + s;
      }
    }
  }
  .home-card-two,
  .home-card-three {
    .home-card-item {
      height: 400px;
      width: 100%;
      overflow: hidden;
      .home-monitor {
        height: 100%;
        .flex-warp-item {
          width: 25%;
          height: 111px;
          display: flex;
          .flex-warp-item-box {
            margin: auto;
            text-align: center;
            color: var(--el-text-color-primary);
            display: flex;
            border-radius: 5px;
            background: var(--next-bg-color);
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
              background: var(--el-color-primary-light-9);
              transition: all 0.3s ease;
            }
          }
          @for $i from 0 through $homeNavLengh {
            opacity: 0;
            animation-name: error-num;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
            animation-delay: calc($i/10) + s;
          }
        }
      }
    }
  }
}
</style>
