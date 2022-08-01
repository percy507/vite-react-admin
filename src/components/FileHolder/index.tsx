import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';

import { IconFont } from '../IconFont';
import styles from './style.module.less';

const DEFAULT_ICON = 'icon-weizhiwenjian';

const configs: [exts: string[], icon: string, preview?: boolean][] = [
  [['jpg', 'jpeg', 'png'], 'icon-tupian', true],
  [['pdf'], 'icon-pdf', true],
  [['doc', 'docx'], 'icon-word'],
  [['xls', 'xlsx'], 'icon-excel'],
  [['zip', 'rar'], 'icon-yasuo'],
];

interface FileHolderProps {
  file: { fileName: string; fileUrl: string };
  width?: number;
}

/** 用来展示文件，支持下载文件和预览部分类型的文件 */
export function FileHolder(props: FileHolderProps) {
  const { file, width = 200 } = props;
  const suffix = file.fileName.match(/\.([^.]+)$/)?.[1]?.toLowerCase() || 'unknown';
  const [, fileIcon, preview] = configs.find((el) => el[0].includes(suffix)) || [];

  return (
    <div className={styles.fileHolder} style={{ width }}>
      <div className={styles.icon}>
        <IconFont type={fileIcon || DEFAULT_ICON} style={{ fontSize: 20 }} />
      </div>
      <div className={styles.name}>{file?.fileName}</div>
      <div className={styles.preview} style={{ width }} title={file.fileName}>
        {preview ? (
          <EyeOutlined onClick={() => window.open(file.fileUrl, '_blank')} />
        ) : null}
        <CloudDownloadOutlined
          onClick={() => downloadFile(file.fileUrl, file.fileName)}
        />
      </div>
    </div>
  );
}

function downloadFile(url: string, name: string) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => saveBlob(blob, name));
}

function saveBlob(blob: Blob, fileName: string) {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.cssText = 'display: none';
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  a.remove();
  window.URL.revokeObjectURL(a.href);
}
