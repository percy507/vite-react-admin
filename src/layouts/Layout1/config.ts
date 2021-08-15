import { lazy } from 'react';

const Page1 = lazy(() => import('@/pages/Page1'));
const Page2 = lazy(() => import('@/pages/Page2'));
const Page3 = lazy(() => import('@/pages/Page3'));
const Page404 = lazy(() => import('@/pages/Page404'));

export const menuList: MenuModel[] = [
  {
    key: 'testMenu1',
    label: '测试菜单1',
    icon: 'icon-xianxingdongqing',
    authcode: 'l1_testMenu1',
    children: [
      {
        key: 'testMenu1_1',
        label: '页面列表',
        link: '/l1/testMenu1/testMenu1_1/list',
        authcode: 'l1_testMenu1_1',
      },
      {
        key: 'testMenu1_2',
        label: '组件demo',
        link: '/l1/testMenu1/testMenu1_2/list',
        authcode: 'l1_testMenu1_2',
      },
    ],
  },
  {
    key: 'testMenu2',
    label: '测试菜单2',
    icon: 'icon-xianxingrongshu',
    link: '/l1/testMenu2/list',
    authcode: 'l1_testMenu2',
  },
  {
    key: 'testMenu3',
    label: '测试菜单3',
    icon: 'icon-xianxingrongshu',
    link: '/l1/testMenu3/list',
    authcode: 'l1_testMenu3',
  },
];

export const routeList: RouteModel[] = [
  {
    path: '/l1/testMenu1/testMenu1_1/list',
    authcode: 'l1_testMenu1_1',
    component: Page1,
  },
  {
    path: '/l1/testMenu1/testMenu1_2/list',
    authcode: 'l1_testMenu1_2',
    component: Page2,
  },
  {
    path: '/l1/testMenu2/list',
    component: Page3,
    authcode: 'l1_testMenu2',
  },
  {
    path: '/l1/testMenu3/list',
    component: Page3,
    authcode: 'l1_testMenu3',
  },
  {
    component: Page404,
  },
];
