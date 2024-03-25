import 'normalize.css';
import 'moment/dist/locale/zh-cn';
import './styles/global.less';

import { inject } from '@vercel/analytics';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'jotai';
import moment from 'moment';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import AppLayout from '@/layouts/AppLayout';

inject();

moment.locale('zh-cn');

// rewrite the transition data
zhCN.DatePicker!.lang.rangePlaceholder = ['开始时间', '结束时间'];

createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <ErrorBoundary>
      <Provider>
        <AppLayout />
      </Provider>
    </ErrorBoundary>
  </ConfigProvider>,
);
