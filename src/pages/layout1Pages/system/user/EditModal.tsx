import { Form, Input, Modal, Select } from 'antd';

const { Option } = Select;

interface EditModalProps {
  data: any;
  visible: boolean;
  handleCancel: () => void;
}

export default function EditModal(props: EditModalProps) {
  const { data, visible, handleCancel } = props;
  const [form] = Form.useForm();
  const isEdit = !!data;

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
      title={isEdit ? '编辑用户' : '添加用户'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={data || undefined}>
        <Form.Item
          label="用户名"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item name="remember" label="角色">
          <Select placeholder="请选择" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
