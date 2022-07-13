import { useCallback, useEffect, useState } from 'react';

import { requestVerifyCodeUrl } from '@/services/common';

interface VerifyCodeProps {
  /** 设置验证码凭证 */
  setCert: Function;
  style?: React.CSSProperties;
}

export function VerifyCode(props: VerifyCodeProps) {
  const { setCert, style } = props;
  const [url, setUrl] = useState('');

  const refreshCode = useCallback(() => {
    const cert = `${~~(Math.random() * Date.now())}_${~~(Math.random() * Date.now())}`;
    setCert(cert);
    requestVerifyCodeUrl(cert).then(({ data }) => setUrl(data));
  }, [setCert]);

  useEffect(() => refreshCode(), [refreshCode]);
  return <img style={{ ...style, height: 30 }} onClick={() => refreshCode()} src={url} />;
}
