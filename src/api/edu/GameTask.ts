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
  GameTaskAddInput,
  GameTaskUpdateInput,
  PageInputGameTaskGetPageDto,
  ResultOutputGameTaskGetOutput,
  ResultOutputPageOutputGameTaskListOutput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class GameTaskApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags game-task
   * @name Get
   * @request GET:/api/edu/game-task/get
   * @secure
   */
  get = (
    query?: {
      /** @format int64 */
      id?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputGameTaskGetOutput, any>({
      path: `/api/edu/game-task/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags game-task
   * @name Page
   * @request POST:/api/edu/game-task/page
   * @secure
   */
  page = (data: PageInputGameTaskGetPageDto, params: RequestParams = {}) =>
    this.request<ResultOutputPageOutputGameTaskListOutput, any>({
      path: `/api/edu/game-task/page`,
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
   * @tags game-task
   * @name Add
   * @request POST:/api/edu/game-task/add
   * @secure
   */
  add = (data: GameTaskAddInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/edu/game-task/add`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags game-task
   * @name Update
   * @request PUT:/api/edu/game-task/update
   * @secure
   */
  update = (data: GameTaskUpdateInput, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/edu/game-task/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags game-task
   * @name Delete
   * @request DELETE:/api/edu/game-task/delete
   * @secure
   */
  delete = (
    query: {
      /** @format int64 */
      id: number
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/edu/game-task/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      ...params,
    })
}
