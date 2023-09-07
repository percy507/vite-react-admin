import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Card, Tag, Tooltip } from 'antd';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { DemoAnimateHeight } from '@/components/AnimateHeight/demo';
import { DemoAsyncButton } from '@/components/AsyncButton/demo';
import { DemoAuthorized } from '@/components/Authorized/demo';
import { DemoAutosizeInput } from '@/components/AutosizeInput/demo';
import { DemoCountNumber } from '@/components/CountNumber/demo';
import { DemoDragableModal } from '@/components/DragableModal/demo';
import { DemoEnumManager } from '@/components/EnumManager/demo';
import { DemoErrorBoundary } from '@/components/ErrorBoundary/demo';
import { DemoException } from '@/components/Exception/demo';
import { DemoFileHolder } from '@/components/FileHolder/demo';
import { DemoFormattedInput } from '@/components/FormattedInput/demo';
import { DemoFormItemList } from '@/components/FormItemList/demo';
import { DemoJSONTable } from '@/components/JSONTable/demo';
import { DemoNumberRange } from '@/components/NumberRange/demo';
import { PageWrapper } from '@/components/PageWrapper';
import { DemoPageWrapper } from '@/components/PageWrapper/demo';
import { DemoPreviewImage } from '@/components/PreviewImage/demo';
import { DemoScrollView } from '@/components/ScrollView/demo';
import { DemoSearchForm } from '@/components/SearchForm/demo';
import { DemoStrengthPassword } from '@/components/StrengthPassword/demo';
import { DemoSuperEChart } from '@/components/SuperEChart/demo';
import { DemoSuperTable } from '@/components/SuperTable/demo';
import { DemoSuperUpload } from '@/components/SuperUpload/demo';
import { DemoTextRadioGroup } from '@/components/TextRadioGroup/demo';
import { DemoTinyMCE } from '@/components/TinyMCE/demo';
import { DemoTinyMCEPreview } from '@/components/TinyMCEPreview/demo';
import { DemoZoomContainer } from '@/components/ZoomContainer/demo';

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
    DemoAnimateHeight(),
    DemoAsyncButton(),
    DemoAutosizeInput(),
    DemoDragableModal(),
    DemoErrorBoundary(),
    DemoException(),
    DemoPreviewImage(),
    DemoPageWrapper(),
    DemoEnumManager(),
    DemoFormattedInput(),
    DemoFormItemList(),
    DemoNumberRange(),
    DemoSuperUpload(),
    DemoStrengthPassword(),
    DemoSearchForm(),
    DemoSuperTable(),
    DemoTextRadioGroup(),
    DemoTinyMCE(),
    DemoTinyMCEPreview(),
    DemoFileHolder(),
    DemoCountNumber(),
    DemoZoomContainer(),
    DemoScrollView(),
    DemoJSONTable(),
    DemoSuperEChart(),
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
        {componentList.map((el, index) => {
          return <Item key={index} el={el} />;
        })}
      </div>
    </PageWrapper>
  );
}

function Item({ el }: { el: Itemmm }) {
  const ref = useRef(null);
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(ref);

  return (
    <Card
      ref={ref}
      key={el.title}
      title={<div id={el.title}>{el.title}</div>}
      size="small"
      style={{ marginBottom: 24 }}
      extra={
        isFullscreen ? (
          <FullscreenExitOutlined onClick={exitFullscreen} />
        ) : (
          <FullscreenOutlined onClick={enterFullscreen} />
        )
      }>
      <div className={styles.desc}>
        <div>描述:</div>
        <div>{el.desc}</div>
      </div>
      <div className={styles.demoWrapper}>{el.children}</div>
    </Card>
  );
}
