import type { FormInstance } from 'antd';

/** 用千位分隔符格式化数字，不会格式化小数位，且仅支持三位小数 */
export function formatNumber(
  val: number | string,
  /** 有效数字的位数，默认2位 */
  decimal = 2,
  autoPadZero = true,
): string {
  let num = Number.parseFloat(`${val}`);
  if (Number.isNaN(num)) return '-';
  let str = num.toLocaleString('en-US');
  if (autoPadZero) {
    let [a, b = ''] = str.split('.');
    if (b.length < decimal) str = `${a}.${b}${'0'.repeat(decimal - b.length)}`;
  }
  return decimal === 0
    ? str.replace(/\.\d*$/, '')
    : str.replace(/\.\d*$/, (v) => v.slice(0, decimal + 1));
}

/** 基于 onInput 事件, 去掉 Input 组件值两边的空格 */
export function trimInputValue(
  form: FormInstance,
  name: string,
  e: React.FormEvent | string,
) {
  // @ts-ignore
  let val = typeof e === 'string' ? e : e.target?.value;
  console.log(val);
  setTimeout(() => form.setFieldsValue({ [name]: val.trim() }));
}
