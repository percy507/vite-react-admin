import { Toast } from 'antd-mobile';
import { useEffect, useRef } from 'react';

interface ToastLoadingProps {
  loading?: boolean;
  /** 默认为 `加载中…` */
  title?: string;
}

export function ToastLoading(props: ToastLoadingProps) {
  const close = useLoading(props);
  useEffect(() => () => close(), [close]);
  return <></>;
}

export function useLoading(props: ToastLoadingProps) {
  const { loading = false, title = '加载中…' } = props;
  const toastRef = useRef<ReturnType<typeof Toast.show>>();
  useEffect(() => {
    if (loading) {
      toastRef.current = Toast.show({
        icon: 'loading',
        duration: 0,
        content: title,
      });
    } else toastRef.current?.close();
  }, [loading, title]);
  return () => toastRef.current?.close();
}
