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
  PageInputWorkflowTemplateEntity,
  ResultOutputPageOutputWorkflowTemplateListOutput,
  ResultOutputString,
  ResultOutputWorkflowTemplateGetOutput,
  WorkflowTemplateAddInput,
  WorkflowTemplateUpdateInput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class WorkflowTemplate<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags workflow-template
   * @name GetFormData
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
   * @name Get
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
    this.request<ResultOutputWorkflowTemplateGetOutput, any>({
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
   * @request POST:/api/bpm/workflow-template/list-published
   * @secure
   */
  listPublished = (params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/workflow-template/list-published`,
      method: 'POST',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name Page
   * @request POST:/api/bpm/workflow-template/page
   * @secure
   */
  getPage = (data: PageInputWorkflowTemplateEntity, params: RequestParams = {}) =>
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
   * @name Add
   * @request POST:/api/bpm/workflow-template/add
   * @secure
   */
  add = (data: WorkflowTemplateAddInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/workflow-template/add`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name Update
   * @request PUT:/api/bpm/workflow-template/update
   * @secure
   */
  update = (data: WorkflowTemplateUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/workflow-template/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name Delete
   * @request DELETE:/api/bpm/workflow-template/delete
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
      path: `/api/bpm/workflow-template/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name SoftDelete
   * @request DELETE:/api/bpm/workflow-template/soft-delete
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
      path: `/api/bpm/workflow-template/soft-delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags workflow-template
   * @name BatchSoftDelete
   * @request PUT:/api/bpm/workflow-template/batch-soft-delete
   * @secure
   */
  batchSoftDelete = (data: number[], params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/bpm/workflow-template/batch-soft-delete`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
