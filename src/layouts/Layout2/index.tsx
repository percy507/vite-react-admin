import { Button, Card, Input, message } from 'antd';
import { useState } from 'react';

import { copyText } from '@/utils';

import { Colors } from './colors';
import styles from './style.module.less';

export default function Layout2() {
  const [bg, setBg] = useState('#fff');
  const color = /^#(\w{3}|\w{6})$/.test(bg)
    ? isBrightColor(bg)
      ? '#000'
      : '#fff'
    : '#000';

  return (
    <Card
      style={{
        color,
        background: bg,
        overflow: 'auto',
      }}>
      <div className={styles.title}>
        配色数据来源于{' '}
        <a
          href="https://github.com/argyleink/open-props"
          target="_blank"
          rel="noreferrer">
          open-props
        </a>
        <Input
          style={{ width: 150, marginLeft: 30 }}
          addonBefore="背景色"
          value={bg}
          onChange={(e) => setBg(e.target.value)}
        />
      </div>

      {Colors.map((el) => renderBlock(el[0], el[1]))}
    </Card>
  );
}

function renderBlock(title, arr) {
  const copyCssVariables = () => {
    copyText(`:root {\n${arr.map((el) => `  ${el[0]}: ${el[1]};`).join('\n')}\n}`);
    message.success('复制成功');
  };

  const copyCssVariablesRgb = () => {
    copyText(
      `:root {\n${arr
        .map((el) => `  ${el[0]}-rgb: ${hexToRgb(el[1].trim().replace('#', ''))};`)
        .join('\n')}\n}`,
    );
    message.success('复制成功');
  };

  return (
    <div className={styles.block} key={title}>
      <div className={styles.blockTitle}>
        <div>{title}</div>
        <Button size="small" style={{ marginLeft: 24 }} onClick={copyCssVariables}>
          复制为CSS variables
        </Button>
        <Button size="small" style={{ marginLeft: 24 }} onClick={copyCssVariablesRgb}>
          复制为CSS variables(RGB)
        </Button>
      </div>
      <div className={styles.colorBlocks}>
        {arr.map((el) => {
          let [key, color] = el;
          return (
            <div
              className={styles.colorBlock}
              key={key}
              style={{
                color: isBrightColor(color) ? '#000' : '#fff',
                background: color,
              }}
              onClick={() => {
                copyText(color);
                message.success('复制颜色代码成功');
              }}>
              <div>{color}</div>
              <div>{key}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return r + ',' + g + ',' + b;
}

function isBrightColor(color: string) {
  let num, r, g, b, hsp;
  num = +(
    '0x' + (color.length < 5 ? color.slice(1).replace(/./g, '$&$&') : color.slice(1))
  );
  r = num >> 16;
  g = (num >> 8) & 255;
  b = num & 255;
  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  // Using the HSP value, determine whether the color is bright or dark
  return hsp > 150;
}
