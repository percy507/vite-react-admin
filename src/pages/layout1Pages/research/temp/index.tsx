import { Card } from 'antd';

import { PageWrapper } from '@/components/PageWrapper';

import styles from './style.module.less';

export default function Page1() {
  return (
    <PageWrapper>
      <Card title="xxx">
        <div className={styles.root}></div>
      </Card>
    </PageWrapper>
  );
}
