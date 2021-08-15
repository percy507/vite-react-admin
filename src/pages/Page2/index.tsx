import { Card, Collapse } from 'antd';
import React, { useState } from 'react';

import IframeComponent from '@/components/IframeComponent';
import PageWrapper from '@/components/PageWrapper';
import QuillEditor from '@/components/QuillEditor';

import { htmlStr, htmlStr2 } from './data';
import styles from './style.module.less';

const { Panel } = Collapse;

export default function Page2() {
  const [testMessage, setTestMessage] = useState<any>({ a: { b: 'xxxxx message' } });
  const handleClick = () => {
    setTestMessage({});
  };

  return (
    <PageWrapper className={styles.Page2}>
      <Card title="组件列表">
        <Collapse accordion>
          <Panel header="【QuillEditor】富文本编辑器" key="1">
            <QuillEditor value={htmlStr} minContentHeight="300" />
          </Panel>
          <Panel header="【IframeComponent】渲染HTML字符串到iframe中" key="2">
            <IframeComponent title="iframe组件" htmlStr={htmlStr2} />
          </Panel>
          <Panel header="ErrorBoundary 捕获组件树异常" key="3">
            <button onClick={handleClick}>点我测试ErrorBoundary组件</button>
            <h2>{testMessage.a.b}</h2>
          </Panel>
        </Collapse>
      </Card>
    </PageWrapper>
  );
}
