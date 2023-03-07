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
  ActivityEntity,
  ApprovalResult,
  PageInputWorkItemGetPageDto,
  ResultOutputListInt64,
  ResultOutputObject,
  ResultOutputWorkItemGetPageOutput,
  ResultOutputWorkItemGetOutput,
  WorkItemEntity,
  WorkItemSubmitInfo,
  WorkItemUpdateInput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class WorkItem<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags work-item
   * @name Activate
   * @request POST:/api/bpm/work-item/activate
   * @secure
   */
  activate = (
    query?: {
      /** @format int64 */
      itemId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/activate`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Suspend
   * @request POST:/api/bpm/work-item/suspend
   * @secure
   */
  suspend = (
    query?: {
      /** @format int64 */
      itemId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/suspend`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Cancel
   * @request POST:/api/bpm/work-item/cancel
   * @secure
   */
  cancel = (
    query?: {
      /** @format int64 */
      itemId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/cancel`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Resume
   * @request POST:/api/bpm/work-item/resume
   * @secure
   */
  resume = (
    query?: {
      /** @format int64 */
      itemId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/resume`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Adustify
   * @request POST:/api/bpm/work-item/adustify
   * @secure
   */
  adustify = (
    query?: {
      /** @format int64 */
      itemId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/adustify`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Urge
   * @request POST:/api/bpm/work-item/urge
   * @secure
   */
  urge = (
    query?: {
      /** @format int64 */
      itemId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/urge`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Get
   * @request GET:/api/bpm/work-item/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputWorkItemGetOutput, any>({
      path: `/api/bpm/work-item/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Page
   * @request POST:/api/bpm/work-item/page
   * @secure
   */
  page = (data: PageInputWorkItemGetPageDto, params: RequestParams = {}) =>
    this.request<ResultOutputWorkItemGetPageOutput, any>({
      path: `/api/bpm/work-item/page`,
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
   * @tags work-item
   * @name Start
   * @summary 根据工作项ID 启动流程
   * @request POST:/api/bpm/work-item/start
   * @secure
   */
  start = (
    query?: {
      /** @format int64 */
      workItemId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/start`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name GetInstance
   * @request GET:/api/bpm/work-item/get-instance
   * @secure
   */
  getInstance = (
    query?: {
      /** @format int64 */
      instanceId?: number
      /** @format int64 */
      workItemId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputObject, any>({
      path: `/api/bpm/work-item/get-instance`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Submit
   * @summary 工作项提交
   * @request POST:/api/bpm/work-item/submit
   * @secure
   */
  submit = (data: WorkItemSubmitInfo, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/submit`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name AddWorkItem
   * @summary 激活活动,新增工作项
   * @request POST:/api/bpm/work-item/add-work-item
   * @secure
   */
  addWorkItem = (
    data: ActivityEntity,
    query?: {
      /** @format int64 */
      templateId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListInt64, any>({
      path: `/api/bpm/work-item/add-work-item`,
      method: 'POST',
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name FinishWorkItem
   * @summary 完成工作项
   * @request POST:/api/bpm/work-item/finish-work-item
   * @secure
   */
  finishWorkItem = (
    data: ApprovalResult,
    query?: {
      /** @format int64 */
      itemId?: number
      comment?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/finish-work-item`,
      method: 'POST',
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name CancelWorkItem
   * @request POST:/api/bpm/work-item/cancel-work-item
   * @secure
   */
  cancelWorkItem = (
    query?: {
      /** @format int64 */
      itemId?: number
      comment?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/cancel-work-item`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Add
   * @request POST:/api/bpm/work-item/add
   * @secure
   */
  add = (data: WorkItemEntity, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/add`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Update
   * @request PUT:/api/bpm/work-item/update
   * @secure
   */
  update = (data: WorkItemUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Delete
   * @request DELETE:/api/bpm/work-item/delete
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
      path: `/api/bpm/work-item/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name SoftDelete
   * @request DELETE:/api/bpm/work-item/soft-delete
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
      path: `/api/bpm/work-item/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name BatchSoftDelete
   * @request PUT:/api/bpm/work-item/batch-soft-delete
   * @secure
   */
  batchSoftDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/batch-soft-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
