import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routers'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }) // 如果某个页面需要滚动，可以在meta信息里添加
})

export default router
