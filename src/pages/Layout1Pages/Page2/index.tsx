import { Card, List } from 'antd';
import { Link } from 'react-router-dom';

import PageWrapper from '@/components/PageWrapper';

import styles from './style.module.less';

export default function Page2() {
  const breadcrumbList = [
    {
      path: '/l1',
      breadcrumbName: 'First-level_Menu',
    },
    {
      path: '/l2',
      breadcrumbName: 'Second-level_Menu',
    },
    {
      path: '',
      breadcrumbName: 'Third-level_Menu',
    },
  ];

  const list = [
    {
      title: '登录页',
      path: '/login',
    },
    {
      title: '主菜单111',
      path: '/l1',
    },
    {
      title: '主菜单222',
      path: '/l2',
    },
    {
      title: '页面列表',
      path: '/l1/testMenu1/testMenu1_1/list',
    },
    {
      title: '组件demo',
      path: '/l1/testMenu1/testMenu1_2/list',
    },
    {
      title: '测试菜单2（无权限）',
      path: '/l1/testMenu2/list',
    },
    {
      title: '测试菜单3',
      path: '/l1/testMenu3/list',
    },
    {
      title: '任意路由（测试404页面）',
      path: '/l1/testMenu5/list',
    },
  ];

  return (
    <PageWrapper
      header={{
        breadcrumb: { routes: breadcrumbList },
      }}
      className={styles.Page2}
    >
      <Card title="页面列表">
        <List
          dataSource={list}
          renderItem={(item) => {
            return (
              <List.Item>
                <div>
                  <span style={{ marginRight: 24 }}>[{item.title}]</span>
                  <Link to={item.path}>{item.path}</Link>
                </div>
              </List.Item>
            );
          }}
        />
      </Card>
    </PageWrapper>
  );
}
