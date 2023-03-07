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
  AuthLoginInput,
  ResultOutputAuthGetPasswordEncryptKeyOutput,
  ResultOutputAuthGetUserInfoOutput,
  ResultOutputCaptchaOutput,
  ResultOutputObject,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class AuthApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth
   * @name GetPasswordEncryptKey
   * @summary 查询密钥
   * @request GET:/api/admin/auth/get-password-encrypt-key
   * @secure
   */
  getPasswordEncryptKey = (params: RequestParams = {}) =>
    this.request<ResultOutputAuthGetPasswordEncryptKeyOutput, any>({
      path: `/api/admin/auth/get-password-encrypt-key`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name GetUserInfo
   * @summary 查询用户信息
   * @request GET:/api/admin/auth/get-user-info
   * @secure
   */
  getUserInfo = (params: RequestParams = {}) =>
    this.request<ResultOutputAuthGetUserInfoOutput, any>({
      path: `/api/admin/auth/get-user-info`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name Login
   * @summary 登录
   * @request POST:/api/admin/auth/login
   * @secure
   */
  login = (data: AuthLoginInput, params: RequestParams = {}) =>
    this.request<ResultOutputObject, any>({
      path: `/api/admin/auth/login`,
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
 * @tags auth
 * @name Refresh
 * @summary 刷新Token
以旧换新
 * @request GET:/api/admin/auth/refresh
 * @secure
 */
  refresh = (
    query: {
      token: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputObject, any>({
      path: `/api/admin/auth/refresh`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name GetCaptcha
   * @summary 获取验证数据
   * @request GET:/api/admin/auth/get-captcha
   * @secure
   */
  getCaptcha = (params: RequestParams = {}) =>
    this.request<ResultOutputCaptchaOutput, any>({
      path: `/api/admin/auth/get-captcha`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name CheckCaptcha
   * @summary 检查验证数据
   * @request GET:/api/admin/auth/check-captcha
   * @secure
   */
  checkCaptcha = (
    query?: {
      /** 校验唯一标识 */
      Token?: string
      /** 缓存键 */
      CaptchaKey?: string
      /** 删除缓存 */
      DeleteCache?: boolean
      /** 数据 */
      Data?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/admin/auth/check-captcha`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
}
