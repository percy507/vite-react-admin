import { Button, message } from 'antd';
import { useState } from 'react';

import { DragableModal } from './index';

export const DemoDragableModal = () => ({
  title: 'DragableModal',
  desc: '可拖动对话框',
  children: <Demo />,
});

function Demo() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示弹窗</Button>
      <DragableModal
        title="可拖动弹窗"
        width={500}
        mask={false}
        maskClosable={false}
        visible={visible}
        onOk={() => {
          message.success('点击了确定');
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}>
        <div
          style={{
            height: 150,
            lineHeight: '150px',
            textAlign: 'center',
            background: '#ddd',
          }}>
          内容
        </div>
      </DragableModal>
    </div>
  );
}
