import { Button } from 'antd';
import { Link } from 'react-router-dom';

import typeConfigMap from './config';
import styles from './style.module.less';

type ExceptionProps = {
  type: keyof typeof typeConfigMap;
};

export default function Exception(props: ExceptionProps) {
  const { type } = props;
  const pageType = type in typeConfigMap ? type : '404';
  const configObj = typeConfigMap[pageType];

  return (
    <div className={styles.exception}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${configObj.img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{configObj.title}</h1>
        <div className={styles.desc}>{configObj.desc}</div>
        <div className={styles.actions}>
          <Link to="/">
            <Button type="primary">返回首页</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
