import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import styles from './style.module.less';

interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

interface TextRadioGroupProps extends BaseProps {
  value: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

export function TextRadioGroup(props: TextRadioGroupProps) {
  const { value, onChange, children, className, style } = props;
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const mapItems = () => {
    if (!node) return;
    node.querySelectorAll<HTMLElement>(`.${styles.item}`).forEach((el) => {
      if (el.dataset.value === value) el.setAttribute('active', '');
      else el.removeAttribute('active');
      if (!el.onclick) el.onclick = () => onChange?.(el.dataset.value as string);
    });
  };
  useEffect(() => mapItems());
  return (
    <div
      className={clsx(styles.textGroup, className)}
      style={style}
      ref={(el) => setNode(el)}>
      {children}
    </div>
  );
}

type ItemProps = { label: string; value: string } & BaseProps;

TextRadioGroup.Item = function TextRadioGroupItem(props: ItemProps) {
  const { label, value, style, className } = props;
  return (
    <span className={clsx(styles.item, className)} style={style} data-value={value}>
      {label}
    </span>
  );
};
