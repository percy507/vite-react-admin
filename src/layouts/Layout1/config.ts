import type { RouteObject } from 'react-router-dom';

import type { MenuModel } from '@/components/MenuList';
import { loadDC, navigateTo } from '@/utils/dom';

export const menuList: MenuModel[] = [
  {
    label: '测试菜单1',
    icon: 'icon-xianxingdongqing',
    children: [
      {
        label: '页面列表',
        link: '/l1/page1',
      },
      {
        label: '组件列表',
        link: '/l1/page2',
      },
    ],
  },
  {
    label: '各种测试集合',
    link: '/l1/page3',
    icon: 'icon-xianxingrongshu',
  },
  {
    label: '系统管理',
    icon: 'icon-anquan',
    children: [
      {
        label: '用户管理',
        link: '/l1/system/user',
      },
      {
        label: '角色管理',
        link: '/l1/system/role',
      },
    ],
  },
];

export const routeList: RouteObject[] = [
  {
    index: true,
    element: navigateTo('page1'),
  },
  {
    path: 'page1',
    element: loadDC(import('@/pages/Layout1Pages/Page1')),
  },
  {
    path: 'page2',
    element: loadDC(import('@/pages/Layout1Pages/Page2')),
  },
  {
    path: 'page3',
    element: loadDC(import('@/pages/Layout1Pages/Page3')),
  },
  {
    path: 'system/user',
    element: loadDC(import('@/pages/Layout1Pages/system/user')),
  },
  {
    path: 'system/role',
    element: loadDC(import('@/pages/Layout1Pages/system/role')),
  },
  {
    path: '404',
    element: loadDC(import('@/pages/404')),
  },
  { path: '*', element: navigateTo('/l1/404') },
];
