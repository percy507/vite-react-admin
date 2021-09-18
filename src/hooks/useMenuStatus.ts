import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

// 获取当前侧边栏菜单默认被打开、选中的菜单项
export default function useMenuStatus(menuList: MenuModel[] = []): {
  openKeys: string[];
  selectedKeys: string[];
} {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 获取所有没有二级菜单的一级菜单的key
  // 用于判断路径中的第二个path是可以open的还是select的
  const oneLevelMenuKeyList: string[] = useMemo(() => {
    return menuList.filter((el) => el.children === undefined).map((el) => el.key);
  }, [menuList]);

  useEffect(() => {
    const pathname2 = location.pathname.split('/')[2];
    const pathname3 = location.pathname.split('/')[3];
    const isOneLevelMenu = oneLevelMenuKeyList.includes(pathname2);

    setOpenKeys(isOneLevelMenu ? [] : [pathname2]);
    setSelectedKeys(isOneLevelMenu ? [pathname2] : [pathname3]);
  }, [oneLevelMenuKeyList, location.pathname]);

  return {
    openKeys,
    selectedKeys,
  };
}
