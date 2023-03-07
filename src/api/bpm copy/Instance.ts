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
  InstanceAddInput,
  InstanceUpdateInput,
  PageInputInstanceEntity,
  ResultOutputInstanceGetOutput,
  ResultOutputObject,
  ResultOutputPageOutputInstanceListOutput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Instance<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags instance
   * @name Get
   * @summary 获取流程实例
   * @request GET:/api/bpm/instance/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputInstanceGetOutput, any>({
      path: `/api/bpm/instance/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags instance
   * @name Page
   * @request POST:/api/bpm/instance/page
   * @secure
   */
  page = (data: PageInputInstanceEntity, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputInstanceListOutput, any>({
      path: `/api/bpm/instance/page`,
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
   * @tags instance
   * @name Start
   * @summary 根据模板ID 启动流程
   * @request POST:/api/bpm/instance/start
   * @secure
   */
  start = (
    query?: {
      /** @format int64 */
      templateId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputObject, any>({
      path: `/api/bpm/instance/start`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags instance
   * @name Add
   * @request POST:/api/bpm/instance/add
   * @secure
   */
  add = (data: InstanceAddInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/instance/add`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags instance
   * @name Update
   * @request PUT:/api/bpm/instance/update
   * @secure
   */
  update = (data: InstanceUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/instance/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags instance
   * @name Delete
   * @request DELETE:/api/bpm/instance/delete
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
      path: `/api/bpm/instance/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags instance
   * @name SoftDelete
   * @request DELETE:/api/bpm/instance/soft-delete
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
      path: `/api/bpm/instance/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags instance
   * @name BatchSoftDelete
   * @request PUT:/api/bpm/instance/batch-soft-delete
   * @secure
   */
  batchSoftDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/instance/batch-soft-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
