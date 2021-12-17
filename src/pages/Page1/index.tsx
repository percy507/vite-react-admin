import { Button, Card, Collapse } from 'antd';
import React, { useState } from 'react';

import PageWrapper from '@/components/PageWrapper';
import UploadImage from '@/components/UploadImage';

import styles from './style.module.less';

const { Panel } = Collapse;

export default function Page1() {
  const [testMessage, setTestMessage] = useState<any>({ a: { b: 'xxxxx message' } });
  const handleClick = () => {
    setTestMessage({});
  };

  const componentList = [
    {
      title: 'ErrorBoundary 捕获组件树异常',
      children: (
        <div>
          <button onClick={handleClick}>点我测试ErrorBoundary组件</button>
          <h2>{testMessage.a.b}</h2>
        </div>
      ),
    },
    {
      title: 'UploadImage 上传图片',
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <UploadImage
            action="https://api.imgbb.com/1/upload"
            data={{ key: '49e27928735c3bd80e8aa27349a34c5b' }}
            name="image"
          />
          <UploadImage needCropImage>
            <Button>上传（裁剪）</Button>
          </UploadImage>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper className={styles.Page1}>
      <Card title="组件列表">
        <Collapse accordion>
          {componentList.map((el) => {
            return (
              <Panel header={el.title} key={el.title}>
                {el.children}
              </Panel>
            );
          })}
        </Collapse>
      </Card>
    </PageWrapper>
  );
}
