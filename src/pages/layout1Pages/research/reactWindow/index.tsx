import { Card } from 'antd';
import { useMeasure } from 'react-use';
import { FixedSizeList } from 'react-window';

import { PageWrapper } from '@/components/PageWrapper';

import styles from './style.module.less';

export default function TryReactWindow() {
  return (
    <PageWrapper>
      <Card title={<a href="https://github.com/bvaughn/react-window">react-window</a>}>
        <div className={styles.root}>
          <CommonList />
        </div>
      </Card>
    </PageWrapper>
  );
}

function CommonList() {
  const [listRootRef, listRootBounds] = useMeasure<HTMLDivElement>();

  return (
    <div className={styles.listRoot} ref={listRootRef}>
      <FixedSizeList
        className={styles.listScrollView}
        width={listRootBounds.width}
        height={listRootBounds.height}
        itemCount={1000}
        itemSize={35}
        overscanCount={10}
        // onScroll={(props) => {
        //   console.log('onScroll', props);
        // }}
        // onItemsRendered={(props) => {
        //   console.log('onItemsRendered', props);
        // }}
        ref={(ref) => {
          console.log('ref', ref);
        }}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}

function renderRow({ index, style }) {
  console.log(index, style);
  return (
    <div className={index % 2 ? styles.listItemOdd : styles.listItemEven} style={style}>
      Row {index}
    </div>
  );
}
