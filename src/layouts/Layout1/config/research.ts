import { lazy } from 'react';

import { lr } from '@/components/RouteUtils';

import type { ConfitItem } from './index';

export const researchConfig: ConfitItem = {
  menu: {
    label: '技术调研集合',
    icon: 'icon-truck-fill',
    children: [
      { label: '未分类npm包', link: '/l1/research/mess' },
      { label: '状态管理(组件通信)', link: '/l1/research/state' },
      { label: '试用 maptalks', link: '/l1/research/maptalks' },
      { label: '试用 lokijs', link: '/l1/research/lokijs' },
      { label: '试用 tanstack 组件集', link: '/l1/research/tanstack' },
    ],
  },
  route: {
    path: 'research',
    children: [
      {
        path: 'mess',
        element: lr(lazy(() => import('@/pages/layout1Pages/research/mess'))),
      },
      {
        path: 'state',
        element: lr(lazy(() => import('@/pages/layout1Pages/research/state'))),
      },
      {
        path: 'maptalks',
        element: lr(lazy(() => import('@/pages/layout1Pages/research/maptalks'))),
      },
      {
        path: 'lokijs',
        element: lr(lazy(() => import('@/pages/layout1Pages/research/lokijs'))),
      },
      {
        path: 'tanstack',
        element: lr(lazy(() => import('@/pages/layout1Pages/research/tanstack'))),
      },
    ],
  },
};
