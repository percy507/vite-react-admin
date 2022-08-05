export function copyText(str) {
  if (!document.queryCommandSupported('copy')) {
    throw new Error('document.execCommand method not support copy command');
  }
  let input = document.createElement('input');
  input.style.cssText = `display: block;
                         position: fixed;
                         left: -10000px;
                         z-index: -1;
                         width: 10px;
                         height: 10px;
                         opacity: 0;`;
  document.body.appendChild(input);
  input.value = str;
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
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
