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

/** @format int32 */
export type ActivityState = 132 | 258 | 385 | 515 | 646 | 773 | 902 | 1029
export const nvActivityState = { 等待: '132', 待办: '258', 待阅: '385', 已完成: '515', 已取消: '646', 草稿: '773', 超时: '902', 跳过: '1029' }
export const vnActivityState = {
  '132': '等待',
  '258': '待办',
  '385': '待阅',
  '515': '已完成',
  '646': '已取消',
  '773': '草稿',
  '902': '超时',
  '1029': '跳过',
}

/** @format int32 */
export type ActivityType = 0 | 1 | 2 | 3 | 4 | 5 | 6
export const nvActivityType = { Copy: '0', Condition: '1', Start: '2', End: '3', Deal: '4', Approve: '5', ParallelGW: '6' }
export const vnActivityType = { '0': 'Copy', '1': 'Condition', '2': 'Start', '3': 'End', '4': 'Deal', '5': 'Approve', '6': 'ParallelGW' }

export interface AdvancedSettingModel {
  autoRepeat?: boolean
  myAuditAutoPass?: boolean
  approve?: ApproveSetting
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

/** @format int32 */
export type ApprovalResult = 0 | 1 | -1
export const nvApprovalResult = { False: '0', True: '1', NA: '-1' }
export const vnApprovalResult = { '0': 'False', '1': 'True', '-1': 'NA' }

export interface ApproveSetting {
  remarkTip?: string | null
  remarkRequired?: boolean
}

export interface BaseSetting {
  /** 工作流名称 */
  name?: string | null
  /** 图标 */
  icon?: string | null
  /**
   * 流程分组
   * @format int32
   */
  groupId?: number
  /** 流程备注 */
  remark?: string | null
  /** 谁可以发起该流程 ,组织或者用户 */
  initiators?: Record<string, Participant[]>
  /** @format int32 */
  range?: number
}

/**
 * 数据范围
 * @format int32
 */
export type DataScope = 1 | 2 | 3 | 4 | 5
export const nvDataScope = { All: '1', DeptWithChild: '2', Dept: '3', Self: '4', Custom: '5' }
export const vnDataScope = { '1': 'All', '2': 'DeptWithChild', '3': 'Dept', '4': 'Self', '5': 'Custom' }

/** @format int32 */
export type DataType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
export const nvDataType = {
  MySql: '0',
  SqlServer: '1',
  PostgreSQL: '2',
  Oracle: '3',
  Sqlite: '4',
  OdbcOracle: '5',
  OdbcSqlServer: '6',
  OdbcMySql: '7',
  OdbcPostgreSQL: '8',
  Odbc: '9',
  OdbcDameng: '10',
  MsAccess: '11',
  Dameng: '12',
  OdbcKingbaseES: '13',
  ShenTong: '14',
  KingbaseES: '15',
  Firebird: '16',
  Custom: '17',
  ClickHouse: '18',
  GBase: '19',
  CustomOracle: '20',
  CustomSqlServer: '21',
  CustomMySql: '22',
  CustomPostgreSQL: '23',
}
export const vnDataType = {
  '0': 'MySql',
  '1': 'SqlServer',
  '2': 'PostgreSQL',
  '3': 'Oracle',
  '4': 'Sqlite',
  '5': 'OdbcOracle',
  '6': 'OdbcSqlServer',
  '7': 'OdbcMySql',
  '8': 'OdbcPostgreSQL',
  '9': 'Odbc',
  '10': 'OdbcDameng',
  '11': 'MsAccess',
  '12': 'Dameng',
  '13': 'OdbcKingbaseES',
  '14': 'ShenTong',
  '15': 'KingbaseES',
  '16': 'Firebird',
  '17': 'Custom',
  '18': 'ClickHouse',
  '19': 'GBase',
  '20': 'CustomOracle',
  '21': 'CustomSqlServer',
  '22': 'CustomMySql',
  '23': 'CustomPostgreSQL',
}

/** @format int32 */
export type DisplayType = 1 | 2 | 3 | 4 | 5 | 6
export const nvDisplayType = { Default: '1', Primary: '2', Success: '3', Info: '4', Warning: '5', Danger: '6' }
export const vnDisplayType = { '1': 'Default', '2': 'Primary', '3': 'Success', '4': 'Info', '5': 'Warning', '6': 'Danger' }

export interface DynamicFilterInfo {
  field?: string | null
  operator?: DynamicFilterOperator
  value?: any
  logic?: DynamicFilterLogic
  filters?: DynamicFilterInfo[] | null
}

/** @format int32 */
export type DynamicFilterLogic = 0 | 1
export const nvDynamicFilterLogic = { And: '0', Or: '1' }
export const vnDynamicFilterLogic = { '0': 'And', '1': 'Or' }

/** @format int32 */
export type DynamicFilterOperator = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18
export const nvDynamicFilterOperator = {
  Contains: '0',
  StartsWith: '1',
  EndsWith: '2',
  NotContains: '3',
  NotStartsWith: '4',
  NotEndsWith: '5',
  Equal: '6',
  Equals: '7',
  Eq: '8',
  NotEqual: '9',
  GreaterThan: '10',
  GreaterThanOrEqual: '11',
  LessThan: '12',
  LessThanOrEqual: '13',
  Range: '14',
  DateRange: '15',
  Any: '16',
  NotAny: '17',
  Custom: '18',
}
export const vnDynamicFilterOperator = {
  '0': 'Contains',
  '1': 'StartsWith',
  '2': 'EndsWith',
  '3': 'NotContains',
  '4': 'NotStartsWith',
  '5': 'NotEndsWith',
  '6': 'Equal',
  '7': 'Equals',
  '8': 'Eq',
  '9': 'NotEqual',
  '10': 'GreaterThan',
  '11': 'GreaterThanOrEqual',
  '12': 'LessThan',
  '13': 'LessThanOrEqual',
  '14': 'Range',
  '15': 'DateRange',
  '16': 'Any',
  '17': 'NotAny',
  '18': 'Custom',
}

export interface EmployeeSelectDto {
  /** @format int64 */
  id?: number
  name?: string | null
  type?: string | null
}

/** 添加 */
export interface InstanceAddInput {
  basicSetting?: BaseSetting
  advancedSetting?: AdvancedSettingModel
  formModel?: string | null
  processData?: string | null
  /** @format int64 */
  templateId?: number
}

export interface InstanceDataInput {
  /** @format int64 */
  ouId?: number
  /** @format int64 */
  workItemId?: number
  activityCode?: string | null
  form?: Record<string, any>
  /** @format int64 */
  templateId?: number
  type?: QueryType
  optionalParticipants?: Record<string, Participant[]>
  /**
   * 流程实例Id
   * @format int64
   */
  instanceId?: number
  /**
   * 版本
   * @format int32
   */
  version?: number
  comment?: string | null
  approvalResult?: ApprovalResult
  isSaveOnly?: boolean
}

export interface InstanceGetOutput {
  basicSetting?: BaseSetting
  advancedSetting?: AdvancedSettingModel
  formModel?: string | null
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
  ouName?: string | null
  ouNames?: string[] | null
  roleName?: string | null
  referenceNo?: string | null
  /** @format date-time */
  createdTime?: string
  name?: string | null
  /** @format int32 */
  groupId?: number
  initiatorName?: string | null
}

export interface InstanceGetPageDto {
  isHandled?: boolean
  state?: InstanceState
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
  /** @format int64 */
  groupId?: number
  departmentName?: string | null
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
}

export interface InstanceOutput {
  form?: string | null
  model?: string | null
  items?: WorkItemOutput[] | null
  instance?: InstanceGetOutput
  template?: WorkflowTemplateGetOutput
}

/** @format int32 */
export type InstanceState = 132 | 258 | 387 | 517 | 646 | 774 | 902
export const nvInstanceState = { 未初始化: '132', 运行中: '258', 已完成: '387', 已取消: '517', 异常: '646', 挂起: '774', 超时: '902' }
export const vnInstanceState = { '132': '未初始化', '258': '运行中', '387': '已完成', '517': '已取消', '646': '异常', '774': '挂起', '902': '超时' }

/** 修改 */
export interface InstanceUpdateInput {
  basicSetting?: BaseSetting
  advancedSetting?: AdvancedSettingModel
  formModel?: string | null
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
  /** @format int32 */
  type?: number
  /** @format int64 */
  directorId?: number
  /** 用户 */
  director?: UserEntity
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
  /**
   * 组织单元负责人
   * @format int64
   */
  directorId?: number
  /** 用户 */
  director?: UserEntity
  /**
   * 组织单元类型 ，通过数据字典定义
   * @format int32
   */
  type?: number
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
  /** @format int32 */
  type?: number
  /** @format int64 */
  directorId?: number
  /** 用户 */
  director?: UserEntity
  /**
   * 主键Id
   * @format int64
   */
  id: number
  directorName?: string | null
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
  /**
   * 组织类型
   * @format int32
   */
  type?: number
  directorName?: string | null
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
  /** @format int32 */
  type?: number
  /** @format int64 */
  directorId?: number
  /** 用户 */
  director?: UserEntity
  /**
   * 主键Id
   * @format int64
   */
  id: number
}

/** 分页信息输入 */
export interface PageInputInstanceGetPageDto {
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
  filter?: InstanceGetPageDto
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
export interface PageInputTemplateGetPageDto {
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
  filter?: TemplateGetPageDto
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
export interface PageInputWorkItemGetPageDto {
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
  filter?: WorkItemGetPageDto
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
export interface PageOutputWorkItemGetPageOutput {
  /**
   * 数据总数
   * @format int64
   */
  total?: number
  /** 数据 */
  list?: WorkItemGetPageOutput[] | null
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
  /** 权限类型 */
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
 * 权限类型
 * @format int32
 */
export type PermissionType = 1 | 2 | 3
export const nvPermissionType = { Group: '1', Menu: '2', Dot: '3' }
export const vnPermissionType = { '1': 'Group', '2': 'Menu', '3': 'Dot' }

/** @format int32 */
export type QueryType = 1 | 2 | 3
export const nvQueryType = { WorkItem: '1', Template: '2', Instance: '3' }
export const vnQueryType = { '1': 'WorkItem', '2': 'Template', '3': 'Instance' }

/** 结果输出 */
export interface ResultOutputDisplayType {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: DisplayType
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
export interface ResultOutputInstanceOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: InstanceOutput
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
export interface ResultOutputListEmployeeSelectDto {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: EmployeeSelectDto[] | null
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
export interface ResultOutputListWorkflowTemplateListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: WorkflowTemplateListOutput[] | null
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
export interface ResultOutputPageOutputWorkItemGetPageOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 分页信息输出 */
  data?: PageOutputWorkItemGetPageOutput
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
export interface ResultOutputTemplateGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: TemplateGetOutput
}

/** 结果输出 */
export interface ResultOutputUserEntity {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 用户 */
  data?: UserEntity
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
  /** 角色类型 */
  type?: RoleType
  /** 数据范围 */
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
  /** 角色类型 */
  type?: RoleType
  /** 数据范围 */
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
  /** 角色类型 */
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
  /** 角色类型 */
  type?: RoleType
  /** 数据范围 */
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
  /** 数据范围 */
  dataScope?: DataScope
  /** 指定部门 */
  orgIds?: number[] | null
}

/**
 * 角色类型
 * @format int32
 */
export type RoleType = 1 | 2
export const nvRoleType = { Group: '1', Role: '2' }
export const vnRoleType = { '1': 'Group', '2': 'Role' }

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
  /** 角色类型 */
  type?: RoleType
  /** 数据范围 */
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
 * 性别
 * @format int32
 */
export type Sex = 0 | 1 | 2
export const nvSex = { Unknown: '0', Male: '1', Female: '2' }
export const vnSex = { '0': 'Unknown', '1': 'Male', '2': 'Female' }

/** 员工添加 */
export interface StaffAddInput {
  /** 工号 */
  jobNumber?: string | null
  /** 职位 */
  position?: string | null
  /** 性别 */
  sex?: Sex
  /**
   * 入职时间
   * @format date-time
   */
  entryTime?: string | null
  /** 个人简介 */
  introduce?: string | null
}

export interface TemplateGetOutput {
  /** 名称 */
  name?: string | null
  advancedContext?: string | null
  basicContext?: string | null
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string
  formSetting?: string | null
  flowSetting?: string | null
  userName?: string | null
  state?: TemplateState
}

export interface TemplateGetPageDto {
  name?: string | null
  states?: TemplateState[] | null
}

/** @format int32 */
export type TemplateState = 0 | 1 | 2 | 3
export const nvTemplateState = { Draft: '0', Published: '1', Suspend: '2', Expired: '3' }
export const vnTemplateState = { '0': 'Draft', '1': 'Published', '2': 'Suspend', '3': 'Expired' }

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
  /** 租户类型 */
  tenantType?: TenantType
  /** 数据库注册键 */
  dbKey?: string | null
  dbType?: DataType
  /** 连接字符串 */
  connectionString?: string | null
  /** 启用 */
  enabled?: boolean
  /** 说明 */
  description?: string | null
}

/**
 * 租户类型
 * @format int32
 */
export type TenantType = 1 | 2
export const nvTenantType = { Platform: '1', Tenant: '2' }
export const vnTenantType = { '1': 'Platform', '2': 'Tenant' }

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
  /** 用户状态 */
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
  /** 用户状态 */
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
  /** 用户状态 */
  status?: UserStatus
  /** 用户类型 */
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
  /** 用户类型 */
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
  /** 性别 */
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
 * 用户状态
 * @format int32
 */
export type UserStatus = 0 | 1 | 2 | 3
export const nvUserStatus = { Enabled: '0', Disabled: '1', WaitChangePasssword: '2', WaitActive: '3' }
export const vnUserStatus = { '0': 'Enabled', '1': 'Disabled', '2': 'WaitChangePasssword', '3': 'WaitActive' }

/**
 * 用户类型
 * @format int32
 */
export type UserType = 0 | 1 | 10 | 100
export const nvUserType = { Member: '0', DefaultUser: '1', TenantAdmin: '10', PlatformAdmin: '100' }
export const vnUserType = { '0': 'Member', '1': 'DefaultUser', '10': 'TenantAdmin', '100': 'PlatformAdmin' }

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

export interface WorkItemGetOutput {
  basicSetting?: BaseSetting
  advancedSetting?: AdvancedSettingModel
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
  /** @format int64 */
  templateId?: number
}

export interface WorkItemGetPageDto {
  isMyself?: boolean
  name?: string | null
  state?: ActivityState
}

export interface WorkItemGetPageOutput {
  /**
   * 主键Id
   * @format int64
   */
  id?: number
  /** 参考号 */
  referenceNo?: string | null
  ouName?: string | null
  state?: ActivityState
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
  workflowTemplateId?: string | null
  participant?: string | null
  executor?: string | null
}

export interface WorkItemOutput {
  type?: ActivityType
  comment?: string | null
  /** @format date-time */
  finishTime?: string
  /** @format date-time */
  startTime?: string
  state?: ActivityState
  title?: string | null
  activityName?: string | null
  name?: string | null
  /** @format int64 */
  participantId?: number
  participant?: string | null
  executor?: string | null
  approvalResult?: string | null
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
  icon?: string | null
  /** @format int32 */
  groupId?: number
  /** 姓名 */
  name?: string | null
  remark?: string | null
  /** 账号 */
  userName?: string | null
  /** @format int32 */
  version?: number
  /** @format int32 */
  state?: number
  /** @format date-time */
  createdTime?: string
}

/** 修改 */
export interface WorkflowTemplateUpdateInput {
  basicSetting?: BaseSetting
  flowSetting?: string | null
  formSetting?: string | null
  advancedContext?: string | null
  basicContext?: string | null
  isPublish?: boolean
  /** @format int64 */
  id?: number
  /**
   * 版本
   * @format int64
   */
  version?: number
}
