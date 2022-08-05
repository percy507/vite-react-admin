import { css } from '@stitches/react';

const ellipsis = (line: number) => {
  return css({
    display: '-webkit-box',
    '-webkit-line-clamp': line,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-all',
  });
};

/** 文本溢出省略 */
export const ellipsisLine1 = ellipsis(1);
export const ellipsisLine2 = ellipsis(2);
export const ellipsisLine3 = ellipsis(3);
export const ellipsisLine4 = ellipsis(4);
export const ellipsisLine5 = ellipsis(5);

/** 通用头部卡片 */
export const headerCard = css({
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
