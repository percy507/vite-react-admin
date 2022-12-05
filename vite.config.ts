import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';

import { dependencies } from './package.json';

// 打包时，生成一些基础的构建信息到 build.json
if (process.env.VITE_MODE !== 'local') {
  fs.writeFileSync(
    path.join(__dirname, './public/build.json'),
    JSON.stringify({ version: `${Date.now()}` }),
  );
}

const vendorList = ['react', 'react-router-dom', 'react-dom'];

function renderChunks(deps: Record<string, string>) {
  let chunks: Record<string, string[]> = {};
  Object.keys(deps).forEach((key) => {
    if (vendorList.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
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
      plugins: [autoprefixer()],
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
      output: { manualChunks: { vendor: vendorList, ...renderChunks(dependencies) } },
    },
  },
});
