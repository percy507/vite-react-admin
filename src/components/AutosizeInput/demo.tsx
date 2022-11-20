import { useState } from 'react';

import { AutosizeInput } from './index';

export const DemoAutosizeInput = () => ({
  title: 'AutosizeInput',
  desc: 'A text input for React that resizes itself to the current content.',
  children: <Demo />,
});

function Demo() {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <AutosizeInput
        placeholder="我是输入框"
        style={{ border: '1px solid #666' }}
        value={value}
        onChange={function (event) {
          console.log('onChange', event);
          setValue(event.target.value);
        }}
      />
    </div>
  );
}
