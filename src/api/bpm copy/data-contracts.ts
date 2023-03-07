/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * System=0,Web=1,Mobile=2,Email=3,Sms=4
 * @format int32
 */
export type AccessPoint = 0 | 1 | 2 | 3 | 4

/** 添加 */
export interface DictionaryAddInput {
  /**
   * 字典类型Id
   * @format int64
   */
  dictionaryTypeId?: number
  /** 字典名称 */
  name?: string | null
  /** 字典编码 */
  code?: string | null
  /** 字典值 */
  value?: string | null
  /** 描述 */
  description?: string | null
  /** 启用 */
  enabled?: boolean
}

export interface DictionaryGetOutput {
  /**
   * 字典类型Id
   * @format int64
   */
  dictionaryTypeId?: number
  /** 字典名称 */
  name?: string | null
  /** 字典编码 */
  code?: string | null
  /** 字典值 */
  value?: string | null
  /** 描述 */
  description?: string | null
  /** 启用 */
  enabled?: boolean
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

export interface DictionaryGetPageDto {
  /**
   * 字典类型Id
   * @format int64
   */
  dictionaryTypeId?: number
  /** 字典名称 */
  name?: string | null
}

export interface DictionaryListOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** 字典名称 */
  name?: string | null
  /** 字典编码 */
  code?: string | null
  /** 字典值 */
  value?: string | null
  /** 启用 */
  enabled?: boolean
}

/** 添加 */
export interface DictionaryTypeAddInput {
  /** 字典名称 */
  name?: string | null
  /** 字典编码 */
  code?: string | null
  /** 描述 */
  description?: string | null
  /** 启用 */
  enabled?: boolean
}

export interface DictionaryTypeGetOutput {
  /** 字典名称 */
  name?: string | null
  /** 字典编码 */
  code?: string | null
  /** 描述 */
  description?: string | null
  /** 启用 */
  enabled?: boolean
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

export interface DictionaryTypeGetPageDto {
  /** 字典名称 */
  name?: string | null
}

export interface DictionaryTypeListOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** 字典名称 */
  name?: string | null
  /** 字典编码 */
  code?: string | null
  /** 启用 */
  enabled?: boolean
}

/** 修改 */
export interface DictionaryTypeUpdateInput {
  /** 字典名称 */
  name?: string | null
  /** 字典编码 */
  code?: string | null
  /** 描述 */
  description?: string | null
  /** 启用 */
  enabled?: boolean
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

/** 修改 */
export interface DictionaryUpdateInput {
  /**
   * 字典类型Id
   * @format int64
   */
  dictionaryTypeId?: number
  /** 字典名称 */
  name?: string | null
  /** 字典编码 */
  code?: string | null
  /** 字典值 */
  value?: string | null
  /** 描述 */
  description?: string | null
  /** 启用 */
  enabled?: boolean
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

/** 添加 */
export interface ActivityAddInput {
  /**
   * 用户Id
   * @format int64
   */
  userId?: number | null
  /** 姓名 */
  name?: string | null
  /** 昵称 */
  nickName?: string | null
  /** 工号 */
  code?: string | null
  /**
   * 主属部门Id
   * @format int64
   */
  ouId?: number
  /** 附属部门 */
  organizationIds?: number[] | null
  /**
   * 组织角色Id
   * @format int64
   */
  positionId?: number
  /** 手机号 */
  phone?: string | null
  /** 邮箱 */
  email?: string | null
  /**
   * 入职时间
   * @format date-time
   */
  entryTime?: string | null
}

/** 分页信息输入 */
export interface PageInputDictionaryGetPageDto {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  filter?: DictionaryGetPageDto
}

/** 结果输出 */
export interface ResultOutputDictionaryGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: DictionaryGetOutput
}

/** 结果输出 */
export interface ResultOutputDictionaryTypeGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: DictionaryTypeGetOutput
}

/** 分页信息输入 */
export interface PageInputDictionaryTypeGetPageDto {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  filter?: DictionaryTypeGetPageDto
}

export interface ActivityEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  role?: string | null
  name?: string | null
  title?: string | null
  conditionNodes?: ActivityEntity[] | null
  childNode?: ActivityEntity
  properties?: Properties
  filedName?: string | null
  /** @format int64 */
  workflowTemplateId?: number
  /** 工作流模板 */
  workflowTemplate?: WorkflowTemplateEntity
  content?: string | null
  code?: string | null
  /** 表单模板，每个活动节点可以有不同的模板 来控制显示，每个模板的业务数据应该是template中 表单的子集 */
  formData?: string | null
  prevId?: string | null
  /** ActivityType 常用活動類型:Copy=0,Condition=1,Start=2,Approver=3,End=4,Fill=5,Approve=6,Circulate=7,Consult=8,Assist=9 */
  type?: ActivityType
}

export interface ActivityGetOutput {
  /**
   * 用户Id
   * @format int64
   */
  userId?: number | null
  /** 姓名 */
  name?: string | null
  /** 昵称 */
  nickName?: string | null
  /** 工号 */
  code?: string | null
  /**
   * 主属部门Id
   * @format int64
   */
  ouId?: number
  /** 附属部门 */
  organizationIds?: number[] | null
  /**
   * 组织角色Id
   * @format int64
   */
  positionId?: number
  /** 手机号 */
  phone?: string | null
  /** 邮箱 */
  email?: string | null
  /**
   * 入职时间
   * @format date-time
   */
  entryTime?: string | null
  /**
   * 编号
   * @format int64
   */
  id?: number
  /**
   * 版本
   * @format int64
   */
  version?: number
  /** 主属机构 */
  ouName?: string | null
  /** 附属机构 */
  ouNames?: string[] | null
  /** 组织角色 */
  roleName?: string | null
}

