import { defineStore } from 'pinia'
import { RouterList } from '../../router/type'
import Layout from '../../layout/index.vue'
import { store } from '../../store/index'
const modules = import.meta.glob('../../views/**/*.{vue,tsx}') // 将views下的vue文件汇总到modules里

interface PermissionInfo {
  routers: RouterList[]
}
export const usePermissionStore = defineStore('app-permission', {
  state: (): PermissionInfo => ({
    routers: []
  }),
  getters: {},
  actions: {
    setRoutes(routes: RouterList[]) {
      this.routers = routes
    }
  }
})
export const filterAsyncRouter = (routers: RouterList[]): RouterList[] => {
  // 遍历路由表，转换为组件对象
  return routers.filter((router) => {
    if (router.component) {
      if (router.component === 'Layout') {
        // Layout组件特殊处理
        router.component = Layout
      } else {
        router.component = modules[`../../views/${router.component}.vue`]
      }
    }
    if (router.children !== null && router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    } else {
      delete router['children']
      delete router['redirect']
    }
    return true
  })
}
// 在setup之外可以用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
