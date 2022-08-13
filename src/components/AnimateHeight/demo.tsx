import { useState } from 'react';

import { AnimateHeight } from './index';

export const DemoAnimateHeight = () => ({
  title: 'AnimateHeight',
  desc: '显示或隐藏内容（height有切换动画）',
  children: <Demo />,
});

function Demo() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>toggle</button>

      <AnimateHeight visible={visible}>
        <ul>
          <li>xdsafaf00001</li>
          <li>xdsafaf00002</li>
          <li>xdsafaf00003</li>
          <li>xdsafaf00004</li>
          <li>xdsafaf00005</li>
          <li>xdsafaf00006</li>
          <li>xdsafaf00007</li>
          <li>xdsafaf00008</li>
          <li>xdsafaf00009</li>
          <li>xdsafaf00010</li>
        </ul>
      </AnimateHeight>
    </div>
  );
}
