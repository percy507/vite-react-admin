import 'mac-scrollbar/dist/mac-scrollbar.css';

import { clsx } from 'clsx';
import type { MacScrollbarProps } from 'mac-scrollbar';
import { MacScrollbar } from 'mac-scrollbar';

import styles from './style.module.less';

interface ScrollViewProps extends MacScrollbarProps {}

export function ScrollView(props: ScrollViewProps) {
  const { children, className, ...restProps } = props;

  return (
    <MacScrollbar className={clsx([styles.scrollbar, className])} {...restProps}>
      {children}
    </MacScrollbar>
  );
}
