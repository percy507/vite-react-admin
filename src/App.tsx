import React, { useEffect } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Exception from '@/components/Exception';
import BasicLayout from '@/layouts/BasicLayout';
import LoginPage from '@/pages/Login';
import { getAuthToken } from '@/utils/token';

function App() {
  const isLogin = !!getAuthToken();

  // 异常上报
  const reportFrontendErr = () => {};

  useEffect(() => {
    reportFrontendErr();
  }, []);

  return (
    <RecoilRoot>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route
            render={({ location }) => {
              if (isLogin) {
                return <Route location={location} component={BasicLayout} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route render={() => <Exception type={404} />} />
        </Switch>
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
