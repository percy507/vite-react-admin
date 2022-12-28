export function requestLogin(params) {
  console.log('login params', params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`token____${Math.random()}`);
    }, 1500);
  });
}

export function requestUserInfo() {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        name: '韩立',
        avatar: '/imgs/avatar.jpg',
        permission: [
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
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

export function requestLogout() {
  return Promise.resolve();
}
