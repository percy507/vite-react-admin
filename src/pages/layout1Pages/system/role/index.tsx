import { Button, Input, message, Modal, Select, Space } from 'antd';
import moment from 'moment';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useHasPermission } from '@/components/Authorized';
import { PageWrapper } from '@/components/PageWrapper';
import type { ColumnsType, SearchFormProps } from '@/components/SuperTable';
import { SuperTable } from '@/components/SuperTable';
import { requestDeleteRole, requestRoleList } from '@/services/system';
import { enumTag, enumToOptions, ROLE_STATUS, ROLE_STATUS_COLOR } from '@/utils/enum';
import { SYSTEM_AUTH } from '@/utils/enum_auth';

export default function RoleManage() {
  const nav = useNavigate();
  const hasPermission = useHasPermission();
  const tableRef = useRef<React.ElementRef<typeof SuperTable>>(null);

  const searchFormConfig: () => SearchFormProps = () => ({
    actionBar: hasPermission(SYSTEM_AUTH.角色_新增) ? (
      <Button type="primary" onClick={() => nav(`/l1/system/role/add`)}>
        新建角色
      </Button>
    ) : undefined,
    buttonFloatRight: true,
    items: [
      { label: '角色名称', name: 'roleName', children: <Input placeholder="请输入" /> },
      {
        label: '状态',
        name: 'status',
        children: (
          <Select placeholder="请选择" allowClear options={enumToOptions(ROLE_STATUS)} />
        ),
      },
    ],
  });

  const columns: ColumnsType<any> = [
    { title: '角色名称', dataIndex: 'roleName' },
    {
      title: '状态',
      width: 100,
      dataIndex: 'status',
      render: (v) => enumTag(v, ROLE_STATUS, ROLE_STATUS_COLOR),
    },
    { title: '备注', dataIndex: 'remark' },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 200,
      render: (v) => (v ? moment(v).format('YYYY-MM-DD HH:mm:ss') : '-'),
    },
  ];

  if (hasPermission([SYSTEM_AUTH.角色_编辑, SYSTEM_AUTH.角色_删除])) {
    columns.push({
      title: '操作',
      fixed: 'right',
      width: 180,
      render: (_, record) => {
        return (
          <Space size="middle">
            {hasPermission(SYSTEM_AUTH.角色_编辑) ? (
              <a onClick={() => nav(`/l1/system/role/edit/${record?.id}`)}>编辑</a>
            ) : undefined}
            {hasPermission(SYSTEM_AUTH.角色_删除) ? (
              <a
                style={{ color: 'red' }}
                onClick={() => {
                  Modal.confirm({
                    title: '确认删除该角色吗？',
                    onOk: () => {
                      return requestDeleteRole(record.id).then(() => {
                        message.success('删除成功');
                        tableRef.current?.freshRequest();
                      });
                    },
                  });
                }}>
                删除
              </a>
            ) : undefined}
          </Space>
        );
      },
    });
  }

  return (
    <PageWrapper header={{ title: '角色管理' }}>
      <SuperTable
        ref={tableRef}
        service={requestRoleList}
        searchForm={searchFormConfig()}
        tableProps={{ columns, rowKey: 'id' }}
      />
    </PageWrapper>
  );
}
