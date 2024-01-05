import request from '@/utils/request';

const fakeRequest = (res?: any, delay = 2000) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(res), delay);
  });
};

export function requestRoleList(params) {
  return fakeRequest({
    params,
    data: { total: 1, records: [{ id: 1, roleName: 'admin', status: 'NORMAL' }] },
  });
}
export function requestRoleDetail(id) {
  return Promise.resolve<any>({ data: { id } });
}
export function requestAddRole(params) {
  return Promise.resolve({ params });
}
export function requestEditRole(params) {
  return Promise.resolve({ params });
}
export function requestDeleteRole(id) {
  return request.delete('/role', { id });
}

export function requestPermissionTree() {
  return Promise.resolve({
    data: [
      {
        id: '1',
        menuName: '系统管理',
        perms: 'system',
        parentId: '0',
        children: [
          {
            id: '3',
            menuName: '角色管理',
            perms: 'system:role',
            parentId: '1',
            children: [
              {
                id: '17',
                menuName: '角色-新增',
                perms: 'system:role:add',
                parentId: '3',
                children: [],
              },
              {
                id: '18',
                menuName: '角色-编辑',
                perms: 'system:role:edit',
                parentId: '3',
                children: [],
              },
              {
                id: '19',
                menuName: '角色-删除',
                perms: 'system:role:delete',
                parentId: '3',
                children: [],
              },
            ],
          },
          {
            id: '4',
            menuName: '用户管理',
            perms: 'system:user',
            parentId: '1',
            children: [
              {
                id: '21',
                menuName: '用户-新增',
                perms: 'system:user:add',
                parentId: '4',
                children: [],
              },
              {
                id: '22',
                menuName: '用户-修改',
                perms: 'system:user:edit',
                parentId: '4',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: '6',
        menuName: '模块111',
        perms: 'contract:info',
        parentId: '0',
        children: [
          {
            id: '26',
            menuName: '模块111-新增',
            perms: 'm111:add',
            parentId: '6',
            children: [],
          },
          {
            id: '27',
            menuName: '模块111-删除',
            perms: 'm111:delete',
            parentId: '6',
            children: [],
          },
          {
            id: '28',
            menuName: '模块111-查看',
            perms: 'm111:query',
            parentId: '6',
            children: [],
          },
        ],
      },
      {
        id: '7',
        menuName: '模块222',
        perms: 'project:info',
        parentId: '0',
        children: [
          {
            id: '29',
            menuName: '模块222-新增',
            perms: 'm222:add',
            parentId: '7',
            children: [],
          },
          {
            id: '30',
            menuName: '模块222-删除',
            perms: 'm222:delete',
            parentId: '7',
            children: [],
          },
          {
            id: '31',
            menuName: '模块222-查看',
            perms: 'm222:query',
            parentId: '7',
            children: [],
          },
        ],
      },
    ],
  });
}
