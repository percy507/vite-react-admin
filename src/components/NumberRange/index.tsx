import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import styles from './style.module.less';

export interface ValueType {
  start?: number;
  end?: number;
}

interface NumberRangeProps {
  className?: string;
  style?: React.CSSProperties;
  /** Default is `0`. */
  min?: number;
  /** Default is `100`. */
  max?: number;
  /** Default is `~`. */
  separator?: string;
  /** Default is `24`. */
  gap?: number;
  startProps?: Omit<InputNumberProps, 'min' | 'max' | 'value'>;
  endProps?: Omit<InputNumberProps, 'min' | 'max' | 'value'>;
  value?: ValueType;
  onChange?: (value: ValueType) => void;
}

export function NumberRange(props: NumberRangeProps) {
  const {
    className,
    style,
    min = 0,
    max = 100,
    separator = '~',
    gap = 24,
    startProps = {},
    endProps = {},
    value,
    onChange,
  } = props;

  const [inner, setInner] = useState<ValueType | undefined>(value);

  const onInnerChange = (val: ValueType) => {
    setInner(val);
    if (onChange) onChange(val);
  };

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(inner)) setInner(value);
  }, [value, inner]);

  return (
    <div className={clsx(styles.numberRange, className)} style={style}>
      <InputNumber
        {...startProps}
        min={min}
        max={inner?.end}
        value={inner?.start}
        onChange={(val) => onInnerChange({ ...inner, start: val as number })}
      />
      <div className={styles.separator} style={{ padding: `0 ${gap}px` }}>
        {separator}
      </div>
      <InputNumber
        {...endProps}
        min={inner?.start}
        max={max}
        value={inner?.end}
        onChange={(val) => onInnerChange({ ...inner, end: val as number })}
      />
    </div>
  );
}
