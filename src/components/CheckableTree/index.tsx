import type { TreeProps } from 'antd';
import { Tree } from 'antd';
import { useEffect, useState } from 'react';

import { getNodeSelectionStatus } from './helper';

type InnerValueType = [checkedKeys: React.Key[], halfCheckedKeys: React.Key[]];

export interface CheckableTreeProps
  extends Omit<TreeProps, 'checkable' | 'checkedKeys' | 'onCheck'> {
  value?: React.Key[];
  onChange?: (value: React.Key[]) => void;
}

/**
 * 该组件主要用于设置类似权限树的场景
 */
export function CheckableTree(props: CheckableTreeProps) {
  const { value, onChange, treeData, ...restProps } = props;

  const [inner, setInner] = useState<InnerValueType | undefined>();

  const onInnerChange = (val: InnerValueType) => {
    setInner(val);
    if (onChange) onChange(val.flat());
  };

  useEffect(() => {
    if (!value || !treeData) return;
    const { fullIds, partialIds } = getNodeSelectionStatus(treeData, value);
    let val = [fullIds, partialIds] as InnerValueType;
    if (JSON.stringify(val) !== JSON.stringify(inner)) setInner(val);
  }, [treeData, value, inner]);

  return (
    <Tree
      {...restProps}
      treeData={treeData}
      checkable
      checkedKeys={inner?.[0]}
      onCheck={(checkedKeys, { halfCheckedKeys = [] }) => {
        onInnerChange([checkedKeys as React.Key[], halfCheckedKeys]);
      }}
    />
  );
}
