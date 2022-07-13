import { useState } from 'react';

import { TextRadioGroup } from './index';

export const DemoTextRadioGroup = () => ({
  title: 'TextRadioGroup',
  desc: '表单组件，纯文本的单选框，一般用于偏展示类的页面（比如官网）',
  children: <Demo />,
});

function Demo() {
  const [status, setStatus] = useState('全部');
  const [sort, setSort] = useState('综合');

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 20 }}>
          <strong>项目状态：</strong>
        </div>
        <TextRadioGroup value={status} onChange={(val) => setStatus(val)}>
          {['全部', '进行中', '即将开始', '已结束'].map((el) => {
            return (
              <TextRadioGroup.Item
                key={el}
                label={el}
                value={el}
                style={{ marginRight: 16 }}
              />
            );
          })}
        </TextRadioGroup>
      </div>
      <div style={{ margin: 20 }}>当前值: {status}</div>

      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 20 }}>
          <strong>商品排序：</strong>
        </div>
        <TextRadioGroup value={sort} onChange={(val) => setSort(val)}>
          <TextRadioGroup.Item label="综合" value="综合" style={{ marginRight: 10 }} />
          <span style={{ marginRight: 10 }}>
            销量（
            <TextRadioGroup.Item label="顺序" value="asc:销量" />/
            <TextRadioGroup.Item label="倒序" value="desc:销量" />）
          </span>
          <span style={{ marginRight: 10 }}>
            价格（
            <TextRadioGroup.Item label="顺序" value="asc:价格" />/
            <TextRadioGroup.Item label="倒序" value="desc:价格" />）
          </span>
        </TextRadioGroup>
      </div>
      <div style={{ margin: 20 }}>当前值: {sort}</div>
    </div>
  );
}
