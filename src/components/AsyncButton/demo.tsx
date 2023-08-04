import { CheckCircleOutlined } from '@ant-design/icons';
import { Form, InputNumber, message } from 'antd';

import { AsyncButton } from './index';

export const DemoAsyncButton = () => ({
  title: 'AsyncButton',
  desc: '组合弹窗+按钮，常用与表格的操作拦或表单提交的二次确认',
  children: <Demo />,
});

function Demo() {
  const fakeAsync = (text: string, wait = 1200) => {
    return new Promise((resolve) =>
      setTimeout(() => (resolve(null), message.success(text)), wait),
    );
  };

  const [form] = Form.useForm();

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <AsyncButton
          content="提交"
          popContent="确定提交?"
          style={{ color: 'deeppink', background: 'yellow', marginRight: 24 }}
          asyncService={() => fakeAsync('提交成功')}
        />

        <AsyncButton
          content="删除"
          popContent="确定删除?"
          style={{ color: 'red', marginRight: 24 }}
          asyncService={() => fakeAsync('删除成功')}
        />

        <AsyncButton
          content="设置排名（自定义表单）"
          popContent={
            <div>
              <div style={{ marginBottom: 16 }}>请设置排名</div>
              <Form form={form} labelCol={{ span: 0 }} wrapperCol={{ span: 20 }}>
                <Form.Item name="order" rules={[{ required: true, message: '请输入' }]}>
                  <InputNumber style={{ width: 200 }} placeholder="请输入" min={0} />
                </Form.Item>
              </Form>
            </div>
          }
          hasForm
          asyncService={(startLoading) => {
            return new Promise((resolve) => {
              form
                .validateFields()
                .then((values) => {
                  startLoading();
                  console.log(values);
                  setTimeout(() => resolve(null), 1200);
                })
                .catch((err) => {
                  console.log(err);
                  form.scrollToField(err?.errorFields?.[0]?.name?.[0]);
                });
            });
          }}
        />
      </div>

      <div>
        <AsyncButton
          content="审批"
          popContent="确定通过此流程吗？"
          isButton
          style={{ marginRight: 24 }}
          buttonProps={{ type: 'primary', icon: <CheckCircleOutlined /> }}
          asyncService={() => fakeAsync('流程已通过')}
        />
        <AsyncButton
          content="驳回"
          popContent="确定驳回此流程吗？"
          isButton
          asyncService={() => fakeAsync('流程已驳回')}
        />
      </div>
    </div>
  );
}
