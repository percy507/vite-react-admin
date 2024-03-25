import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useCallback, useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

/**
 * 在表单页面，如果表单页有已填写的数据，那么在路由跳转或关闭浏览器tab时，进行二次确认操作，
 * 防止已填写的数据丢失
 */
export function useFormProtector(form: FormInstance) {
  const hasFormData = useCallback(
    () => JSON.stringify(form.getFieldsValue() || {}) !== '{}',
    [form],
  );
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return hasFormData() && currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    const handler = (event) => {
      if (hasFormData()) {
        // prevent leave current page
        event.preventDefault();
        event.returnValue = true; // Included for legacy support, e.g. Chrome/Edge < 119
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasFormData]);

  if (blocker.state === 'blocked') {
    Modal.confirm({
      title: '页面数据即将丢失，是否继续离开此页面？',
      icon: <ExclamationCircleOutlined style={{ color: '#FAAD14' }} />,
      onOk: () => blocker.proceed?.(),
      onCancel: () => blocker.reset?.(),
    });
  }
}
