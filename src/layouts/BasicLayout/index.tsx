import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Empty, Layout, Menu, Popover, Spin } from 'antd';
import { useAtom } from 'jotai';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useRoutes } from 'react-router-dom';

import logoImg from '@/assets/logo.svg';
import { useHasPermission } from '@/components/Authorized';
import { MenuList } from '@/components/MenuList';
import { requestLogout, requestUserInfo } from '@/services/user';
import { userInfoAtom } from '@/store/user';
import { filterRoutes } from '@/utils/dom';
import { redirectToLogin } from '@/utils/request';
import { ellipsisLine1 } from '@/utils/style';

import { menuList, routeList } from './config';
import styles from './style.module.less';

const { Header } = Layout;

export default function BasicLayout() {
  const hasPermission = useHasPermission();
  const Routes = useRoutes(filterRoutes(routeList, hasPermission));

  const nav = useNavigate();
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const logoutFunc = useCallback(() => {
    requestLogout().then(() => redirectToLogin());
  }, []);

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
              <NoticeCenter />
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

function NoticeCenter() {
  const nav = useNavigate();
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [data, setData] = useState<{ total: number; list: any[] }>({
    total: 0,
    list: [],
  });

  useEffect(() => {
    setData({ total: 12, list: [{}, {}, {}, {}, {}] });
  }, []);

  return (
    <Popover
      visible={noticeVisible}
      onVisibleChange={(v) => setNoticeVisible(v)}
      placement="bottomRight"
      arrowPointAtCenter
      overlayClassName={styles.noticePopover}
      content={
        <div className={styles.noticeList} onClick={() => setNoticeVisible(false)}>
          {data.list?.length ? (
            data.list.map((el) => (
              <Link key={el.id} to="/xxx" className={styles.noticeItem}>
                <div className={ellipsisLine1()}>我是标题😊</div>
                <div>2022-08-02 10:20:20</div>
              </Link>
            ))
          ) : (
            <Empty style={{ fontSize: 12, padding: 24 }} />
          )}
          {data.total > 5 && (
            <Link to="/xxx" className={styles.noticeMore}>
              查看更多
            </Link>
          )}
        </div>
      }>
      <Badge count={data.total} size="small" className={styles.noticeIcon}>
        <BellOutlined
          onClick={() => {
            setNoticeVisible(true);
            nav('/xxx');
          }}
        />
      </Badge>
    </Popover>
  );
}
