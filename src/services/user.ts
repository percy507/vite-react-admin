export function requestLogin(params) {
  console.log('login params', params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`token____${Math.random()}`);
    }, 1500);
  });
}

export function requestUserInfo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '韩立',
        avatar: 'https://s1.ax1x.com/2022/07/13/jRtMfU.jpg',
        permissions: [
          'l1',
          'l2',
          'l1_testMenu1',
          'l1_testMenu1_1',
          'l1_testMenu1_2',
          'l1_testMenu3',
          'DemoAuthorized__111',
        ],
      });
    }, 1000);
  });
}
