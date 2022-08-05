/** 用千位分隔符格式化数字，不会格式化小数位，且仅支持三位小数 */
export function formatNumber(
  val: number | string,
  /** 有效数字的位数，默认2位 */
  decimal = 2,
): string {
  let num = Number.parseFloat(`${val}`);
  if (Number.isNaN(num)) return '-';
  let str = num.toLocaleString('en-US');
  str = str.includes('.') ? str : `${str}.000`;
  return decimal === 0
    ? str.replace(/\.\d*$/, '')
    : str.replace(/\.\d*$/, (v) => v.slice(0, decimal + 1));
}
