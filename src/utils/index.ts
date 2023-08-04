import { createNanoEvents } from 'nanoevents';
import { customAlphabet } from 'nanoid';

import uiConfig from '../mobile/ui.config.json';

export const isIOS = !!navigator.platform.match(/iPhone|iPod|iPad/);

/**
 *  基于设计稿比例以及实际页面的宽度，转换像素
 *
 * @export
 * @param {number} value  设计稿像素值
 * @return {string}
 */
export function toAdaptedPx(value: number): number {
  return value / (uiConfig.width / window.__adaptorWidth);
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 8);
export function alphaUUID(size?: number) {
  return nanoid(size);
}

export const eventbus = createNanoEvents();

export function copyText(str: string) {
  let success = false;
  let textarea = document.createElement('textarea');
  textarea.style.cssText = `position:fixed; opacity:0;`;
  document.body.appendChild(textarea);
  textarea.value = str;
  textarea.focus();
  // ios not support textarea.select() method
  if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
    textarea.setSelectionRange(0, str.length);
  } else textarea.select();
  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.error('[copyText]:', err);
  }
  console.log(`[copyText]: ${success ? 'success' : 'failed'}`);
  document.body.removeChild(textarea);
  return success;
}

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  /** Default is 0. */
  wait = 0,
) {
  let timer = -1;
  return function (this: unknown, ...args: T): Promise<U> {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = window.setTimeout(() => {
        resolve(callback.call(this, ...args));
      }, wait);
    });
  };
}

export function throttle<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  /** Default is 0. */
  wait = 0,
) {
  let canRun = true;
  return function (this: unknown, ...args: T): Promise<U> | void {
    if (!canRun) return;
    canRun = false;
    return new Promise((resolve) => {
      window.setTimeout(() => {
        canRun = true;
        resolve(callback.call(this, ...args));
      }, wait);
    });
  };
}

export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
