import { lazy } from 'react';

import { lr } from '@/components/RouteUtils';
import { SYSTEM_AUTH } from '@/utils/enum_auth';

import type { ConfitItem } from './index';

export const systemConfig: ConfitItem = {
  menu: {
    label: '系统管理',
    icon: 'icon-settings-5-fill',
    auth: SYSTEM_AUTH.系统管理,
    children: [
      { label: '用户管理', link: '/l1/system/user' },
      { label: '角色管理', link: '/l1/system/role', auth: SYSTEM_AUTH.角色管理 },
    ],
  },
  route: {
    path: 'system',
    children: [
      {
        path: 'user',
        element: lr(lazy(() => import('@/pages/layout1Pages/system/user'))),
      },
      {
        path: 'role',
        children: [
          {
            index: true,
            element: lr(
              lazy(() => import('@/pages/layout1Pages/system/role')),
              SYSTEM_AUTH.角色管理,
            ),
          },
          {
            path: 'add',
            element: lr(
              lazy(() => import('@/pages/layout1Pages/system/role/add')),
              SYSTEM_AUTH.角色_新增,
            ),
          },
          {
            path: 'edit/:id',
            element: lr(
              lazy(() => import('@/pages/layout1Pages/system/role/add')),
              SYSTEM_AUTH.角色_编辑,
            ),
          },
        ],
      },
    ],
  },
};
