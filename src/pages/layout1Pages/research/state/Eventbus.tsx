import { Button, Card } from 'antd';
import { useEffect, useState } from 'react';

import { eventbus } from '@/utils';

import { TrackUpdate } from './helper';
import styles from './style.module.less';

export function Eventbus() {
  useEffect(() => {
    let unbindEvent = eventbus.on('event111', (args) => {
      console.log('当前组件 [event111] payload', args);
    });

    return () => {
      unbindEvent();
    };
  }, []);

  return (
    <Card
      title={
        <a href="https://github.com/ai/nanoevents" target="_blank" rel="noreferrer">
          nanoevents(事件总线)
        </a>
      }
      style={{ marginBottom: 16 }}>
      <TrackUpdate />
      <Button
        onClick={() => {
          eventbus.emit('event111', { num: ~~(Math.random() * 1000) });
        }}>
        触发事件 event111
      </Button>
      <Child1 />
    </Card>
  );
}

function Child1() {
  const [data, setData] = useState({ num: 0 });

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
    <fieldset className={styles.testBlock}>
      <legend>组件1</legend>
      <TrackUpdate />
      <div>{data.num}</div>
    </fieldset>
  );
}
