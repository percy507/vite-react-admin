import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import { useState } from 'react';

import AsyncButton from '@/components/AsyncButton';
import { PageWrapper } from '@/components/PageWrapper';

import EditModal from './EditModal';
import styles from './style.module.less';

const data = [
  {
    name: 'John Brown',
    roles: ['nice', 'developer'],
  },
  {
    name: 'Jim Green',
    roles: ['loser'],
  },
  {
    name: 'Joe Black',
    roles: ['cool', 'teacher'],
  },
];

export default function UserManage() {
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const showModal = (data = null) => (setModalData(data), setModalVisible(true));
  const cancelModal = () => (setModalData(null), setModalVisible(false));

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '拥有角色',
      dataIndex: 'roles',
      render: (roles) => (
        <>
          {roles.map((role, i) => {
            const colors = ['geekblue', '#108ee9', 'green', 'blue'];
            return (
              <Tag color={colors[i % 4]} key={i}>
                {role}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>编辑</a>
          <AsyncButton
            label="删除"
            color="red"
            title="确定删除?"
            asyncService={() => {
              return new Promise((resolve) => {
                setTimeout(() => resolve(null), 1200);
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageWrapper className={styles.UserManage} header={{ title: '用户管理' }}>
      <EditModal visible={modalVisible} data={modalData} handleCancel={cancelModal} />
      <Card>
        <Row style={{ marginBottom: 16 }}>
          <Col span={4}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              添加用户
            </Button>
          </Col>
          <Col span={16}>
            <Form form={form} layout="inline" onFinish={onFinish}>
              <Form.Item name="name" label="用户名">
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Table rowKey="name" columns={columns} dataSource={data} />
      </Card>
    </PageWrapper>
  );
}
