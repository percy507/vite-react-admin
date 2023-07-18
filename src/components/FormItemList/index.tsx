import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormItemProps } from 'antd';
import { Button, Col, Form, Row } from 'antd';
import type { FormListProps } from 'antd/es/form';
import { clsx } from 'clsx';

import styles from './style.module.less';

interface FormItemListProps {
  /** 对接后端接口的字段名称 */
  name: FormListProps['name'];
  /** 最外层的表单item */
  itemProps?: FormItemProps & {
    getExtra?: (index: number) => React.ReactNode;
  };
  /** 可添加的项目的最大数量 */
  maxItemCount?: number;
  /** 每一行包括的子表单集合 */
  formItems: (FormItemProps & {
    getChildren?: (index: number) => React.ReactNode;
  })[];
  /** 校验规则 */
  rules?: FormListProps['rules'];
  label?: string;
  required?: boolean;
  /** 每一行展示的item数量，默认一行一个 */
  columnNum?: number;
  /** 元素间的间隙，默认24px */
  gutter?: number;
  /** default={text:'添加',width:200} */
  addButton?: { text?: string; width?: number | string };
  className?: string;
}

export function FormItemList(props: FormItemListProps) {
  let {
    label,
    name,
    rules,
    columnNum = 1,
    gutter = 24,
    maxItemCount = Infinity,
    itemProps = {},
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
            className={clsx(styles.formItemList, className)}
            data-flist>
            <Row gutter={gutter}>
              {fields.map((field, i1) => (
                <Col key={field.key} span={24 / columnNum}>
                  <Form.Item
                    required={false}
                    extra={itemProps.getExtra ? itemProps.getExtra(i1) : itemProps.extra}>
                    <div className={styles.formItem} data-flist-item>
                      <div>
                        {formItems.map((item, i2) => (
                          <Form.Item
                            noStyle
                            {...item}
                            {...field}
                            name={
                              item.name
                                ? [
                                    field.name,
                                    ...(Array.isArray(item.name)
                                      ? item.name
                                      : [item.name]),
                                  ]
                                : [field.name]
                            }
                            key={i2}>
                            {item.getChildren ? item.getChildren(i1) : item.children}
                          </Form.Item>
                        ))}
                      </div>
                      <DeleteOutlined
                        data-flist-delete-btn
                        className={styles.deleteBtn}
                        onClick={() => remove(field.name)}
                      />
                    </div>
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
                    data-flist-add-btn
                    type="dashed"
                    disabled={fields.length >= maxItemCount}
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
