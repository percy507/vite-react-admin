import { styled } from '@stitches/react';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { FormItemList } from './index';

export const DemoFormItemList = () => ({
  title: 'FormItemList',
  desc: '(表单组件)为表单的字段提供数组化管理',
  children: <Demo />,
});

const PreWrapper = styled('pre', {
  width: 250,
  whiteSpace: 'break-spaces',
  padding: 10,
  background: '#fafafa',
});

function Demo() {
  const [form] = Form.useForm();
  const [values, setValues] = useState<any>();

  useEffect(() => {
    form.setFieldsValue({
      name: '韩立',
      address: ['乱星海', '天南大陆溪国湳州云梦山脉', '冥河之地'],
      contacts: [
        {
          name: '历飞雨',
          birth: moment('1977-09-30'),
        },
      ],
    });
  }, [form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        setValues(values);
      })
      .catch((errorInfo) => {
        console.error(errorInfo);
        setValues('报错了');
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 'calc(100% - 250px)' }}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入' }]}>
            <Input style={{ width: 250 }} placeholder="请输入" />
          </Form.Item>
          <FormItemList
            label="常驻地址"
            name="address"
            required
            columnNum={2}
            addButton={{ text: '新增地址', width: 300 }}
            formItems={[
              {
                rules: [{ required: true, whitespace: true, message: '请输入' }],
                children: (
                  <Input maxLength={50} style={{ width: 300 }} placeholder="请输入" />
                ),
              },
            ]}
          />
          <FormItemList
            label="联络人"
            name="contacts"
            addButton={{ width: 750 }}
            formItems={[
              {
                name: 'name',
                rules: [{ required: true, whitespace: true, message: '请输入姓名' }],
                children: (
                  <Input style={{ width: 250 }} placeholder="请输入姓名" maxLength={10} />
                ),
              },
              {
                name: 'sex',
                rules: [{ required: true, message: '请选择性别' }],
                children: (
                  <Select style={{ width: 250 }} placeholder="请选择性别" allowClear>
                    <Select.Option value={1}>男</Select.Option>
                    <Select.Option value={0}>女</Select.Option>
                  </Select>
                ),
              },
              {
                name: 'birth',
                rules: [{ required: true, message: '请选择出生日期' }],
                children: (
                  <DatePicker style={{ width: 250 }} placeholder="请选择出生日期" />
                ),
              },
            ]}
          />
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Space>
              <Button type="primary" onClick={handleOk}>
                提交
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <PreWrapper>{JSON.stringify(values, null, 2)}</PreWrapper>
    </div>
  );
}
