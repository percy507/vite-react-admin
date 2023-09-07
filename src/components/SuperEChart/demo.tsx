import { useEffect, useState } from 'react';

import type { ECOption } from './index';
import { linearGradient, SuperEChart } from './index';

export const DemoSuperEChart = () => ({
  title: 'SuperEChart',
  desc: (
    <div>
      <div style={{ marginBottom: 10 }}>二次封装Echart</div>
      <div>
        <div>
          1.{' '}
          <a href="https://echarts.apache.org/handbook/zh/basics/import#%E5%9C%A8-typescript-%E4%B8%AD%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5">
            方便按需引入图表
          </a>
        </div>
        <div>2. 方便统一某些样式类通用配置</div>
        <div>3. 封装通用的初始化echart图表的逻辑，从而更易于直接使用</div>
      </div>
    </div>
  ),
  children: <Demo />,
});

function Demo() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    let list = new Array(20).fill(0).map(() => ({
      v1: Math.random().toString(16).slice(2, 8),
      v2: ~~(Math.random() * 500),
      v3: ~~(Math.random() * 800),
      v4: ~~(Math.random() * 1000),
    }));
    setList([...list]);
  }, []);

  const items = [
    ['今日任务', 'v2', 'rgba(106, 205, 146, 1)'],
    ['新增任务', 'v3', 'rgba(45, 123, 249, 1)'],
    ['剩余任务', 'v4', 'rgba(249, 127, 15, 1)'],
  ];

  const options: ECOption = {
    color: items.map((el) => el[2]),
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: [{ type: 'category', data: list.map((el) => el.v1) }],
    yAxis: [{ type: 'value', name: '单位: 个' }],
    legend: { data: items.map((el) => el[0]) },
    series: items.map((el) => ({
      name: el[0],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: new linearGradient(0, 0, 0, 1, [
          { offset: 0, color: el[2].replace('1)', '0.2)') },
          { offset: 1, color: el[2].replace('1)', '0)') },
        ]),
      },
      emphasis: { focus: 'series' },
      data: list.map((m) => m[el[1]]),
    })),
  };

  return <SuperEChart height={320} options={options} />;
}
