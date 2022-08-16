import { clsx } from 'clsx';

import styles from './style.module.less';

interface TinyMCEPreviewProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
}

export function TinyMCEPreview(props: TinyMCEPreviewProps) {
  const { className, style, value = '' } = props;

  return (
    <div style={style} className={clsx(styles.tinymcePreview, className)}>
      <div
        className={clsx('mce-content-body', 'mce-content-readonly')}
        dangerouslySetInnerHTML={{ __html: value }}></div>
    </div>
  );
}
