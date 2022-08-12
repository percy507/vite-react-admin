/**
 * 本文件定义了通用的样式。
 * - 行内的样式定义为 `React.CSSProperties` 类型，作用于 style 属性
 *  - 变量名称以 `css_` 开头
 * - 复合的样式使用 `css函数` 定义为一个作用于 dom 元素的 className
 *  - 变量名称以 `class_` 开头
 */

import { css } from '@stitches/react';

type CSS = React.CSSProperties;

const ellipsis = (line: number): CSS => {
  return {
    display: '-webkit-box',
    WebkitLineClamp: line,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-all',
  };
};

/** 文本溢出省略 */
export const css_ellipsis_line1 = ellipsis(1);
export const css_ellipsis_line2 = ellipsis(2);
export const css_ellipsis_line3 = ellipsis(3);
export const css_ellipsis_line4 = ellipsis(4);
export const css_ellipsis_line5 = ellipsis(5);

/** flex布局，水平居中 */
export const css_flex_h_center: CSS = { display: 'flex', justifyContent: 'center' };

/** flex布局，垂直居中 */
export const css_flex_v_center: CSS = { display: 'flex', alignItems: 'center' };

/** flex布局，水平垂直居中 */
export const css_flex_hv_center: CSS = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

/** 通用头部卡片 */
export const class_headerCard = css({
  '.ant-card-head': {
    borderBottom: 'none',

    '&-title': {
      paddingTop: '16px !important',
      paddingLeft: '0 !important',

      '&::before': {
        display: 'none',
      },
    },
  },

  '.ant-card-body': {
    paddingTop: 6,
  },
});
