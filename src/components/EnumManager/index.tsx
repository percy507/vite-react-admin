import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

import styles from './style.module.less';

const { Option } = Select;

interface EnumManagerProps {
  /** @default 10 */
  maxLength?: number;
  /** 是否在删除时进行二次确认？ @default false */
  confirmDelete?: boolean;
  /** 用于更新枚举字段的接口集合 */
  services: {
    /** 请求接口 */
    get: {
      request: (params?: any) => Promise<any>;
      /** 额外的参数 */
      params?: Record<string, any>;
    };
    /** 更新接口（添加或更新操作） */
    update: {
      request: (params?: any) => Promise<any>;
      params?: Record<string, any>;
    };
    /** 删除接口 */
    delete: {
      request: (params?: any) => Promise<any>;
      params?: Record<string, any>;
    };
  };
  value?: string;
  onChange?: (value?: string) => void;
}

export function EnumManager(props: EnumManagerProps) {
  const { maxLength = 10, confirmDelete = false, services, onChange, value } = props;
  const [list, setList] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState(value);
  const [addValue, setAddValue] = useState('');
  const [isEditSelected, setIsEditSelected] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [oldEditValue, setOldEditValue] = useState('');
  const [updating, setUpdating] = useState(false);

  const requestList = () => {
    setUpdating(true);
    services.get
      .request({ ...(services.get.params || {}) })
      .then(({ data }) => {
        console.log('list', list);
        setList(Array.isArray(data) ? data : []);
      })
      .finally(() => setUpdating(false));
  };

  useEffect(() => {
    requestList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addVal = () => {
    const val = addValue.trim();
    if (!val) return message.error('内容不能为空');
    if (list.includes(val)) return message.error('内容已存在');
    setUpdating(true);
    services.update.request({ ...(services.update.params || {}), name: val }).then(() => {
      requestList();
      setAddValue('');
    });
  };

  const updateVal = () => {
    const val = editValue.trim();
    if (!val) return message.error('内容不能为空');
    if (list.find((el) => el === val && val !== selectedValue)) {
      return message.error('内容已存在');
    }
    setUpdating(true);
    services.update
      .request({ ...(services.update.params || {}), name: val, oldName: oldEditValue })
      .then(() => {
        requestList();
        setIsEditSelected(false);
        setEditValue('');
        setSelectedValue(val);
        if (onChange) onChange(val);
      });
  };

  const deleteVal = () => {
    setUpdating(true);
    services.delete
      .request({ ...(services.delete.params || {}), name: selectedValue })
      .then(() => {
        requestList();
        setSelectedValue(undefined);
        if (onChange) onChange(undefined);
      });
  };

  return (
    <div className={styles.enumManager}>
      <Spin spinning={updating}>
        {isEditSelected ? (
          <Space>
            <Input
              placeholder="请输入"
              value={editValue}
              maxLength={maxLength}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <Button onClick={() => setIsEditSelected(false)}>取消</Button>
            <Button type="primary" onClick={updateVal}>
              保存
            </Button>
          </Space>
        ) : (
          <Space>
            <Select
              allowClear
              defaultValue={selectedValue}
              value={selectedValue}
              style={{ width: 200 }}
              onChange={(val) => {
                setSelectedValue(val);
                if (onChange) onChange(val);
              }}
              placeholder="请选择"
              dropdownRender={(menu) => (
                <>
                  <Space align="center" style={{ padding: '0 8px 4px' }}>
                    <Input
                      maxLength={maxLength}
                      value={addValue}
                      onChange={(e) => setAddValue(e.target.value)}
                      placeholder="请输入"
                    />
                    <Typography.Link onClick={addVal} style={{ whiteSpace: 'nowrap' }}>
                      <PlusOutlined /> 添加
                    </Typography.Link>
                  </Space>
                  <Divider style={{ margin: '8px 0' }} />
                  {menu}
                </>
              )}>
              {list.map((el, index) => (
                <Option value={el} key={index}>
                  {el}
                </Option>
              ))}
            </Select>
            {selectedValue && (
              <>
                <EditOutlined
                  style={{ marginLeft: 16 }}
                  onClick={() => {
                    if (selectedValue === '') {
                      message.warning('请选择后再编辑！');
                      return;
                    }
                    setIsEditSelected(true);
                    setEditValue(selectedValue);
                    setOldEditValue(selectedValue);
                  }}
                />
                {confirmDelete ? (
                  <Popconfirm
                    title="确认删除此项吗?"
                    onConfirm={deleteVal}
                    onCancel={() => {}}
                    okText="确认"
                    cancelText="取消">
                    <DeleteOutlined
                      style={{ marginLeft: 16, color: 'red' }}
                      onClick={() => {}}
                    />
                  </Popconfirm>
                ) : (
                  <DeleteOutlined
                    style={{ marginLeft: 16, color: 'red' }}
                    onClick={() => {
                      deleteVal();
                    }}
                  />
                )}
              </>
            )}
          </Space>
        )}
      </Spin>
    </div>
  );
}
