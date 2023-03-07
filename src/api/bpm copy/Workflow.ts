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
import { InstanceDataInput, ResultOutputObject } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Workflow<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags workflow
   * @name Open
   * @summary 根据模板ID 启动流程
   * @request POST:/api/bpm/workflow/open
   * @secure
   */ 
    open = (
      query?: {
        /** @format int64 */
        templateId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<AxiosResponse, any>({
        path: `/api/bpm/workflow/open`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      })
  /**
   * No description
   *
   * @tags workflow
   * @name Submit
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
