import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';

import eslintPlugin from './plugins/vite-plugin-eslint';
import stylelintPlugin from './plugins/vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 4000,
  },
  define: {
    VITE_BUILD_MODE: `"${process.env.VITE_BUILD_MODE || 'dev'}"`,
  },
  plugins: [
    eslintPlugin(),
    stylelintPlugin(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    reactRefresh(),
    // 按需加载样式文件
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  css: {
    // css modules
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[local]_[hash:base64:6]',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#74c48c' },
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
        // 抽离公共模块代码
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom', 'qs'],
        },
      },
    },
  },
});
