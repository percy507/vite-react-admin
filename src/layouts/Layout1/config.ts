import type { RouteObject } from 'react-router-dom';

import type { MenuModel } from '@/components/MenuList';
import { loadDC, navigateTo } from '@/utils/dom';

export const menuList: MenuModel[] = [
  {
    label: '组件列表',
    icon: 'icon-layout-masonry-fill',
    link: '/l1/cplist',
  },
  {
    label: 'Demo合集',
    icon: 'icon-building-4-fill',
    children: [
      {
        label: '基础列表页',
        link: '/l1/demos/page1',
      },
      // {
      //   label: '弹窗列表页',
      //   link: '/l1/demos/page',
      // },
    ],
  },
  {
    label: '技术调研集合',
    icon: 'icon-truck-fill',
    children: [
      {
        label: '状态管理(组件通信)',
        link: '/l1/research/state',
      },
      {
        label: '试用 maptalks',
        link: '/l1/research/maptalks',
      },
      {
        label: '测试 useRequest',
        link: '/l1/research/request',
      },
    ],
  },
  {
    label: '系统管理',
    icon: 'icon-settings-5-fill',
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
    element: navigateTo('cplist'),
  },
  {
    path: 'cplist',
    element: loadDC(import('@/pages/layout1Pages/componentList')),
  },
  {
    path: 'demos',
    children: [
      {
        path: 'page1',
        children: [
          {
            index: true,
            element: loadDC(import('@/pages/layout1Pages/demos/page1')),
          },
          {
            path: 'add',
            element: loadDC(import('@/pages/layout1Pages/demos/page1/edit')),
          },
          {
            path: 'edit/:id',
            element: loadDC(import('@/pages/layout1Pages/demos/page1/edit')),
          },
          {
            path: 'detail/:id',
            element: loadDC(import('@/pages/layout1Pages/demos/page1/detail')),
          },
        ],
      },
    ],
  },
  {
    path: 'research',
    children: [
      {
        path: 'state',
        element: loadDC(import('@/pages/layout1Pages/research/state')),
      },
      {
        path: 'maptalks',
        element: loadDC(import('@/pages/layout1Pages/research/maptalks')),
      },
      {
        path: 'request',
        element: loadDC(import('@/pages/layout1Pages/research/request')),
      },
    ],
  },
  {
    path: 'system',
    children: [
      {
        path: 'user',
        element: loadDC(import('@/pages/layout1Pages/system/user')),
      },
      {
        path: 'role',
        element: loadDC(import('@/pages/layout1Pages/system/role')),
      },
    ],
  },
  {
    path: '404',
    element: loadDC(import('@/pages/404')),
  },
  { path: '*', element: navigateTo('/l1/404') },
];
