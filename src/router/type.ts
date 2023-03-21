import { defineComponent } from 'vue'
export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface RouteMeta {
  // title
  title: string
  // icon on tab
  icon?: string
  role?: string[] // 权限这块等真正需要了再设计
}
export interface RouteRecordRaw {
  name: string
  path: string
  redirect?: string
  meta: RouteMeta
  component?: Component | string
  children?: RouteRecordRaw[]
  alwaysShow?: boolean
}
// 路由列表的格式，将列表组装成路由
export interface RouterList {
  name: string
  path: string
  children?: RouterList[]
  redirect?: string
  component: string | Component
  hidden?: true | false
  meta: RouteMeta
}
