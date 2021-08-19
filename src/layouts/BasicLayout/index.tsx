import { Dropdown, Layout, Menu, Spin } from 'antd';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import logoImg from '@/assets/logo.svg';
import MenuList from '@/components/MenuList';
import RouteList from '@/components/RouteList';
import { atomUserInfo } from '@/recoil/user';
import { requestUserInfo } from '@/services/user';

import { menuList, routeList } from './config';
import styles from './style.module.less';

const { Header } = Layout;

export default function BasicLayout() {
  const history = useHistory();
  const location = useLocation();
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useRecoilState(atomUserInfo);

  const logoutFunc = () => {
    localStorage.clear();
    history.push('/login');
  };

  const dropdownMenu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item>个人中心</Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={logoutFunc}>退出登录</Menu.Item>
      </Menu>
    );
  }, []);

  const getUserInfo = useCallback(() => {
    requestUserInfo()
      .then((data) => {
        setUserInfo(data);
      })
      .finally(() => {
        setIsFirstRender(false);
      });
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    setSelectedKeys([location.pathname.split('/')[1]]);
  }, [location]);

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
                <div>xx管理系统</div>
              </div>
              <MenuList
                theme="dark"
                mode="horizontal"
                selectedKeys={selectedKeys}
                list={menuList}
              />
            </div>
            <div className={styles.header__right}>
              <Dropdown overlay={dropdownMenu}>
                <div className={styles.userName}>{userInfo.name}</div>
              </Dropdown>
            </div>
          </Header>

          <Layout className={styles.content}>
            <RouteList list={routeList} />
          </Layout>
        </Fragment>
      )}
    </Layout>
  );
}
