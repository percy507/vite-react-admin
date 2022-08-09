import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { createElement, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import { useHasPermission } from '@/components/Authorized';
import { MenuList } from '@/components/MenuList';
import { filterRoutes } from '@/utils/dom';

import { menuList, routeList } from './config';
import styles from './style.module.less';

const { Content, Sider } = Layout;

export default function Layout1() {
  const hasPermission = useHasPermission();
  const Routes = useRoutes(filterRoutes(routeList, hasPermission));

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout1}>
      <Sider
        width={256}
        collapsedWidth={46}
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <MenuList
          mode="inline"
          style={{ height: '100%', borderRight: 0, paddingBottom: 50 }}
          list={menuList}
          menuPosition="side"
          inlineIndent={16}
          className={styles.menus}
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
