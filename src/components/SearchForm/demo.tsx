import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SearchFormProps } from './index';
import { SearchForm } from './index';

const { RangePicker } = DatePicker;

export const DemoSearchForm = () => ({
  title: 'SearchForm',
  desc: '配置化搜索表单',
  children: <Demo />,
});

function Demo() {
  const nav = useNavigate();
  const [value, setValue] = useState();

  const searchFormConfig: SearchFormProps = {
    actionBar: (
      <Button type="primary" icon={<PlusOutlined />} onClick={() => nav('/')}>
        添加
      </Button>
    ),
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
    onSearch: (value) => {
      setValue(value);
    },
  };

  return (
    <div>
      <SearchForm {...searchFormConfig} />
      <div>value: {JSON.stringify(value)}</div>
    </div>
  );
}
