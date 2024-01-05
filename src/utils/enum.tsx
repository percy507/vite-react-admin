import { Tag } from 'antd';

/**
 * 根据枚举与值获取label名称
 * @example `getEnumLabel(MY_ENUM, data?.value)`
 */
export function getEnumLabel(enumVal, value) {
  return Object.entries(enumVal).find((el) => el[1] === value)?.[0];
}

/** 将枚举转换为 options {label: string, value: string}[] */
export function enumToOptions(enumVal, excludes: any[] = []) {
  return Object.entries(enumVal)
    .filter((el) => Number.isNaN(+el[0]) && !excludes.includes(el[1]))
    .map((el) => ({ label: el[0], value: el[1] as string }));
}

/** 基于枚举的自定义颜色Tag */
export function enumTag(
  v: any,
  /** 枚举 */
  enumObj: object,
  /** 关联当前枚举的颜色枚举 */
  enumColorObj: object,
  /** 当值不存在时，则使用 fallback */
  fallback?: string,
) {
  if (v === null || v === undefined) return fallback;
  let key = getEnumLabel(enumObj, v)!;
  let color = enumColorObj[key] || undefined;
  return <Tag color={color}>{key}</Tag>;
}

/** 流程状态 */
export enum PROCESS_STATUS {
  审核中 = 0,
  审批通过 = 1,
  审批拒绝 = 2,
}
export enum PROCESS_STATUS_COLOR {
  审核中 = 'orange',
  审批通过 = 'green',
  审批拒绝 = 'red',
}

/** 角色状态 */
export enum ROLE_STATUS {
  正常 = 'NORMAL',
  停用 = 'DISABLE',
}
export enum ROLE_STATUS_COLOR {
  正常 = 'green',
  停用 = 'gray',
}
