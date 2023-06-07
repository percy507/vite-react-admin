import { Card } from 'antd';
import clsx from 'clsx';
import moment from 'moment';
import { useMemo } from 'react';

import { PageWrapper } from '@/components/PageWrapper';

import { CommonList } from './CommonList';
import styles from './style.module.less';

export default function TryReactWindow() {
  return (
    <PageWrapper>
      <Card title={<a href="https://github.com/bvaughn/react-window">react-window</a>}>
        <div className={styles.root}>
          <CommonList renderRow={RenderRow} itemSize={50} itemCount={1000} />
        </div>
      </Card>
    </PageWrapper>
  );
}

function RenderRow({ index, style }) {
  const time = useMemo(
    () => moment(Date.now() - ~~(Math.random() * 1000000 + 10000)),
    [],
  );

  const tags = ['tag1111t11', 'tag2', 'tag3', 'tag44', 'tag55555'].filter(
    (_, i) => index % (i + 1) === 0,
  );

  return (
    <div
      className={index % 2 ? styles.listItemOdd : styles.listItemEven}
      style={style}
      tabIndex={-1}
      onClick={(e) => {
        console.log(e.currentTarget);
      }}>
      <div>我是一个标题({index + 1})</div>
      <div className={styles.itemMeta}>
        <div className={clsx(styles.tags, styles.o1)} title={tags.join(', ')}>
          {tags.map((el, i) => {
            return (
              <span key={i}>
                <span
                  className={styles.tag}
                  title={el}
                  onClick={() => {
                    console.log('click tag', el);
                  }}>
                  {el}
                </span>
                {i !== tags.length - 1 && <span>, </span>}
              </span>
            );
          })}
        </div>
        <div className={styles.time} title={time.format()}>
          {time.fromNow()}
        </div>
      </div>
    </div>
  );
}
