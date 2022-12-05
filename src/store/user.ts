import { atom } from 'jotai';

interface UserInfo {
  permission: string[];
  [key: string]: any;
}

export const userInfoAtom = atom<UserInfo>({
  permission: [],
});

export const userPermissionAtom = atom<string[]>((get) => {
  return get(userInfoAtom).permission || [];
});