export interface ActivityListOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** 姓名 */
  name?: string | null
  /** 昵称 */
  nickName?: string | null
  /** 账号 */
  userName?: string | null
  /** 主属部门 */
  ouName?: string | null
  /** 附属部门 */
  ouNames?: string[] | null
  /** 组织角色 */
  roleName?: string | null
  /** 手机号 */
  phone?: string | null
}

/**
 * Activity State 比較合適:Waiting=0,Running=1,UnRead=2,Finished=3,Canceled=4,Unfinished=5,NotCanceled=6,Unspecified=-1
 * @format int32
 */
export type ActivityState = 0 | 1 | 2 | 3 | 4 | 5 | 6 | -1

/**
 * ActivityType 常用活動類型:Copy=0,Condition=1,Start=2,Approver=3,End=4,Fill=5,Approve=6,Circulate=7,Consult=8,Assist=9
 * @format int32
 */
export type ActivityType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/** 修改 */
export interface ActivityUpdateInput {
  /**
   * 用户Id
   * @format int64
   */
  userId?: number | null
  /** 姓名 */
  name?: string | null
  /** 昵称 */
  nickName?: string | null
  /** 工号 */
  code?: string | null
  /**
   * 主属部门Id
   * @format int64
   */
  ouId?: number
  /** 附属部门 */
  organizationIds?: number[] | null
  /**
   * 组织角色Id
   * @format int64
   */
  positionId?: number
  /** 手机号 */
  phone?: string | null
  /** 邮箱 */
  email?: string | null
  /**
   * 入职时间
   * @format date-time
   */
  entryTime?: string | null
  /**
   * 编号
   * @format int64
   */
  id?: number
  /**
   * 版本
   * @format int64
   */
  version?: number
}

/** 高级设置 */
export interface AdvancedSetting {
  /** 审批人去重 */
  autoRepeat?: boolean
  /** 发起人审批时自动通过 */
  myAuditAutoPass?: boolean
  /** 审批意见提示 */
  remarkTip?: string | null
  /** 审批意见是否必填 */
  remarkRequired?: boolean
  /** 对发起人不可见 */
  notVisibleForSponsor?: boolean
}

/** 接口管理 */
export interface ApiEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 所属模块
   * @format int64
   */
  parentId?: number
  /** 接口命名 */
  name?: string | null
  /** 接口名称 */
  label?: string | null
  /** 接口地址 */
  path?: string | null
  /** 接口提交方法 */
  httpMethods?: string | null
  /** 说明 */
  description?: string | null
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 启用 */
  enabled?: boolean
  childs?: ApiEntity[] | null
  permissions?: PermissionEntity[] | null
}

/**
 * False=0,True=1,NA=-1
 * @format int32
 */
export type ApprovalResult = 0 | 1 | -1

export interface BaseSetting {
  /** 工作流名称 */
  name?: string | null
  /** 图标 */
  img?: string | null
  /**
   * 流程分组
   * @format int32
   */
  groupId?: number
  /** 流程备注 */
  remark?: string | null
  /** 谁可以发起该流程 ,组织或者用户 */
  initials?: Intitial[] | null
}

export interface Condition {
  conditionValue?: any
  /** @format int32 */
  fieldId?: number
}

/**
 * 数据范围:All=1,DeptWithChild=2,Dept=3,Self=4,Custom=5
 * @format int32
 */
export type DataScope = 1 | 2 | 3 | 4 | 5

/**
 * MySql=0,SqlServer=1,PostgreSQL=2,Oracle=3,Sqlite=4,OdbcOracle=5,OdbcSqlServer=6,OdbcMySql=7,OdbcPostgreSQL=8,Odbc=9,OdbcDameng=10,MsAccess=11,Dameng=12,OdbcKingbaseES=13,ShenTong=14,KingbaseES=15,Firebird=16,Custom=17,ClickHouse=18,GBase=19,CustomOracle=20,CustomSqlServer=21,CustomMySql=22,CustomPostgreSQL=23
 * @format int32
 */
export type DataType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23

export interface DynamicFilterInfo {
  field?: string | null
  /** Contains=0,StartsWith=1,EndsWith=2,NotContains=3,NotStartsWith=4,NotEndsWith=5,Equal=6,Equals=7,Eq=8,NotEqual=9,GreaterThan=10,GreaterThanOrEqual=11,LessThan=12,LessThanOrEqual=13,Range=14,DateRange=15,Any=16,NotAny=17,Custom=18 */
  operator?: DynamicFilterOperator
  value?: any
  /** And=0,Or=1 */
  logic?: DynamicFilterLogic
  filters?: DynamicFilterInfo[] | null
}

/**
 * And=0,Or=1
 * @format int32
 */
export type DynamicFilterLogic = 0 | 1

/**
 * Contains=0,StartsWith=1,EndsWith=2,NotContains=3,NotStartsWith=4,NotEndsWith=5,Equal=6,Equals=7,Eq=8,NotEqual=9,GreaterThan=10,GreaterThanOrEqual=11,LessThan=12,LessThanOrEqual=13,Range=14,DateRange=15,Any=16,NotAny=17,Custom=18
 * @format int32
 */
export type DynamicFilterOperator = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18

export interface Initiator {
  /** @format int64 */
  id?: number
  name?: string | null
  /** @format int64 */
  parentId?: number
  type?: string | null
  /** @format int64 */
  nodeId?: number
}

/** 添加 */
export interface InstanceAddInput {
  basicSetting?: BaseSetting
  /** 高级设置 */
  advancedSetting?: AdvancedSetting
  formData?: string | null
  processData?: string | null
  /** @format int64 */
  templateId?: number
}

export interface InstanceDataInput {
  /**
   * 流程实例Id
   * @format int64
   */
  instanceId?: number
  /**
   * 模板Id
   * @format int64
   */
  templateId?: number
  /**
   * 版本
   * @format int32
   */
  version?: number
  /**
   * 工作项Id
   * @format int64
   */
  workItemId?: number
  /** 活动节点Id */
  activityCode?: string | null
  form?: Record<string, any>
  comment?: string | null
  /** False=0,True=1,NA=-1 */
  approvalResult?: ApprovalResult
}

