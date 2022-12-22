import { defineStore } from 'pinia'
interface userInfo {
  userInfo: Object
  studentId?: string
}

export const useUserStore = defineStore('app-user', {
  state: (): userInfo => ({
    userInfo: {},
  }),
  getters: {},
  actions: {
    getUserInfo() {},
  },
})
