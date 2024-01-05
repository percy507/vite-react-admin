import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { MenuModel } from '@/components/MenuList';
import { lr, navigateTo } from '@/components/RouteUtils';
import { Page404 } from '@/pages/exception';

import { demoConfig } from './demo';
import { researchConfig } from './research';
import { systemConfig } from './system';

export type ConfitItem = {
  menu: MenuModel;
  route: RouteObject;
};

export const menuList: MenuModel[] = [
  {
    label: '组件列表',
    icon: 'icon-layout-masonry-fill',
    link: '/l1/cplist',
  },
  demoConfig.menu,
  researchConfig.menu,
  systemConfig.menu,
];

export const routeList: RouteObject[] = [
  { index: true, element: navigateTo('cplist') },
  {
    path: 'cplist',
    element: lr(lazy(() => import('@/pages/layout1Pages/componentList'))),
  },
  demoConfig.route,
  researchConfig.route,
  systemConfig.route,
  { path: '404', element: Page404() },
  { path: '*', element: navigateTo('/l1/404') },
];
