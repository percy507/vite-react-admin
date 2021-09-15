import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useHasPermission } from '@/components/Authorized';
import IconFont from '@/components/IconFont';

import styles from './style.module.less';

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

type MenuListProps = {
  list: MenuModel[];
} & MenuProps;

export default function MenuList(props: MenuListProps) {
  const { list, openKeys = [], selectedKeys = [], ...restProps } = props;

  const hasPermission = useHasPermission();
  const [innerOpenKeys, setInnerOpenKeys] = useState<string[]>(openKeys);
  const [innerSelectedKeys, setInnerSelectedKeys] = useState<string[]>(selectedKeys);

  const onOpenChange = (keys: React.Key[]) => {
    setInnerOpenKeys(keys as string[]);
  };

  const onSelect = ({ selectedKeys: keys }: { selectedKeys: string[] }) => {
    setInnerSelectedKeys(keys);
  };

  useEffect(() => {
    if (
      openKeys.join(',') !== innerOpenKeys.join(',') ||
      selectedKeys.join(',') !== innerSelectedKeys.join(',')
    ) {
      setInnerOpenKeys(openKeys);
      setInnerSelectedKeys(selectedKeys);
    }
  }, [openKeys, selectedKeys]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Menu
      {...restProps}
      className={styles.menuList}
      openKeys={innerOpenKeys}
      selectedKeys={innerSelectedKeys}
      onOpenChange={onOpenChange}
      onSelect={onSelect}>
      {list
        .filter((menu) => hasPermission(menu.authcode))
        .map((menu) => {
          const children = menu.children || [];
          if (children.length === 0) {
            return (
              <MenuItem key={menu.key}>
                <Link title={menu.label} to={menu.link as string}>
                  {menu.icon && <IconFont type={menu.icon} />}
                  <span>{menu.label}</span>
                </Link>
              </MenuItem>
            );
          } else {
            return (
              <SubMenu
                key={menu.key}
                title={
                  <span>
                    {menu.icon && <IconFont type={menu.icon} />}
                    <span>{menu.label}</span>
                  </span>
                }>
                {children
                  .filter((child) => hasPermission(child.authcode))
                  .map((child) => {
                    return (
                      <MenuItem key={child.key}>
                        <Link to={child.link as string}>{child.label}</Link>
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
