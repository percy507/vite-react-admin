import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Table } from 'antd';
import { useState } from 'react';

import { AsyncButton } from '@/components/AsyncButton';
import { PageWrapper } from '@/components/PageWrapper';

import EditModal from './EditModal';
import styles from './style.module.less';

const data = [
  {
    name: 'John Brown',
  },
  {
    name: 'Jim Green',
  },
  {
    name: 'Joe Black',
  },
];

export default function RoleManage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const showModal = (data = null) => (setModalData(data), setModalVisible(true));
  const cancelModal = () => (setModalData(null), setModalVisible(false));

  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '操作',
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>编辑权限</a>
          <AsyncButton
            content="删除"
            popContent="确定删除?"
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
    <PageWrapper className={styles.RoleManage} header={{ title: '角色管理' }}>
      <EditModal visible={modalVisible} data={modalData} handleCancel={cancelModal} />
      <Card>
        <Row style={{ marginBottom: 16 }}>
          <Col span={4}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              添加角色
            </Button>
          </Col>
        </Row>

        <Table rowKey="name" columns={columns} dataSource={data} />
      </Card>
    </PageWrapper>
  );
}
