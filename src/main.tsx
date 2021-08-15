import 'normalize.css'; // A modern alternative to CSS resets
import './styles/global.less';

import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from '@/components/ErrorBoundary';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
