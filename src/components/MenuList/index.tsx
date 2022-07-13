import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useHasPermission } from '@/components/Authorized';
import { IconFont } from '@/components/IconFont';

import styles from './style.module.less';

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

export interface MenuModel {
  /** 唯一key，如果为空，则key使用label表示 */
  key?: string;
  /** 菜单标题 */
  label: string;
  /** 菜单 icon 名称 */
  icon?: string;
  /** 菜单链接 */
  link?: string;
  /** 权限码 */
  auth?: string;
  /** 子菜单 */
  children?: MenuModel[];
}

type MenuListProps = {
  menuPosition: 'top' | 'side';
  list: MenuModel[];
} & MenuProps;

export function MenuList(props: MenuListProps) {
  const { list, menuPosition, ...restProps } = props;

  const location = useLocation();
  const hasPermission = useHasPermission();
  const [innerOpenKeys, setInnerOpenKeys] = useState<string[]>([]);
  const [innerSelectedKeys, setInnerSelectedKeys] = useState<string[]>([]);
  const keyRef = useRef<any>();
  keyRef.current = { innerOpenKeys, innerSelectedKeys };

  // 根据路由动态设置菜单的打开与选中
  useLayoutEffect(() => {
    let shouldOpenKeys: string[] = [];
    let shouldSelectedKeys: string[] = [];

    list.forEach((el) => {
      if (el.link === location.pathname) {
        shouldSelectedKeys = [el.key || el.label];
      } else if (
        menuPosition === 'top' &&
        el.link &&
        location.pathname.startsWith(el.link)
      ) {
        shouldSelectedKeys = [el.key || el.label];
      }

      (el.children || []).forEach((el2) => {
        if (el2.link === location.pathname) {
          shouldOpenKeys = [el.key || el.label];
          shouldSelectedKeys = [el2.key || el2.label];
        }
      });
    });

    if (
      shouldOpenKeys.join(',') !== keyRef.current.innerOpenKeys.join(',') ||
      shouldSelectedKeys.join(',') !== keyRef.current.innerSelectedKeys.join(',')
    ) {
      setInnerOpenKeys(shouldOpenKeys);
      setInnerSelectedKeys(shouldSelectedKeys);
    }
  }, [list, location.pathname, menuPosition]);

  return (
    <Menu
      {...restProps}
      className={styles.menuList}
      openKeys={innerOpenKeys}
      selectedKeys={innerSelectedKeys}
      onOpenChange={(keys) => setInnerOpenKeys(keys)}
      onSelect={({ selectedKeys }) => setInnerSelectedKeys(selectedKeys)}>
      {list
        .filter((menu) => hasPermission(menu.auth))
        .map((menu) => {
          const children = menu.children || [];
          if (children.length === 0) {
            return (
              <MenuItem key={menu.key || menu.label}>
                <Link title={menu.label} to={menu.link as string}>
                  {menu.icon && <IconFont type={menu.icon} />}
                  <span data-menukey={menu.key || menu.label}>{menu.label}</span>
                </Link>
              </MenuItem>
            );
          } else {
            return (
              <SubMenu
                key={menu.key || menu.label}
                title={
                  <span>
                    {menu.icon && <IconFont type={menu.icon} />}
                    <span>{menu.label}</span>
                  </span>
                }>
                {children
                  .filter((child) => hasPermission(child.auth))
                  .map((child) => {
                    return (
                      <MenuItem key={child.key || child.label}>
                        <Link
                          to={child.link as string}
                          data-menukey={child.key || child.label}>
                          {child.label}
                        </Link>
                      </MenuItem>
                    );
                  })}
              </SubMenu>
            );
          }
        })}
    </Menu>
  );
}
