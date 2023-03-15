export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

/**
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {object} options 请求配置，针对当前本次请求；
 * @param loading 是否显示loading
 * @param token 是否使用其他token
 * @param showError 本次是否显示错误
 * @param ContentType post请求的请求头
 * @param baseUrl  项目中如果想使用mock数据，直接将baseUrl改为mock，单独配置mock的proxy即可
 * @param setCommonData  可以根据此字段来设置统一的请求参数
 * @param commonParams  配合setCommonParams设置通用params
 * @param cancelExitRequest  是否要取消正在进行的请求
 * @param allowRepeatRequest  是否允许重复请求
 * @param responseType  返回数据类型，当返回的是流文件，需要设置为 arraybuffer
 * @param showUploadProgress 展示进度
 */

export interface RequestOptions {
  loading?: Boolean
  token?: string
  showError?: Boolean
  ContentType?: string
  baseURL?: string
  setCommonData?: Boolean
  commonParams?: Object
  cancelExitRequest?: Boolean
  allowRepeatRequest?: Boolean
  responseType?: string
  showUploadProgress?: boolean
}

export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}
export interface requesrParams {
  url: string
  params?: object
  options?: RequestOptions
}
