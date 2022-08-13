/** A tiny wrapper for localStorage */
export const ls = {
  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  },
  set(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  del(key: string) {
    localStorage.removeItem(key);
  },
};

const TOKEN_NAME = 'auth_token';

export function getAuthToken() {
  return ls.get(TOKEN_NAME);
}

export function setAuthToken(token: string) {
  ls.set(TOKEN_NAME, token);
}
