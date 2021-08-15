export function requestLogin() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`token____${Math.random()}`);
    }, 1500);
  });
}
