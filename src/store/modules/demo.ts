import { defineStore } from 'pinia'
interface demoInfo {
  count: number
}

export const userDemoStore = defineStore('app-demo', {
  state: (): demoInfo => ({
    count: 1
  }),
  getters: {},
  actions: {
    addCount() {
      this.count++
    }
  }
})
