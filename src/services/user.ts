import request from '@/utils/request';

export function requestUserInfo() {
  request.get('/userInfo');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '张三丰',
        permissions: [
          'l1',
          'l2',
          'l1_testMenu1',
          'l1_testMenu1_1',
          'l1_testMenu1_2',
          'l1_testMenu3',
        ],
      });
    }, 2000);
  });
}
