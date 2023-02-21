import http from '@/utils/http/axios'

export function ceshi(params: any) {
  return http.get({
    url: '/stationList1',
    params,
    options: {
      loading: true,
      token: 'aaaa',
      showUploadProgress: true
    }
  })
}
export function ceshi1() {
  return http.get({
    url: '/stationList',
    params: {
      b: 1
    },
    options: {
      token: 'bbb'
    }
  })
}
