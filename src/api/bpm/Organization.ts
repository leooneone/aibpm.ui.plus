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

import { ResultOutputInt64, ResultOutputListEmployeeSelectDto, ResultOutputListInt64 } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class OrganizationApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags organization
   * @name GetEmployeesByRole
   * @request GET:/api/bpm/organization/get-employees-by-role
   * @secure
   */
  getEmployeesByRole = (
    query?: {
      /** @format int64 */
      roleId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListEmployeeSelectDto, any>({
      path: `/api/bpm/organization/get-employees-by-role`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags organization
   * @name GetEmployeesByOu
   * @request GET:/api/bpm/organization/get-employees-by-ou
   * @secure
   */
  getEmployeesByOu = (
    query?: {
      /** @format int64 */
      ouId?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListEmployeeSelectDto, any>({
      path: `/api/bpm/organization/get-employees-by-ou`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags organization
   * @name GetDirectorByOuType
   * @request GET:/api/bpm/organization/get-director-by-ou-type
   * @secure
   */
  getDirectorByOuType = (
    query?: {
      /** @format int64 */
      employeeId?: number
      /** @format int32 */
      OUType?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputInt64, any>({
      path: `/api/bpm/organization/get-director-by-ou-type`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags organization
   * @name GetSupervisors
   * @request GET:/api/bpm/organization/get-supervisors
   * @secure
   */
  getSupervisors = (
    query?: {
      /** @format int64 */
      employeeId?: number
      /** @format int32 */
      level?: number
      /** @format int32 */
      ouType?: number
      /** @default false */
      isDirectorIn?: boolean
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListInt64, any>({
      path: `/api/bpm/organization/get-supervisors`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags organization
   * @name GetDaalApprovers
   * @summary 根据公司DAAL权限 获取审批人
   * @request GET:/api/bpm/organization/get-daal-approvers
   * @secure
   */
  getDaalApprovers = (
    query?: {
      /** @format int64 */
      amount?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListInt64, any>({
      path: `/api/bpm/organization/get-daal-approvers`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags organization
   * @name GetSupervisorsByUnitType
   * @request GET:/api/bpm/organization/get-supervisors-by-unit-type
   * @secure
   */
  getSupervisorsByUnitType = (
    query?: {
      /** @format int64 */
      employeeId?: number
      /** @format int32 */
      ouType?: number
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListInt64, any>({
      path: `/api/bpm/organization/get-supervisors-by-unit-type`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
}
