import { css } from '@stitches/react';
import { clsx } from 'clsx';

interface ScrollbarOptions {
  className?: string;
  size?: number;
  thumbBorderSize?: number;
  thumbBorderRadius?: number;
  thumbBG?: string;
  trackBG?: string;
  trackHoverBG?: string;
}

export function scrollbarCls(_options: ScrollbarOptions = {}) {
  let options = {
    size: 6,
    thumbBorderSize: 0,
    thumbBorderRadius: 2,
    thumbBG: '#666',
    trackBG: 'transparent',
    trackHoverBG: 'transparent',
    ..._options,
  };

  let className = css({
    '--scrollbar-size': `${options.size}px`,
    '--scrollbar-thumb-border-size': `${options.thumbBorderSize}px`,
    '--scrollbar-thumb-border-radius': `${options.thumbBorderRadius}px`,
    '--scrollbar-thumb-bg': options.thumbBG,
    '--scrollbar-track-bg': options.trackBG,
    '--scrollbar-track-hover-bg': options.trackHoverBG,

    width: '100%',
    overflow: 'auto',

    // support Chrome, Edge, and Safari, not support in Firefox and IE
    '&::-webkit-scrollbar': {
      position: 'absolute',
      width: 'var(--scrollbar-size)', // for the width of vertical scrollbar
      height: 'var(--scrollbar-size)', // for the width of horizontal scrollbar
      opacity: 0,
      transition: 'opacity 0.2s',
    },

    '&:hover::-webkit-scrollbar': {
      opacity: 1,
    },

    // set button(top and bottom of the scrollbar)
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },

    // background of the scrollbar except button or resizer
    '&::-webkit-scrollbar-track': {
      background: 'var(--scrollbar-track-bg)',
      transition: 'background 0.2s',

      '&:hover': {
        background: 'var(--scrollbar-track-hover-bg)',
      },
    },

    // scrollbar itself
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--scrollbar-thumb-bg)',
      border: 'var(--scrollbar-thumb-border-size) solid var(--scrollbar-track-bg)',
      borderRadius: 'var(--scrollbar-thumb-border-radius)',
    },
  });

  return clsx(className().className, options.className);
}
