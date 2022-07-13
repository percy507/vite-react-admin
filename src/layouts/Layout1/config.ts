import type { RouteObject } from 'react-router-dom';

import type { useHasPermission } from '@/components/Authorized';
import type { MenuModel } from '@/components/MenuList';
import { loadDC, navigateTo } from '@/utils/dom';

export const menuList: MenuModel[] = [
  {
    label: '组件列表',
    icon: 'icon-layout-masonry-fill',
    link: '/l1/cplist',
  },
  {
    label: '技术调研集合',
    icon: 'icon-truck-fill',
    children: [
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

export const routeList: (RouteObject & { auth?: string })[] = [
  {
    index: true,
    element: navigateTo('cplist'),
  },
  {
    path: 'cplist',
    element: loadDC(import('@/pages/layout1Pages/componentList')),
  },
  {
    path: 'research',
    children: [
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

export const getRouteList = (hasPermission: ReturnType<typeof useHasPermission>) => {
  return routeList.filter((route) => hasPermission(route.auth));
};
