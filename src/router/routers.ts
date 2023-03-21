import { RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import { RouterList } from './type'

// 静态的路由就直接写死 不需要出现在路由表里
export const constantRoutes: RouteRecordRaw[] = [
  { path: '/:catchAll(.*)', component: () => import('@/views/404.vue') },
  {
    path: '/',
    name: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: ''
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'demo',
        component: () => import('@/views/demo.vue')
      }
    ]
  }
]

// 动态路由，如果不需要从后端获取，就写在本地，同时响应路由和菜单
export const asyncRoutes: RouterList[] = [
  {
    name: 'Home', // 路由名称
    path: '/home', // 路由地址
    component: 'Layout', // Layout容器
    children: [
      {
        name: 'Home',
        path: '',
        component: 'home/index',
        meta: {
          title: '首页'
        }
      }
    ],
    meta: {
      title: '首页' // 导航名称
    }
  },
  {
    name: 'Water', // 路由名称
    path: '/water', // 路由地址
    component: 'Layout', // Layout容器
    children: [
      {
        name: 'water',
        path: '',
        component: 'water/index',
        meta: {
          title: '水环境'
        }
      }
    ],
    meta: {
      title: '水环境' // 导航名称
    }
  },
  {
    name: 'Air',
    path: '/air',
    component: 'Layout',
    redirect: '/air/onemap',
    children: [
      {
        name: 'AirOneMap',
        path: 'onemap',
        component: 'airView/oneMap/index',
        meta: {
          title: '大气一张图'
        }
      },
      {
        name: 'Lampblack',
        path: 'lampblack',
        component: 'airView/lampblack/index',
        meta: {
          title: '黑烟车'
        }
      }
    ],
    meta: {
      title: '大气视图'
    }
  }
]
