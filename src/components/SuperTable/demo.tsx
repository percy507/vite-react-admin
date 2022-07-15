import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, message, Select, Space, Switch, Tag } from 'antd';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SuperTable } from './index';
const { RangePicker } = DatePicker;

export const DemoSuperTable = () => ({
  title: 'SuperTable',
  desc: '配置化的表格',
  children: <Demo />,
});

function Demo() {
  const nav = useNavigate();
  const tableRef = useRef<React.ElementRef<typeof SuperTable>>(null);
  const [activeTab, setActiveTab] = useState('0');

  const onPublish = (published: boolean, id: string) => {
    requestPublish(id, published).then(() => {
      message.success('操作成功');
      tableRef.current?.request();
    });
  };

  const statusMap = {
    0: '待审批',
    1: '已通过',
    2: '已驳回',
  };

  const columns = [
    {
      title: '序号',
      width: 60,
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'status',
      render: (v) => <Tag>{statusMap[v]}</Tag>,
    },
    {
      title: '是否发布',
      width: 120,
      dataIndex: 'pub',
      render: (v, record) => (
        <Switch
          checkedChildren="是"
          unCheckedChildren="否"
          checked={v == 1}
          onChange={(val) => onPublish(val, record.id)}
        />
      ),
    },
    {
      title: '发布日期',
      width: 165,
      dataIndex: 'publicTime',
      render: (v) => moment(v).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      width: 200,
      render: () => (
        <Space size="middle">
          <a onClick={() => nav('/')}>编辑</a>
          <a onClick={() => message.error('删除')}>删除</a>
        </Space>
      ),
    },
  ];

  const searchFormConfig = () => ({
    actionBar: (
      <Button type="primary" icon={<PlusOutlined />} onClick={() => nav('/')}>
        添加
      </Button>
    ),
    buttonFloatRight: true,
    items: [
      { label: '标题', name: 'title', children: <Input placeholder="请输入" /> },
      { label: '作者', name: 'author', children: <Input placeholder="请输入" /> },
      {
        label: '是否发布',
        name: 'pub',
        children: (
          <Select placeholder="请选择">
            <Select.Option value="">全部</Select.Option>
            <Select.Option value={1}>是</Select.Option>
            <Select.Option value={0}>否</Select.Option>
          </Select>
        ),
      },
      {
        label: '发布日期',
        name: 'pubDate',
        realNames: ['startTime', 'endTime'],
        children: <RangePicker style={{ width: '100%' }} />,
      },
      undefined,
    ],
  });

  return (
    <div>
      <div style={{ marginBottom: 12 }}>当前Tab: {activeTab}</div>
      <SuperTable
        ref={tableRef}
        service={requestList}
        searchForm={searchFormConfig()}
        tableProps={{ columns, rowKey: 'id' }}
        paginationParams={{ current: 1, size: 5 }}
        tabs={{
          showTotal: true,
          root: {
            activeKey: activeTab,
            onChange: (k) => setActiveTab(k),
          },
          panes: [
            { tab: '全部', filterParams: { status: undefined } },
            { tab: '待审批', filterParams: { status: 0 } },
            { tab: '已通过', filterParams: { status: 1 } },
            { tab: '已驳回', filterParams: { status: 2 } },
          ],
        }}
      />
    </div>
  );
}

const list = new Array(14).fill(0).map((_, index) => ({
  id: index,
  title: `标题${index}`,
  status: [1, 2, 2, 1, 0, 0, 1, 1, 0, 2, 0, 0, 1, 2][index],
  pub: index % 3 > 0 ? 1 : 0,
  publicTime: Date.now() - 71236400 * index,
}));

function requestList(params: any) {
  const records = list.filter((el) => {
    if (typeof params.status !== 'number') return true;
    else return el.status === params.status;
  });
  const response = {
    data: {
      total: records.length,
      totals: [14, 6, 5, 3],
      records,
    },
  };
  console.log('requestList2', params, response);
  return new Promise((r) => setTimeout(() => r(response), 1000));
}

function requestPublish(id, published) {
  console.log('requestPublish', id, published);
  return Promise.resolve();
}
