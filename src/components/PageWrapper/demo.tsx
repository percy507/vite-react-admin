import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

import { PageWrapper } from './index';

export const DemoPageWrapper = () => ({
  title: 'PageWrapper',
  desc: '页面主要内容包裹组件',
  children: <Demo />,
});

function Demo() {
  const nav = useNavigate();
  const breadcrumbList = [
    { path: '', breadcrumbName: '嘻嘻嘻' },
    { path: '/l1/system/user', breadcrumbName: '用户管理' },
  ];

  return (
    <div>
      <PageWrapper
        header={{
          title: '大标题',
          subTitle: '子标题',
          breadcrumb: { routes: breadcrumbList },
        }}>
        content1
      </PageWrapper>

      <PageWrapper
        pageType="detail"
        header={{
          title: '查看详情',
          onBack: () => nav('../'),
        }}>
        <Card title="基本信息">xxx</Card>
      </PageWrapper>
    </div>
  );
}