/** 流程分组 */
export interface InstanceEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  referenceNo?: string | null
  /** @format int64 */
  templateId?: number
  template?: WorkflowTemplate
  /** @format int32 */
  priority?: number
  /**
   * 流程实列名称
   * workf flow name
   */
  name?: string | null
  /**
   * 发起人组织
   * @format int64
   */
  createrOrgnization?: number
  /**
   * 父流程
   * @format int64
   */
  parentId?: number
  /**
   * 父流程节点
   * @format int64
   */
  parentActivityId?: number
  /** @format int64 */
  initiatorId?: number
  /** 用户 */
  initiator?: UserEntity
  /**
   * 发起人所在OU
   * @format int64
   */
  ouId?: number
  /** 组织架构 */
  ou?: OrgEntity
  /** Initiated=0,Running=1,Finished=2,Canceled=3,Exceptional=4,Suspended=5,Unfinished=6 */
  state?: InstanceState
  /**
   * 完成时间
   * @format date-time
   */
  finishedTime?: string
  /** 流程备注 */
  description?: string | null
  formData?: string | null
}

export interface InstanceGetOutput {
  basicSetting?: BaseSetting
  /** 高级设置 */
  advancedSetting?: AdvancedSetting
  formData?: string | null
  processData?: string | null
  /** @format int64 */
  templateId?: number
  /**
   * 编号
   * @format int64
   */
  id?: number
  /**
   * 版本
   * @format int64
   */
  version?: number
  /** 主属部门 */
  ouName?: string | null
  /** 附属部门 */
  ouNames?: string[] | null
  /** 组织角色 */
  roleName?: string | null
  referenceNo?: string | null
  /** @format date-time */
  createdTime?: string
  name?: string | null
  initiatorName?: string | null
}

export interface InstanceListOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  name?: string | null
  /** 参考号 */
  referenceNo?: string | null
  departmentName?: string | null
  /** Initiated=0,Running=1,Finished=2,Canceled=3,Exceptional=4,Suspended=5,Unfinished=6 */
  state?: InstanceState
  /** 发起人 */
  initiator?: string | null
  /** 标题 */
  role?: string | null
  /**
   * 接收时间
   * @format date-time
   */
  createdTime?: string
  /** 节点名称 */
  activityName?: string | null
  /** 流程名称 */
  instanceName?: string | null
  instanceId?: string | null
}

/**
 * Initiated=0,Running=1,Finished=2,Canceled=3,Exceptional=4,Suspended=5,Unfinished=6
 * @format int32
 */
export type InstanceState = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

/** 修改 */
export interface InstanceUpdateInput {
  basicSetting?: BaseSetting
  /** 高级设置 */
  advancedSetting?: AdvancedSetting
  formData?: string | null
  processData?: string | null
  /** @format int64 */
  templateId?: number
  /**
   * 编号
   * @format int64
   */
  id?: number
  /**
   * 版本
   * @format int64
   */
  version?: number
}

export interface Intitial {
  /** @format int64 */
  deptId?: number
  deptName?: string | null
  /** @format int64 */
  userId?: number
  userName?: string | null
}

/** 添加 */
export interface OrgAddInput {
  /**
   * 父级
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 值 */
  value?: string | null
  /** 启用 */
  enabled?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 描述 */
  description?: string | null
}

/** 组织架构 */
export interface OrgEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  /**
   * 父级
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 值 */
  value?: string | null
  /**
   * 成员数
   * @format int32
   */
  memberCount?: number
  /** 启用 */
  enabled?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 描述 */
  description?: string | null
  /** 员工列表 */
  staffs?: UserStaffEntity[] | null
  /** 用户列表 */
  users?: UserEntity[] | null
  /** 角色列表 */
  roles?: RoleEntity[] | null
  /** 子级列表 */
  childs?: OrgEntity[] | null
}

export interface OrgGetOutput {
  /**
   * 父级
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 值 */
  value?: string | null
  /** 启用 */
  enabled?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 描述 */
  description?: string | null
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

export interface OrgListOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 父级
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 值 */
  value?: string | null
  /** 启用 */
  enabled?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 描述 */
  description?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
}

