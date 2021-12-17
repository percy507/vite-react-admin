import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { loadDC, navigateTo } from '@/utils/dom';
import { getAuthToken } from '@/utils/token';

export default function App() {
  const isLogin = !!getAuthToken();

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
