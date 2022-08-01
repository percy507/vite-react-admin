import { DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, Spin } from 'antd';
import { useAtom } from 'jotai';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import logoImg from '@/assets/logo.svg';
import { MenuList } from '@/components/MenuList';
import { requestLogout, requestUserInfo } from '@/services/user';
import { userInfoAtom } from '@/store/user';

import { routeList } from './config';
import { menuList } from './config';
import styles from './style.module.less';

const { Header } = Layout;

export default function BasicLayout() {
  const Routes = useRoutes(routeList);
  const nav = useNavigate();
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const logoutFunc = useCallback(() => {
    requestLogout().then(() => {
      localStorage.clear();
      nav('/login');
    });
  }, [nav]);

  const dropdownMenu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item onClick={logoutFunc}>退出登录</Menu.Item>
      </Menu>
    );
  }, [logoutFunc]);

  useEffect(() => {
    const getUserInfo = () => {
      requestUserInfo()
        .then((data) => {
          setUserInfo(data);
        })
        .finally(() => {
          setIsFirstRender(false);
        });
    };

    getUserInfo();
  }, [setUserInfo]);

  return (
    <Layout className={styles.basicLayout}>
      {isFirstRender ? (
        <Spin className={styles.loading} spinning size="large" tip="加载中..." />
      ) : (
        <Fragment>
          <Header className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.logo}>
                <img src={logoImg} alt="logo" />
                <div style={{ cursor: 'pointer' }} onClick={() => nav('/')}>
                  落云宗内部管理系统
                </div>
              </div>
              <MenuList
                style={{ width: 600 }}
                mode="horizontal"
                list={menuList}
                menuPosition="top"
              />
            </div>
            <div className={styles.headerRight}>
              <Dropdown overlay={dropdownMenu}>
                <div className={styles.userInfo}>
                  <Avatar
                    size={32}
                    src={userInfo.avatar}
                    style={{ background: 'rgb(62, 99, 221)' }}
                  />
                  <div className={styles.userName}>{userInfo.name}</div>
                  <DownOutlined style={{ marginLeft: 16 }} />
                </div>
              </Dropdown>
            </div>
          </Header>
          <Layout className={styles.content}>{Routes}</Layout>
        </Fragment>
      )}
    </Layout>
  );
}
