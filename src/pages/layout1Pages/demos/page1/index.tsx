import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Select, Space, Switch } from 'antd';
import moment from 'moment';
// import { resolve } from 'path';
import React, { useRef } from 'react';
import { PhotoView } from 'react-photo-view';
import { useNavigate } from 'react-router-dom';

import { AsyncButton } from '@/components/AsyncButton';
import { Authorized, useHasPermission } from '@/components/Authorized';
import { PageWrapper } from '@/components/PageWrapper';
import { SuperTable } from '@/components/SuperTable';
import { requestDelete, requestList, requestPublish } from '@/services/page1';

import { EnumStatus, renderStatusTag } from './helper';
import styles from './style.module.less';

export default function ActivityManage() {
  const hasPermission = useHasPermission();
  const nav = useNavigate();
  const tableRef = useRef<React.ElementRef<typeof SuperTable>>(null);

  const bclist = [
    { path: '', breadcrumbName: '一级菜单' },
    { path: '', breadcrumbName: '二级菜单' },
  ];

  const onPublish = (val, record) => {
    requestPublish(record, val).then(() => {
      message.success('操作成功');
      tableRef.current?.request();
    });
    console.log(val, record, 'val');
  };

  const searchFormConfig = {
    actionBar: (
      <Button type="primary" icon={<PlusOutlined />} onClick={() => nav('./add')}>
        添加
      </Button>
    ),
    buttonFloatRight: true,
    items: [
      { label: '活动标题', name: 'title', children: <Input placeholder="请输入" /> },
      {
        label: '活动状态',
        name: 'status',
        children: (
          <Select placeholder="请选择">
            <Select.Option value=""> 全部</Select.Option>
            {Object.keys(EnumStatus).map((k) => {
              return (
                <Select.Option key={k} value={+k}>
                  {EnumStatus[k]}
                </Select.Option>
              );
            })}
          </Select>
        ),
      },
    ],
  };

  const columns = [
    {
      title: '序号',
      width: 70,
      dataIndex: 'id',
    },
    {
      title: '活动标题',
      dataIndex: 'title',
      width: 170,
    },
    {
      title: '封面',
      dataIndex: 'coverFiles',
      width: 170,
      render: (v) =>
        v ? (
          <PhotoView src={(v[0] || {}).id}>
            <img src={(v[0] || {}).id} width="100" alt="" />
          </PhotoView>
        ) : (
          '-'
        ),
    },
    {
      title: '活动时间',
      width: 290,
      // dataIndex: 'timeRange',
      render: (_, data) =>
        moment(data.startTime).format('YYYY-MM-DD') +
        '----' +
        moment(data.endTime).format('YYYY-MM-DD'),
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'status',
      render: (v) => (v != null ? renderStatusTag(v) : '-'),
    },
    {
      title: '人数',
      dataIndex: 'participateNum',
      width: 100,
    },
    {
      title: '是否展示',
      dataIndex: 'display',
      width: 120,
      render: (v, record) =>
        hasPermission() ? (
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            checked={v == true}
            onChange={(val) => onPublish(val, record.id)}></Switch>
        ) : (
          '-'
        ),
    },
    {
      title: '操作',
      width: 300,
      render: (_, record) => (
        <Space size="middle">
          <Authorized>
            <a
              onClick={() => {
                nav('./detail/' + record.id);
              }}>
              查看详情
            </a>
          </Authorized>
          <Authorized>
            {record.status !== 3 && (
              <a
                onClick={() => {
                  nav('./edit/' + record.id);
                }}>
                编辑
              </a>
            )}
          </Authorized>
          <Authorized>
            <AsyncButton
              style={{ color: 'red' }}
              content="删除"
              popContent="确定删除?"
              asyncService={() => {
                return requestDelete(record.id).then(() => {
                  message.success('删除成功');
                  tableRef.current?.request();
                });
              }}></AsyncButton>
          </Authorized>
        </Space>
      ),
    },
  ];

  return (
    <PageWrapper
      className={styles.UserManage}
      header={{ breadcrumb: { routes: bclist } }}>
      <SuperTable
        ref={tableRef}
        service={requestList}
        searchForm={searchFormConfig}
        tableProps={{
          rowKey: 'id',
          columns,
        }}
      />
    </PageWrapper>
  );
}
