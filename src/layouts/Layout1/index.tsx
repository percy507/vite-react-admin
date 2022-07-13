import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { createElement, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import { useHasPermission } from '@/components/Authorized';
import { MenuList } from '@/components/MenuList';

import { getRouteList, menuList } from './config';
import styles from './style.module.less';

const { Content, Sider } = Layout;

export default function Layout1() {
  const hasPermission = useHasPermission();
  const Routes = useRoutes(getRouteList(hasPermission));
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout1}>
      <Sider width={256} trigger={null} collapsible collapsed={collapsed}>
        <MenuList
          mode="inline"
          style={{ height: '100%', borderRight: 0, paddingBottom: 50 }}
          list={menuList}
          menuPosition="side"
        />
        <div className={styles.trigger}>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: () => setCollapsed((v) => !v),
          })}
        </div>
      </Sider>
      <Content>{Routes}</Content>
    </Layout>
  );
}
