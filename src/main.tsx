import 'normalize.css'; // A modern alternative to CSS resets
import './styles/global.less';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-cn';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Provider } from 'jotai';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';

import App from './App';

moment.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <ErrorBoundary>
      <Provider>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ErrorBoundary>
  </ConfigProvider>,
  document.getElementById('root'),
);
