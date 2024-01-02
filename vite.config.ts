import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import px2rem from 'postcss-pxtorem';
import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';

import uiConfig from './src/mobile/ui.config.json';

// 打包时，生成一些基础的构建信息到 build.json
if (process.env.VITE_MODE !== 'local') {
  fs.writeFileSync(
    path.join(__dirname, './public/build.json'),
    JSON.stringify({ version: `${Date.now()}` }),
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 4014,
  },
  define: {
    VITE_MODE: `"${process.env.VITE_MODE}"`,
  },
  plugins: [
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    react(),
    // 按需加载样式文件
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        px2rem({
          rootValue: uiConfig.width / uiConfig.base_num,
          unitPrecision: 5,
          propList: ['*'],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 1,
          // 仅为src/mobile及移动端相关组件中的 px 转化为 rem
          exclude: (file) => {
            let patterns = ['/antd-mobile/', '/src/mobile/'];
            return patterns.find((el) => file.includes(el)) == null;
          },
        }),
      ],
    },
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[local]_[hash:base64:6]',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#3e63dd' },
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2015',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (/node_modules.+?(react|react-router-dom|react-dom|qss)/.test(id)) {
            return 'vendor';
          } else if (id.includes('src/utils/config.ts')) {
            return 'a_config';
          }
        },
      },
    },
  },
});
