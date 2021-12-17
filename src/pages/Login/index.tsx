import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

import { requestLogin } from '@/services/auth';
import { setAuthToken } from '@/utils/token';

import styles from './style.module.less';

export default function LoginPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = (values: any) => {
    setSubmitting(true);
    requestLogin().then((token: any) => {
      console.log('Login Success:', values);
      setAuthToken(token);
      setSubmitting(false);
      window.location.href = '/';
    });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <h2 style={{ textAlign: 'center' }}>xx管理系统</h2>
        <br />
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{}}
          onFinish={onSubmit}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="123456" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
