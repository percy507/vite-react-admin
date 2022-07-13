import { Exception } from '@/components/Exception';
import { PageWrapper } from '@/components/PageWrapper';

import styles from './style.module.less';

export default function Page404() {
  return (
    <PageWrapper className={styles.Page1}>
      <Exception type={404} />
    </PageWrapper>
  );
}
