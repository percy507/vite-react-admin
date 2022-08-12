import { atom } from 'jotai';

export const userInfoAtom = atom<any>({
  key: 'userInfo',
  default: {},
});

export const userPermissionAtom = atom<string[]>((get) => {
  return get(userInfoAtom).permissions || [];
});
