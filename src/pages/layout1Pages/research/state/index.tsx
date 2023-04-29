import { PageWrapper } from '@/components/PageWrapper';

import { Eventbus } from './Eventbus';
import { Jotai } from './Jotai';

export default function Page1() {
  return (
    <PageWrapper>
      <Eventbus />
      <Jotai />
    </PageWrapper>
  );
}
