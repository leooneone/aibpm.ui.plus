 <template>
  <el-dialog v-model="state.visible" title="发起人自选" width="50%">

    <el-form label-position="top" ref="elFormRef" :model="state.formData" :rules="state.rules">
      <el-form-item :label="`[` + props.optional.name + `]参与人设置`" prop="optionalParticipants">
        <ou-select
          v-if="props.optional.range.length === 0"
          ref="ouSelectRef"
          v-model="state.formData.optionalParticipants"
          :tabs="['user', 'role', 'org']"
          multiple
        >
          请选择</ou-select
        >
        <AiOuSelect 
        v-if="props.optional.range.length === 0"
          ref="ouSelectRef"
          v-model="state.formData.optionalParticipants"
          :tabs="['user', 'role', 'org']"
          multiple
        > 默认所有人</AiOuSelect>
   
        <template v-else>

          <el-select    v-model="state.formData.optionalParticipants['user']" placeholder="Select" value-key="id"  multiple>
    <el-option
      v-for="item in props.optional.range"
      :key="item.id"
      :label="item.name"
      :value="item"
    >
      <span style="float: left">{{ item.name }}</span>
      <span
        style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
        ><el-tag plain type="success">用户</el-tag></span
      >
    </el-option>
  </el-select>
           
        </template> 
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">取消</el-button>
        <el-button type="primary" @click="getRange(true)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, inject, defineAsyncComponent, ref } from 'vue' 
const elFormRef = ref()
const submitForm = inject('submitForm')
const props = defineProps({
  optional: {
    type: Object,
    default: (_) => {
      []
    },
  },
})

const state = reactive({
  formData: {
    optionalParticipants: {},
  },
  rules: {
    optionalParticipants: [
      {
        required: true,
        message: '请选择审批人',
        trigger: 'change',
      },
    ],
  },
  visible: false,
})
//审批结果
const getRange = (result) => {
  elFormRef.value.validate((valid) => {
    if (valid) {
      submitForm(state.formData)
      state.visible = false
    } else {
    }
  })
}
const open = (ps) => {
  state.formData = Object.assign({
    optionalParticipants: {},
  },ps)
  state.visible = true
}
defineExpose({
  open,
})
</script>