<template> 
  <div class="setting-container">
    <el-form ref="elFormRef" :model="formData" :rules="rules" size="medium" label-width="100px"
      label-position="top">
    <el-row :gutter="15" class="home-card-one mb15">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        
      >
    <el-card> 
      <el-form-item label="自动去重">

       
审批流程中审批人重复出现时，只需审批一次其余自动通过

<el-checkbox class="button" v-model="formData.autoRepeat">审批人自动去重</el-checkbox>
<el-checkbox v-model="formData.myAuditAutoPass">发起人审批时自动通过</el-checkbox>
    </el-form-item>
    </el-card>

    </el-col>

    <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        
      >
    <el-card>  
      <el-form-item label="审批意见">
    设置审批功能是否必填、评语可见范围、是否允许他们代提交
    
    <el-checkbox class="button" v-model="formData.approve.remarkRequired">必填</el-checkbox> 
        <el-input v-model="formData.approve.RemarkTip"  placeholder="请输入提示" :maxlength="100"
          show-word-limit  :style="{width: '100%'}"></el-input>
        <el-checkbox v-model="formData.approve.uselessOpinion">启用废话文学</el-checkbox>
      </el-form-item>
    </el-card>
    </el-col>
    </el-row>
 

     <!-- <el-form-item label="自定义序号发生器规则">
           <el-input v-model="formData.docNoRule" type="textarea" placeholder="例如：每天/每月/每年/永不重置" :maxlength="100"
          show-word-limit :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>--> 
      </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: ['conf'],
  data() {
    return {
      formData: Object.assign(JSON.parse(JSON.stringify(this.conf)) , {
        autoRepeat: false, //审批人去重
        myAuditAutoPass: false, //发起人审批时自动通过
        approve:{
        remarkTip: '', //审批意见填写提示
        remarkRequired: false,
        notVisibleForSponsor: false,
      }
      }), //
      rules: {
        autoRepeat: [
          {
            required: true,
            message: '请选择选择分组',
            trigger: 'change',
          },
        ],
      },
      autoRepeatOptions: [
        {
          label: '启用自动去重',
          value: true,
        },
        {
          label: '不启用自动去重',
          value: false,
        },
      ],
    }
  },
  created() {
    if (typeof this.conf === 'object' && this.conf !== null) {
      //    Object.assign(this.formData, this.conf)
    }
  },
  methods: {
    getSetting() {
      return new Promise((resolve, reject) => {
        this.$refs['elFormRef'].validate((valid) => {
          if (valid) {
            resolve(this.formData)
          } else {
            reject({ msg: '', target: 'advancedSetting' })
            //reject("error1111");
          }
        })
      })
    },
    setSetting(val) {
      //  console.log('abc',this.formData)
      Object.assign(this.formData, val)
    },
  },
  watch:{
  conf(val){

    Object.assign(this.formData, val)
  }
},
}
</script>
<style lang="scss" scoped>
.setting-container {
  width: 600px;
  height: 100%;
  margin: auto;
  background: white;
  padding: 16px;

  >>> .el-form--label-top .el-form-item__label {
    padding-bottom: 0;
  }
}
</style>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>