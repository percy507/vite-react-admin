import { Button, Form, Input } from 'antd';

import { StrengthPassword } from './index';

export const DemoStrengthPassword = () => ({
  title: 'StrengthPassword',
  desc: '可以展示密码强度的密码输入框',
  children: <Demo />,
});

function Demo() {
  return (
    <div style={{ width: 400 }}>
      <StrengthPassword />

      <div style={{ marginTop: 24 }}>
        <Form>
          <Form.Item
            label="账户"
            name="account"
            rules={[{ required: true, message: '请输入' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ validator: StrengthPassword.validator }]}>
            <StrengthPassword />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
