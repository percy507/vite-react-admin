import { Spin } from 'antd';
import React, { Suspense, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Authorized from '@/components/Authorized';
import Exception from '@/components/Exception';

type RouteListProps = {
  list: RouteModel[];
};

export default function RouteList(props: RouteListProps) {
  const { list } = props;

  const Loading = useMemo(() => {
    return (
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
    );
  }, []);

  return (
    <Suspense fallback={Loading}>
      <Switch>
        {list.map((route, index) => {
          if (route.redirect !== undefined) {
            return <Redirect key={index} to={route.redirect} />;
          } else {
            const RouteComponent = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  return (
                    <Authorized
                      authcode={route.authcode}
                      fallback={<Exception type={403} />}>
                      <RouteComponent {...props} />
                    </Authorized>
                  );
                }}
              />
            );
          }
        })}
      </Switch>
    </Suspense>
  );
}
