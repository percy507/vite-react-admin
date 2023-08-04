import { Form, Input, Modal } from 'antd';

import { PermissionCheckboxGroup } from './permissions';

interface EditModalProps {
  data: any;
  visible: boolean;
  handleCancel: () => void;
}

export default function EditModal(props: EditModalProps) {
  const { data, visible, handleCancel } = props;
  const [form] = Form.useForm();
  const isEdit = !!data;

  const formLayout = isEdit ? {} : { labelCol: { span: 4 }, wrapperCol: { span: 16 } };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
        form.scrollToField(err?.errorFields?.[0]?.name?.[0]);
      });
  };

  return (
    <Modal
      title={isEdit ? '编辑角色权限' : '添加角色'}
      visible={visible}
      width={isEdit ? 1200 : 520}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Form form={form} {...formLayout} initialValues={data || undefined}>
        {isEdit ? (
          <Form.Item name="permits">{PermissionCheckboxGroup()}</Form.Item>
        ) : (
          <>
            <Form.Item
              label="角色名"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="描述" name="desc">
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                placeholder="请输入"
              />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}
