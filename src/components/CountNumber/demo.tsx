import { CountNumber } from './index';

export const DemoCountNumber = () => ({
  title: 'CountNumber',
  desc: '倒计时组件(支持倒着数，也可以正着数)',
  children: <Demo />,
});

function Demo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <CountNumber
        shouldStart={() => {
          return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
        }}
        title="标题(倒着数)"
        from={20}
        to={0}
      />
      <CountNumber title="标题(正着数)" from={0} to={20} style={{ color: 'red' }} />
      <CountNumber
        title="测试禁用"
        from={0}
        to={20}
        disabled
        disabledText="🚫"
        style={{ border: '1px solid red', padding: '4px 10px' }}
      />
    </div>
  );
}
