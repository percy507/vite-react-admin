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
        avatar: '/imgs/avatar.jpg',
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

export function requestSendSMS(params) {
  console.log('requestSendSMS', params);
  return Promise.resolve();
}

export function requestLogout() {
  return Promise.resolve();
}
