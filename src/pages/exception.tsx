import { Exception } from '@/components/Exception';
import { PageWrapper } from '@/components/PageWrapper';

export function Page403() {
  return (
    <PageWrapper fullHeight>
      <Exception type={403} />
    </PageWrapper>
  );
}

export function Page404() {
  return (
    <PageWrapper fullHeight>
      <Exception type={404} />
    </PageWrapper>
  );
}

export function Page500() {
  return (
    <PageWrapper fullHeight>
      <Exception type={500} />
    </PageWrapper>
  );
}
