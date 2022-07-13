import { Collapse } from 'antd';

import { Exception } from './index';

export const DemoException = () => ({
  title: 'Exception',
  desc: '异常页，主要包括403、404、500',
  children: <Demo />,
});

const { Panel } = Collapse;

function Demo() {
  return (
    <div>
      <Collapse>
        <Panel header="点击展开/收起" key="1">
          <div style={{ width: 1000, height: 500, margin: 'auto' }}>
            <Exception type={403} />
          </div>
          <div style={{ width: 1000, height: 500, margin: 'auto' }}>
            <Exception type={404} />
          </div>
          <div style={{ width: 1000, height: 500, margin: 'auto' }}>
            <Exception type={500} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
