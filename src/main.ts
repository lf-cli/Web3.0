import { createApp } from 'vue'
import './assets/styles/index.scss'
import Router from './router/index'
import { setupStore } from './store/index'
import App from './App.vue'
async function bootstrap() {
  const app = createApp(App)

  app.use(Router)

  setupStore(app)

  app.mount('#app')
}
bootstrap()