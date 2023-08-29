import { Button, Card } from 'antd';
import { Suspense } from 'react';
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
      <PreviewValue />
      <Child11 />
      <Child12 />
      <Child13 />
      <br />
      <Child14 />
      <Child15 />
    </fieldset>
  );
}

function PreviewValue() {
  const snap = useSnapshot(proxyPerson);
  const Value = ({ value }) => {
    return <>{JSON.stringify(value)}</>;
  };
  return (
    <div style={{ marginTop: 24, padding: 12, background: '#f5f5f5' }}>
      <TrackUpdate />
      <div style={{ display: 'flex' }}>
        <b style={{ flexShrink: 0, marginRight: 12 }}>JSON值:</b>
        <pre>
          <Suspense fallback={<div>Loading...</div>}>
            <Value value={snap} />
          </Suspense>
        </pre>
      </div>
    </div>
  );
}

function Child11() {
  return (
    <fieldset className={styles.testBlock} style={{ width: 400 }}>
      <legend>组件1-1</legend>
      <TrackUpdate />
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        <Button onClick={() => (proxyPerson.name = Math.random().toString(16).slice(-6))}>
          修改name
        </Button>
        <Button onClick={() => proxyPerson.age++}>修改age</Button>
        <Button
          onClick={() => proxyPerson.hobbies.push(Math.random().toString(16).slice(-4))}>
          新增hobbies
        </Button>
        <Button onClick={() => resetHobbies()}>重置hobbies</Button>
        <Button onClick={() => randomAsyncValue()}>修改asyncValue</Button>
      </div>
    </fieldset>
  );
}

const Child12 = function Child12() {
  const { name, age, birthYear } = useSnapshot(proxyPerson);
  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1-2</legend>
      <TrackUpdate />
      <div>名字: {name}</div>
      <div>年龄: {age}</div>
      <div>出生年份: {birthYear}</div>
    </fieldset>
  );
};

const Child13 = function Child13() {
  const person = useSnapshot(proxyPerson);
  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1-3</legend>
      <TrackUpdate />
      <div>姓名: {person.name}</div>
      <button
        onClick={() => {
          // @ts-ignore
          person.name = Math.random().toString(16).slice(-6);
        }}>
        点我改名字(会报错，因为useSnapshot获取的值只读)
      </button>
    </fieldset>
  );
};

const Child14 = function Child14() {
  const person = useSnapshot(proxyPerson);
  return (
    <fieldset className={styles.testBlock} style={{ maxWidth: '50%' }}>
      <legend>组件1-4</legend>
      <TrackUpdate />
      <div>爱好: {JSON.stringify(person.hobbies)}</div>
      <div>年龄: {person.age}</div>
      <div style={{ marginTop: 6 }}>
        valtio的useSnapshot内部做了优化，它会收集组件中使用到的key，并且只有这些key的值更新时，才会触发组件重新渲染。这里注意与jotai区分。
      </div>
      <div>在本组件中，只有hobbies或age更新时，组件才会重新渲染。</div>
    </fieldset>
  );
};

const Child15 = function Child15() {
  const { birthYear } = useSnapshot(proxyPerson);
  return (
    <fieldset className={styles.testBlock} style={{ maxWidth: '50%' }}>
      <legend>组件1-5</legend>
      <TrackUpdate />
      <div>出生年份: {birthYear}</div>
      <div>birthYear是通过age计算出来的，修改age，birthYear也会更新</div>
    </fieldset>
  );
};
