import { Select, Tag } from 'antd';

export function selectOptions(obj: object, excludes: any[] = []) {
  let temp = {};
  for (let k in obj) if (Number.isNaN(+k)) temp[k] = obj[k];
  const arr = Object.entries(temp)
    .filter((el) => !excludes.includes(el[1]))
    .map((el) => (
      <Select.Option key={el[0]} value={el[1]}>
        {el[0]}
      </Select.Option>
    ));
  return arr;
}

/** 基于枚举的自定义颜色Tag */
export function enumTag(
  v: any,
  /** 枚举 */
  enumObj: object,
  /** 关联当前枚举的颜色枚举 */
  enumColorObj: object,
  fallback?: string,
) {
  if (v === null || v === undefined) return fallback;
  return <Tag color={enumColorObj[enumObj[v]]}>{enumObj[v]}</Tag>;
}

/** 流程状态 */
export enum PROCESS_STATUS {
  审核中 = 0,
  审批通过 = 1,
  审批拒绝 = 2,
}

/** 流程状态关联的Tag颜色 */
export enum PROCESS_STATUS_COLOR {
  审核中 = 'rgba(250, 140, 22, 1)',
  审批通过 = 'rgba(82, 196, 26, 1)',
  审批拒绝 = 'rgba(245, 34, 45, 1)',
}
