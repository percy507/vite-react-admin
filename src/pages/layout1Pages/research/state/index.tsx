import { Button, Card } from 'antd';
import { useEffect, useState } from 'react';

import { PageWrapper } from '@/components/PageWrapper';
import { eventbus } from '@/utils/eventbus';

const link = (title, href) => (
  <a href={href} target="_blank" rel="noreferrer">
    {title}
  </a>
);

export default function Page1() {
  useEffect(() => {
    let unbindEvent = eventbus.on('event111', (args) => {
      console.log('当前组件 [event111] payload', args);
    });

    return () => {
      unbindEvent();
    };
  }, []);

  return (
    <PageWrapper>
      <Card
        title={link('nanoevents(事件总线)', 'https://github.com/ai/nanoevents')}
        style={{ marginBottom: 16 }}>
        <Button
          onClick={() => {
            eventbus.emit('event111', { time: Date.now() });
          }}>
          触发事件 event111
        </Button>
        <Child1 />
      </Card>

      <Card
        title={link('jotai', 'https://github.com/pmndrs/jotai')}
        style={{ marginBottom: 16 }}>
        TODO
      </Card>
    </PageWrapper>
  );
}

function Child1() {
  const [data, setData] = useState({ time: 0 });

  useEffect(() => {
    let unbind = eventbus.on('event111', (args) => {
      setData(args);
      console.log('子组件 [event111] payload', args);
    });

    return () => {
      unbind();
    };
  }, []);

  return (
    <div style={{ padding: 12, marginTop: 24, border: '1px solid #ddd' }}>
      我是子组件111 ==&gt; {data.time}
    </div>
  );
}
