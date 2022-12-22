import router from '../router/index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
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
