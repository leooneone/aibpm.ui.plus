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
  DictionaryAddInput,
  DictionaryUpdateInput,
  PageInputDictionaryGetPageDto,
  ResultOutputDictionaryGetOutput,
  ResultOutputInt64,
  ResultOutputPageOutputDictionaryListOutput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class DictionaryApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags dictionary
   * @name Get
   * @summary 查询数据字典
   * @request GET:/api/bpm/dict/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputDictionaryGetOutput, any>({
      path: `/api/bpm/dict/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })


    /**
    * No description
    *
    * @tags dictionary
    * @name GetPage
    * @summary 查询数据字典列表
    * @request POST:/api/bpm/dict/get-page
    * @secure
    */

    getList = (
      query?: { 
        name?: String
      },
      params: RequestParams = {}
    ) =>
      this.request<ResultOutputDictionaryGetOutput, any>({
        path: `/api/bpm/dict/get-list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      })
 
  /**
   * No description
   *
   * @tags dictionary
   * @name GetPage
   * @summary 查询数据字典列表
   * @request POST:/api/bpm/dict/get-page
   * @secure
   */
  getPage = (data: PageInputDictionaryGetPageDto, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputDictionaryListOutput, any>({
      path: `/api/bpm/dict/get-page`,
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
   * @tags dictionary
   * @name Add
   * @summary 新增
   * @request POST:/api/bpm/dict/add
   * @secure
   */
  add = (data: DictionaryAddInput, params: RequestParams = {}) =>
    this.request<ResultOutputInt64, any>({
      path: `/api/bpm/dict/add`,
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
   * @tags dictionary
   * @name Update
   * @summary 修改
   * @request PUT:/api/bpm/dict/update
   * @secure
   */
  update = (data: DictionaryUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/dict/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags dictionary
   * @name Delete
   * @summary 彻底删除
   * @request DELETE:/api/bpm/dict/delete
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
      path: `/api/bpm/dict/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags dictionary
   * @name SoftDelete
   * @summary 删除
   * @request DELETE:/api/bpm/dict/soft-delete
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
      path: `/api/bpm/dict/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags dictionary
   * @name BatchSoftDelete
   * @summary 批量删除
   * @request PUT:/api/bpm/dict/batch-soft-delete
   * @secure
   */
  batchSoftDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/dict/batch-soft-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
