import { Button, Form, Input } from 'antd';
import { useState } from 'react';

import { VerifyCode } from '@/components/VerifyCode';
import { requestLogin } from '@/services/user';
import { setAuthToken } from '@/utils/storage';

import styles from './style.module.less';

export default function LoginPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [cert, setCert] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const query = new URLSearchParams(location.search);

  const onSubmit = (values: any) => {
    setSubmitting(true);
    requestLogin({ ...values, cert }).then((token: any) => {
      setAuthToken(token);
      setSubmitting(false);

      let from = query.get('from_page');
      if (from) location.href = decodeURIComponent(from);
      else location.href = '/';
    });
  };

  const onChangePassword = (values: any) => {
    setSubmitting(true);
    console.log(values);
  };

  return (
    <div
      className={styles.loginPage}
      style={{
        backgroundImage: 'url(https://s1.ax1x.com/2022/07/13/jR0UAA.jpg)',
      }}>
      <div className={styles.title}>落云宗内部管理系统</div>

      {showChangePassword ? (
        <div className={styles.container} key="changePassword">
          <div className={styles.name}>修改密码</div>
          <Form name="basic" initialValues={{}} onFinish={onChangePassword}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入账号' }]}>
              <Input placeholder="请输入账号(随便填)" />
            </Form.Item>

            <Form.Item
              name="oldPassword"
              rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入旧密码(随便填)" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入新密码(随便填)" />
            </Form.Item>

            <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
              <Input
                placeholder="请输入验证码(随便填)"
                addonAfter={<VerifyCode setCert={setCert} />}
                maxLength={4}
              />
            </Form.Item>

            <Form.Item noStyle>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  style={{ width: '45%' }}>
                  确认修改
                </Button>
                <Button
                  disabled={submitting}
                  onClick={() => setShowChangePassword(false)}
                  style={{ width: '45%' }}>
                  取消
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div className={styles.container} key="login">
          <div className={styles.name}>登录</div>
          <Form name="basic" initialValues={{}} onFinish={onSubmit}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入账号' }]}>
              <Input placeholder="请输入账号(随便填)" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入密码(随便填)" />
            </Form.Item>

            <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
              <Input
                placeholder="请输入验证码(随便填)"
                addonAfter={<VerifyCode setCert={setCert} />}
                maxLength={4}
              />
            </Form.Item>

            <Form.Item noStyle>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
                style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>

            <Form.Item>
              <a
                style={{ float: 'right', fontSize: '14px' }}
                onClick={() => setShowChangePassword(true)}>
                修改密码
              </a>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}
