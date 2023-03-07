 <template>
  <el-dialog v-if="state.visible" v-model="state.visible" title="审批意见" width="50%">

    <el-form ref="formEl" :model="state.form" :rules="state.rules" label-position="top">
      <el-form-item prop="comment"  label="审批意见" >
      <el-input :rows="10" type="textarea" v-model="state.form.comment" maxlength="300" :placeholder="props.approveSetting?.remarkTip" show-word-limit> </el-input>

    </el-form-item>
    </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="approve(false)">不同意</el-button>
          <el-button type="primary" @click="approve(true)"> 同意 </el-button>
        </span>
      </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ref, reactive, inject } from 'vue'

const submitForm = inject('submitForm')
const props = defineProps({approveSetting:Object})
const formEl=ref()
const state = reactive({
  form: {
    
    approvalResult: '',
    comment: '',
  },
  rules:{},
  visible: false,
})
//审批结果
const approve = (result) => {


  formEl.value?.validate((valid) => {  
        if (valid) {
          
 
  state.form.approvalResult = result
  
  submitForm(state.form)
  state.visible = false
         // this.$message.success('提交到后台')
        } else {
          this.$message.error('验证失败')
          return false
        }
      })

  
  if (result) {
  } else {
    //可以增加不同跳出驳回节点选择框
  }
  
}
const open = () => {
  state.form = { approvalResult: null, comment: '' }
  if(props.approveSetting?.remarkRequired)
  state.rules={"comment": [{ required: true, message: '请输入审批意见', trigger: ['blur', 'change'] }]}
  state.visible = true
}
defineExpose({
  open,
})
</script>