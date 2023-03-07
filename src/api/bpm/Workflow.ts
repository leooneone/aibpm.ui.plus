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
import { InstanceDataInput, QueryType, ResultOutputDisplayType, ResultOutputObject } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class WorkflowApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags workflow
   * @name GetState
   * @request GET:/api/bpm/workflow/get-state
   * @secure
   */
  getState = (
    query?: {
      Type?: QueryType
      /** @format int64 */
      TemplateId?: number
      /** @format int64 */
      WorkItemId?: number
      /** @format int64 */
      InstanceId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputDisplayType, any>({
      path: `/api/bpm/workflow/get-state`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow
   * @name Open
   * @request GET:/api/bpm/workflow/open
   * @secure
   */
  open = (
    query?: {
      Type?: QueryType
      /** @format int64 */
      TemplateId?: number
      /** @format int64 */
      WorkItemId?: number
      /** @format int64 */
      InstanceId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputObject, any>({
      path: `/api/bpm/workflow/open`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow
   * @name Statstics
   * @request POST:/api/bpm/workflow/statstics
   * @secure
   */
  statstics = (params: RequestParams = {}) =>
    this.request<ResultOutputObject, any>({
      path: `/api/bpm/workflow/statstics`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow
   * @name Submit
   * @summary 提交表单
   * @request POST:/api/bpm/workflow/submit
   * @secure
   */
  submit = (data: InstanceDataInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/workflow/submit`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow
   * @name GetDetail
   * @summary 流程明细
   * @request GET:/api/bpm/workflow/get-detail
   * @secure
   */
  getDetail = (
    query?: {
      /** @format int64 */
      instanceId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/workflow/get-detail`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
}
