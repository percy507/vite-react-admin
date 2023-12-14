import type { FormItemProps } from 'antd';
import { Col, Form } from 'antd';
import React from 'react';

/** 详情页自定义 col */
export const detailCol = (
  span: number,
  label: React.ReactNode,
  value: React.ReactNode,
  formItemProps?: FormItemProps & { key?: React.Key },
) => {
  const labelColSpan = (12 / span) * 6;
  const wrapperColSpan = 24 - labelColSpan;
  return (
    <Col span={span} key={formItemProps?.key}>
      <Form.Item
        {...formItemProps}
        labelCol={{ span: labelColSpan }}
        wrapperCol={{ span: wrapperColSpan }}
        label={label}>
        {value ?? '-'}
      </Form.Item>
    </Col>
  );
};

/** 用于 Input 的 onKeyDown 事件，从而让输入框只输入特定的字符 */
export const OnKeyDown = {
  /** 仅允许输入数字或横杠字符 */
  onlyNumber: (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (/Arrow|Backspace|-|[0-9]/.test(event.key)) return;
    if ((event.ctrlKey || event.metaKey) && /[axcv]/.test(event.key)) return;
    event.preventDefault();
  },
};
