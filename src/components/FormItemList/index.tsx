import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormItemProps } from 'antd';
import { Button, Col, Form, Row, Space } from 'antd';
import type { FormListProps } from 'antd/es/form';
import { clsx } from 'clsx';

import styles from './style.module.less';

interface FormItemListProps {
  /** 对接后端接口的字段名称 */
  name: FormListProps['name'];
  /** 每一行包括的子表单集合 */
  formItems: FormItemProps[];
  /** 校验规则 */
  rules?: FormListProps['rules'];
  label?: string;
  required?: boolean;
  /** 每一行展示的item数量，默认一行一个 */
  columnNum?: number;
  /** default={text:'添加',width:200} */
  addButton?: { text?: string; width?: number };
  className?: string;
}

export function FormItemList(props: FormItemListProps) {
  let {
    label,
    name,
    rules,
    columnNum = 1,
    formItems,
    required = false,
    className,
  } = props;
  let addButton = { text: '添加', width: 200, ...props.addButton };

  if (required) {
    rules = [
      {
        validator: (_, value) =>
          !value || value.length === 0
            ? Promise.reject(new Error('至少添加一项'))
            : Promise.resolve(),
      },
      ...(rules || []),
    ];
  }

  return (
    <Form.List name={name} rules={rules}>
      {(fields, { add, remove }, { errors }) => {
        return (
          <Form.Item
            label={label}
            required={required}
            className={clsx(styles.formItemList, className)}>
            <Row gutter={0}>
              {fields.map((field) => (
                <Col key={field.key} span={24 / columnNum}>
                  <Form.Item required={false} className={styles.formItem}>
                    <Space>
                      {formItems.map((item, index) => (
                        <Form.Item
                          {...item}
                          {...field}
                          name={
                            item.name
                              ? [
                                  field.name,
                                  ...(Array.isArray(item.name) ? item.name : [item.name]),
                                ]
                              : [field.name]
                          }
                          noStyle
                          key={index}>
                          {item.children}
                        </Form.Item>
                      ))}
                    </Space>

                    <DeleteOutlined
                      className={styles.deleteBtn}
                      onClick={() => remove(field.name)}
                    />
                  </Form.Item>
                </Col>
              ))}
            </Row>
            <Row gutter={0}>
              <Col span={24 / columnNum}>
                <Form.Item
                  className={clsx(
                    styles.addFormItem,
                    errors?.length ? styles.hasError : false,
                  )}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: addButton.width }}
                    icon={<PlusOutlined />}>
                    {addButton.text}
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        );
      }}
    </Form.List>
  );
}
