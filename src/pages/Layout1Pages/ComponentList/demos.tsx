import { Button, message } from 'antd';
import { useState } from 'react';

import { DragableModal } from '@/components/DragableModal';
import { SuperUpload } from '@/components/SuperUpload';

import styles from './style.module.less';

export function DemoErrorBoundary() {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error('app crash inside DemoErrorBoundary');
  return (
    <div>
      <button onClick={() => setCrash(true)}>点我干掉页面</button>
      <div>App Crash: {crash.toString()}</div>
    </div>
  );
}

export function DemoSuperUpload() {
  return (
    <div className={styles.DemoSuperUpload}>
      <SuperUpload name="image">
        <Button>上传图片</Button>
      </SuperUpload>

      <SuperUpload name="image" accept="*">
        <Button>上传任意文件</Button>
      </SuperUpload>

      <SuperUpload
        showTips
        name="file"
        imageAspect="150x250"
        listType="picture-card"
        maxFileSize={20 * 1024 * 1024}
      />

      <SuperUpload needCropImage>
        <Button>上传图片（自由裁剪）</Button>
      </SuperUpload>
    </div>
  );
}

export function DemoDragableModal() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示弹窗</Button>
      <DragableModal
        title="可拖动弹窗"
        width={650}
        mask={false}
        maskClosable={false}
        visible={visible}
        onOk={() => {
          message.success('点击了确定');
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        <div className={styles.modalContent}>内容</div>
      </DragableModal>
    </div>
  );
}
