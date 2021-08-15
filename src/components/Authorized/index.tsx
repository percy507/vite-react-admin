import React from 'react';
import { useRecoilValue } from 'recoil';

import { selectorUserPermissions } from '@/recoil/user';

type AuthorizedProps = {
  authcode?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

// 判断当前用户是否拥有指定的权限
export function hasPermission(authcode: string = '') {
  const permissions = useRecoilValue(selectorUserPermissions);
  return permissions.includes(authcode);
}

export default function Authorized(props: AuthorizedProps) {
  const { authcode = '', fallback = null, children } = props;
  const permissions = useRecoilValue(selectorUserPermissions);
  const isAuth = authcode === '' ? true : permissions.includes(authcode);

  return <>{isAuth ? children : fallback}</>;
}
