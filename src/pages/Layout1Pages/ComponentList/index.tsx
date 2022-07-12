import { Card } from 'antd';

import { PageWrapper } from '@/components/PageWrapper';

import { DemoDragableModal, DemoErrorBoundary, DemoSuperUpload } from './demos';
import styles from './style.module.less';

export default function ComponentList() {
  const componentList = [
    {
      title: 'ErrorBoundary',
      desc: '捕获组件树异常',
      children: <DemoErrorBoundary />,
    },
    {
      title: 'SuperUpload',
      desc: '上传文件',
      children: <DemoSuperUpload />,
    },
    {
      title: 'DragableModal',
      desc: '可拖动对话框',
      children: <DemoDragableModal />,
    },
  ];

  return (
    <PageWrapper>
      <div className={styles.componentList}>
        {componentList.map((el) => {
          return (
            <Card
              key={el.title}
              title={el.title}
              size="small"
              style={{ marginBottom: 24 }}
            >
              <div className={styles.desc}>
                <strong>描述: </strong>
                {el.desc}
              </div>
              <div className={styles.demoWrapper}>{el.children}</div>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}
