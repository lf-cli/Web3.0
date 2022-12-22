import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
const routes: RouteRecordRaw[] = [
  { path: '/:catchAll(.*)', component: () => import('@/views/404.vue') },
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'demo',
        component: () => import('@/views/demo.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
