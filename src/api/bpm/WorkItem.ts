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
  InstanceDataInput,
  PageInputWorkItemGetPageDto,
  ResultOutputInstanceOutput,
  ResultOutputObject,
  ResultOutputPageOutputWorkItemGetPageOutput,
  ResultOutputWorkItemGetOutput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class WorkItemApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags work-item
   * @name Activate
   * @summary 激活工作项
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
   * @summary 暂停工作项
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
   * @summary 取消工作项
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
   * @name CancelInstance
   * @request POST:/api/bpm/work-item/cancel-instance
   * @secure
   */
  cancelInstance = (
    query?: {
      /** @format int64 */
      instanceId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/cancel-instance`,
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
   * @summary 恢复工作项
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
   * @summary 调整工作项
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
   * @summary 催单
   * @request POST:/api/bpm/work-item/urge
   * @secure
   */
  urge = (
    query?: {
      /** @format int64 */
      instanceId?: number
      message?: string
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
   * @summary 获取工作项
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
   * @name Statstics
   * @request POST:/api/bpm/work-item/statstics
   * @secure
   */
  statstics = (params: RequestParams = {}) =>
    this.request<ResultOutputObject, any>({
      path: `/api/bpm/work-item/statstics`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name Page
   * @summary 工作项分页
   * @request POST:/api/bpm/work-item/page
   * @secure
   */
  page = (data: PageInputWorkItemGetPageDto, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputWorkItemGetPageOutput, any>({
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
    this.request<ResultOutputObject, any>({
      path: `/api/bpm/work-item/start`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags work-item
   * @name GetInstance
   * @summary 获取实例及相关信息
   * @request GET:/api/bpm/work-item/get-instance
   * @secure
   */
  getInstance = (
    query?: {
      /** @format int64 */
      instanceId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputInstanceOutput, any>({
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
  submit = (data: InstanceDataInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/work-item/submit`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
