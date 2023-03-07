import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, ConfigEnv } from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import compression from 'vite-plugin-compression'
import { loadEnv } from '/@/utils/vite'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

import vueJsx from '@vitejs/plugin-vue-jsx'
//svg
import { createSvg } from './src/icons/index'
const alias: Record<string, string> = {
  '/@': pathResolve('./src/'),
  'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
}

const viteConfig = defineConfig(({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode)
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      compression({
        deleteOriginFile: false,
      }),// svg 引入
      createSvg('./src/icons/svg/')
    ],
    root: process.cwd(),
    resolve: { alias },
    base: command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
    hmr: true,
    optimizeDeps: {
      include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT as unknown as number,
      open: env.VITE_OPEN,
      proxy: {
        '/gitee': {
          target: 'https://gitee.com',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gitee/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
          compact: true,
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            echarts: ['echarts'],
          },
        },
      },
    },
    css: { preprocessorOptions: { css: { charset: false } } },
    define: {
      __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
      __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
      __VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  }
})

export default viteConfig
