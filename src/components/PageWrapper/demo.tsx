import { PageWrapper } from './index';

export const DemoPageWrapper = () => ({
  title: 'PageWrapper',
  desc: '页面主要内容包裹组件',
  children: <Demo />,
});

function Demo() {
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
    </div>
  );
}
