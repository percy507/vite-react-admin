import { createNanoEvents } from 'nanoevents';

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
