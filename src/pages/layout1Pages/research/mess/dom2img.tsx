import { Button, Card, Modal } from 'antd';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from 'react';

import styles from './style.module.less';

export function DOM2Img() {
  const posterRef = useRef<HTMLDivElement>(null);
  const [posterPng, setPosterPng] = useState('');
  const [generating, setGenerating] = useState(false);
  const [visible, setVisible] = useState(false);

  const generateImg = () => {
    setGenerating(true);
    setTimeout(() => {
      html2canvas(posterRef.current!, { scale: 2 })
        .then(function (canvas) {
          setPosterPng(canvas.toDataURL('image/png'));
          setVisible(true);
        })
        .finally(() => {
          setGenerating(false);
        });
    });
  };

  return (
    <Card title="DOM2Img" className={styles.dom2img} style={{ marginBottom: 16 }}>
      <Button type="primary" onClick={generateImg} loading={generating}>
        生成图片
      </Button>
      <div style={{ padding: 24 }}>
        使用 html2canvas 将 DOM 转为高清图。其中图片如果是外链，可能会存在跨域问题
      </div>
      <div className={styles.domContainer} ref={posterRef}>
        <h3>DOM</h3>
        <p>
          This is a <strong>paragraph</strong>.
        </p>
        <div style={{ display: 'flex' }}>
          <ul>
            <li>1111111, 🥺😂</li>
            <li>22222222</li>
            <li>
              333333333,{' '}
              <span style={{ color: 'red', fontWeight: 700, fontSize: 24 }}>大法师</span>
              地方
            </li>
          </ul>
          <div style={{ position: 'relative', top: -30, left: -30 }}>
            <QRCodeSVG
              value="https://wwww.google.com"
              size={70}
              includeMargin
              fgColor="#964D38"
              style={{ borderRadius: '7%' }}
            />
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        width={700}>
        <img src={posterPng} alt="" />
      </Modal>
    </Card>
  );
}
