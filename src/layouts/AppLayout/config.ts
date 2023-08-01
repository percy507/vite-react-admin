import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { MenuModel } from '@/components/MenuList';
import { lr, navigateTo } from '@/components/RouteUtils';

export const menuList: MenuModel[] = [
  { label: '灵溪宗', link: '/l1', auth: 'l1' },
  { label: '血溪宗(配色)', link: '/l2', auth: 'l2' },
];

export const routeList: RouteObject[] = [
  { index: true, element: navigateTo('l1') },
  {
    path: 'l1/*',
    element: lr(
      lazy(() => import('@/layouts/Layout1')),
      'l1',
    ),
  },
  {
    path: 'l2/*',
    element: lr(
      lazy(() => import('@/layouts/Layout2')),
      'l2',
    ),
  },
  { path: '*', element: navigateTo('l1') },
];
