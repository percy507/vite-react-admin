import { ControlOutlined, MobileOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tabs } from 'antd';
import { useState } from 'react';

import { CountNumber } from '@/components/CountNumber';
import { VerifyCode } from '@/components/VerifyCode';
import { requestLogin, requestSendSMS } from '@/services/user';
import { phoneNumberRule } from '@/utils/formRules';
import { setAuthToken } from '@/utils/storage';

import styles from './style.module.less';

export default function LoginPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [cert, setCert] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const query = new URLSearchParams(location.search);
  const [form] = Form.useForm();

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
      style={{ backgroundImage: 'url(/imgs/login-bg.jpg)' }}>
      <div className={styles.title}>落云宗内部管理系统</div>
      <div className={styles.container}>
        <Tabs>
          <Tabs.TabPane tab="账号密码登录" key="1">
            {showChangePassword ? (
              <>
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

                  <Form.Item
                    name="code"
                    rules={[{ required: true, message: '请输入验证码' }]}>
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
                </Form>{' '}
              </>
            ) : (
              <>
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

                  <Form.Item
                    name="code"
                    rules={[{ required: true, message: '请输入验证码' }]}>
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
              </>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="手机验证码登录" key="2">
            <div className={styles.name}>登录</div>
            <Form name="basic" form={form} onFinish={onSubmit}>
              <Form.Item name="mobile" rules={[phoneNumberRule]}>
                <Input
                  size="large"
                  maxLength={11}
                  placeholder="手机号"
                  prefix={<MobileOutlined style={{ fontSize: 20, paddingRight: 8 }} />}
                />
              </Form.Item>
              <Form.Item name="code" rules={[{ required: true, message: '请输入' }]}>
                <Input
                  size="large"
                  maxLength={6}
                  placeholder="验证码"
                  prefix={<ControlOutlined style={{ fontSize: 20, paddingRight: 8 }} />}
                  suffix={
                    <CountNumber
                      title="获取验证码"
                      from={60}
                      to={0}
                      shouldStart={() => {
                        return new Promise((resolve) => {
                          form
                            .validateFields(['mobile'])
                            .then(() => {
                              requestSendSMS({ mobile: form.getFieldValue('mobile') })
                                .then(() => resolve(true))
                                .catch(() => resolve(false));
                            })
                            .catch(() => resolve(false));
                        });
                      }}
                    />
                  }
                />
              </Form.Item>
              <Form.Item noStyle>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  style={{ width: '100%', marginTop: 16 }}>
                  登录
                </Button>
              </Form.Item>
            </Form>
            <div className={styles.bottomLine}>
              <div>海曙区房票管理系统</div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
