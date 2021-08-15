import { Card } from 'antd';
import React from 'react';

import PageWrapper from '@/components/PageWrapper';

import styles from './style.module.less';

export default function Page3() {
  return (
    <PageWrapper className={styles.page3}>
      <Card>Page3</Card>
    </PageWrapper>
  );
}
