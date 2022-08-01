import type { FormInstance } from 'antd';
import { Button, Col, Divider, Form, Row, Space } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';

import styles from './style.module.less';

export interface SearchFormProps {
  /**
   * 定义筛选条件的表单列表，默认一行展示三项。如果想要某一项只占空间但不展示，
   * 只需要将其设置为 undefined 即可。
   */
  items: (
    | {
        /** 用于接口的字段名称，日期区间的表单除外 */
        name: string;
        /** 用于转换表单值为接口字段 */
        converter?: (value: NonNullable<any>) => Record<string, any>;
        /** 用于展示的字段名称 */
        label: string;
        children: JSX.Element;
      }
    | undefined
  )[];
  /** 定义 SearchForm 组件下方的内容（一般为操作按钮） */
  actionBar?: JSX.Element;
  /** 点击查询按钮的回调函数 */
  onSearch?: (value?: any) => void;
  /** 查询和重置的按钮组是否向右浮动，默认不浮动 */
  buttonFloatRight?: boolean;
}

export const SearchForm = forwardRef<{ form: FormInstance }, SearchFormProps>(
  function InnerSearchForm(props, ref) {
    const { onSearch, items, actionBar, buttonFloatRight = false } = props;
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({ form }), [form]);

    return (
      <div className={styles.root}>
        <Form
          form={form}
          layout="inline"
          labelWrap
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={(values) => {
            let params = { ...values };
            items.forEach((el) => {
              if (el && el.converter && params[el.name] != null) {
                params = { ...params, ...el.converter(params[el.name]) };
                delete params[el.name];
              }
            });
            if (onSearch) onSearch(params);
          }}>
          <Row style={{ width: '100%' }}>
            {items.map((el, index) => (
              <Col span={8} key={index} style={{ marginBottom: 16 }}>
                {!el ? (
                  '\u0020'
                ) : (
                  <Form.Item name={el.name} label={el.label}>
                    {el.children}
                  </Form.Item>
                )}
              </Col>
            ))}
            <Col span={8} style={{ marginBottom: 16 }}>
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Space style={buttonFloatRight ? { float: 'right' } : undefined}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={() => {
                      form.resetFields();
                      if (onSearch) onSearch();
                    }}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {actionBar && (
          <>
            <Divider />
            <div>{actionBar}</div>
          </>
        )}
      </div>
    );
  },
);
