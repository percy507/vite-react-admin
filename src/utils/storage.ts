export const ls = {
  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  },
  set(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val));
  },
};

export function getIsLogin() {
  return !!getAuthToken();
}

export function getAuthToken() {
  return ls.get('auth_token');
}

export function setAuthToken(token: string) {
  ls.set('auth_token', token);
}
