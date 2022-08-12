import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { lr, navigateTo } from '@/components/RouteUtils';
import { getAuthToken } from '@/utils/storage';

import { routeList } from './config';

export default function AppLayout() {
  const isLogin = !!getAuthToken();

  // 异常上报
  const reportFrontendErr = () => {};

  useEffect(() => {
    reportFrontendErr();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={isLogin ? lr(lazy(() => import('./layout'))) : navigateTo('/login')}>
        {routeList.map((el, index) => {
          // @ts-ignore
          return <Route key={index} {...el} />;
        })}
      </Route>
      <Route path="/login" element={lr(lazy(() => import('@/pages/login')))} />
    </Routes>
  );
}
