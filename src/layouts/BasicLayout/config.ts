import type { RouteObject } from 'react-router-dom';

import type { MenuModel } from '@/components/MenuList';
import { loadDC, navigateTo } from '@/utils/dom';

export const menuList: MenuModel[] = [
  {
    label: '灵溪宗',
    link: '/l1',
    auth: 'l1',
  },
  {
    label: '血溪宗',
    link: '/l2',
    auth: 'l2',
  },
];

export const routeList: RouteObject[] = [
  {
    path: 'l1/*',
    element: loadDC(import('@/layouts/Layout1')),
  },
  {
    path: 'l2/*',
    element: loadDC(import('@/layouts/Layout2')),
  },
  { path: '*', element: navigateTo('l1') },
];
