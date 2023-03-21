import { createApp } from 'vue'
import './assets/styles/index.scss'
import Router from './router/index'
import { setupStore } from './store/index'
import App from './App.vue'
import 'virtual:svg-icons-register' // svgIcon
import 'element-plus/dist/index.css'
import './utils/permission'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)

  app.use(Router)

  app.mount('#app')
}
bootstrap()
