import type { BreadcrumbProps, PageHeaderProps } from 'antd';
import { PageHeader, Spin } from 'antd';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import styles from './style.module.less';

type PageWrapProps = {
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  header?: PageHeaderProps;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export function PageWrapper(props: PageWrapProps) {
  const {
    className,
    style,
    loading = false,
    header = null,
    children = null,
    footer = null,
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
    <div className={clsx(styles.pageWrapper, className)} style={style}>
      <Spin spinning={loading}>
        {header && <PageHeader {...header} />}
        <div
          className={clsx([
            styles.pageContent,
            header ? styles.hasHeader : false,
            footer ? styles.hasFooter : false,
          ])}>
          {children}
        </div>
        {footer && <div className={styles.stickyFooter}>{footer}</div>}
      </Spin>
    </div>
  );
}
