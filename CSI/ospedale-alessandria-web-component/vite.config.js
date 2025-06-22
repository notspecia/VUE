import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // https://vitejs.dev/config/
  return defineConfig({
    define: {
      'process.env': env
    },
    plugins: [
      vue({
        customElement: true,
        template: {
          compilerOptions: {
            // treat all tags with a dash as custom elements
            isCustomElement: (tag) => tag.includes('-')
          }
        }
      })
    ],
    server: {
      port: 3000
    },
    css: {
      preprocessorOptions: {
        scss: {
          // styles that needs to be shared with vue components
          quiteDeps: true,
          additionalData: '@import "@csi/design-system-core/assets/default-style.scss"; @import "@/assets/main.scss";'
        }
      }
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'build',
        fileName: 'build'
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
     envDir: 'environments'
  })
}