/** 修改 */
export interface OrgUpdateInput {
  /**
   * 父级
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 值 */
  value?: string | null
  /** 启用 */
  enabled?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 描述 */
  description?: string | null
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

/**
 * None=0,Finish=1,Approve=2,Disapprove=3,Remind1=10,Remind2=11,Custom1=54,Custom2=55,Custom3=56,Custom4=57,Custom5=58
 * @format int32
 */
export type OvertimePolicy = 0 | 1 | 2 | 3 | 10 | 11 | 54 | 55 | 56 | 57 | 58

/** 分页信息输入 */
export interface PageInputActivityEntity {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  filter?: ActivityEntity
}

/** 分页信息输入 */
export interface PageInputInstanceEntity {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  /** 流程分组 */
  filter?: InstanceEntity
}

/** 分页信息输入 */
export interface PageInputRoleGetPageDto {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  filter?: RoleGetPageDto
}

/** 分页信息输入 */
export interface PageInputUserGetPageDto {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  /** 用户分页查询条件 */
  filter?: UserGetPageDto
}

/** 分页信息输入 */
export interface PageInputWorkItemEntity {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  filter?: WorkItemEntity
}

/** 分页信息输入 */
export interface PageInputWorkflowTemplateEntity {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  /** 工作流模板 */
  filter?: WorkflowTemplateEntity
}

/** 分页信息输出 */
export interface PageOutputActivityListOutput {
  /**
   * 数据总数
   * @format int64
   */
  total?: number
  /** 数据 */
  list?: ActivityListOutput[] | null
}

/** 分页信息输出 */
export interface PageOutputInstanceListOutput {
  /**
   * 数据总数
   * @format int64
   */
  total?: number
  /** 数据 */
  list?: InstanceListOutput[] | null
}

/** 分页信息输出 */
export interface PageOutputRoleGetPageOutput {
  /**
   * 数据总数
   * @format int64
   */
  total?: number
  /** 数据 */
  list?: RoleGetPageOutput[] | null
}

/** 分页信息输出 */
export interface PageOutputUserGetPageOutput {
  /**
   * 数据总数
   * @format int64
   */
  total?: number
  /** 数据 */
  list?: UserGetPageOutput[] | null
}

/** 分页信息输出 */
export interface PageOutputWorkItemListOutput {
  /**
   * 数据总数
   * @format int64
   */
  total?: number
  /** 数据 */
  list?: WorkItemListOutput[] | null
}

/** 分页信息输出 */
export interface PageOutputWorkflowTemplateListOutput {
  /**
   * 数据总数
   * @format int64
   */
  total?: number
  /** 数据 */
  list?: WorkflowTemplateListOutput[] | null
}

export interface Participant {
  /** @format int64 */
  id?: number
  name?: string | null
  /** @format int64 */
  parentId?: number
  type?: string | null
  /** @format int64 */
  nodeId?: number
}

/** 权限 */
export interface PermissionEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 父级节点
   * @format int64
   */
  parentId?: number
  /** 权限名称 */
  label?: string | null
  /** 权限编码 */
  code?: string | null
  /** 权限类型:Group=1,Menu=2,Dot=3 */
  type?: PermissionType
  /**
   * 视图Id
   * @format int64
   */
  viewId?: number | null
  /** 视图管理 */
  view?: ViewEntity
  /** 路由命名 */
  name?: string | null
  /** 路由地址 */
  path?: string | null
  /** 重定向地址 */
  redirect?: string | null
  /** 图标 */
  icon?: string | null
  /** 隐藏 */
  hidden?: boolean
  /** 展开分组 */
  opened?: boolean
  /** 打开新窗口 */
  newWindow?: boolean
  /** 链接外显 */
  external?: boolean
  /** 是否缓存 */
  isKeepAlive?: boolean
  /** 是否固定 */
  isAffix?: boolean
  /** 链接地址 */
  link?: string | null
  /** 是否内嵌窗口 */
  isIframe?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 描述 */
  description?: string | null
  /** 启用 */
  enabled?: boolean
  apis?: ApiEntity[] | null
  childs?: PermissionEntity[] | null
}

/**
 * 权限类型:Group=1,Menu=2,Dot=3
 * @format int32
 */
export type PermissionType = 1 | 2 | 3

/**
 * Low=0,Normal=1,High=2,Unspecified=-1
 * @format int32
 */
export type Priority = 0 | 1 | 2 | -1

export interface ProcessData {
  activitiesContext?: string | null
  linesContext?: string | null
  chartData?: string | null
}

export interface Properties {
  initiator?: Initiator[] | null
  /** 節點參與人 */
  participants?: Participant[] | null
  isDefault?: boolean
  assigneeType?: string | null
  role?: string | null
  /** @format int32 */
  priority?: number
  /**
   * 空 表示串簽（一個一個審批，所有人同意通過，任意一個不同意就中斷返回拒絕），
   * and:會签（须所有审批人同意），
   * or:或签（一名审批人同意或拒绝即可）
   */
  signType?: string | null
  /** 当选择表单内联系人的时候 */
  fieldName?: string | null
  /** @format int32 */
  level?: number
  /** 允許多人 */
  optionalMultiUser?: boolean
  conditions?: Condition[] | null
  dynamicFilter?: DynamicFilterInfo
}

/** 结果输出 */
export interface ResultOutputActivityEntity {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: ActivityEntity
}

/** 结果输出 */
export interface ResultOutputActivityGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: ActivityGetOutput
}

/** 结果输出 */
export interface ResultOutputIListUserPermissionsOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: UserPermissionsOutput[] | null
}

/** 结果输出 */
export interface ResultOutputInstanceGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: InstanceGetOutput
}

/** 结果输出 */
export interface ResultOutputInt64 {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /**
   * 数据
   * @format int64
   */
  data?: number
}

/** 结果输出 */
export interface ResultOutputListInt64 {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: number[] | null
}

/** 结果输出 */
export interface ResultOutputListOrgListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: OrgListOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListRoleGetListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: RoleGetListOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListUserEntity {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: UserEntity[] | null
}

/** 结果输出 */
export interface ResultOutputListUserGetRoleUserListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: UserGetRoleUserListOutput[] | null
}

/** 结果输出 */
export interface ResultOutputObject {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: any
}

/** 结果输出 */
export interface ResultOutputOrgGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: OrgGetOutput
}

/** 结果输出 */
export interface ResultOutputPageOutputActivityListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 分页信息输出 */
  data?: PageOutputActivityListOutput
}

/** 结果输出 */
export interface ResultOutputPageOutputInstanceListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 分页信息输出 */
  data?: PageOutputInstanceListOutput
}

/** 结果输出 */
export interface ResultOutputPageOutputRoleGetPageOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 分页信息输出 */
  data?: PageOutputRoleGetPageOutput
}

/** 结果输出 */
export interface ResultOutputPageOutputUserGetPageOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 分页信息输出 */
  data?: PageOutputUserGetPageOutput
}

/** 结果输出 */
export interface ResultOutputPageOutputWorkItemListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 分页信息输出 */
  data?: PageOutputWorkItemListOutput
}

/** 结果输出 */
export interface ResultOutputPageOutputWorkflowTemplateListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 分页信息输出 */
  data?: PageOutputWorkflowTemplateListOutput
}

/** 结果输出 */
export interface ResultOutputRoleGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: RoleGetOutput
}

/** 结果输出 */
export interface ResultOutputString {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: string | null
}

/** 结果输出 */
export interface ResultOutputUserGetBasicOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: UserGetBasicOutput
}

