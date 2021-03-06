import { Card, Tag, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

import { DemoAsyncButton } from '@/components/AsyncButton/demo';
import { DemoAuthorized } from '@/components/Authorized/demo';
import { DemoCountNumber } from '@/components/CountNumber/demo';
import { DemoDragableModal } from '@/components/DragableModal/demo';
import { DemoEnumManager } from '@/components/EnumManager/demo';
import { DemoErrorBoundary } from '@/components/ErrorBoundary/demo';
import { DemoException } from '@/components/Exception/demo';
import { DemoFileHolder } from '@/components/FileHolder/demo';
import { DemoFormItemList } from '@/components/FormItemList/demo';
import { DemoNumberRange } from '@/components/NumberRange/demo';
import { PageWrapper } from '@/components/PageWrapper';
import { DemoPageWrapper } from '@/components/PageWrapper/demo';
import { DemoPreviewImage } from '@/components/PreviewImage/demo';
import { DemoSearchForm } from '@/components/SearchForm/demo';
import { DemoSuperTable } from '@/components/SuperTable/demo';
import { DemoSuperUpload } from '@/components/SuperUpload/demo';
import { DemoTextRadioGroup } from '@/components/TextRadioGroup/demo';
import { DemoTinyMCE } from '@/components/TinyMCE/demo';

import styles from './style.module.less';

interface Itemmm {
  title: string;
  desc?: React.ReactNode;
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
    DemoPreviewImage(),
    DemoPageWrapper(),
    DemoEnumManager(),
    DemoFormItemList(),
    DemoNumberRange(),
    DemoSuperUpload(),
    DemoSearchForm(),
    DemoSuperTable(),
    DemoTextRadioGroup(),
    DemoTinyMCE(),
    DemoFileHolder(),
    DemoCountNumber(),
  ];

  return (
    <PageWrapper className={styles.componentList}>
      <Card size="small" className={styles.header}>
        {componentList.map((el) => (
          <Tooltip key={el.title} title={el.desc} placement="bottom">
            <Tag
              style={{ cursor: 'pointer', margin: 5 }}
              onClick={() => {
                nav(`#${el.title}`);
                document.getElementById(el.title)?.scrollIntoView({ behavior: 'smooth' });
              }}>
              {el.title}
            </Tag>
          </Tooltip>
        ))}
      </Card>
      <div className={styles.list}>
        {componentList.map((el) => {
          return (
            <Card
              key={el.title}
              title={<div id={el.title}>{el.title}</div>}
              size="small"
              style={{ marginBottom: 24 }}>
              <div className={styles.desc}>
                <div>??????:</div>
                <div>{el.desc}</div>
              </div>
              <div className={styles.demoWrapper}>{el.children}</div>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}
