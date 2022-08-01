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
