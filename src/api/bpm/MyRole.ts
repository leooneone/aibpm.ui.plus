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
  PageInputRoleGetPageDto,
  ResultOutputInt64,
  ResultOutputListRoleGetListOutput,
  ResultOutputListUserEntity,
  ResultOutputListUserGetRoleUserListOutput,
  ResultOutputPageOutputRoleGetPageOutput,
  ResultOutputRoleGetOutput,
  RoleAddInput,
  RoleAddRoleUserListInput,
  RoleSetDataScopeInput,
  RoleUpdateInput,
  UserRoleEntity,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class MyRoleApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags my-role
   * @name GetListByParentId
   * @summary 查询指定角色的子列表
   * @request GET:/api/bpm/my-role/get-list-by-parent-id
   * @secure
   */
  getListByParentId = (
    query?: {
      /** @format int64 */
      parentId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListRoleGetListOutput, any>({
      path: `/api/bpm/my-role/get-list-by-parent-id`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name JoinEmployees
   * @summary 添加员工
   * @request POST:/api/bpm/my-role/join-employees
   * @secure
   */
  joinEmployees = (data: UserRoleEntity[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-role/join-employees`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name GetEmployeeIds
   * @summary 查找指定角色的员工Id
   * @request GET:/api/bpm/my-role/get-employee-ids
   * @secure
   */
  getEmployeeIds = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListUserEntity, any>({
      path: `/api/bpm/my-role/get-employee-ids`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name GetEmployees
   * @summary 查找指定角色的员工
   * @request GET:/api/bpm/my-role/get-employees
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
      path: `/api/bpm/my-role/get-employees`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name Get
   * @summary 查询
   * @request GET:/api/bpm/my-role/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputRoleGetOutput, any>({
      path: `/api/bpm/my-role/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name GetList
   * @summary 查询列表
   * @request GET:/api/bpm/my-role/get-list
   * @secure
   */
  getList = (
    query?: {
      /** 名称 */
      Name?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListRoleGetListOutput, any>({
      path: `/api/bpm/my-role/get-list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name GetPage
   * @summary 查询分页
   * @request POST:/api/bpm/my-role/get-page
   * @secure
   */
  getPage = (data: PageInputRoleGetPageDto, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputRoleGetPageOutput, any>({
      path: `/api/bpm/my-role/get-page`,
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
   * @tags my-role
   * @name GetRoleUserList
   * @summary 查询角色用户列表
   * @request GET:/api/bpm/my-role/get-role-user-list
   * @secure
   */
  getRoleUserList = (
    query?: {
      /** 姓名 */
      Name?: string
      /**
       * 角色Id
       * @format int64
       */
      RoleId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListUserGetRoleUserListOutput, any>({
      path: `/api/bpm/my-role/get-role-user-list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name AddRoleUser
   * @summary 新增角色用户
   * @request POST:/api/bpm/my-role/add-role-user
   * @secure
   */
  addRoleUser = (data: RoleAddRoleUserListInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-role/add-role-user`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name RemoveRoleUser
   * @summary 移除角色用户
   * @request POST:/api/bpm/my-role/remove-role-user
   * @secure
   */
  removeRoleUser = (data: RoleAddRoleUserListInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-role/remove-role-user`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name Add
   * @summary 添加
   * @request POST:/api/bpm/my-role/add
   * @secure
   */
  add = (data: RoleAddInput, params: RequestParams = {}) =>
    this.request<ResultOutputInt64, any>({
      path: `/api/bpm/my-role/add`,
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
   * @tags my-role
   * @name Update
   * @summary 修改
   * @request PUT:/api/bpm/my-role/update
   * @secure
   */
  update = (data: RoleUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-role/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name Delete
   * @summary 彻底删除
   * @request DELETE:/api/bpm/my-role/delete
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
      path: `/api/bpm/my-role/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name BatchDelete
   * @summary 批量彻底删除
   * @request PUT:/api/bpm/my-role/batch-delete
   * @secure
   */
  batchDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-role/batch-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name SoftDelete
   * @summary 删除
   * @request DELETE:/api/bpm/my-role/soft-delete
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
      path: `/api/bpm/my-role/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name BatchSoftDelete
   * @summary 批量删除
   * @request PUT:/api/bpm/my-role/batch-soft-delete
   * @secure
   */
  batchSoftDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-role/batch-soft-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-role
   * @name SetDataScope
   * @summary 设置数据权限
   * @request POST:/api/bpm/my-role/set-data-scope
   * @secure
   */
  setDataScope = (data: RoleSetDataScopeInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-role/set-data-scope`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
