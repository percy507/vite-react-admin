import { Exception } from '@/components/Exception';
import { PageWrapper } from '@/components/PageWrapper';

export default function Page404() {
  return (
    <PageWrapper>
      <Exception type={404} />
    </PageWrapper>
  );
}
