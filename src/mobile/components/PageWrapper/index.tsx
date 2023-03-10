import { NavBar } from 'antd-mobile';
import type { NavBarProps } from 'antd-mobile/es/components/nav-bar';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

import { ToastLoading } from '../ToastLoading';
import styles from './style.module.less';

interface PageWrapProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  loading?: boolean;
  navbar?: NavBarProps;
  /** 页面内容是否是一个用iframe展示的子网页 */
  iframe?: { url: string };
}

export function PageWrapper(props: PageWrapProps) {
  const { className, style, children = null, loading = false, navbar, iframe } = props;
  const nav = useNavigate();

  return (
    <div
      style={style}
      className={clsx(styles.pageWrapper, className, {
        [styles.hasNav]: !!navbar,
      })}>
      <ToastLoading loading={loading} />
      {navbar && (
        <NavBar
          {...navbar}
          className={clsx(styles.navbar, navbar.className)}
          onBack={() => nav(-1)}
        />
      )}
      <div className={styles.content}>
        {iframe ? (
          <iframe
            className={styles.iframe}
            src={iframe.url}
            scrolling="auto"
            allowFullScreen
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
