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

export interface DynamicFilterInfo {
  field?: string | null
  operator?: DynamicFilterOperator
  value?: any
  logic?: DynamicFilterLogic
  filters?: DynamicFilterInfo[] | null
}

/** @format int32 */
export type DynamicFilterLogic = 0 | 1
export const nvDynamicFilterLogic = { And: '0', Or: '1' }
export const vnDynamicFilterLogic = { '0': 'And', '1': 'Or' }

/** @format int32 */
export type DynamicFilterOperator = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18
export const nvDynamicFilterOperator = {
  Contains: '0',
  StartsWith: '1',
  EndsWith: '2',
  NotContains: '3',
  NotStartsWith: '4',
  NotEndsWith: '5',
  Equal: '6',
  Equals: '7',
  Eq: '8',
  NotEqual: '9',
  GreaterThan: '10',
  GreaterThanOrEqual: '11',
  LessThan: '12',
  LessThanOrEqual: '13',
  Range: '14',
  DateRange: '15',
  Any: '16',
  NotAny: '17',
  Custom: '18',
}
export const vnDynamicFilterOperator = {
  '0': 'Contains',
  '1': 'StartsWith',
  '2': 'EndsWith',
  '3': 'NotContains',
  '4': 'NotStartsWith',
  '5': 'NotEndsWith',
  '6': 'Equal',
  '7': 'Equals',
  '8': 'Eq',
  '9': 'NotEqual',
  '10': 'GreaterThan',
  '11': 'GreaterThanOrEqual',
  '12': 'LessThan',
  '13': 'LessThanOrEqual',
  '14': 'Range',
  '15': 'DateRange',
  '16': 'Any',
  '17': 'NotAny',
  '18': 'Custom',
}

export interface GameTaskAddInput {
  /** @format int32 */
  level?: number
  name?: string | null
  /** @format int64 */
  audioId?: number
  /** @format int64 */
  videoId?: number
  /** @format int64 */
  pictureId?: number
  /** @format int64 */
  groupId?: number
  referenceAnswer?: string | null
  /** @format int64 */
  referenceAnswerVoidId?: number
}

export interface GameTaskGetOutput {
  /** @format int32 */
  level?: number
  name?: string | null
  /** @format int64 */
  audioId?: number
  /** @format int64 */
  videoId?: number
  /** @format int64 */
  pictureId?: number
  /** @format int64 */
  groupId?: number
  referenceAnswer?: string | null
  /** @format int64 */
  referenceAnswerVoidId?: number
  /** @format int64 */
  id: number
}

export interface GameTaskGetPageDto {
  name?: string | null
}

export interface GameTaskListOutput {
  id?: string | null
  /** @format int32 */
  level?: number
  name?: string | null
  /** @format int64 */
  audioId?: number
  /** @format int64 */
  videoId?: number
  /** @format int64 */
  pictureId?: number
  /** @format int64 */
  groupId?: number
  referenceAnswer?: string | null
  /** @format int64 */
  referenceAnswerVoidId?: number
}

export interface GameTaskUpdateInput {
  /** @format int32 */
  level?: number
  name?: string | null
  /** @format int64 */
  audioId?: number
  /** @format int64 */
  videoId?: number
  /** @format int64 */
  pictureId?: number
  /** @format int64 */
  groupId?: number
  referenceAnswer?: string | null
  /** @format int64 */
  referenceAnswerVoidId?: number
  /** @format int64 */
  id: number
}

/** 分页信息输入 */
export interface PageInputGameTaskGetPageDto {
  /**
   * 当前页标
   * @format int32
   */
  currentPage?: number
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number
  dynamicFilter?: DynamicFilterInfo
  filter?: GameTaskGetPageDto
}

/** 分页信息输出 */
export interface PageOutputGameTaskListOutput {
  /**
   * 数据总数
   * @format int64
   */
  total?: number
  /** 数据 */
  list?: GameTaskListOutput[] | null
}

/** 结果输出 */
export interface ResultOutputGameTaskGetOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  data?: GameTaskGetOutput
}

/** 结果输出 */
export interface ResultOutputPageOutputGameTaskListOutput {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 分页信息输出 */
  data?: PageOutputGameTaskListOutput
}

/** 结果输出 */
export interface ResultOutputString {
  /** 是否成功标记 */
  success?: boolean
  /** 编码 */
  code?: string | null
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: string | null
}
