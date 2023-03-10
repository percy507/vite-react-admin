import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { lazy, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import VConsole from 'vconsole';

import { lr } from '@/components/RouteUtils';
import { debounce } from '@/utils';

import uiConfig from './ui.config.json';

// 在开发环境和测试环境下打开控制台工具;
if (['local', 'dev', 'test'].includes(VITE_MODE)) {
  new VConsole();
}

// 设置 html 元素的 fontSize
const setupFontSize = () => {
  const htmlEle = document.documentElement;
  htmlEle.style.fontSize = `${(htmlEle.clientWidth / uiConfig.base_num).toFixed(3)}px`;
  window.__adaptorWidth = htmlEle.clientWidth;
};

export default function MobileLayout() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const resizeHandler = debounce(() => (setupFontSize(), forceUpdate()), 200);
    setupFontSize();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="list" element={lr(lazy(() => import('./pages/list')))} />
      </Routes>
    </ConfigProvider>
  );
}
