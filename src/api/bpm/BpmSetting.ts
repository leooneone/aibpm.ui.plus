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
import { BPMSettingUpdateInput, ResultOutputBPMSettingEntity } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class BpmSettingApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags bpm-setting
   * @name GetSetting
   * @request GET:/api/bpm/bpm-setting/get-setting
   * @secure
   */
  getSetting = (params: RequestParams = {}) =>
    this.request<ResultOutputBPMSettingEntity, any>({
      path: `/api/bpm/bpm-setting/get-setting`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags bpm-setting
   * @name Get
   * @summary 获取设置
   * @request GET:/api/bpm/bpm-setting/get
   * @secure
   */
  get = (params: RequestParams = {}) =>
    this.request<ResultOutputBPMSettingEntity, any>({
      path: `/api/bpm/bpm-setting/get`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags bpm-setting
   * @name Update
   * @summary 更新设置
   * @request PUT:/api/bpm/bpm-setting/update
   * @secure
   */
  update = (data: BPMSettingUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/bpm-setting/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
