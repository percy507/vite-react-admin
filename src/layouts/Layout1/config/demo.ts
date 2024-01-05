import { lazy } from 'react';

import { lr } from '@/components/RouteUtils';

import type { ConfitItem } from './index';

export const demoConfig: ConfitItem = {
  menu: {
    label: 'Demo合集',
    icon: 'icon-building-4-fill',
    children: [
      { label: '基础列表页', link: '/l1/demos/page1' },
      // {
      //   label: '弹窗列表页',
      //   link: '/l1/demos/page',
      // },
      { label: '前往内置移动端页', link: '/mobile/list' },
    ],
  },
  route: {
    path: 'demos',
    children: [
      {
        path: 'page1',
        children: [
          {
            index: true,
            element: lr(lazy(() => import('@/pages/layout1Pages/demos/page1'))),
          },
          {
            path: 'add',
            element: lr(lazy(() => import('@/pages/layout1Pages/demos/page1/edit'))),
          },
          {
            path: 'edit/:id',
            element: lr(lazy(() => import('@/pages/layout1Pages/demos/page1/edit'))),
          },
          {
            path: 'detail/:id',
            element: lr(lazy(() => import('@/pages/layout1Pages/demos/page1/detail'))),
          },
        ],
      },
    ],
  },
};
