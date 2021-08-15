import { Layout } from 'antd';
import React from 'react';

import MenuList from '@/components/MenuList';
import RouteList from '@/components/RouteList';
import useMenuStatus from '@/hooks/useMenuStatus';

import { menuList, routeList } from './config';
import styles from './style.module.less';

const { Content, Sider } = Layout;

export default function Layout1() {
  const { openKeys, selectedKeys } = useMenuStatus(menuList);

  return (
    <Layout className={styles.layout1}>
      <Sider width={256}>
        <MenuList
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          style={{ height: '100%', borderRight: 0 }}
          list={menuList}
        />
      </Sider>
      <Content>
        <RouteList list={routeList} />
      </Content>
    </Layout>
  );
}
