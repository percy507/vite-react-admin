import { Button, Card, Space } from 'antd';
import React, { Suspense } from 'react';
import { useSnapshot } from 'valtio';

import { TrackUpdate } from '../helper';
import styles from '../style.module.less';
import { proxyPerson, randomAsyncValue, resetHobbies } from './store';

export function TestValtio() {
  return (
    <Card
      title={
        <a href="https://github.com/pmndrs/valtio" target="_blank" rel="noreferrer">
          valtio (Valtio makes proxy-state simple for React and Vanilla)
        </a>
      }
      style={{ marginBottom: 16 }}>
      <TrackUpdate />
      <Child1 />
    </Card>
  );
}

function Child1() {
  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1</legend>
      <TrackUpdate />

      <Suspense fallback={<div>Loading...</div>}>
        <PreviewValue />
      </Suspense>
      <Child11 />
      <Child12 />
      <Child13 />
    </fieldset>
  );
}

function PreviewValue() {
  const snap = useSnapshot(proxyPerson);

  return (
    <div style={{ marginTop: 24, padding: 12, background: '#f5f5f5' }}>
      <TrackUpdate />
      <div style={{ display: 'flex' }}>
        <b style={{ flexShrink: 0, marginRight: 12 }}>JSON值:</b>
        <pre>{JSON.stringify(snap)}</pre>
      </div>
    </div>
  );
}

function Child11() {
  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1-1</legend>
      <TrackUpdate />
      <Space>
        <Button onClick={() => (proxyPerson.name = Math.random().toString(16).slice(-6))}>
          随机名字
        </Button>
        <Button onClick={() => proxyPerson.age++}>年龄+1</Button>
        <Button
          onClick={() => proxyPerson.hobbies.push(Math.random().toString(16).slice(-4))}>
          随机爱好
        </Button>
        <Button onClick={() => resetHobbies()}>清空爱好</Button>
        <Button onClick={() => randomAsyncValue()}>修改异步值</Button>
      </Space>
    </fieldset>
  );
}

const Child12 = React.memo(function Child12() {
  const { name, age, birthYear } = useSnapshot(proxyPerson);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1-2 (use React.memo)</legend>
      <TrackUpdate />
      <div>名字: {name}</div>
      <div>年龄: {age}</div>
      <div>出生年份: {birthYear}</div>
    </fieldset>
  );
});

const Child13 = React.memo(function Child13() {
  const { hobbies } = useSnapshot(proxyPerson);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1-3 (use React.memo)</legend>
      <TrackUpdate />
      <div>爱好: {JSON.stringify(hobbies)}</div>
    </fieldset>
  );
});
