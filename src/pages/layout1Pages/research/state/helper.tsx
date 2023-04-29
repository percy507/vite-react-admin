import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import styles from './style.module.less';

export function TrackUpdate() {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (domRef.current) domRef.current.classList.add(styles.change);
    setTimeout(() => {
      domRef.current?.classList.remove(styles.change);
    }, 300);
  });

  return (
    <div ref={domRef} className={clsx(styles.trackUpdate)}>
      上次更新时间: <span>{Date.now()}</span>
    </div>
  );
}