/** 结果输出 */
export interface ResultOutputUserGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: UserGetOutput
}

/** 结果输出 */
export interface ResultOutputWorkItemGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: WorkItemGetOutput
}

/** 结果输出 */
export interface ResultOutputWorkflowTemplateGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: WorkflowTemplateGetOutput
}

/** 添加 */
export interface RoleAddInput {
  /**
   * 父级Id
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 角色类型:Group=1,Menu=2 */
  type?: RoleType
  /** 数据范围:All=1,DeptWithChild=2,Dept=3,Self=4,Custom=5 */
  dataScope?: DataScope
  /** 指定部门 */
  orgIds?: number[] | null
  /** 部门列表 */
  orgs?: OrgEntity[] | null
  /** 说明 */
  description?: string | null
  /**
   * 排序
   * @format int32
   */
  sort?: number
}

/** 添加角色用户列表 */
export interface RoleAddRoleUserListInput {
  /**
   * 角色
   * @format int64
   */
  roleId: number
  /** 用户 */
  userIds?: number[] | null
}

/** 角色 */
export interface RoleEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  /**
   * 父级Id
   * @format int64
   */
  parentId?: number
  /** 子级列表 */
  childs?: RoleEntity[] | null
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 角色类型:Group=1,Menu=2 */
  type?: RoleType
  /** 数据范围:All=1,DeptWithChild=2,Dept=3,Self=4,Custom=5 */
  dataScope?: DataScope
  /** 说明 */
  description?: string | null
  /** 隐藏 */
  hidden?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 用户列表 */
  users?: UserEntity[] | null
  /** 部门列表 */
  orgs?: OrgEntity[] | null
  /** 权限列表 */
  permissions?: PermissionEntity[] | null
}

export interface RoleGetListOutput {
  /**
   * 主键
   * @format int64
   */
  id?: number
  /**
   * 父级Id
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 角色类型:Group=1,Menu=2 */
  type?: RoleType
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 描述 */
  description?: string | null
}

export interface RoleGetOutput {
  /**
   * 父级Id
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 角色类型:Group=1,Menu=2 */
  type?: RoleType
  /** 数据范围:All=1,DeptWithChild=2,Dept=3,Self=4,Custom=5 */
  dataScope?: DataScope
  /** 指定部门 */
  orgIds?: number[] | null
  /** 部门列表 */
  orgs?: OrgEntity[] | null
  /** 说明 */
  description?: string | null
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /**
   * 角色Id
   * @format int64
   */
  id: number
}

export interface RoleGetPageDto {
  /** 名称 */
  name?: string | null
}

export interface RoleGetPageOutput {
  /**
   * 主键
   * @format int64
   */
  id?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 说明 */
  description?: string | null
  /** 隐藏 */
  hidden?: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
}

/** 设置数据范围 */
export interface RoleSetDataScopeInput {
  /**
   * 角色Id
   * @format int64
   */
  roleId: number
  /** 数据范围:All=1,DeptWithChild=2,Dept=3,Self=4,Custom=5 */
  dataScope?: DataScope
  /** 指定部门 */
  orgIds?: number[] | null
}

/**
 * 角色类型:Group=1,Menu=2
 * @format int32
 */
export type RoleType = 1 | 2

/** 修改 */
export interface RoleUpdateInput {
  /**
   * 父级Id
   * @format int64
   */
  parentId?: number
  /** 名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 角色类型:Group=1,Menu=2 */
  type?: RoleType
  /** 数据范围:All=1,DeptWithChild=2,Dept=3,Self=4,Custom=5 */
  dataScope?: DataScope
  /** 指定部门 */
  orgIds?: number[] | null
  /** 部门列表 */
  orgs?: OrgEntity[] | null
  /** 说明 */
  description?: string | null
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /**
   * 角色Id
   * @format int64
   */
  id: number
}

/**
 * 性别:Unknown=0,Male=1,Female=2
 * @format int32
 */
export type Sex = 0 | 1 | 2

/** 员工添加 */
export interface StaffAddInput {
  /** 工号 */
  jobNumber?: string | null
  /** 职位 */
  position?: string | null
  /** 性别:Unknown=0,Male=1,Female=2 */
  sex?: Sex
  /**
   * 入职时间
   * @format date-time
   */
  entryTime?: string | null
  /** 个人简介 */
  introduce?: string | null
}

/**
 * Draft=0,Published=1,Suspend=2,Expired=3
 * @format int32
 */
export type TemplateState = 0 | 1 | 2 | 3

/** 租户 */
export interface TenantEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /** 企业名称 */
  name?: string | null
  /** 编码 */
  code?: string | null
  /** 姓名 */
  realName?: string | null
  /** 手机号码 */
  phone?: string | null
  /** 邮箱地址 */
  email?: string | null
  /**
   * 授权用户
   * @format int64
   */
  userId?: number | null
  /** 用户 */
  user?: UserEntity
  /** 租户类型:Platform=1,Tenant=2 */
  tenantType?: TenantType
  /** 数据库注册键 */
  dbKey?: string | null
  /** MySql=0,SqlServer=1,PostgreSQL=2,Oracle=3,Sqlite=4,OdbcOracle=5,OdbcSqlServer=6,OdbcMySql=7,OdbcPostgreSQL=8,Odbc=9,OdbcDameng=10,MsAccess=11,Dameng=12,OdbcKingbaseES=13,ShenTong=14,KingbaseES=15,Firebird=16,Custom=17,ClickHouse=18,GBase=19,CustomOracle=20,CustomSqlServer=21,CustomMySql=22,CustomPostgreSQL=23 */
  dbType?: DataType
  /** 连接字符串 */
  connectionString?: string | null
  /** 启用 */
  enabled?: boolean
  /** 说明 */
  description?: string | null
}

/**
 * 租户类型:Platform=1,Tenant=2
 * @format int32
 */
export type TenantType = 1 | 2

