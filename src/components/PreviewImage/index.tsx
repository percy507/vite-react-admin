import 'react-photo-view/dist/react-photo-view.css';

import { Spin } from 'antd';
import { useState } from 'react';
import { PhotoProvider, PhotoSlider, PhotoView } from 'react-photo-view';

import styles from './style.module.less';

interface PreviewImageProps {
  imgs: string | string[];
  /** @default 100 */
  thumbWidth?: React.CSSProperties['width'];
  thumbHeight?: React.CSSProperties['height'];
  hideHint?: boolean;
  style?: React.CSSProperties;
}

export function PreviewImage(props: PreviewImageProps) {
  const { imgs, thumbWidth = 100, thumbHeight, hideHint = false, style } = props;
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.previewImage} style={style}>
      {typeof imgs === 'string' ? (
        <PhotoProvider>
          <PhotoView src={imgs.replace('-thumbnail.', '.')}>
            {/* eslint-disable-next-line */}
            <img src={imgs} width={thumbWidth} height={thumbHeight} alt="" />
          </PhotoView>
        </PhotoProvider>
      ) : (
        <div>
          <div
            className={styles.imgWrapper}
            data-imgwrapper
            style={{ width: thumbWidth, height: thumbHeight }}
            onClick={() => setVisible(true)}>
            {/* eslint-disable-next-line */}
            <img src={imgs[0]} alt="" />
            {hideHint ? null : <div className={styles.hint}>{imgs.length}</div>}
          </div>
          <PhotoSlider
            images={imgs.map((item) => ({
              src: item.replace('-thumbnail.', '.'),
              key: item,
            }))}
            visible={visible}
            onClose={() => setVisible(false)}
            index={index}
            onIndexChange={setIndex}
            loadingElement={<Spin spinning size="large" className={styles.loading} />}
          />
        </div>
      )}
    </div>
  );
}
