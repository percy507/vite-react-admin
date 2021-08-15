import type { RouteComponentProps } from 'react-router-dom';

declare global {
  interface MenuModel {
    /** 唯一key */
    key: string;
    /** 菜单标题 */
    label: string;
    /** 菜单 icon，从iconfont.cn中找 */
    icon?: string;
    /** 菜单链接 */
    link?: string;
    /** 权限码 */
    authcode?: string;
    /** 子菜单 */
    children?: MenuModel[];
  }

  interface RouteProps {
    path?: string;
    exact?: boolean;
    component: React.LazyExoticComponent<(props: RouteComponentProps) => JSX.Element>;
    authcode?: string;
    redirect?: undefined;
  }

  interface RedirectProps {
    redirect: string;
  }

  type RouteModel = RouteProps | RedirectProps;
}
