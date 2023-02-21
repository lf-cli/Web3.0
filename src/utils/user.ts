export enum User {
  TOKEN = 'authorization',
}

export function getToken() {
  return window.localStorage.getItem(User.TOKEN)
}
export function removeToken() {
  window.localStorage.removeItem(User.TOKEN)
}
export function removeAll() {
  window.localStorage.removeAll()
}
