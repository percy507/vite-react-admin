import { atom } from 'jotai';

interface UserInfo {
  permission: string[];
  [key: string]: any;
}

export const atomUserInfo = atom<UserInfo>({
  permission: [],
});

export const atomUserPermission = atom<string[]>((get) => {
  return get(atomUserInfo).permission || [];
});
