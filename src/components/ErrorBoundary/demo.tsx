import { Card } from 'antd';
import { useState } from 'react';

import { ErrorBoundary } from './index';

export const DemoErrorBoundary = () => ({
  title: 'ErrorBoundary',
  desc: '捕获组件树异常，UI优雅降级',
  children: <Demo />,
});

function Demo() {
  const [crash, setCrash] = useState(0);
  if (crash === 1) throw new Error('app crash inside DemoErrorBoundary');
  return (
    <div>
      <button onClick={() => setCrash(1)} style={{ marginRight: 24 }}>
        点我干掉整个页面
      </button>
      <button onClick={() => setCrash(2)} style={{ marginRight: 24 }}>
        点我干掉子组件树
      </button>

      <ErrorBoundary>
        <ChildComponent crash={crash} />
      </ErrorBoundary>
    </div>
  );
}

function ChildComponent({ crash }: { crash: number }) {
  if (crash === 2) throw new Error('app crash inside DemoErrorBoundary');
  return (
    <Card style={{ marginTop: 24 }}>
      <h2>子组件树</h2>
      <p>content111</p>
      <Card>
        <p>content222</p>
      </Card>
    </Card>
  );
}
