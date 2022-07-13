import type { BreadcrumbProps, PageHeaderProps } from 'antd';
import { PageHeader, Spin } from 'antd';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import styles from './style.module.less';

type PageWrapProps = {
  loading?: boolean;
  header?: PageHeaderProps;
  children?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
};

export function PageWrapper(props: PageWrapProps) {
  const {
    loading = false,
    header = null,
    children = null,
    className = '',
    footer = null,
  } = props;

  const rootClassName = clsx(styles.pageWrapper, className);

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
    <div className={rootClassName}>
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
