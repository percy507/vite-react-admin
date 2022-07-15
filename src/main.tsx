import 'normalize.css'; // A modern alternative to CSS resets
import './styles/global.less';
import 'moment/dist/locale/zh-cn';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'jotai';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';

import App from './App';

moment.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <ErrorBoundary>
        <Provider>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
      </ErrorBoundary>
    </ConfigProvider>
  </React.StrictMode>,
);
