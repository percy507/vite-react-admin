import { CountNumber } from './index';

export const DemoCountNumber = () => ({
  title: 'CountNumber',
  desc: '倒计时组件(支持倒着数，也可以正着数)',
  children: <Demo />,
});

function Demo() {
  return (
    <div>
      <CountNumber title="标题(倒着数)" from={20} to={0} style={{ marginRight: 50 }} />
      <CountNumber title="标题(正着数)" from={0} to={20} style={{ color: 'red' }} />
    </div>
  );
}
