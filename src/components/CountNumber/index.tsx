import { LoadingOutlined } from '@ant-design/icons';
import { styled } from '@stitches/react';
import { useMemo, useRef, useState } from 'react';

interface CountNumberProps {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  /** from为0或正整数，默认0 */
  from?: number;
  /** to为0或正整数，默认10 */
  to?: number;
  /** 开始倒计时前的拦截器，可以通过返回值控制是否开始倒计时 */
  shouldStart?: () => Promise<boolean>;
  onStartCount?: () => void;
  onEndCount?: () => void;
  disabled?: boolean;
  disabledText?: string;
}

/** 倒计时组件(支持倒着数，也可以正着数) */
export function CountNumber(props: CountNumberProps) {
  const {
    className,
    style,
    title,
    from = 0,
    to = 10,
    shouldStart,
    onStartCount,
    onEndCount,
    disabled,
    disabledText,
  } = props;

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(-1);
  const ref = useRef(count);
  ref.current = count;

  const handleClick = async () => {
    if (from === to) throw new Error('`from` should not equal `to`');

    const fn = () => {
      if (onStartCount) onStartCount();
      let isIncrease = to > from;
      setCount(from);
      let timer = setInterval(() => {
        if (ref.current === (isIncrease ? to - 1 : to + 1)) {
          clearInterval(timer);
          setCount(-1);
          if (onEndCount) onEndCount();
        } else setCount((v) => (isIncrease ? v + 1 : v - 1));
      }, 1000);
    };

    if (shouldStart) {
      setLoading(true);
      shouldStart()
        .then((allow) => allow && fn())
        .finally(() => setLoading(false));
    } else fn();
  };

  const InnerCountNumber = useMemo(() => {
    return styled('div', {
      display: 'inline-block',
      fontSize: '0.9em',
      color: 'rgba(0, 0, 0,0.65)',
      cursor: 'pointer',
      userSelect: 'none',

      '&:hover': {
        color: '#2153D3',
      },
    });
  }, []);

  const disableStyle: React.CSSProperties = {
    pointerEvents: 'none',
    opacity: 0.6,
  };

  return (
    <InnerCountNumber
      className={className}
      onClick={() => handleClick()}
      style={{ ...style, ...(disabled || count === -1 ? {} : disableStyle) }}>
      {disabled ? (
        disabledText
      ) : loading ? (
        <LoadingOutlined />
      ) : count === -1 ? (
        title
      ) : (
        `${count} 秒`
      )}
    </InnerCountNumber>
  );
}
