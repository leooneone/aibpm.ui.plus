<template>
  <section>  
    <div class="form-auth-table">
      <header class="auth-table-header">
        <div class="row">
          <div class="label">表单字段</div>
          <el-radio-group v-model="globalFormOperate" class="radio-group" @change="changeAllFormOperate">
            <el-radio :label="2">编辑</el-radio>
            <el-radio :label="1">只读</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </div>
      </header>
      <div class="auth-table-body">
        <div v-for="item in formOperates" :key="item.fieldId" class="row">
          <div class="label">
            <span class="required" v-show="item.required">*</span>
            {{ item.label }}
          </div>
          <el-radio-group v-model="item.formOperate" class="radio-group">
            <el-radio :label="2"><span style="opacity: 0">可编辑</span></el-radio>
            <el-radio :label="1"><span style="opacity: 0">只读</span></el-radio>
            <el-radio :label="0"><span style="opacity: 0">可见</span></el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" >
export default {
  props: ['fields', /* 当前节点数据 */ 'data'],
  data() {
    return {
      globalFormOperate: null, // 统一设置节点表单权限

      formOperates: JSON.parse(JSON.stringify(this.data)), // 表单操作权限集合
    }
  },
  watch: { 
    //   data: {
    //     handler(val) {
    //       this.formOperates = val || []
    //     },
    //     deep: true,
    //     immediate: true,
      
    // },
    fields: {
      handler(val) { 
        // const formItems = val.filter(t => t.cmpType !== 'custom')
        this.formOperates = this.initFormOperates(val, this.formOperates) 
       
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onConfirm() {
      return this.formOperates
    },

    initFormOperates(src, target) {
      //const formOperates =[[]//] target.properties && target.properties.formOperates || []
      // 自定义组件不加入权限控制
      const res = []
      const defaultType = 1 // this.isApproverNode() ? 1 : 2 // 操作权限 0 隐藏 1 只读 2 可编辑
      const getPermissionById = (id) => {
        const permission = target.find((t) => t.fieldId === id)
        return permission !== undefined ? permission.formOperate : defaultType
      }
      const format = (list, parentName = '') =>{
      return         list.map((t) => {
          const data = {
            fieldId: t.vModel,
            required: t.required,
            label: parentName ? [parentName, t.label].join('.') : t.label,
            formOperate: getPermissionById(t.vModel),
          }
          if(t.vModel)
            res.push(data)
          //子表权限
          Array.isArray(t.children) && format(t.children, t.label)
        })
      }
      format(src)
      return res
    },

    changeAllFormOperate(val) {
      this.formOperates.forEach((t) => (t.formOperate = val))
    },
  },
}
</script>

<style scoped lang="scss">
.form-auth-table {
  font-size: 14px;
  .auth-table-header {
    background: #fafafa;
    line-height: 40px;
  }
  .row {
    display: flex;
    align-items: center;
    line-height: 32px;
    padding: 8px 12px;
    border-bottom: 1px solid #efefef;
    &:hover {
      background: #f5f7fa;
    }
    .label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .required {
        color: #f2725e;
      }
    }
    .radio-group {
      flex: 2;
      display: flex;
      justify-content: space-between;
    }
  }
}

.el-radio {
  margin-right: 5px !important;
}
</style>