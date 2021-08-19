import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';

type IconFontProps = {
  type: string;
};

const MyIcon = createFromIconfontCN({
  // 在 iconfont.cn 上生成
  scriptUrl: '//at.alicdn.com/t/font_2727509_fa5jm8jxp8v.js',
});

export default function IconFont(props: IconFontProps) {
  return <MyIcon type={props.type} />;
}
