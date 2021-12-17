import { Dropdown, Layout, Menu, Spin } from 'antd';
import { useAtom } from 'jotai';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import logoImg from '@/assets/logo.svg';
import { MenuList } from '@/components/MenuList';
import { requestUserInfo } from '@/services/user';
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
    localStorage.clear();
    nav('/login');
  }, [nav]);

  const dropdownMenu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item>个人中心</Menu.Item>
        <Menu.Divider />
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
            <div className={styles.header__left}>
              <div className={styles.logo}>
                <img src={logoImg} alt="logo" />
                <div style={{ cursor: 'pointer' }} onClick={() => nav('/')}>
                  xx管理系统
                </div>
              </div>
              <MenuList
                style={{ width: 600 }}
                theme="dark"
                mode="horizontal"
                list={menuList}
                menuPosition="top"
              />
            </div>
            <div className={styles.header__right}>
              <Dropdown overlay={dropdownMenu}>
                <div className={styles.userName}>{userInfo.name}</div>
              </Dropdown>
            </div>
          </Header>

          <Layout className={styles.content}>{Routes}</Layout>
        </Fragment>
      )}
    </Layout>
  );
}
