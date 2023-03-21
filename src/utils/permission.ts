import router from '../router/index'
import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '../router/routers'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  usePermissionStoreWithOut,
  filterAsyncRouter
} from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })
const UsePermission = usePermissionStoreWithOut()

router.beforeEach((to, from, next) => {
  const routers = UsePermission.routers
  NProgress.start()
  if (!routers.length) {
    console.log('注册路由')
    // 如果store中没有路由，那就将动态的路由注册
    let rewriteRouters = filterAsyncRouter(asyncRoutes)
    UsePermission.setRoutes(rewriteRouters)
    rewriteRouters.forEach((item) => {
      router.addRoute(item as unknown as RouteRecordRaw)
    })
    next({ ...to, replace: true })
  } else {
    next()
  }
  // 拦截 baseUrl 路径

  // 1 判断是否有token
  // 1.1 判断是否有menus(动态路由。页面刷新后vuex会重置)
  // 1.1.1 重新获取动态路由表
  // 1.1.2 直接跳转 next()

  // 1.2 判断是否在重定向的白名单
  // 1.2.1 重定向到登录页
  // 1.2.2 留在当前页
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
