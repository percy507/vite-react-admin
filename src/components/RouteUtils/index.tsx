import { Spin } from 'antd';
import { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import { Authorized } from '@/components/Authorized';
import { Page403 } from '@/pages/exception';

/**
 * 用单独的组件容纳 useRoutes 返回的内容。因为 useRoutes 会随着路由的变动而触发
 * 当前组件重新渲染，这样做可以最小化减少重新渲染的内容。
 */
export function RouteTree({ data }: { data: RouteObject[] }) {
  return useRoutes(data);
}

interface LazyRouteProps {
  auth?: string | string[];
  lazy: React.LazyExoticComponent<() => JSX.Element>;
}

export function LazyRoute(props: LazyRouteProps) {
  const { auth, lazy: LazyComponent } = props;

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spin spinning />
        </div>
      }>
      <Authorized auth={auth} fallback={<Page403 />}>
        <LazyComponent />
      </Authorized>
    </Suspense>
  );
}

/** Return a Navigate component for redirect. */
export const navigateTo = (path: string, replace: boolean = true) => {
  return <Navigate to={path} replace={replace} />;
};

/**
 * A wrapper for using LazyRoute component.
 * - `lr` means `lazy route`
 */
export const lr = (lazy: LazyRouteProps['lazy'], auth?: LazyRouteProps['auth']) => (
  <LazyRoute lazy={lazy} auth={auth} />
);
