export {}

// 可以在这里对RouteMeta进行扩展
declare module 'vue-router' {
  interface RouteMeta {
    // title
    title: string
    // icon on tab
    icon?: string
  }
}
