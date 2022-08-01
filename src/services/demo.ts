// import request from '@/utils/request';

const fakeRequest = (res?: any, delay = 2000) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(res), delay);
  });
};

const list = new Array(14).fill(0).map((_, index) => ({
  id: index,
  title: `标题${index}`,
  cover: `https://source.unsplash.com/random?t=${index}`,
  status: [1, 2, 2, 1, 0, 0, 1, 1, 0, 2, 0, 0, 1, 2][index],
  pub: index % 3 > 0 ? 1 : 0,
  publicTime: Date.now() - 71236400 * index,
}));

export function requestList(params) {
  console.log('requestList params:', JSON.stringify(params, null, 2));
  return fakeRequest({ params, data: { total: 14, records: list } });
  // return request.postJson('/xxx/list', params);
}

export function requestEdit(params) {
  console.log('requestEdit params:', params);
  return fakeRequest();
  // return request.postJson('/xxx/edit', params);
}

export function requestDelete(id) {
  console.log('requestDelete', id);
  return fakeRequest();
  // return request.get(`/xxx/delete?id=${id}`);
}

export function requestPublish(id, isPublish) {
  console.log('requestPublish', id, isPublish);
  return fakeRequest();
  // return request.get(`/xxx/update/display?id=${id}&display=${isPublish}`);
}

export function requestDetail(id) {
  console.log('requestDetail', id);
  return fakeRequest({
    data: {
      xxx: {
        fileName: '天南二级炼药师资格证.png',
        fileUrl: 'https://source.unsplash.com/random',
      },
      status: 1,
      id: '321413241234',
    },
  });
  // return request.get(`/xxx/detail?id=${id}`);
}
