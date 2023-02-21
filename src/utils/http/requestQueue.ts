import { AxiosPromise } from 'axios'

export type RequestQueue = (() => AxiosPromise)[]

/**
 * 控制并发请求的方法
 *
 * @param requests 一组返回 axios promise 的请求函数
 * @param maxConcurrent 最大并发请求数
 * @returns 返回一个 Promise，该 Promise 在所有请求完成后被解析
 */
export async function concurrentRequest(
  requests: RequestQueue,
  maxConcurrent: number
): Promise<any> {
  const results = []
  let executing = 0
  let i = 0

  while (i < requests.length) {
    while (executing < maxConcurrent && i < requests.length) {
      // 执行请求
      const request = requests[i++]
      results.push(await request())
      executing++
    }

    // 等待一批请求执行完成
    const res = await Promise.race(results)
    executing--

    // 删除已完成的请求
    const index = results.indexOf(res)
    if (index > -1) {
      results.splice(index, 1)
    }
  }

  // 等待所有请求完成
  await Promise.all(results)

  return results
}

/* 
  // 使用方法
const requests: RequestQueue = [
  () => get({url: '/api/a'}),
  () => get({url: '/api/b',params:{time:'222'}}),
  () => get({url: '/api/c'}),
  () => get({url: '/api/d'})),
  // 更多请求函数...
]

concurrentRequest(requests, 2).then((results) => {
  console.log('所有请求完成', results)
})
 */
