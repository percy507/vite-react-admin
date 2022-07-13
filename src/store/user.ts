import { atom } from 'jotai';

import { getIsLogin } from '@/utils/storage';

export const isLoginAtom = atom(getIsLogin());

export const userInfoAtom = atom<any>({
  key: 'userInfo',
  default: {},
});

export const userPermissionAtom = atom<string[]>((get) => {
  return get(userInfoAtom).permissions || [];
});
