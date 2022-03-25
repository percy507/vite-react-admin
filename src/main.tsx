import 'normalize.css'; // A modern alternative to CSS resets
import './styles/global.less';

import { Provider } from 'jotai';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';

import App from './App';

ReactDOM.render(
  <ErrorBoundary>
    <Provider>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
