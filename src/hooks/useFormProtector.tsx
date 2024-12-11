import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useBlocker } from 'react-router-dom';

/**
 * 在表单页面，如果表单页有已填写的数据，那么在路由跳转或关闭浏览器tab时，进行二次确认操作，
 * 防止已填写的数据丢失
 * ps: 纯前端路由跳转可以使用自定义弹窗，关闭浏览器tab或刷新时，只支持使用浏览器默认效果
 * @note 提交表单后的路由跳转，需要手动调用 disableFormProtector 函数来关闭此功能，否则也会弹窗
 */
export function useFormProtector(form: FormInstance) {
  const enableRef = useRef(true);
  const hasFormData = useCallback(
    () => JSON.stringify(form.getFieldsValue() || {}) !== '{}',
    [form],
  );
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return (
      enableRef.current &&
      hasFormData() &&
      currentLocation.pathname !== nextLocation.pathname
    );
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

  const modalRef = useRef<any>(null);
  if (blocker.state === 'blocked' && modalRef.current == null) {
    modalRef.current = Modal.confirm({
      title: '页面数据即将丢失，是否继续离开此页面？',
      icon: <ExclamationCircleOutlined style={{ color: '#FAAD14' }} />,
      onOk: () => {
        blocker.proceed?.();
        modalRef.current = null;
      },
      onCancel: () => {
        blocker.reset?.();
        modalRef.current = null;
      },
    });
  }

  return useMemo(
    () => ({
      enableFormProtector: () => {
        enableRef.current = true;
      },
      disableFormProtector: () => {
        enableRef.current = false;
      },
    }),
    [],
  );
}
