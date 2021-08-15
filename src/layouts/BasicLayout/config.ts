import { lazy } from 'react';

const Layout1 = lazy(() => import('@/layouts/Layout1'));
const Layout2 = lazy(() => import('@/layouts/Layout2'));

export const menuList: MenuModel[] = [
  {
    key: 'l1',
    label: '主菜单111',
    link: '/l1/testMenu1/testMenu1_1/list',
    authcode: 'l1',
  },
  {
    key: 'l2',
    label: '主菜单222',
    link: '/l2/xxx/list',
    authcode: 'l2',
  },
];

export const routeList: RouteModel[] = [
  {
    path: '/l1',
    component: Layout1,
    authcode: 'l1',
  },
  {
    path: '/l2',
    component: Layout2,
    authcode: 'l2',
  },
  {
    redirect: '/l1',
  },
];
