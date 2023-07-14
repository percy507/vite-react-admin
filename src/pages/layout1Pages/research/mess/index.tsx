import { PageWrapper } from '@/components/PageWrapper';

import { DOM2Img } from './DOM2Img';
import { ReactWindow } from './ReactWindow';
import styles from './style.module.less';

export default function MessPage() {
  return (
    <PageWrapper contentClassName={styles.root}>
      <DOM2Img />
      <ReactWindow />
    </PageWrapper>
  );
}
