import { Button } from 'antd';
import { Link } from 'react-router-dom';

import img403 from './img/403.svg';
import img404 from './img/404.svg';
import img500 from './img/500.svg';
import styles from './style.module.less';

const typeMap = {
  403: {
    img: img403,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: img404,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
  500: {
    img: img500,
    title: '500',
    desc: '抱歉，页面渲染错误',
  },
};

interface ExceptionProps {
  type: keyof typeof typeMap;
  style?: React.CSSProperties;
}

export function Exception(props: ExceptionProps) {
  const { type, style } = props;
  const pageType = type in typeMap ? type : '404';
  const configObj = typeMap[pageType];

  return (
    <div className={styles.exception} style={style}>
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
