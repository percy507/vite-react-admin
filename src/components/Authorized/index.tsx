import { useAtomValue } from 'jotai';

import { atomUserPermission } from '@/store/app';

// 是否关闭所有权限
const cancelAuth = false;

/**
 * [react-hook] 返回一个函数，用于判断当前用户是否拥有指定的单个权限或
 * 拥有指定权限集合中的某个权限
 */
export function useHasPermission() {
  const permissions = useAtomValue(atomUserPermission);
  return (auth?: string | string[]) => {
    if (cancelAuth) return true;
    if (!auth) return true;
    if (typeof auth === 'string') return permissions.includes(auth);
    return !!auth.find((el) => permissions.includes(el));
  };
}

export type HasPermission = ReturnType<typeof useHasPermission>;

interface AuthorizedProps {
  auth?: string | string[];
  /** 该字段表示没有权限时展示的内容，默认为 null */
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * 根据权限，条件式渲染组件
 */
export function Authorized(props: AuthorizedProps) {
  const hasPermission = useHasPermission();
  return <>{hasPermission(props.auth) ? props.children : props.fallback}</>;
}