export interface TimeSpan {
  /** @format int64 */
  ticks?: number
  /** @format int32 */
  days?: number
  /** @format int32 */
  hours?: number
  /** @format int32 */
  milliseconds?: number
  /** @format int32 */
  microseconds?: number
  /** @format int32 */
  nanoseconds?: number
  /** @format int32 */
  minutes?: number
  /** @format int32 */
  seconds?: number
  /** @format double */
  totalDays?: number
  /** @format double */
  totalHours?: number
  /** @format double */
  totalMilliseconds?: number
  /** @format double */
  totalMicroseconds?: number
  /** @format double */
  totalNanoseconds?: number
  /** @format double */
  totalMinutes?: number
  /** @format double */
  totalSeconds?: number
}

/** 添加 */
export interface UserAddInput {
  /**
   * 账号
   * @minLength 1
   */
  userName: string
  /**
   * 姓名
   * @minLength 1
   */
  name: string
  /** 手机号 */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
  /** 角色Ids */
  roleIds?: number[] | null
  /** 所属部门Ids */
  orgIds?: number[] | null
  /**
   * 主属部门Id
   * @format int64
   */
  orgId?: number
  /**
   * 直属主管Id
   * @format int64
   */
  managerUserId?: number | null
  /** 直属主管姓名 */
  managerUserName?: string | null
  /** 员工添加 */
  staff?: StaffAddInput
  /**
   * 密码
   * @minLength 1
   */
  password: string
  /** 用户状态:Enabled=0,Disabled=1,WaitChangePasssword=2,WaitActive=3 */
  status?: UserStatus
}

/** 添加会员 */
export interface UserAddMemberInput {
  /**
   * 账号
   * @minLength 1
   */
  userName: string
  /** 姓名 */
  name?: string | null
  /** 手机号 */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
  /**
   * 密码
   * @minLength 1
   */
  password: string
  /** 用户状态:Enabled=0,Disabled=1,WaitChangePasssword=2,WaitActive=3 */
  status?: UserStatus
}

/** 修改密码 */
export interface UserChangePasswordInput {
  /**
   * 旧密码
   * @minLength 1
   */
  oldPassword: string
  /**
   * 新密码
   * @minLength 1
   */
  newPassword: string
  /**
   * 确认新密码
   * @minLength 1
   */
  confirmPassword: string
}

/** 用户 */
export interface UserEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  /** 租户 */
  tenant?: TenantEntity
  /** 账号 */
  userName?: string | null
  /** 密码 */
  password?: string | null
  /** 姓名 */
  name?: string | null
  /** 手机号 */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
  /**
   * 主属部门Id
   * @format int64
   */
  orgId?: number
  /** 组织架构 */
  org?: OrgEntity
  /**
   * 直属主管Id
   * @format int64
   */
  managerUserId?: number | null
  /** 用户 */
  managerUser?: UserEntity
  /** 昵称 */
  nickName?: string | null
  /** 头像 */
  avatar?: string | null
  /** 用户状态:Enabled=0,Disabled=1,WaitChangePasssword=2,WaitActive=3 */
  status?: UserStatus
  /** 用户类型:Member=0,DefaultUser=1,TenantAdmin=10,PlatformAdmin=100 */
  type?: UserType
  /** 角色列表 */
  roles?: RoleEntity[] | null
  /** 部门列表 */
  orgs?: OrgEntity[] | null
  /** 用户员工 */
  staff?: UserStaffEntity
}

export interface UserGetBasicOutput {
  /** 头像 */
  avatar?: string | null
  /** 姓名 */
  name?: string | null
  /** 昵称 */
  nickName?: string | null
  /** 手机号 */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
}

export interface UserGetOrgDto {
  /** @format int64 */
  id?: number
  name?: string | null
}

export interface UserGetOutput {
  /**
   * 账号
   * @minLength 1
   */
  userName: string
  /**
   * 姓名
   * @minLength 1
   */
  name: string
  /** 手机号 */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
  /**
   * 主属部门Id
   * @format int64
   */
  orgId?: number
  /**
   * 直属主管Id
   * @format int64
   */
  managerUserId?: number | null
  /** 直属主管姓名 */
  managerUserName?: string | null
  /** 员工添加 */
  staff?: StaffAddInput
  /**
   * 主键Id
   * @format int64
   */
  id: number
  /** 角色列表 */
  roles?: UserGetRoleDto[] | null
  /** 部门列表 */
  orgs?: UserGetOrgDto[] | null
  /** 所属部门Ids */
  orgIds?: number[] | null
  /** 角色Ids */
  roleIds?: number[] | null
}

/** 用户分页查询条件 */
export interface UserGetPageDto {
  /**
   * 部门Id
   * @format int64
   */
  orgId?: number | null
}

export interface UserGetPageOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** 账号 */
  userName?: string | null
  /** 姓名 */
  name?: string | null
  /** 手机号 */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
  /** 用户类型:Member=0,DefaultUser=1,TenantAdmin=10,PlatformAdmin=100 */
  type?: UserType
  /** 角色 */
  roleNames?: string[] | null
  /** 是否主管 */
  isManager?: boolean
  roles?: RoleEntity[] | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
}

export interface UserGetRoleDto {
  /** @format int64 */
  id?: number
  name?: string | null
}

export interface UserGetRoleUserListOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** 姓名 */
  name?: string | null
}

/** 用户所属部门 */
export interface UserOrgEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /**
   * 用户Id
   * @format int64
   */
  userId?: number
  /** 用户 */
  user?: UserEntity
  /**
   * 部门Id
   * @format int64
   */
  orgId?: number
  /** 组织架构 */
  org?: OrgEntity
  /** 是否主管 */
  isManager?: boolean
}

export interface UserPermissionsOutput {
  httpMethods?: string | null
  path?: string | null
}

/** 重置密码 */
export interface UserResetPasswordInput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** 密码 */
  password?: string | null
}

