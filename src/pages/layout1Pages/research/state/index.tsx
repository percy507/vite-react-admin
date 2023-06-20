import { PageWrapper } from '@/components/PageWrapper';

import { TestJotai } from './jotai';
import { TestNanoevents } from './nanoevents';
import { TestValtio } from './valtio';

export default function Page1() {
  return (
    <PageWrapper>
      <TestNanoevents />
      <TestValtio />
      <TestJotai />
    </PageWrapper>
  );
}
