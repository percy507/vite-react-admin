import { Button, Form, Space } from 'antd';

import { Rule } from '@/utils/formRules';

import { FormattedInput } from './index';

export const DemoFormattedInput = () => ({
  title: 'FormattedInput',
  desc: '(表单组件) 可以格式化展示的Input组件',
  children: <Demo />,
});

function Demo() {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((errorInfo) => {
        console.error(errorInfo);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 'calc(100% - 250px)' }}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label="银行账号"
            extra="格式化银行账号，每4个数字中间有一个空格"
            name="bankNo"
            rules={[{ required: true, message: '请输入' }, Rule.bankNumber()]}>
            <FormattedInput
              maxLength={19 + ((19 % 4) + 1)}
              placeholder="请输入"
              format={(val) =>
                val
                  .replace(/\u0020/g, '')
                  .replace(/(\d{4})/g, '$1\u0020')
                  .trim()
              }
              unformat={(val) => val.replace(/\u0020/g, '')}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Space>
              <Button type="primary" onClick={handleOk}>
                提交
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
              <Button
                onClick={() => form.setFieldsValue({ bankNo: '1234123412341234999' })}>
                填充银行账号
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
