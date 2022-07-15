import { Button, Col, Divider, Form, Row, Space } from 'antd';
import moment from 'moment';

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
        /** 用于接口的字段名称，一般用于日期区间的字段 */
        realNames?: string[];
        /** 用于展示的字段名称 */
        label: string;
        children: JSX.Element;
      }
    | undefined
  )[];
  /** 定义 SearchForm 组件下方的内容（一般为操作按钮） */
  actionBar?: JSX.Element;
  /** 点击查询按钮的回调函数 */
  onSearch: (value) => void;
  /** 查询和重置的按钮组是否向右浮动，默认不浮动 */
  buttonFloatRight?: boolean;
}

export function SearchForm(props: SearchFormProps) {
  const { onSearch, items, actionBar, buttonFloatRight = false } = props;
  const [form] = Form.useForm();

  return (
    <div className={styles.root}>
      <Form
        form={form}
        layout="inline"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={(values) => {
          let params = { ...values };
          for (let key in values) {
            const val = values[key];
            if (moment.isMoment(val)) {
              params[key] = val.format('YYYY-MM-DD HH:mm:ss');
            } else if (Array.isArray(val) && val.find((el) => moment.isMoment(el))) {
              delete params[key];
              const targetItem = items.find((el) => el?.name === key)!;
              targetItem.realNames?.forEach((name, index) => {
                params[name] = val[index].format('YYYY-MM-DD HH:mm:ss');
              });
            }
          }
          onSearch(params);
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
                    onSearch({});
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
}
