// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Andrea/Desktop/shfe/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Andrea/Desktop/shfe/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///C:/Users/Andrea/Desktop/shfe/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Andrea/Desktop/shfe/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue(), VueDevTools()],
  css: {
    preprocessorOptions: {
      scss: {
        // styles that needs to be shared with vue components
        additionalData: '@import "@csi/design-system-core/assets/default-style.scss"; @import "@/assets/colors.scss"; @import "@/assets/constants.scss";'
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "^/theme": {
        target: "https://dev-sh.csi.it",
        ws: true,
        changeOrigin: true,
        secure: false
      }
    },
    port: 3e3,
    fs: {
      allow: [".."]
    }
  },
  envDir: "environments"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbmRyZWFcXFxcRGVza3RvcFxcXFxzaGZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbmRyZWFcXFxcRGVza3RvcFxcXFxzaGZlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BbmRyZWEvRGVza3RvcC9zaGZlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpLCBWdWVEZXZUb29scygpXSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIC8vIHN0eWxlcyB0aGF0IG5lZWRzIHRvIGJlIHNoYXJlZCB3aXRoIHZ1ZSBjb21wb25lbnRzXHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6XHJcbiAgICAgICAgICAnQGltcG9ydCBcIkBjc2kvZGVzaWduLXN5c3RlbS1jb3JlL2Fzc2V0cy9kZWZhdWx0LXN0eWxlLnNjc3NcIjsgQGltcG9ydCBcIkAvYXNzZXRzL2NvbG9ycy5zY3NzXCI7IEBpbXBvcnQgXCJAL2Fzc2V0cy9jb25zdGFudHMuc2Nzc1wiOydcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcHJveHk6IHtcclxuICAgICAgJ14vdGhlbWUnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9kZXYtc2guY3NpLml0JyxcclxuICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIGZzOiB7XHJcbiAgICAgIGFsbG93OiBbJy4uJ11cclxuICAgIH1cclxuICB9LFxyXG4gIGVudkRpcjogJ2Vudmlyb25tZW50cydcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUixTQUFTLGVBQWUsV0FBVztBQUVuVCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFKaUosSUFBTSwyQ0FBMkM7QUFPMU4sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7QUFBQSxFQUM5QixLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUE7QUFBQSxRQUVKLGdCQUNFO0FBQUEsTUFDSjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLFFBQ0osY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixPQUFPLENBQUMsSUFBSTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQ1YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
