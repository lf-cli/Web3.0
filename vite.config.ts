import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import { wrapperEnv } from './src/utils/getEnv'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  console.log(viteEnv)

  return {
    plugins: [
      vue(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
      }),
      // 自动引入element组件
      AutoImport({
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
    ],
    esbuild: {
      // 移除生产环境下的console
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    server: {
      port: viteEnv.VITE_PORT,
      host: '0.0.0.0',
      open: viteEnv.VITE_OPEN,
      proxy: {
        '/api': {
          target: 'http://prd9.hbjk.com.cn:8080/v4/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 每个页面都无需再引入即可直接使用两个文件中的变量和方法
          additionalData: `
            @import "src/assets/styles/mixin.scss";
            @import "src/assets/styles/variables.scss";`,
        },
      },
    },
  }
})
