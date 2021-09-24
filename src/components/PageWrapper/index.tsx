import type { BreadcrumbProps, PageHeaderProps } from 'antd';
import { PageHeader, Spin } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './style.module.less';

type PageWrapProps = {
  loading?: boolean;
  header?: PageHeaderProps;
  children?: React.ReactNode;
  className?: string;
};

export default function PageWrapper(props: PageWrapProps) {
  const { loading = false, header = null, children = null, className = '' } = props;

  const rootClassName = classNames(styles.pageWrapper, { [className]: !!className });

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
        <div className={styles.pageContent}>{children}</div>
      </Spin>
    </div>
  );
}
