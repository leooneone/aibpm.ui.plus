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
  PageInputTemplateGetPageDto,
  ResultOutputIListString,
  ResultOutputListWorkflowTemplateListOutput,
  ResultOutputPageOutputWorkflowTemplateListOutput,
  ResultOutputString,
  ResultOutputTemplateGetOutput,
  WorkflowTemplateUpdateInput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class WorkflowTemplateApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags workflow-template
   * @name GetFormData
   * @summary 获取表单数据
   * @request GET:/api/bpm/workflow-template/get-form-data
   * @secure
   */
  getFormData = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputString, any>({
      path: `/api/bpm/workflow-template/get-form-data`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name GetBizList
   * @summary 获取可用业务列表
   * @request GET:/api/bpm/workflow-template/get-biz-list
   * @secure
   */
  getBizList = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputIListString, any>({
      path: `/api/bpm/workflow-template/get-biz-list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name Get
   * @summary 获取流程模板
   * @request GET:/api/bpm/workflow-template/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputTemplateGetOutput, any>({
      path: `/api/bpm/workflow-template/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name ListPublished
   * @summary 已发布模板列表
   * @request POST:/api/bpm/workflow-template/list-published
   * @secure
   */
  listPublished = (params: RequestParams = {}) =>
    this.request<ResultOutputListWorkflowTemplateListOutput, any>({
      path: `/api/bpm/workflow-template/list-published`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name GetPage
   * @summary 查询模板列表
   * @request POST:/api/bpm/workflow-template/get-page
   * @secure
   */
  getPage = (data: PageInputTemplateGetPageDto, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputWorkflowTemplateListOutput, any>({
      path: `/api/bpm/workflow-template/get-page`,
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
   * @tags workflow-template
   * @name Save
   * @summary 保存模板,名称相同则增加新版本，不同则新增
   * @request POST:/api/bpm/workflow-template/save
   * @secure
   */
  save = (data: WorkflowTemplateUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/workflow-template/save`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
