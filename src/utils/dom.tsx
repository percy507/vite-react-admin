import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import { Authorized } from '@/components/Authorized';
import { Exception } from '@/components/Exception';

export const SuspenseLoading = ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </Suspense>
  );
};

/**
 * Wrapper for lazy load component.
 * - `DC` ==> Dynamic Component
 */
export const loadDC = (c: Promise<{ default: React.FC<any> }>, auth?: string) => {
  const Element = lazy(() => c);
  return (
    <SuspenseLoading>
      <Authorized auth={auth} fallback={<Exception type={403} />}>
        <Element />
      </Authorized>
    </SuspenseLoading>
  );
};

/** Return a Navigate component for redirect. */
export const navigateTo = (path: string, replace: boolean = true) => {
  return <Navigate to={path} replace={replace} />;
};
