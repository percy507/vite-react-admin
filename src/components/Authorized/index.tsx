import { useAtomValue } from 'jotai/utils';

import { userPermissionAtom } from '@/store/user';

type AuthorizedProps = {
  authcode?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

// 判断当前用户是否拥有指定的权限
export function useHasPermission() {
  const permissions = useAtomValue(userPermissionAtom);

  return (authcode?: string) => {
    if (!authcode) return true;
    return permissions.includes(authcode);
  };
}

export default function Authorized(props: AuthorizedProps) {
  const { authcode = '', fallback = null, children } = props;
  const permissions = useAtomValue(userPermissionAtom);
  const isAuth = authcode === '' ? true : permissions.includes(authcode);

  return <>{isAuth ? children : fallback}</>;
}
