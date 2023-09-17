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
  OrgAddInput,
  OrgUpdateInput,
  ResultOutputInt64,
  ResultOutputListOrgListOutput,
  ResultOutputListUserEntity,
  ResultOutputOrgGetOutput,
  UserOrgEntity,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class MyOrgApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags my-org
   * @name JoinEmployees
   * @summary 关联组织与员工
   * @request POST:/api/bpm/my-org/join-employees
   * @secure
   */
  joinEmployees = (data: UserOrgEntity[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-org/join-employees`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-org
   * @name RemoveEmployees
   * @summary 移除组织内员工
   * @request DELETE:/api/bpm/my-org/remove-employees
   * @secure
   */
  removeEmployees = (
    query?: {
      ids?: number[]
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-org/remove-employees`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-org
   * @name GetEmployees
   * @summary 查找员工
   * @request GET:/api/bpm/my-org/get-employees
   * @secure
   */
  getEmployees = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListUserEntity, any>({
      path: `/api/bpm/my-org/get-employees`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-org
   * @name Get
   * @summary 查询
   * @request GET:/api/bpm/my-org/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputOrgGetOutput, any>({
      path: `/api/bpm/my-org/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-org
   * @name GetList
   * @summary 查询列表
   * @request GET:/api/bpm/my-org/get-list
   * @secure
   */
  getList = (
    query?: {
      key?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListOrgListOutput, any>({
      path: `/api/bpm/my-org/get-list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-org
   * @name Add
   * @summary 新增
   * @request POST:/api/bpm/my-org/add
   * @secure
   */
  add = (data: OrgAddInput, params: RequestParams = {}) =>
    this.request<ResultOutputInt64, any>({
      path: `/api/bpm/my-org/add`,
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
   * @tags my-org
   * @name Update
   * @summary 修改
   * @request PUT:/api/bpm/my-org/update
   * @secure
   */
  update = (data: OrgUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-org/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-org
   * @name Delete
   * @summary 彻底删除
   * @request DELETE:/api/bpm/my-org/delete
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
      path: `/api/bpm/my-org/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-org
   * @name SoftDelete
   * @summary 删除
   * @request DELETE:/api/bpm/my-org/soft-delete
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
      path: `/api/bpm/my-org/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
}
