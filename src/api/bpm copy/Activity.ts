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

import { AxiosResponse } from 'axios'
import {
  ActivityAddInput,
  ActivityEntity,
  ActivityType,
  ActivityUpdateInput,
  Condition,
  DynamicFilterInfo,
  DynamicFilterLogic,
  DynamicFilterOperator,
  Initiator,
  PageInputActivityEntity,
  Participant,
  ResultOutputActivityEntity,
  ResultOutputActivityGetOutput,
  ResultOutputPageOutputActivityListOutput,
  ResultOutputString,
  TemplateState,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Activity<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags activity
   * @name Get
   * @request GET:/api/bpm/activity/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputActivityGetOutput, any>({
      path: `/api/bpm/activity/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name Page
   * @request POST:/api/bpm/activity/page
   * @secure
   */
  page = (data: PageInputActivityEntity, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputActivityListOutput, any>({
      path: `/api/bpm/activity/page`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name Add
   * @request POST:/api/bpm/activity/add
   * @secure
   */
  add = (data: ActivityAddInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/activity/add`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name Update
   * @request PUT:/api/bpm/activity/update
   * @secure
   */
  update = (data: ActivityUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/activity/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name Delete
   * @request DELETE:/api/bpm/activity/delete
   * @secure
   */
  delete = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/activity/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name SoftDelete
   * @request DELETE:/api/bpm/activity/soft-delete
   * @secure
   */
  softDelete = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/activity/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name BatchSoftDelete
   * @request PUT:/api/bpm/activity/batch-soft-delete
   * @secure
   */
  batchSoftDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/activity/batch-soft-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name GetActivity
   * @summary 查找Activity
   * @request GET:/api/bpm/activity/get-activity
   * @secure
   */
  getActivity = (
    query?: {
      /**
       * 流程名称
       * workflow name
       */
      Name?: string
      /**
       * 流程标签
       * Icon
       * @format int32
       */
      Icon?: number
      /** @format int64 */
      GroupId?: number
      /** 备注 */
      Remark?: string
      /** 启动节点 */
      Activities?: Record<string, ActivityEntity>
      ActivitiesContext?: string
      StartActitivyId?: string
      LinesContext?: string
      Lines?: Record<string, string[]>
      /**
       * 发布时间
       * @format date-time
       */
      PublishTime?: string
      ProcessData?: string
      FormData?: string
      Config?: string
      /** Draft=0,Published=1,Suspend=2,Expired=3 */
      State?: TemplateState
      /**
       * 租户Id
       * @format int64
       */
      TenantId?: number
      /** 是否删除 */
      IsDeleted?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      ModifiedUserId?: number
      /**
       * 修改者
       * @maxLength 50
       */
      ModifiedUserName?: string
      /**
       * 修改时间
       * @format date-time
       */
      ModifiedTime?: string
      /**
       * 创建者Id
       * @format int64
       */
      CreatedUserId?: number
      /**
       * 创建者
       * @maxLength 50
       */
      CreatedUserName?: string
      /**
       * 创建时间
       * @format date-time
       */
      CreatedTime?: string
      /**
       * 主键Id
       * @format int64
       */
      Id?: number
      activityId?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputActivityEntity, any>({
      path: `/api/bpm/activity/get-activity`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name GetPermissionFormData
   * @summary 获取表单权限
   * @request GET:/api/bpm/activity/get-permission-form-data
   * @secure
   */
  getPermissionFormData = (
    query?: {
      Role?: string
      Name?: string
      Title?: string
      ConditionNodes?: ActivityEntity[]
      'ChildNode.Role'?: string
      'ChildNode.Name'?: string
      'ChildNode.Title'?: string
      'ChildNode.ConditionNodes'?: ActivityEntity[]
      'ChildNode.ChildNode'?: ActivityEntity
      'ChildNode.Properties.Initiator'?: Initiator[]
      /** 節點參與人 */
      'ChildNode.Properties.Participants'?: Participant[]
      'ChildNode.Properties.IsDefault'?: boolean
      'ChildNode.Properties.AssigneeType'?: string
      'ChildNode.Properties.Role'?: string
      /** @format int32 */
      'ChildNode.Properties.Priority'?: number
      /**
       * 空 表示串簽（一個一個審批，所有人同意通過，任意一個不同意就中斷返回拒絕），
       * and:會签（须所有审批人同意），
       * or:或签（一名审批人同意或拒绝即可）
       */
      'ChildNode.Properties.SignType'?: string
      /** 当选择表单内联系人的时候 */
      'ChildNode.Properties.FieldName'?: string
      /** @format int32 */
      'ChildNode.Properties.Level'?: number
      /** 允許多人 */
      'ChildNode.Properties.OptionalMultiUser'?: boolean
      'ChildNode.Properties.Conditions'?: Condition[]
      'ChildNode.Properties.DynamicFilter.Field'?: string
      /** Contains=0,StartsWith=1,EndsWith=2,NotContains=3,NotStartsWith=4,NotEndsWith=5,Equal=6,Equals=7,Eq=8,NotEqual=9,GreaterThan=10,GreaterThanOrEqual=11,LessThan=12,LessThanOrEqual=13,Range=14,DateRange=15,Any=16,NotAny=17,Custom=18 */
      'ChildNode.Properties.DynamicFilter.Operator'?: DynamicFilterOperator
      'ChildNode.Properties.DynamicFilter.Value'?: any
      /** And=0,Or=1 */
      'ChildNode.Properties.DynamicFilter.Logic'?: DynamicFilterLogic
      'ChildNode.Properties.DynamicFilter.Filters'?: DynamicFilterInfo[]
      'ChildNode.FiledName'?: string
      /** @format int64 */
      'ChildNode.WorkflowTemplateId'?: number
      /**
       * 流程名称
       * workflow name
       */
      'ChildNode.WorkflowTemplate.Name'?: string
      /**
       * 流程标签
       * Icon
       * @format int32
       */
      'ChildNode.WorkflowTemplate.Icon'?: number
      /** @format int64 */
      'ChildNode.WorkflowTemplate.GroupId'?: number
      /** 备注 */
      'ChildNode.WorkflowTemplate.Remark'?: string
      /** 启动节点 */
      'ChildNode.WorkflowTemplate.Activities'?: Record<string, ActivityEntity>
      'ChildNode.WorkflowTemplate.ActivitiesContext'?: string
      'ChildNode.WorkflowTemplate.StartActitivyId'?: string
      'ChildNode.WorkflowTemplate.LinesContext'?: string
      'ChildNode.WorkflowTemplate.Lines'?: Record<string, string[]>
      /**
       * 发布时间
       * @format date-time
       */
      'ChildNode.WorkflowTemplate.PublishTime'?: string
      'ChildNode.WorkflowTemplate.ProcessData'?: string
      'ChildNode.WorkflowTemplate.FormData'?: string
      'ChildNode.WorkflowTemplate.Config'?: string
      /** Draft=0,Published=1,Suspend=2,Expired=3 */
      'ChildNode.WorkflowTemplate.State'?: TemplateState
      /**
       * 租户Id
       * @format int64
       */
      'ChildNode.WorkflowTemplate.TenantId'?: number
      /** 是否删除 */
      'ChildNode.WorkflowTemplate.IsDeleted'?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      'ChildNode.WorkflowTemplate.ModifiedUserId'?: number
      /**
       * 修改者
       * @maxLength 50
       */
      'ChildNode.WorkflowTemplate.ModifiedUserName'?: string
      /**
       * 修改时间
       * @format date-time
       */
      'ChildNode.WorkflowTemplate.ModifiedTime'?: string
      /**
       * 创建者Id
       * @format int64
       */
      'ChildNode.WorkflowTemplate.CreatedUserId'?: number
      /**
       * 创建者
       * @maxLength 50
       */
      'ChildNode.WorkflowTemplate.CreatedUserName'?: string
      /**
       * 创建时间
       * @format date-time
       */
      'ChildNode.WorkflowTemplate.CreatedTime'?: string
      /**
       * 主键Id
       * @format int64
       */
      'ChildNode.WorkflowTemplate.Id'?: number
      'ChildNode.Content'?: string
      'ChildNode.Code'?: string
      /** 表单模板，每个活动节点可以有不同的模板 来控制显示，每个模板的业务数据应该是template中 表单的子集 */
      'ChildNode.FormData'?: string
      'ChildNode.PrevId'?: string
      /** ActivityType 常用活動類型:Copy=0,Condition=1,Start=2,Approver=3,End=4,Fill=5,Approve=6,Circulate=7,Consult=8,Assist=9 */
      'ChildNode.Type'?: ActivityType
      /**
       * 租户Id
       * @format int64
       */
      'ChildNode.TenantId'?: number
      /** 是否删除 */
      'ChildNode.IsDeleted'?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      'ChildNode.ModifiedUserId'?: number
      /**
       * 修改者
       * @maxLength 50
       */
      'ChildNode.ModifiedUserName'?: string
      /**
       * 修改时间
       * @format date-time
       */
      'ChildNode.ModifiedTime'?: string
      /**
       * 创建者Id
       * @format int64
       */
      'ChildNode.CreatedUserId'?: number
      /**
       * 创建者
       * @maxLength 50
       */
      'ChildNode.CreatedUserName'?: string
      /**
       * 创建时间
       * @format date-time
       */
      'ChildNode.CreatedTime'?: string
      /**
       * 主键Id
       * @format int64
       */
      'ChildNode.Id'?: number
      'Properties.Initiator'?: Initiator[]
      /** 節點參與人 */
      'Properties.Participants'?: Participant[]
      'Properties.IsDefault'?: boolean
      'Properties.AssigneeType'?: string
      'Properties.Role'?: string
      /** @format int32 */
      'Properties.Priority'?: number
      /**
       * 空 表示串簽（一個一個審批，所有人同意通過，任意一個不同意就中斷返回拒絕），
       * and:會签（须所有审批人同意），
       * or:或签（一名审批人同意或拒绝即可）
       */
      'Properties.SignType'?: string
      /** 当选择表单内联系人的时候 */
      'Properties.FieldName'?: string
      /** @format int32 */
      'Properties.Level'?: number
      /** 允許多人 */
      'Properties.OptionalMultiUser'?: boolean
      'Properties.Conditions'?: Condition[]
      'Properties.DynamicFilter.Field'?: string
      /** Contains=0,StartsWith=1,EndsWith=2,NotContains=3,NotStartsWith=4,NotEndsWith=5,Equal=6,Equals=7,Eq=8,NotEqual=9,GreaterThan=10,GreaterThanOrEqual=11,LessThan=12,LessThanOrEqual=13,Range=14,DateRange=15,Any=16,NotAny=17,Custom=18 */
      'Properties.DynamicFilter.Operator'?: DynamicFilterOperator
      'Properties.DynamicFilter.Value'?: any
      /** And=0,Or=1 */
      'Properties.DynamicFilter.Logic'?: DynamicFilterLogic
      'Properties.DynamicFilter.Filters'?: DynamicFilterInfo[]
      FiledName?: string
      /** @format int64 */
      WorkflowTemplateId?: number
      /**
       * 流程名称
       * workflow name
       */
      'WorkflowTemplate.Name'?: string
      /**
       * 流程标签
       * Icon
       * @format int32
       */
      'WorkflowTemplate.Icon'?: number
      /** @format int64 */
      'WorkflowTemplate.GroupId'?: number
      /** 备注 */
      'WorkflowTemplate.Remark'?: string
      /** 启动节点 */
      'WorkflowTemplate.Activities'?: Record<string, ActivityEntity>
      'WorkflowTemplate.ActivitiesContext'?: string
      'WorkflowTemplate.StartActitivyId'?: string
      'WorkflowTemplate.LinesContext'?: string
      'WorkflowTemplate.Lines'?: Record<string, string[]>
      /**
       * 发布时间
       * @format date-time
       */
      'WorkflowTemplate.PublishTime'?: string
      'WorkflowTemplate.ProcessData'?: string
      'WorkflowTemplate.FormData'?: string
      'WorkflowTemplate.Config'?: string
      /** Draft=0,Published=1,Suspend=2,Expired=3 */
      'WorkflowTemplate.State'?: TemplateState
      /**
       * 租户Id
       * @format int64
       */
      'WorkflowTemplate.TenantId'?: number
      /** 是否删除 */
      'WorkflowTemplate.IsDeleted'?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      'WorkflowTemplate.ModifiedUserId'?: number
      /**
       * 修改者
       * @maxLength 50
       */
      'WorkflowTemplate.ModifiedUserName'?: string
      /**
       * 修改时间
       * @format date-time
       */
      'WorkflowTemplate.ModifiedTime'?: string
      /**
       * 创建者Id
       * @format int64
       */
      'WorkflowTemplate.CreatedUserId'?: number
      /**
       * 创建者
       * @maxLength 50
       */
      'WorkflowTemplate.CreatedUserName'?: string
      /**
       * 创建时间
       * @format date-time
       */
      'WorkflowTemplate.CreatedTime'?: string
      /**
       * 主键Id
       * @format int64
       */
      'WorkflowTemplate.Id'?: number
      Content?: string
      Code?: string
      /** 表单模板，每个活动节点可以有不同的模板 来控制显示，每个模板的业务数据应该是template中 表单的子集 */
      FormData?: string
      PrevId?: string
      /** ActivityType 常用活動類型:Copy=0,Condition=1,Start=2,Approver=3,End=4,Fill=5,Approve=6,Circulate=7,Consult=8,Assist=9 */
      Type?: ActivityType
      /**
       * 租户Id
       * @format int64
       */
      TenantId?: number
      /** 是否删除 */
      IsDeleted?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      ModifiedUserId?: number
      /**
       * 修改者
       * @maxLength 50
       */
      ModifiedUserName?: string
      /**
       * 修改时间
       * @format date-time
       */
      ModifiedTime?: string
      /**
       * 创建者Id
       * @format int64
       */
      CreatedUserId?: number
      /**
       * 创建者
       * @maxLength 50
       */
      CreatedUserName?: string
      /**
       * 创建时间
       * @format date-time
       */
      CreatedTime?: string
      /**
       * 主键Id
       * @format int64
       */
      Id?: number
      formData?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputString, any>({
      path: `/api/bpm/activity/get-permission-form-data`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name FindPrevioudActivity
   * @summary 查找上一個活動節點
   * @request GET:/api/bpm/activity/find-previoud-activity
   * @secure
   */
  findPrevioudActivity = (
    query?: {
      Name?: string
      /**
       * 流程标签
       * Icon
       * @format int32
       */
      Icon?: number
      /** @format int64 */
      GroupId?: number
      /** 备注 */
      Remark?: string
      /** 启动节点 */
      Activities?: Record<string, ActivityEntity>
      ActivitiesContext?: string
      StartActitivyId?: string
      LinesContext?: string
      Lines?: Record<string, string[]>
      /**
       * 发布时间
       * @format date-time
       */
      PublishTime?: string
      ProcessData?: string
      /** 表单模板，每个活动节点可以有不同的模板 来控制显示，每个模板的业务数据应该是template中 表单的子集 */
      FormData?: string
      Config?: string
      /** Draft=0,Published=1,Suspend=2,Expired=3 */
      State?: TemplateState
      /**
       * 租户Id
       * @format int64
       */
      TenantId?: number
      /** 是否删除 */
      IsDeleted?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      ModifiedUserId?: number
      /**
       * 修改者
       * @maxLength 50
       */
      ModifiedUserName?: string
      /**
       * 修改时间
       * @format date-time
       */
      ModifiedTime?: string
      /**
       * 创建者Id
       * @format int64
       */
      CreatedUserId?: number
      /**
       * 创建者
       * @maxLength 50
       */
      CreatedUserName?: string
      /**
       * 创建时间
       * @format date-time
       */
      CreatedTime?: string
      /**
       * 主键Id
       * @format int64
       */
      Id?: number
      Role?: string
      Title?: string
      ConditionNodes?: ActivityEntity[]
      'ChildNode.Role'?: string
      'ChildNode.Name'?: string
      'ChildNode.Title'?: string
      'ChildNode.ConditionNodes'?: ActivityEntity[]
      'ChildNode.ChildNode'?: ActivityEntity
      'ChildNode.Properties.Initiator'?: Initiator[]
      /** 節點參與人 */
      'ChildNode.Properties.Participants'?: Participant[]
      'ChildNode.Properties.IsDefault'?: boolean
      'ChildNode.Properties.AssigneeType'?: string
      'ChildNode.Properties.Role'?: string
      /** @format int32 */
      'ChildNode.Properties.Priority'?: number
      /**
       * 空 表示串簽（一個一個審批，所有人同意通過，任意一個不同意就中斷返回拒絕），
       * and:會签（须所有审批人同意），
       * or:或签（一名审批人同意或拒绝即可）
       */
      'ChildNode.Properties.SignType'?: string
      /** 当选择表单内联系人的时候 */
      'ChildNode.Properties.FieldName'?: string
      /** @format int32 */
      'ChildNode.Properties.Level'?: number
      /** 允許多人 */
      'ChildNode.Properties.OptionalMultiUser'?: boolean
      'ChildNode.Properties.Conditions'?: Condition[]
      'ChildNode.Properties.DynamicFilter.Field'?: string
      /** Contains=0,StartsWith=1,EndsWith=2,NotContains=3,NotStartsWith=4,NotEndsWith=5,Equal=6,Equals=7,Eq=8,NotEqual=9,GreaterThan=10,GreaterThanOrEqual=11,LessThan=12,LessThanOrEqual=13,Range=14,DateRange=15,Any=16,NotAny=17,Custom=18 */
      'ChildNode.Properties.DynamicFilter.Operator'?: DynamicFilterOperator
      'ChildNode.Properties.DynamicFilter.Value'?: any
      /** And=0,Or=1 */
      'ChildNode.Properties.DynamicFilter.Logic'?: DynamicFilterLogic
      'ChildNode.Properties.DynamicFilter.Filters'?: DynamicFilterInfo[]
      'ChildNode.FiledName'?: string
      /** @format int64 */
      'ChildNode.WorkflowTemplateId'?: number
      /**
       * 流程名称
       * workflow name
       */
      'ChildNode.WorkflowTemplate.Name'?: string
      /**
       * 流程标签
       * Icon
       * @format int32
       */
      'ChildNode.WorkflowTemplate.Icon'?: number
      /** @format int64 */
      'ChildNode.WorkflowTemplate.GroupId'?: number
      /** 备注 */
      'ChildNode.WorkflowTemplate.Remark'?: string
      /** 启动节点 */
      'ChildNode.WorkflowTemplate.Activities'?: Record<string, ActivityEntity>
      'ChildNode.WorkflowTemplate.ActivitiesContext'?: string
      'ChildNode.WorkflowTemplate.StartActitivyId'?: string
      'ChildNode.WorkflowTemplate.LinesContext'?: string
      'ChildNode.WorkflowTemplate.Lines'?: Record<string, string[]>
      /**
       * 发布时间
       * @format date-time
       */
      'ChildNode.WorkflowTemplate.PublishTime'?: string
      'ChildNode.WorkflowTemplate.ProcessData'?: string
      'ChildNode.WorkflowTemplate.FormData'?: string
      'ChildNode.WorkflowTemplate.Config'?: string
      /** Draft=0,Published=1,Suspend=2,Expired=3 */
      'ChildNode.WorkflowTemplate.State'?: TemplateState
      /**
       * 租户Id
       * @format int64
       */
      'ChildNode.WorkflowTemplate.TenantId'?: number
      /** 是否删除 */
      'ChildNode.WorkflowTemplate.IsDeleted'?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      'ChildNode.WorkflowTemplate.ModifiedUserId'?: number
      /**
       * 修改者
       * @maxLength 50
       */
      'ChildNode.WorkflowTemplate.ModifiedUserName'?: string
      /**
       * 修改时间
       * @format date-time
       */
      'ChildNode.WorkflowTemplate.ModifiedTime'?: string
      /**
       * 创建者Id
       * @format int64
       */
      'ChildNode.WorkflowTemplate.CreatedUserId'?: number
      /**
       * 创建者
       * @maxLength 50
       */
      'ChildNode.WorkflowTemplate.CreatedUserName'?: string
      /**
       * 创建时间
       * @format date-time
       */
      'ChildNode.WorkflowTemplate.CreatedTime'?: string
      /**
       * 主键Id
       * @format int64
       */
      'ChildNode.WorkflowTemplate.Id'?: number
      'ChildNode.Content'?: string
      'ChildNode.Code'?: string
      /** 表单模板，每个活动节点可以有不同的模板 来控制显示，每个模板的业务数据应该是template中 表单的子集 */
      'ChildNode.FormData'?: string
      'ChildNode.PrevId'?: string
      /** ActivityType 常用活動類型:Copy=0,Condition=1,Start=2,Approver=3,End=4,Fill=5,Approve=6,Circulate=7,Consult=8,Assist=9 */
      'ChildNode.Type'?: ActivityType
      /**
       * 租户Id
       * @format int64
       */
      'ChildNode.TenantId'?: number
      /** 是否删除 */
      'ChildNode.IsDeleted'?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      'ChildNode.ModifiedUserId'?: number
      /**
       * 修改者
       * @maxLength 50
       */
      'ChildNode.ModifiedUserName'?: string
      /**
       * 修改时间
       * @format date-time
       */
      'ChildNode.ModifiedTime'?: string
      /**
       * 创建者Id
       * @format int64
       */
      'ChildNode.CreatedUserId'?: number
      /**
       * 创建者
       * @maxLength 50
       */
      'ChildNode.CreatedUserName'?: string
      /**
       * 创建时间
       * @format date-time
       */
      'ChildNode.CreatedTime'?: string
      /**
       * 主键Id
       * @format int64
       */
      'ChildNode.Id'?: number
      'Properties.Initiator'?: Initiator[]
      /** 節點參與人 */
      'Properties.Participants'?: Participant[]
      'Properties.IsDefault'?: boolean
      'Properties.AssigneeType'?: string
      'Properties.Role'?: string
      /** @format int32 */
      'Properties.Priority'?: number
      /**
       * 空 表示串簽（一個一個審批，所有人同意通過，任意一個不同意就中斷返回拒絕），
       * and:會签（须所有审批人同意），
       * or:或签（一名审批人同意或拒绝即可）
       */
      'Properties.SignType'?: string
      /** 当选择表单内联系人的时候 */
      'Properties.FieldName'?: string
      /** @format int32 */
      'Properties.Level'?: number
      /** 允許多人 */
      'Properties.OptionalMultiUser'?: boolean
      'Properties.Conditions'?: Condition[]
      'Properties.DynamicFilter.Field'?: string
      /** Contains=0,StartsWith=1,EndsWith=2,NotContains=3,NotStartsWith=4,NotEndsWith=5,Equal=6,Equals=7,Eq=8,NotEqual=9,GreaterThan=10,GreaterThanOrEqual=11,LessThan=12,LessThanOrEqual=13,Range=14,DateRange=15,Any=16,NotAny=17,Custom=18 */
      'Properties.DynamicFilter.Operator'?: DynamicFilterOperator
      'Properties.DynamicFilter.Value'?: any
      /** And=0,Or=1 */
      'Properties.DynamicFilter.Logic'?: DynamicFilterLogic
      'Properties.DynamicFilter.Filters'?: DynamicFilterInfo[]
      FiledName?: string
      /** @format int64 */
      WorkflowTemplateId?: number
      /**
       * 流程名称
       * workflow name
       */
      'WorkflowTemplate.Name'?: string
      /**
       * 流程标签
       * Icon
       * @format int32
       */
      'WorkflowTemplate.Icon'?: number
      /** @format int64 */
      'WorkflowTemplate.GroupId'?: number
      /** 备注 */
      'WorkflowTemplate.Remark'?: string
      /** 启动节点 */
      'WorkflowTemplate.Activities'?: Record<string, ActivityEntity>
      'WorkflowTemplate.ActivitiesContext'?: string
      'WorkflowTemplate.StartActitivyId'?: string
      'WorkflowTemplate.LinesContext'?: string
      'WorkflowTemplate.Lines'?: Record<string, string[]>
      /**
       * 发布时间
       * @format date-time
       */
      'WorkflowTemplate.PublishTime'?: string
      'WorkflowTemplate.ProcessData'?: string
      'WorkflowTemplate.FormData'?: string
      'WorkflowTemplate.Config'?: string
      /** Draft=0,Published=1,Suspend=2,Expired=3 */
      'WorkflowTemplate.State'?: TemplateState
      /**
       * 租户Id
       * @format int64
       */
      'WorkflowTemplate.TenantId'?: number
      /** 是否删除 */
      'WorkflowTemplate.IsDeleted'?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      'WorkflowTemplate.ModifiedUserId'?: number
      /**
       * 修改者
       * @maxLength 50
       */
      'WorkflowTemplate.ModifiedUserName'?: string
      /**
       * 修改时间
       * @format date-time
       */
      'WorkflowTemplate.ModifiedTime'?: string
      /**
       * 创建者Id
       * @format int64
       */
      'WorkflowTemplate.CreatedUserId'?: number
      /**
       * 创建者
       * @maxLength 50
       */
      'WorkflowTemplate.CreatedUserName'?: string
      /**
       * 创建时间
       * @format date-time
       */
      'WorkflowTemplate.CreatedTime'?: string
      /**
       * 主键Id
       * @format int64
       */
      'WorkflowTemplate.Id'?: number
      Content?: string
      Code?: string
      PrevId?: string
      /** ActivityType 常用活動類型:Copy=0,Condition=1,Start=2,Approver=3,End=4,Fill=5,Approve=6,Circulate=7,Consult=8,Assist=9 */
      Type?: ActivityType
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputActivityEntity, any>({
      path: `/api/bpm/activity/find-previoud-activity`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags activity
   * @name FindNextActivity
   * @summary 查找当前节点的后续活动节点
   * @request GET:/api/bpm/activity/find-next-activity
   * @secure
   */
  findNextActivity = (
    query?: {
      /**
       * 流程名称
       * workflow name
       */
      Name?: string
      /**
       * 流程标签
       * Icon
       * @format int32
       */
      Icon?: number
      /** @format int64 */
      GroupId?: number
      /** 备注 */
      Remark?: string
      /** 启动节点 */
      Activities?: Record<string, ActivityEntity>
      ActivitiesContext?: string
      StartActitivyId?: string
      LinesContext?: string
      Lines?: Record<string, string[]>
      /**
       * 发布时间
       * @format date-time
       */
      PublishTime?: string
      ProcessData?: string
      FormData?: string
      Config?: string
      /** Draft=0,Published=1,Suspend=2,Expired=3 */
      State?: TemplateState
      /**
       * 租户Id
       * @format int64
       */
      TenantId?: number
      /** 是否删除 */
      IsDeleted?: boolean
      /**
       * 修改者Id
       * @format int64
       */
      ModifiedUserId?: number
      /**
       * 修改者
       * @maxLength 50
       */
      ModifiedUserName?: string
      /**
       * 修改时间
       * @format date-time
       */
      ModifiedTime?: string
      /**
       * 创建者Id
       * @format int64
       */
      CreatedUserId?: number
      /**
       * 创建者
       * @maxLength 50
       */
      CreatedUserName?: string
      /**
       * 创建时间
       * @format date-time
       */
      CreatedTime?: string
      /**
       * 主键Id
       * @format int64
       */
      Id?: number
      currentActivityId?: string
      nextActivities?: ActivityEntity[]
      dicForm?: Record<string, any>
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/activity/find-next-activity`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
}
