import { styled } from '@stitches/react';

import { Authorized } from './index';

export const DemoAuthorized = () => ({
  title: 'Authorized',
  desc: '根据是否拥有权限，条件式渲染组件',
  children: <Demo />,
});

const Wrapper = styled('div', {
  display: 'flex',
  '&>div': {
    marginRight: 20,
  },
});

function Demo() {
  return (
    <Wrapper>
      <Authorized auth="DemoAuthorized__111">
        <div>内容111(有权限)</div>
      </Authorized>
      <Authorized auth="DemoAuthorized__222">
        <div>内容222(无权限)</div>
      </Authorized>
      <Authorized
        auth="DemoAuthorized__222"
        fallback={<div style={{ color: 'red' }}>内容333(无权限)，展示fallback内容</div>}>
        <div>内容333(无权限)</div>
      </Authorized>
      <Authorized auth={['DemoAuthorized__111', 'DemoAuthorized__222']}>
        <div>内容444(有权限)</div>
      </Authorized>
    </Wrapper>
  );
}
