import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { clsx } from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useHasPermission } from '@/components/Authorized';
import { IconFont } from '@/components/IconFont';
import { isElementOutViewport } from '@/utils/dom';

import styles from './style.module.less';

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

interface MenuListProps extends MenuProps {
  menuPosition: 'top' | 'side';
  list: MenuModel[];
}

export function MenuList(props: MenuListProps) {
  const { className, list, menuPosition, ...restProps } = props;

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
      if (menuPosition === 'top' && el.link && location.pathname.startsWith(el.link)) {
        shouldSelectedKeys = [el.key || el.label];
      } else if (
        el.link === location.pathname ||
        (el.link && location.pathname.startsWith(`${el.link}/`))
      ) {
        shouldSelectedKeys = [el.key || el.label];
      }

      (el.children || []).forEach((el2) => {
        if (
          el2.link === location.pathname ||
          (el2.link && location.pathname.startsWith(`${el2.link}/`))
        ) {
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

      let key = shouldSelectedKeys[0];
      if (key) {
        setTimeout(() => {
          // 如果默认选中的菜单不在视口，则滚动其到视口中
          const dom = document.querySelector(`[data-menukey="${key}"]`);
          if (dom && isElementOutViewport(dom)) dom.scrollIntoView();
        }, 200);
      }
    }
  }, [list, location.pathname, menuPosition]);

  const items: MenuProps['items'] = list
    .filter((menu) => hasPermission(menu.auth))
    .map((menu) => {
      const children = menu.children || [];
      if (children.length === 0) {
        return {
          key: menu.key || menu.label,
          label: (
            <Link title={menu.label} to={menu.link as string}>
              {menu.icon && <IconFont type={menu.icon} />}
              <span data-menukey={menu.key || menu.label}>{menu.label}</span>
            </Link>
          ),
        };
      } else {
        return {
          key: menu.key || menu.label,
          label: (
            <span>
              {menu.icon && <IconFont type={menu.icon} />}
              <span>{menu.label}</span>
            </span>
          ),
          children: children
            .filter((child) => hasPermission(child.auth))
            .map((child) => {
              return {
                key: child.key || child.label,
                label: (
                  <Link to={child.link as string} data-menukey={child.key || child.label}>
                    {child.label}
                  </Link>
                ),
              };
            }),
        };
      }
    });

  return (
    <Menu
      {...restProps}
      className={clsx(styles.menuList, className)}
      openKeys={innerOpenKeys}
      selectedKeys={innerSelectedKeys}
      onOpenChange={(keys) => setInnerOpenKeys(keys)}
      onSelect={({ selectedKeys }) => setInnerSelectedKeys(selectedKeys)}
      items={items}
    />
  );
}
