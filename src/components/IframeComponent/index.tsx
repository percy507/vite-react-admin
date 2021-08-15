import React, { useCallback } from 'react';

import styles from './style.module.less';

type IframeComponentProps = {
  title?: string;
  htmlStr?: string;
};

export default function IframeComponent(props: IframeComponentProps) {
  const { title = '', htmlStr = '' } = props;

  // 让 iframe 的高度自动适应内容的高度
  // 参考：https://stackoverflow.com/questions/9975810/make-iframe-automatically-adjust-height-according-to-the-contents-without-using
  const resizeIframe = useCallback(
    (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
      const iframe = e.target as HTMLIFrameElement;
      const body = iframe.contentWindow?.document.body;

      iframe.style.height = `${(body?.scrollHeight || 0) + 20}px`;
    },
    [],
  );

  return (
    <div className={styles.iframeComponent}>
      <iframe
        title={title}
        srcDoc={htmlStr}
        frameBorder="0"
        scrolling="no"
        style={{ width: '100%' }}
        onLoad={(e) => resizeIframe(e)}
      />
    </div>
  );
}
