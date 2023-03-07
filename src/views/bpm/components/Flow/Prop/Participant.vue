<template>
  <el-main>
    <div class="my-row">
      <div>
        <div class="my-row-title">
          <el-radio-group v-model="approverForm.assigneeType" style="line-height: 32px" @change="resetOrgColl">
            <el-radio v-for="item in assigneeTypeOptions" :label="item.value" :key="item.value" class="radio-item"> {{ item.label }}</el-radio>
          </el-radio-group>
        </div>
        <div class="my-row-detail">
          <div v-if="approveNode.assigneeType === 'myself'" class="option-box" style="color: #a5a5a5">发起人自己将作为审批人处理审批单</div>
          <div v-else-if="approveNode.assigneeType === 'form'" class="option-box">
            <p>使用表单中的联系人作为审批人</p>

            <el-select v-model="approverForm.fieldId" size="mini">
              <el-option
                v-for="(item, index) in contactors"
                :key="index"
                :label="item.label"
                :value="item.vModel"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div v-else-if="approveNode.assigneeType === 'optional'" class="option-box">
          <!--  <p>可选多人</p>
            <el-switch v-model="approverForm.optionalMultiUser" active-color="#13ce66"> </el-switch>-->
            <p>选择范围</p>
            <el-select v-model="approverForm.optionalRange" size="mini">
              <el-option
                v-for="(item, index) in rangeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>

            <ou-select
              v-if="['range'].includes(approveNode.optionalRange)"
              :title="getAssignTypeLabel()"
              ref="approver-org"
              v-model="approverForm.participants"
              :tabs="['user','role','org']"
              multiple
              >{{ getAssignTypeLabel() }}</ou-select
            >
          </div>

          <div v-else-if="approveNode.assigneeType === 'supervisor'">
            <div style="font-size: 14px; padding-left: 1rem">
              
              <el-select v-model="approverForm.ouType" size="small">
                <el-option v-for="item in ouTypeList" :key="item.value" :label="`${item.label}`" :value="item.value"> </el-option>
              </el-select>
              内，发起人
              <el-select v-model="approverForm.level" size="small">
                <el-option :key="0" label="主管逐级" :value="0"></el-option>
                <el-option :key="0" label="直接主管" :value="1"></el-option>
              </el-select>
              审批
               <br />
               包含所在{{ouTypeLabels[approverForm.ouType]}}负责人 <el-switch v-model="approverForm.isDirectorIn" style="margin-top: 1rem"></el-switch>
 
            </div>
          </div>
          <div v-else-if="approveNode.assigneeType === 'director'">
            <div style="font-size: 14px; padding-left: 1rem">
              发起人所属

              <el-select v-model="approverForm.ouType" size="small">
                <el-option v-for="item in ouTypeList" :key="item.value" :label="`${item.label}`" :value="item.value"> </el-option> </el-select
              >负责人
            </div>
          </div>
          <ou-select
            v-if="['user', 'role'].includes(approveNode.assigneeType)"
            :title="getAssignTypeLabel()"
            ref="approver-org"
            v-model="approverForm.participants"
            :tabs="fcOrgTabList.includes(approveNode.assigneeType) ? [approveNode.assigneeType] : ['org']"
            multiple
            >{{ getAssignTypeLabel() }}</ou-select
          >

          <!---->
          <!---->
          <!---->
        </div>
        <div style="border-bottom: 1px solid #e5e5e5; padding-bottom: 1rem"></div>
        <div
          class="option-box"
          style="border-bottom: 1px solid #e5e5e5"
          v-if="
            approveNode.participants[approveNode.assigneeType] 
           
          "
        >
          <p>多人审批时采用的审批方式</p>
          <el-radio-group v-model="approverForm.SignType" class="ml-4">
            <el-radio label="string" class="radio-item radio-item-row">串签（逐个审批，须所有审批人同意）</el-radio>
            <br />
            <el-radio label="counterAnd" class="radio-item radio-item-row">会签（须所有审批人同意）</el-radio>
            <br />
            <el-radio label="counterOr" class="radio-item radio-item-row">或签（一名审批人同意或拒绝即可）</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 开始节点 -->
  </el-main>
