import { atom, selector } from 'recoil';

export const atomUserInfo = atom<any>({
  key: 'userInfo',
  default: {},
});

export const selectorUserPermissions = selector<string[]>({
  key: 'userPermissions',
  get: ({ get }) => {
    return get(atomUserInfo).permissions || [];
  },
});
