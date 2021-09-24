import request from '@/utils/request';

// HTTP 异常
export function requestHttpError() {
  return request.get('/xxx/404');
}

// 业务异常
export function requestBusinessError() {
  return request.get('/article/detail?id=xxx');
}

// 业务成功1
export function requestSuccess1() {
  return request.get('/article/detail?id=18c115d8-37df-4422-88c5-6b031eb19109');
}

// 业务成功2
export function requestSuccess2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          name: 'Jone',
          age: 33,
          www: false,
        },
        message: 'success',
      });
    }, 5000);
  });
}
