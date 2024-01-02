import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  DatePicker,
  Input,
  message,
  Select,
  Space,
  Switch,
} from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { AsyncButton } from '@/components/AsyncButton';
import { Authorized, useHasPermission } from '@/components/Authorized';
import { PageWrapper } from '@/components/PageWrapper';
import { PreviewImage } from '@/components/PreviewImage';
import type { ColumnsType, SearchFormProps } from '@/components/SuperTable';
import {
  deconverterDateRange,
  SuperTable,
  useSaveListPageState,
} from '@/components/SuperTable';
import { requestDelete, requestList, requestPublish } from '@/services/demo';
import {
  enumTag,
  enumToOptions,
  PROCESS_STATUS,
  PROCESS_STATUS_COLOR,
} from '@/utils/enum';

import styles from './style.module.less';

const { RangePicker } = DatePicker;

const cities = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default function ListPage() {
  const saveListPageState = useSaveListPageState();
  const hasPermission = useHasPermission();
  const nav = useNavigate();
  const tableRef = useRef<React.ElementRef<typeof SuperTable>>(null);

  const onPublish = (val, record) => {
    requestPublish(record, val).then(() => {
      message.success('操作成功');
      tableRef.current?.request();
    });
  };

  const searchFormConfig: SearchFormProps = {
    actionBar: (
      <Button type="primary" icon={<PlusOutlined />} onClick={() => nav('./add')}>
        添加
      </Button>
    ),
    buttonFloatRight: true,
    items: [
      { label: '输入框', name: 'key1', children: <Input placeholder="请输入" /> },
      {
        label: '选择框',
        name: 'key2',
        children: (
          <Select
            placeholder="请选择"
            allowClear
            showSearch
            options={enumToOptions(PROCESS_STATUS)}
            filterOption={(input, option) =>
              (option!.label as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        ),
      },
      {
        label: '时间区间',
        name: 'key3',
        converter: (v) => ({ startTime: v[0].valueOf(), endTime: v[1].valueOf() }),
        deconverter: (val) => deconverterDateRange(val['startTime'], val['endTime']),
        children: (
          <RangePicker
            allowClear
            disabledDate={(v) => v > moment().endOf('day')}
            style={{ width: '100%' }}
          />
        ),
      },
      {
        label: '级联选择',
        name: 'key4',
        children: (
          <Cascader
            allowClear
            changeOnSelect
            expandTrigger="hover"
            options={cities}
            placeholder="请选择"
          />
        ),
      },
      undefined,
    ],
  };

  const columns: ColumnsType<any> = [
    { title: '标题', width: 200, dataIndex: 'title', fixed: 'left' },
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (v) => (v ? <PreviewImage imgs={v} thumbWidth="100" /> : '-'),
    },
    {
      title: '发布日期',
      width: 200,
      dataIndex: 'publicTime',
      render: (v) => moment(v).format('YYYY-MM-DD HH:mm:ss'),
    },
    { title: '字段1', dataIndex: 'key' },
    { title: '字段2', dataIndex: 'key' },
    { title: '字段3', dataIndex: 'key' },
    { title: '字段4', dataIndex: 'key' },
    { title: '字段5', dataIndex: 'key' },
    {
      title: '状态',
      width: 110,
      dataIndex: 'status',
      render: (v) => enumTag(v, PROCESS_STATUS, PROCESS_STATUS_COLOR, '-'),
    },
    {
      title: '是否展示',
      dataIndex: 'pub',
      width: 100,
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
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Authorized>
            <a
              onClick={() => {
                saveListPageState(tableRef.current?.params);
                nav('./detail/' + record.id);
              }}>
              查看详情
            </a>
          </Authorized>
          <Authorized>
            {record.status !== PROCESS_STATUS.审核中 && (
              <a onClick={() => nav('./edit/' + record.id)}>编辑</a>
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
                  tableRef.current?.freshRequest();
                });
              }}
            />
          </Authorized>
        </Space>
      ),
    },
  ];

  return (
    <PageWrapper className={styles.UserManage} header={{ title: '基础列表页' }}>
      <SuperTable
        ref={tableRef}
        service={requestList}
        searchForm={searchFormConfig}
        enableIndex="fixedLeft"
        tableProps={{ rowKey: 'id', columns, scroll: { x: 1600 } }}
      />
    </PageWrapper>
  );
}
