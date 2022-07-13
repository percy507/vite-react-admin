import { Card, Tag, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

import { DemoAsyncButton } from '@/components/AsyncButton/demo';
import { DemoAuthorized } from '@/components/Authorized/demo';
import { DemoDragableModal } from '@/components/DragableModal/demo';
import { DemoErrorBoundary } from '@/components/ErrorBoundary/demo';
import { DemoException } from '@/components/Exception/demo';
import { PageWrapper } from '@/components/PageWrapper';
import { DemoPreviewImage } from '@/components/PreviewImage/demo';
import { DemoSuperUpload } from '@/components/SuperUpload/demo';
import { DemoTextRadioGroup } from '@/components/TextRadioGroup/demo';

import styles from './style.module.less';

interface Itemmm {
  title: string;
  desc?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}

export default function ComponentList() {
  const nav = useNavigate();

  const componentList: Itemmm[] = [
    DemoAuthorized(),
    DemoAsyncButton(),
    DemoDragableModal(),
    DemoErrorBoundary(),
    DemoException(),
    DemoSuperUpload(),
    DemoTextRadioGroup(),
    DemoPreviewImage(),
  ];

  return (
    <PageWrapper>
      <Card size="small" style={{ marginBottom: 24 }}>
        {componentList.map((el) => (
          <Tooltip key={el.title} title={el.desc} placement="bottom">
            <Tag
              style={{ cursor: 'pointer' }}
              onClick={() => {
                nav(`#${el.title}`);
                document.getElementById(el.title)?.scrollIntoView({ behavior: 'smooth' });
              }}>
              {el.title}
            </Tag>
          </Tooltip>
        ))}
      </Card>
      <div className={styles.componentList}>
        {componentList.map((el) => {
          return (
            <Card
              key={el.title}
              title={<div id={el.title}>{el.title}</div>}
              size="small"
              style={{ marginBottom: 24 }}>
              <div className={styles.desc}>
                <div style={{ fontWeight: 'bold', paddingRight: 6 }}>描述:</div>
                <div>
                  <div>{el.desc}</div>
                  <div style={{ paddingTop: 10 }}>{el.extra}</div>
                </div>
              </div>
              <div className={styles.demoWrapper}>{el.children}</div>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}
