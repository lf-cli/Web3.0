import http from '@/utils/http/axios'
import { ceshiModel } from './model/ceshiModel'
export function ceshi(params?: any) {
  return http.get<ceshiModel>({
    url: '/stationList',
    params,
    options: {
      loading: true,
      showUploadProgress: true
    }
  })
}
