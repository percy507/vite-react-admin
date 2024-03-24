import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, Col, Divider, Form, Row, Space } from 'antd';
import moment from 'moment';
import { forwardRef, useImperativeHandle, useState } from 'react';

import styles from './style.module.less';

export const deconverterDateRange = (start?: string, end?: string) => {
  if (!start || !end) return;
  return [moment(start), moment(end)];
};

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
        /** 用于转换接口字段为表单值 */
        deconverter?: (value: Record<string, any>) => NonNullable<any>;
        /** 用于展示的字段名称 */
        label: string;
        /** 初始默认值 */
        initialValue?: any;
        children: JSX.Element;
      }
    | undefined
  )[];
  /** 定义查询按钮前的额外按钮的内容 */
  extraButton?: React.ReactNode;
  /** 定义 SearchForm 组件下方的内容（一般为操作按钮） */
  actionBar?: JSX.Element;
  /** 点击查询按钮的回调函数 */
  onSearch?: (value?: any) => void;
  /** 查询和重置的按钮组是否向右浮动，默认不浮动 */
  buttonFloatRight?: boolean;
  /** 是否启用筛选项的收起展开 */
  enableFold?: boolean;
}

export const SearchForm = forwardRef<{ form: FormInstance }, SearchFormProps>(
  function InnerSearchForm(props, ref) {
    const {
      onSearch,
      items,
      extraButton,
      actionBar,
      buttonFloatRight = false,
      enableFold = false,
    } = props;
    const [form] = Form.useForm();
    const [folded, setFolded] = useState(false);

    useImperativeHandle(ref, () => ({ form }), [form]);

    const convertValues = (values: any) => {
      let params = { ...values };
      items.forEach((el) => {
        if (el && el.converter && params[el.name] != null) {
          // 如果是日期范围类型的表单，开始时间取选中日期的00:00:00，结束时间取选中日期的23:59:59
          if (
            Array.isArray(params[el.name]) &&
            params[el.name].length === 2 &&
            params[el.name].every((el) => moment.isMoment(el))
          ) {
            params[el.name][0] = params[el.name][0].startOf('day');
            params[el.name][1] = params[el.name][1].endOf('day');
          }

          let realParams = el.converter(params[el.name]);
          params = { ...params, ...realParams };
          if (Object.prototype.hasOwnProperty.call(realParams, el.name)) return;
          else delete params[el.name];
        }
      });
      return params;
    };

    return (
      <div className={styles.root}>
        <Form
          form={form}
          layout="inline"
          labelWrap
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={(values) => {
            if (onSearch) onSearch(convertValues(values));
          }}>
          <Row style={{ width: '100%' }}>
            {items.map((el, index) => {
              if (enableFold && !folded && index >= 2) return null;
              return (
                <Col span={8} key={index} style={{ marginBottom: 16 }}>
                  {!el ? (
                    '\u0020'
                  ) : (
                    <Form.Item
                      name={el.name}
                      label={el.label}
                      initialValue={el.initialValue}>
                      {el.children}
                    </Form.Item>
                  )}
                </Col>
              );
            })}
            <Col span={8} style={{ marginBottom: 16 }}>
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Space style={buttonFloatRight ? { float: 'right' } : undefined}>
                  {extraButton}
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={() => {
                      form.resetFields();
                      if (onSearch) onSearch(convertValues(form.getFieldsValue()));
                    }}>
                    重置
                  </Button>
                  {!folded && enableFold && (
                    <Button
                      type="link"
                      icon={<DownOutlined />}
                      onClick={() => setFolded(true)}>
                      展开
                    </Button>
                  )}
                  {folded && enableFold && (
                    <Button
                      type="link"
                      icon={<UpOutlined />}
                      onClick={() => setFolded(false)}>
                      收起
                    </Button>
                  )}
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