/** 用户角色 */
export interface UserRoleEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 用户Id
   * @format int64
   */
  userId?: number
  /** 用户 */
  user?: UserEntity
  /**
   * 角色Id
   * @format int64
   */
  roleId?: number
  /** 角色 */
  role?: RoleEntity
}

/** 设置主管 */
export interface UserSetManagerInput {
  /**
   * 用户Id
   * @format int64
   */
  userId?: number
  /**
   * 部门Id
   * @format int64
   */
  orgId?: number
  /** 是否主管 */
  isManager?: boolean
}

/** 用户员工 */
export interface UserStaffEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  /** 职位 */
  position?: string | null
  /** 工号 */
  jobNumber?: string | null
  /** 性别:Unknown=0,Male=1,Female=2 */
  sex?: Sex
  /**
   * 入职时间
   * @format date-time
   */
  entryTime?: string | null
  /** 个人简介 */
  introduce?: string | null
}

/**
 * 用户状态:Enabled=0,Disabled=1,WaitChangePasssword=2,WaitActive=3
 * @format int32
 */
export type UserStatus = 0 | 1 | 2 | 3

/**
 * 用户类型:Member=0,DefaultUser=1,TenantAdmin=10,PlatformAdmin=100
 * @format int32
 */
export type UserType = 0 | 1 | 10 | 100

/** 更新基本信息 */
export interface UserUpdateBasicInput {
  /**
   * 姓名
   * @minLength 1
   */
  name: string
  /** 昵称 */
  nickName?: string | null
}

/** 修改 */
export interface UserUpdateInput {
  /**
   * 账号
   * @minLength 1
   */
  userName: string
  /**
   * 姓名
   * @minLength 1
   */
  name: string
  /** 手机号 */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
  /** 角色Ids */
  roleIds?: number[] | null
  /** 所属部门Ids */
  orgIds?: number[] | null
  /**
   * 主属部门Id
   * @format int64
   */
  orgId?: number
  /**
   * 直属主管Id
   * @format int64
   */
  managerUserId?: number | null
  /** 直属主管姓名 */
  managerUserName?: string | null
  /** 员工添加 */
  staff?: StaffAddInput
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

/** 修改会员 */
export interface UserUpdateMemberInput {
  /**
   * 账号
   * @minLength 1
   */
  userName: string
  /** 姓名 */
  name?: string | null
  /** 手机号 */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

/** 视图管理 */
export interface ViewEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 所属节点
   * @format int64
   */
  parentId?: number
  /** 视图命名 */
  name?: string | null
  /** 视图名称 */
  label?: string | null
  /** 视图路径 */
  path?: string | null
  /** 说明 */
  description?: string | null
  /** 缓存 */
  cache?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 启用 */
  enabled?: boolean
  childs?: ViewEntity[] | null
}

export interface WorkItemEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  role?: string | null
  name?: string | null
  title?: string | null
  conditionNodes?: ActivityEntity[] | null
  childNode?: ActivityEntity
  properties?: Properties
  filedName?: string | null
  /** @format int64 */
  workflowTemplateId?: number
  /** 工作流模板 */
  workflowTemplate?: WorkflowTemplateEntity
  content?: string | null
  code?: string | null
  /** 表单模板，每个活动节点可以有不同的模板 来控制显示，每个模板的业务数据应该是template中 表单的子集 */
  formData?: string | null
  prevId?: string | null
  /** ActivityType 常用活動類型:Copy=0,Condition=1,Start=2,Approver=3,End=4,Fill=5,Approve=6,Circulate=7,Consult=8,Assist=9 */
  type?: ActivityType
  /**
   * 審批節點中 工作項的步驟號,用於描述流程流轉順序
   * @format int32
   */
  stepIndex?: number
  /**
   * 流程實例參考號 用於檢索
   * @format int64
   */
  instanceId?: number
  /** 流程分组 */
  instance?: InstanceEntity
  /** @format int64 */
  ouId?: number
  /** 组织架构 */
  ou?: OrgEntity
  /** @format int64 */
  participateGroup?: number
  /** @format int64 */
  finisher?: number
  /** System=0,Web=1,Mobile=2,Email=3,Sms=4 */
  finishAccessPoint?: AccessPoint
  workflowPackage?: string | null
  workflowName?: string | null
  /** @format int32 */
  workflowVersion?: number
  /** @format int64 */
  tokenId?: number
  activityName?: string | null
  displayName?: string | null
  summary?: string | null
  sheetAddress?: string | null
  /** Activity State 比較合適:Waiting=0,Running=1,UnRead=2,Finished=3,Canceled=4,Unfinished=5,NotCanceled=6,Unspecified=-1 */
  state?: ActivityState
  /**
   * 同一個活動中工作項排序
   * @format int32
   */
  index?: number
  /**
   * 同一個活動中工作項總數
   * @format int32
   */
  total?: number
  comment?: string | null
  /** False=0,True=1,NA=-1 */
  approvalResult?: ApprovalResult
  /** @format int64 */
  workItemId?: number
  workItem?: WorkItemEntity
  /** @format date-time */
  receiveTime?: string
  /** @format date-time */
  startTime?: string
  /** @format date-time */
  finishTime?: string
  /**
   * 系統計算出來的受理人
   * @format int64
   */
  participantId?: number
  /** 用户 */
  participant?: UserEntity
  /**
   * 實際執行人
   * @format int64
   */
  executorId?: number
  /** 用户 */
  executor?: UserEntity
  /** 存在多個審批人 */
  executorIds?: number[] | null
  isFinished?: boolean
  isUnfinished?: boolean
  locking?: boolean
  locker?: string | null
  locked?: boolean
  /** @format int64 */
  canceledByWorkItem?: number
  /** @format int64 */
  replyID?: number
  notifyFinish?: boolean
  /** @format int64 */
  longWaitTime?: number
  waitTime?: TimeSpan
  /** @format date-time */
  cancelTime?: string
  /** @format int64 */
  longUsedTime?: number
  usedTime?: TimeSpan
  stayTimeSpan?: TimeSpan
  planUseTime?: TimeSpan
  /** None=0,Finish=1,Approve=2,Disapprove=3,Remind1=10,Remind2=11,Custom1=54,Custom2=55,Custom3=56,Custom4=57,Custom5=58 */
  overtimePolicy?: OvertimePolicy
  /** @format date-time */
  planFinishTime?: string
  delegant?: string | null
  urged?: boolean
  /** ActivityType 常用活動類型:Copy=0,Condition=1,Start=2,Approver=3,End=4,Fill=5,Approve=6,Circulate=7,Consult=8,Assist=9 */
  itemType?: ActivityType
  isConsultive?: boolean
  isAssistive?: boolean
  /** @format int64 */
  consultedWorkItemID?: number
  /** Low=0,Normal=1,High=2,Unspecified=-1 */
  priority?: Priority
}

