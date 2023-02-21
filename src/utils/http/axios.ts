import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType
} from 'axios'
import { checkStatus } from './checkStatus'
import { AxiosCanceler } from './axiosCancel'
import router from '@/router'
import { useProgress } from '@/store/modules/uploadProgress'
import { ElLoading } from 'element-plus'
// import qs from 'qs'

import { getToken, User } from '../user'
import { RequestOptions, Result, requesrParams } from '../../types/axios'

interface myAxiosRequestConfig extends AxiosRequestConfig {
  headers?: any
}

const baseConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  responseType: 'json' as ResponseType
}
class RequestHttp {
  public axiosInstance: AxiosInstance
  public axiosConfig: any // 全局参数
  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)
    this.setupInterceptors()
  }

  //设置拦截器
  private setupInterceptors() {
    const axiosCancel = new AxiosCanceler()
    this.axiosInstance.interceptors.request.use(
      (config: myAxiosRequestConfig) => {
        config.headers[User.TOKEN] = this.axiosConfig.token || getToken() // 加请求头
        if (this.axiosConfig.showUploadProgress) {
          const useUploadProgress = useProgress()
          config.onUploadProgress = (e) => {
            useUploadProgress.updateInfo({
              loaded: e.loaded,
              total: e.total || 100
            })
          }
        }
        if (!this.axiosConfig.allowRepeatRequest) {
          // 取消重复请求
          axiosCancel.removePending(config)
        }
        if (this.axiosConfig.cancelExitRequest) {
          // 取消所有请求
          axiosCancel.removeAllPending()
        }
        axiosCancel.addPending(config)
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 请求响应，可以在这里做一些公共数据的处理
        const { data } = response
        response && axiosCancel.removePending(response.config)
        return data
      },
      async (error: AxiosError) => {
        // 请求失败回调
        error && error.config && axiosCancel.removePending(error?.config)
        const { response } = error
        // error && axiosCancel.removePending(error)
        if (error.message.indexOf('timeout') !== -1)
          ElMessage.error('请求超时！请您稍后重试')
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status)
        if (!window.navigator.onLine) router.replace('/404')
        return Promise.reject(error)
      }
    )
  }
  // 统一入口
  public request<T>(
    url: string,
    method: string,
    params?: object,
    options?: RequestOptions
  ): Promise<Result<T>> {
    let loadingInstance: any
    if (options?.loading) {
      loadingInstance = ElLoading.service({
        text: '正在加载中...',
        background: 'rgba(0,0,0,0.6)'
      })
    }
    if (options) {
      // 如果该请求有定制化需求，那就重新实例化axios
      const commonConfig = JSON.parse(JSON.stringify(baseConfig)) // 原始公共参数，防止被污染
      this.axiosConfig = Object.assign(commonConfig, options)
      this.axiosInstance = axios.create(this.axiosConfig)
      this.setupInterceptors()
    }

    return new Promise((resolve, reject) => {
      let data
      if (method === 'get') {
        data = { params }
      } else {
        data = { data: params }
      }
      this.axiosInstance({
        url,
        method,
        ...data
      })
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<Result<T>>)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          if (loadingInstance) {
            loadingInstance.close()
          }
        })
    })
  }

  // 泛型解析：如果使用get方法不传入范型类型，就默认返回Result结构，如果传入类型，那该类型会束缚Result中data的返回类型，可以做到灵活可配

  public get<T>(requestParams: requesrParams): Promise<Result<T>> {
    const { url, params, options } = requestParams
    return this.request(url, 'get', params, options)
  }
  public post<T>(requesrParams: requesrParams): Promise<Result<T>> {
    const { url, params, options } = requesrParams
    return this.request(url, 'post', params, options)
  }
  public put<T>(requesrParams: requesrParams): Promise<Result<T>> {
    const { url, params, options } = requesrParams
    return this.request(url, 'put', params, options)
  }
  public delete<T>(requesrParams: requesrParams): Promise<Result<T>> {
    const { url, params, options } = requesrParams
    return this.request(url, 'delete', params, options)
  }
  public upload<T>(requesrParams: requesrParams): Promise<Result<T>> {
    const { url, params } = requesrParams
    return this.axiosInstance.post(url, params)
  }

  // upload

  // put

  // delete
}

export default new RequestHttp(baseConfig)
