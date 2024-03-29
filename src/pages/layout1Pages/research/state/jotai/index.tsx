import { Button, Card } from 'antd';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import React from 'react';

import { TrackUpdate } from '../helper';
import styles from '../style.module.less';
import { atomCount, atomObj, atomV1, atomVal1, atomVal2 } from './store';

export function TestJotai() {
  return (
    <Card
      title={
        <a href="https://github.com/pmndrs/jotai" target="_blank" rel="noreferrer">
          jotai (Primitive and flexible state management for React)
        </a>
      }
      style={{ marginBottom: 16 }}>
      <TrackUpdate />
      <Child1 />
      <Child2 />
      <Child3 />
      <Child4 />
    </Card>
  );
}

function Child1() {
  const count = useAtomValue(atomCount);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1</legend>
      <TrackUpdate />
      <div>count: {count}</div>
      <Child11 />
      <Child12 />
      <Child13 />
    </fieldset>
  );
}

function Child11() {
  const [count, setCount] = useAtom(atomCount);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1-1</legend>
      <TrackUpdate />
      <div>count: {count}</div>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </fieldset>
  );
}

function Child12() {
  const setCount = useSetAtom(atomCount);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1-2</legend>
      <TrackUpdate />
      <Button onClick={() => setCount((val) => val + 10)}>+10</Button>
    </fieldset>
  );
}

const Child13 = React.memo(function Child13() {
  const setCount = useSetAtom(atomCount);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件1-3 (use React.memo)</legend>
      <TrackUpdate />
      <Button onClick={() => setCount((val) => val + 10)}>+10</Button>
    </fieldset>
  );
});

function Child2() {
  const setCount = useSetAtom(atomCount);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件2</legend>
      <TrackUpdate />
      <Button onClick={() => setCount((val) => val + 10)}>+10</Button>
      <Child21 />
    </fieldset>
  );
}

function Child21() {
  const count = useAtomValue(atomCount);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件2-1</legend>
      <TrackUpdate />
      <div>count: {count}</div>
    </fieldset>
  );
}

function Child3() {
  return (
    <fieldset className={styles.testBlock}>
      <legend>组件3</legend>
      <TrackUpdate />
      <Child31 />
      <Child32 />
      <br />
      <Child33 />
      <br />
      <Child34 />
    </fieldset>
  );
}

function Child31() {
  const obj = useAtomValue(atomObj);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件3-1</legend>
      <TrackUpdate />
      <div>obj: {JSON.stringify(obj)}</div>
    </fieldset>
  );
}

function Child32() {
  const setObj = useSetAtom(atomObj);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件3-2</legend>
      <TrackUpdate />
      <Button
        style={{ marginRight: 10 }}
        onClick={() => setObj({ v1: Math.random().toString(16).slice(2, 8) })}>
        修改v1
      </Button>
      <Button
        style={{ marginRight: 10 }}
        onClick={() => setObj({ v2: Math.random().toString(16).slice(2, 8) })}>
        修改v2
      </Button>
      <Button
        style={{ marginRight: 10 }}
        onClick={() => setObj({ count: ~~(Math.random() * 1000) })}>
        修改count
      </Button>
    </fieldset>
  );
}

function Child33() {
  const [{ v1 }] = useAtom(atomObj);
  const code = `const [{v1}] = useAtom(atomObj);`;
  return (
    <fieldset className={styles.testBlock}>
      <legend>组件3-3</legend>
      <TrackUpdate />
      <div>
        <div>v1: {v1}</div>
        <div>获取解构出来的v1的值，只要atomObj的任意值发生变化，组件就会重新渲染</div>
        <pre>{code}</pre>
      </div>
    </fieldset>
  );
}

function Child34() {
  const [v1] = useAtom(atomV1);
  const code = `const atomV1 = atom((get) => get(atomObj).v1);\nconst [v1] = useAtom(atomV1);`;
  return (
    <fieldset className={styles.testBlock}>
      <legend>组件3-3</legend>
      <TrackUpdate />
      <div>
        <div>v1: {v1}</div>
        <div>
          通过拆分出子atom来获取v1的值，只有atomObj的v1值发生变化，组件才会重新渲染
        </div>
        <pre>{code}</pre>
      </div>
    </fieldset>
  );
}

function Child4() {
  return (
    <fieldset className={styles.testBlock}>
      <legend>组件4</legend>
      <TrackUpdate />
      <Child41 />
      <br />
      <Child42 />
    </fieldset>
  );
}

function Child41() {
  const [val1, setVal1] = useAtom(atomVal1);
  const resetVal1 = useResetAtom(atomVal1);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件4-1 (test atomWithReset)</legend>
      <TrackUpdate />
      <div>value: {val1}</div>
      <Button
        style={{ marginRight: 10 }}
        onClick={() => setVal1(Math.random().toString(16).slice(2, 8))}>
        修改value
      </Button>
      <Button style={{ marginRight: 10 }} onClick={() => resetVal1()}>
        重置value
      </Button>
    </fieldset>
  );
}

function Child42() {
  const [val2, setVal2] = useAtom(atomVal2);

  return (
    <fieldset className={styles.testBlock}>
      <legend>组件4-2 (test atomWithStorage)</legend>
      <TrackUpdate />
      <div>value: {val2}</div>
      <Button
        style={{ marginRight: 10 }}
        onClick={() => setVal2(Math.random().toString(16).slice(2, 8))}>
        修改value
      </Button>
    </fieldset>
  );
}
