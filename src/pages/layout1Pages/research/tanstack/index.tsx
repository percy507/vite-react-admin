import { Card } from 'antd';

import { PageWrapper } from '@/components/PageWrapper';

import styles from './style.module.less';
import { ReactTable } from './table';

export default function TanStackComponents() {
  return (
    <PageWrapper className={styles.TanStackComponents}>
      <Card title="@tanstack/react-table">
        <ReactTable />
      </Card>
    </PageWrapper>
  );
}
