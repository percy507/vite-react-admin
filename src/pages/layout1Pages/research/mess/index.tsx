import './style.less';

import { Col, Row } from 'antd';

import { PageWrapper } from '@/components/PageWrapper';

import { DOM2Img } from './DOM2Img';
import { ReactWindow } from './ReactWindow';
import styles from './style.module.less';
import { TagsInput } from './TagsInput';

export default function MessPage() {
  const col = (span: number, children: React.ReactNode) => {
    return (
      <Col span={span} style={{ marginBottom: 12 }}>
        {children}
      </Col>
    );
  };

  return (
    <PageWrapper contentClassName={styles.root}>
      <Row gutter={16}>
        {col(12, <DOM2Img />)}
        {col(12, <ReactWindow />)}
        {col(24, <TagsInput />)}
      </Row>
    </PageWrapper>
  );
}