</template>

<script>
import OuSelect from '../../OU/index.vue'
const rangeType = {
  lt: '<',
  lte: '≤',
  gt: '>',
  gte: '≥',
  eq: '=',
}
const defaultApproveForm = {
  // 参与者集合
  participants: { user: [], role: [], org: [] },
  ouType:'0',
  level:0,
  isDirectorIn:false,
  assigneeType: 'user', // 指定审批人
  formOperates: [], // 表单操作权限集合
  SignType: 'string', // 签核类型
  // 审批类型为自选 出现 optionalMultiUser optionalRange
  optionalMultiUser: false,
  optionalRange: 'ALL', // USER<最多十个> / ALL / ROLE
}
export default {
  props: {
    fields: {
      type: Array,
      default() {
        return []
      },
    },
    data: {
      type: Object,
      default: () => {},
    },
  }, ///* 当前节点数据 */'value', /* 整个节点数据 */'processData'],
  components: {
    OuSelect,
  },
  data() {
    return {
      approverForm: JSON.parse(JSON.stringify(defaultApproveForm)) ,
      orgCollection: {
        org: [],
        role: [],
        user: [],
      },
      type: 'approver',
      ouTypeList: [],
      ouTypeLabels:{},
      fcOrgTabList: ['org', 'role', 'user'],
      visible: false, // 控制面板显隐
      globalFormOperate: null, // 统一设置节点表单权限
      rangeOptions: [
        {
          label: '所有人',
          value: 'all',
        },
        {
          label: '指定范围',
          value: 'range',
        } 
      ],
      assigneeTypeOptions: [
        {
          label: '指定成员',
          value: 'user',
        },
        {
          label: '发起人自己',
          value: 'myself',
        },
        {
          label: '表单内的联系人',
          value: 'form',
        },
        {
          label: '组织负责人',
          value: 'director',
        },
        {
          label: '上级主管',
          value: 'supervisor',
        },
        {
          label: '指定角色',
          value: 'role',
        },
        {
          label: '发起人自选',
          value: 'optional',
        },
      ],
    }
  },
  computed: {
    contactors() {
      window.leo = this.fields
      return this.fields.filter((item) => item.tag === 'ai-ou-select')
    },
    approveNode() {
      let node = Object.assign({}, defaultApproveForm)

      Object.assign(node, this.data)
      if (node === undefined || node.assigneeType === undefined || node.participants === undefined)
        node = JSON.parse(JSON.stringify(defaultApproveForm))
      this.approverForm = node
      return node
    },
  },
  mounted() {
    var dictOUType= this.$dict('ou-type')
    this.ouTypeList = dictOUType['ou_type']
    this.ouTypeLabels = dictOUType['dic_ou_type']
  },
  methods: {
    resetOrgColl() {
      for (let key in this.approverForm.participants) {
        this.approverForm.participants[key] = []
      }
    },
    onConfirm() {
      return this.approverForm
      this.$emit('confirm', this.approverForm)
      console.log('approve panel confirmed')
    },

    getAssignTypeLabel() {
      const res = this.assigneeTypeOptions.find((t) => t.value === this.approverForm.assigneeType)
      return res ? res.label : ''
    },
    getFormOperates() {
      const res = []
      // this.isApproverNode() && (res = this.approverForm.formOperates);
      // this.isStartNode() && (res = this.startForm.formOperates);
      return res
    },
  },
}
</script>
<style scoped lang="scss">
.radio-item-row {
  width: 100%;
}

.my-row {
  padding: 0;

  .my-row-title {
    font-weight: 700;
    font-size: 14px;
    margin: 10px 0;
    line-height: 30px;
  }

  .my-row-detail {
    margin-left: 20px;
    background: #f4f8fd;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 -2px 8px #ccc;
  }

  .selected_list {
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
  }
}
</style>