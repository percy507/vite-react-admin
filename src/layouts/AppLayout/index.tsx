import { Modal } from 'antd';
import { lazy, useCallback, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { lr, navigateTo, RouteListener } from '@/components/RouteUtils';
import { getAuthToken, ls } from '@/utils/storage';

import { routeList } from './config';

export default function AppLayout() {
  const isLogin = !!getAuthToken();

  // 异常上报
  const reportFrontendErr = () => {};

  useEffect(() => {
    reportFrontendErr();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Wrapper />}>
        <Route
          path="/"
          element={isLogin ? lr(lazy(() => import('./layout'))) : navigateTo('/login')}>
          {routeList.map((el, index) => {
            // @ts-ignore
            return <Route key={index} {...el} />;
          })}
        </Route>
        <Route path="/mobile/*" element={lr(lazy(() => import('@/mobile')))} />
        <Route path="/login" element={lr(lazy(() => import('@/pages/login')))} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

function Wrapper() {
  // 用于部署代码后，如果用户未刷新页面，那么在用户切换路由时，js等资源会404找不到
  // 所以需要弹窗引导用户刷新页面
  const onRouteChange = useCallback(() => {
    if (VITE_MODE === 'local') return;
    fetch(`/build.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((res) => {
        try {
          let data = res || {},
            lastVersion = ls.get('build_version');
          if (lastVersion == null) return ls.set('build_version', data.version);
          if (data.version === lastVersion) return;
          ls.set('build_version', data.version);
          Modal.confirm({
            title: '系统已升级，请刷新页面后继续访问！',
            okText: '刷新页面',
            onOk: () => location.reload(),
            cancelButtonProps: { style: { display: 'none' } },
          });
        } catch (e) {
          console.error(e);
        }
      });
  }, []);

  return (
    <>
      <RouteListener onChange={onRouteChange} />
      <Outlet />
    </>
  );
}
