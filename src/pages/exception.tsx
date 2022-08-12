import { Exception } from '@/components/Exception';
import { PageWrapper } from '@/components/PageWrapper';

export function Page404() {
  return (
    <PageWrapper>
      <Exception type={404} />
    </PageWrapper>
  );
}

export function Page500() {
  return (
    <PageWrapper>
      <Exception type={500} />
    </PageWrapper>
  );
}
