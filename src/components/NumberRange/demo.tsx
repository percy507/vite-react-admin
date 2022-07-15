import { useState } from 'react';

import type { ValueType } from './index';
import { NumberRange } from './index';

export const DemoNumberRange = () => ({
  title: 'NumberRange',
  desc: '(表单组件)数字区间输入框',
  children: <Demo />,
});

function Demo() {
  const [value, setValue] = useState<ValueType>();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 16 }}>价格区间: </div>
        <NumberRange
          value={value}
          onChange={(val) => setValue(val)}
          max={99999}
          min={0}
          gap={14}
          style={{ width: 300 }}
          startProps={{ placeholder: '请输入', addonAfter: '元' }}
          endProps={{ placeholder: '请输入', addonAfter: '元' }}
        />
      </div>
      <div style={{ marginTop: 20 }}>{JSON.stringify(value, null, 2)}</div>
    </div>
  );
}
