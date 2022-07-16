import request from '@/utils/request';

const list = new Array(14).fill(0).map((_, index) => ({
  id: index,
  title: `标题${index}`,
  status: [1, 2, 2, 1, 0, 0, 1, 1, 0, 2, 0, 0, 1, 2][index],
  pub: index % 3 > 0 ? 1 : 0,
  publicTime: Date.now() - 71236400 * index,
}));

export function requestList(params) {
  // return request.postJson('/xxx/list', params);
  return Promise.resolve({
    params,
    data: {
      total: 14,
      records: list,
    },
  });
}

export function requestEdit(params) {
  return request.postJson('/xxx/edit', params);
}

export function requestDelete(id) {
  return request.get(`/xxx/delete?id=${id}`);
}

export function requestPublish(id, isPublish) {
  return request.get(`/xxx/update/display?id=${id}&display=${isPublish}`);
}

export function requestDetail(id) {
  return request.get(`/xxx/detail?id=${id}`);
}
