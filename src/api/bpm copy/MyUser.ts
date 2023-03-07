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
  PageInputUserGetPageDto,
  ResultOutputIListUserPermissionsOutput,
  ResultOutputInt64,
  ResultOutputPageOutputUserGetPageOutput,
  ResultOutputString,
  ResultOutputUserGetBasicOutput,
  ResultOutputUserGetOutput,
  UserAddInput,
  UserAddMemberInput,
  UserChangePasswordInput,
  UserResetPasswordInput,
  UserSetManagerInput,
  UserUpdateBasicInput,
  UserUpdateInput,
  UserUpdateMemberInput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class MyUser<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags my-user
   * @name Get
   * @summary 查询用户
   * @request GET:/api/bpm/my-user/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputUserGetOutput, any>({
      path: `/api/bpm/my-user/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name GetPage
   * @summary 查询分页
   * @request POST:/api/bpm/my-user/get-page
   * @secure
   */
  getPage = (data: PageInputUserGetPageDto, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputUserGetPageOutput, any>({
      path: `/api/bpm/my-user/get-page`,
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
   * @tags my-user
   * @name GetBasic
   * @summary 查询用户基本信息
   * @request GET:/api/bpm/my-user/get-basic
   * @secure
   */
  getBasic = (params: RequestParams = {}) =>
    this.request<ResultOutputUserGetBasicOutput, any>({
      path: `/api/bpm/my-user/get-basic`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name GetPermissions
   * @summary 查询用户权限信息
   * @request GET:/api/bpm/my-user/get-permissions
   * @secure
   */
  getPermissions = (params: RequestParams = {}) =>
    this.request<ResultOutputIListUserPermissionsOutput, any>({
      path: `/api/bpm/my-user/get-permissions`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name Add
   * @summary 新增用户
   * @request POST:/api/bpm/my-user/add
   * @secure
   */
  add = (data: UserAddInput, params: RequestParams = {}) =>
    this.request<ResultOutputInt64, any>({
      path: `/api/bpm/my-user/add`,
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
   * @tags my-user
   * @name AddMember
   * @summary 新增会员
   * @request POST:/api/bpm/my-user/add-member
   * @secure
   */
  addMember = (data: UserAddMemberInput, params: RequestParams = {}) =>
    this.request<ResultOutputInt64, any>({
      path: `/api/bpm/my-user/add-member`,
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
   * @tags my-user
   * @name UpdateMember
   * @summary 修改会员
   * @request PUT:/api/bpm/my-user/update-member
   * @secure
   */
  updateMember = (data: UserUpdateMemberInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-user/update-member`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name Update
   * @summary 修改用户
   * @request PUT:/api/bpm/my-user/update
   * @secure
   */
  update = (data: UserUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-user/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name UpdateBasic
   * @summary 更新用户基本信息
   * @request PUT:/api/bpm/my-user/update-basic
   * @secure
   */
  updateBasic = (data: UserUpdateBasicInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-user/update-basic`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name ChangePassword
   * @summary 修改用户密码
   * @request PUT:/api/bpm/my-user/change-password
   * @secure
   */
  changePassword = (data: UserChangePasswordInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-user/change-password`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name ResetPassword
   * @summary 重置密码
   * @request POST:/api/bpm/my-user/reset-password
   * @secure
   */
  resetPassword = (data: UserResetPasswordInput, params: RequestParams = {}) =>
    this.request<ResultOutputString, any>({
      path: `/api/bpm/my-user/reset-password`,
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
   * @tags my-user
   * @name SetManager
   * @summary 设置主管
   * @request POST:/api/bpm/my-user/set-manager
   * @secure
   */
  setManager = (data: UserSetManagerInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-user/set-manager`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name Delete
   * @summary 彻底删除用户
   * @request DELETE:/api/bpm/my-user/delete
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
      path: `/api/bpm/my-user/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name BatchDelete
   * @summary 批量彻底删除用户
   * @request PUT:/api/bpm/my-user/batch-delete
   * @secure
   */
  batchDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-user/batch-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name SoftDelete
   * @summary 删除用户
   * @request DELETE:/api/bpm/my-user/soft-delete
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
      path: `/api/bpm/my-user/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name BatchSoftDelete
   * @summary 批量删除用户
   * @request PUT:/api/bpm/my-user/batch-soft-delete
   * @secure
   */
  batchSoftDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/my-user/batch-soft-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags my-user
   * @name AvatarUpload
   * @summary 上传头像
   * @request POST:/api/bpm/my-user/avatar-upload
   * @secure
   */
  avatarUpload = (
    data: {
      ContentType?: string
      ContentDisposition?: string
      Headers?: Record<string, string[]>
      /** @format int64 */
      Length?: number
      Name?: string
      FileName?: string
    },
    query?: {
      /** @default false */
      autoUpdate?: boolean
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputString, any>({
      path: `/api/bpm/my-user/avatar-upload`,
      method: 'POST',
      query: query,
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    })
}
