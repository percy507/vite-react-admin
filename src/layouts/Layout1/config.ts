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
];

export const routeList: RouteObject[] = [
  {
    path: 'page1',
    element: loadDC(import('@/pages/Page1')),
  },
  {
    path: 'page2',
    element: loadDC(import('@/pages/Page2')),
  },
  {
    path: 'page3',
    element: loadDC(import('@/pages/Page3')),
  },
  { path: '*', element: navigateTo('page1') },
];
