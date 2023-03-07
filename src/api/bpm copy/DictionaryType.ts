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
  DictionaryTypeAddInput,
  DictionaryTypeUpdateInput,
  PageInputDictionaryTypeGetPageDto,
  ResultOutputDictionaryTypeGetOutput,
  ResultOutputInt64,
  ResultOutputPageOutputDictionaryTypeListOutput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class DictionaryTypeApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags dictionary-type
   * @name Get
   * @summary 查询字典类型
   * @request GET:/api/bpm/dict-type/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputDictionaryTypeGetOutput, any>({
      path: `/api/bpm/dict-type/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags dictionary-type
   * @name GetPage
   * @summary 查询字典类型列表
   * @request POST:/api/bpm/dict-type/get-page
   * @secure
   */
  getPage = (data: PageInputDictionaryTypeGetPageDto, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputDictionaryTypeListOutput, any>({
      path: `/api/bpm/dict-type/get-page`,
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
   * @tags dictionary-type
   * @name Add
   * @summary 新增
   * @request POST:/api/bpm/dict-type/add
   * @secure
   */
  add = (data: DictionaryTypeAddInput, params: RequestParams = {}) =>
    this.request<ResultOutputInt64, any>({
      path: `/api/bpm/dict-type/add`,
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
   * @tags dictionary-type
   * @name Update
   * @summary 修改
   * @request PUT:/api/bpm/dict-type/update
   * @secure
   */
  update = (data: DictionaryTypeUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/dict-type/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags dictionary-type
   * @name Delete
   * @summary 彻底删除
   * @request DELETE:/api/bpm/dict-type/delete
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
      path: `/api/bpm/dict-type/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags dictionary-type
   * @name SoftDelete
   * @summary 删除
   * @request DELETE:/api/bpm/dict-type/soft-delete
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
      path: `/api/bpm/dict-type/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags dictionary-type
   * @name BatchSoftDelete
   * @summary 批量删除
   * @request PUT:/api/bpm/dict-type/batch-soft-delete
   * @secure
   */
  batchSoftDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/dict-type/batch-soft-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
