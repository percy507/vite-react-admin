import { Layout } from 'antd';
import React from 'react';
import { useRoutes } from 'react-router-dom';

import { MenuList } from '@/components/MenuList';

import { menuList, routeList } from './config';
import styles from './style.module.less';

const { Content, Sider } = Layout;

export default function Layout1() {
  const Routes = useRoutes(routeList);

  return (
    <Layout className={styles.layout1}>
      <Sider width={256}>
        <MenuList
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          list={menuList}
          menuPosition="side"
        />
      </Sider>
      <Content>{Routes}</Content>
    </Layout>
  );
}