export interface WorkItemGetOutput {
  basicSetting?: BaseSetting
  /** 高级设置 */
  advancedSetting?: AdvancedSetting
  formData?: string | null
  processData?: string | null
  /**
   * 编号
   * @format int64
   */
  id?: number
  /**
   * 版本
   * @format int64
   */
  version?: number
  /** 主属部门 */
  ouName?: string | null
  /** 附属部门 */
  ouNames?: string[] | null
  /** 组织角色 */
  roleName?: string | null
}

export interface WorkItemListOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** 参考号 */
  referenceNo?: string | null
  ouName?: string | null
  /** 当前状态 */
  state?: string | null
  /** 发起人 */
  initiator?: string | null
  /** 标题 */
  role?: string | null
  /**
   * 接收时间
   * @format date-time
   */
  startTime?: string
  /** 节点名称 */
  activityName?: string | null
  /** 流程名称 */
  instanceName?: string | null
  instanceId?: string | null
  participant?: string | null
}

/** 添加 */
export interface WorkItemSubmitInfo {
  /**
   * 流程实例Id
   * @format int64
   */
  instanceId?: number
  /**
   * 节点人员处理该节点时 所在的组织
   * @format int64
   */
  ouId?: number
  /**
   * 模板Id
   * @format int64
   */
  templateId?: number
  /**
   * 版本
   * @format int32
   */
  version?: number
  /**
   * 工作项Id
   * @format int64
   */
  workItemId?: number
  /** 活动节点Id */
  activityCode?: string | null
  form?: Record<string, any>
  comment?: string | null
  /** False=0,True=1,NA=-1 */
  approvalResult?: ApprovalResult
}

/** 修改 */
export interface WorkItemUpdateInput {
  basicSetting?: BaseSetting
  /** 高级设置 */
  advancedSetting?: AdvancedSetting
  formData?: string | null
  processData?: string | null
  /**
   * 编号
   * @format int64
   */
  id?: number
  /**
   * 版本
   * @format int64
   */
  version?: number
}

export interface WorkflowTemplate {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  /**
   * 流程名称
   * workflow name
   */
  name?: string | null
  /**
   * 流程标签
   * Icon
   * @format int32
   */
  icon?: number
  /** @format int64 */
  groupId?: number
  /** 备注 */
  remark?: string | null
  /** 启动节点 */
  activities?: Record<string, ActivityEntity>
  activitiesContext?: string | null
  startActitivyId?: string | null
  linesContext?: string | null
  lines?: Record<string, string[]>
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string
  processData?: string | null
  formData?: string | null
  config?: string | null
  /** Draft=0,Published=1,Suspend=2,Expired=3 */
  state?: TemplateState
}

/** 添加 */
export interface WorkflowTemplateAddInput {
  basicSetting?: BaseSetting
  /** 高级设置 */
  advancedSetting?: AdvancedSetting
  processData?: ProcessData
  formData?: string | null
  config?: string | null
  startActitivyId?: string | null
}

/** 工作流模板 */
export interface WorkflowTemplateEntity {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /**
   * 创建者Id
   * @format int64
   */
  createdUserId?: number | null
  /**
   * 创建者
   * @maxLength 50
   */
  createdUserName?: string | null
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string | null
  /**
   * 修改者Id
   * @format int64
   */
  modifiedUserId?: number | null
  /**
   * 修改者
   * @maxLength 50
   */
  modifiedUserName?: string | null
  /**
   * 修改时间
   * @format date-time
   */
  modifiedTime?: string | null
  /** 是否删除 */
  isDeleted?: boolean
  /**
   * 租户Id
   * @format int64
   */
  tenantId?: number | null
  /**
   * 流程名称
   * workflow name
   */
  name?: string | null
  /**
   * 流程标签
   * Icon
   * @format int32
   */
  icon?: number
  /** @format int64 */
  groupId?: number
  /** 备注 */
  remark?: string | null
  /** 启动节点 */
  activities?: Record<string, ActivityEntity>
  activitiesContext?: string | null
  startActitivyId?: string | null
  linesContext?: string | null
  lines?: Record<string, string[]>
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string
  processData?: string | null
  formData?: string | null
  config?: string | null
  /** Draft=0,Published=1,Suspend=2,Expired=3 */
  state?: TemplateState
}

export interface WorkflowTemplateGetOutput {
  config?: string | null
}

export interface WorkflowTemplateListOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** @format int32 */
  groupId?: number
  /** 姓名 */
  name?: string | null
  /** 账号 */
  userName?: string | null
  /** @format int32 */
  version?: number
  /** @format int32 */
  state?: number
}

/** 修改 */
export interface WorkflowTemplateUpdateInput {
  basicSetting?: BaseSetting
  /** 高级设置 */
  advancedSetting?: AdvancedSetting
  processData?: ProcessData
  formData?: string | null
  config?: string | null
  startActitivyId?: string | null
  /** @format int64 */
  id?: number
  /**
   * 版本
   * @format int64
   */
  version?: number
}
