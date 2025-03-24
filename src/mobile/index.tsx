import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { lazy, useEffect, useLayoutEffect, useReducer } from 'react';
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

  useLayoutEffect(() => {
    setupFontSize();
  }, []);

  useEffect(() => {
    const resizeHandler = debounce(() => (setupFontSize(), forceUpdate()), 200);
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // 限制缩放
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name=viewport]');
    metaViewport?.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, user-scalable=no',
    );
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="list" element={lr(lazy(() => import('./pages/list')))} />
      </Routes>
    </ConfigProvider>
  );
}
