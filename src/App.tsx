import { useAtomValue } from 'jotai/utils';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { isLoginAtom } from '@/store/user';
import { loadDC, navigateTo } from '@/utils/dom';

export default function App() {
  const isLogin = useAtomValue(isLoginAtom);

  // 异常上报
  const reportFrontendErr = () => {};

  useEffect(() => {
    reportFrontendErr();
  }, []);

  return (
    <Routes>
      <Route
        path="/*"
        element={isLogin ? loadDC(import('@/layouts/BasicLayout')) : navigateTo('/login')}
      />
      <Route path="/login" element={loadDC(import('@/pages/Login'))} />
    </Routes>
  );
}
