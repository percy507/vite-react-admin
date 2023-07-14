import type { BreadcrumbProps, PageHeaderProps } from 'antd';
import { PageHeader, Spin } from 'antd';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import styles from './style.module.less';

interface PageWrapProps {
  /**
   * 页面类型：列表页, 详情页, 表单页。设置该字段会自动添加相关的css类，以便添加自定义的全局样式。
   */
  pageType?: 'list' | 'detail' | 'form';
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  header?: PageHeaderProps;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** 内容区域是否撑满整个可用的视口 */
  fullHeight?: boolean;
}

export function PageWrapper(props: PageWrapProps) {
  const {
    pageType,
    className,
    contentClassName,
    style,
    loading = false,
    header = null,
    children = null,
    footer = null,
    fullHeight = false,
  } = props;

  const itemRender = (route: { path?: string; breadcrumbName: string }) => {
    return route.path ? (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  };

  if (header !== null && header.breadcrumb) {
    (header.breadcrumb as BreadcrumbProps).itemRender = itemRender;
  }

  return (
    <div
      className={clsx(styles.pageWrapper, className, {
        [styles.listPage]: pageType === 'list',
        [styles.detailPage]: pageType === 'detail',
        [styles.formPage]: pageType === 'form',
      })}
      style={style}>
      <Spin spinning={loading}>
        {header && <PageHeader {...{ ...header, ghost: false }} />}
        <div
          className={clsx([
            styles.pageContent,
            header ? styles.hasHeader : false,
            footer ? styles.hasFooter : false,
            contentClassName,
          ])}
          style={fullHeight ? { height: '100%', overflow: 'auto' } : {}}>
          {children}
        </div>
        {footer && <div className={styles.stickyFooter}>{footer}</div>}
      </Spin>
    </div>
  );
}
