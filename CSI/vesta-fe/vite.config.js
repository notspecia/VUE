import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  envDir: 'environments',
  server:
  {
    proxy:
    {
      '/bootstrapItalia':
      {
        target: 'https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bootstrapItalia/, ''),
      },
    },
  }
})
