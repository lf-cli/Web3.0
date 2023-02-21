import { defineStore } from 'pinia'
interface progressInfo {
  loaded: number
  total: number
  per?: number
}

export const useProgress = defineStore('app-progress', {
  state: (): progressInfo => ({
    loaded: 0,
    total: 0,
    per: 0
  }),
  getters: {},
  actions: {
    updateInfo(info: progressInfo) {
      const { loaded, total } = info
      this.loaded = loaded
      this.total = total
      this.per = Number((loaded / total).toFixed(2))
    }
  }
})
