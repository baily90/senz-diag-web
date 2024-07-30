import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://sit-diagnosis-doctor.weicha88.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, '/api')
      },
      '/gdiag-pc': {
        target: 'https://sit-api.weicha88.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/gdiag-pc/, '/gdiag-pc')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'build'
  }
})
