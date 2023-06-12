import type { InputProps } from 'antd';
import { Input } from 'antd';
import { useEffect, useRef, useState } from 'react';

export interface FormattedInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: string;
  onChange?: (val: string) => void;
  /** 格式化函数 */
  format?: (val: string) => string;
  /** 与format函数相反，该函数用来去除format产生的效果，因为提交表单时，一般不需要额外的格式 */
  unformat?: (val: string) => string;
}

export function FormattedInput(props: FormattedInputProps) {
  const {
    value = '',
    onChange,
    format = (val) => val,
    unformat = (val) => val,
    ...restProps
  } = props;
  const [innerValue, setInnerValue] = useState('');

  const formatRef = useRef(format);
  formatRef.current = format;
  const unformatRef = useRef(unformat);
  unformatRef.current = unformat;

  const innerValueRef = useRef(innerValue);
  innerValueRef.current = innerValue;

  useEffect(() => {
    if (unformatRef.current(innerValueRef.current) == value) return;
    setInnerValue(formatRef.current(value));
  }, [value]);

  return (
    <Input
      {...restProps}
      value={innerValue}
      onChange={(e) => {
        let val = format(e.target.value);
        setInnerValue(val);
        onChange?.(unformat(val));
      }}
    />
  );
}
