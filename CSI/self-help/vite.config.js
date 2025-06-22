import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  css: {
    preprocessorOptions: {
      scss: {
        // styles that needs to be shared with vue components
        additionalData:
          '@import "@csi/design-system-core/assets/default-style.scss"; @import "@/assets/colors.scss"; @import "@/assets/constants.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '^/theme': {
        target: 'https://dev-sh.csi.it',
        ws: true,
        changeOrigin: true,
        secure: false
      }
    },
    port: 3000,
    fs: {
      allow: ['..']
    }
  },
  envDir: 'environments'
})
