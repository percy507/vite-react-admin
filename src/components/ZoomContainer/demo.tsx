import { ZoomContainer } from './index';

export const DemoZoomContainer = () => ({
  title: 'ZoomContainer',
  desc: '使用svg+d3js，实现内容块自动缩放',
  children: <Demo />,
});

function Demo() {
  return (
    <ZoomContainer
      style={{
        width: 1000,
        height: 500,
        border: '1px solid red',
      }}>
      <h1>缩放区域</h1>
      <div style={{ width: 500, height: 200, padding: 6, border: '1px solid #46a782' }}>
        <h3>标题标题标题</h3>
        <p>
          我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容我是内容内容
        </p>
      </div>
    </ZoomContainer>
  );
}
