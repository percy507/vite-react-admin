import type { UploadProps } from 'antd';
import { message } from 'antd';

import request from '@/utils/request';

export function requestUpload(params: any) {
  return request.postFormData('https://api.imgbb.com/1/upload', params);
}

export const requestUploadConfig = (): Pick<UploadProps, 'action' | 'data'> => ({
  action: 'https://api.imgbb.com/1/upload',
  data: { key: '49e27928735c3bd80e8aa27349a34c5b' },
});

export function requestVerifyCodeUrl(cert: string) {
  // return request.get(`/api/verifycode?cert=${cert}`);
  console.log(cert);
  message.info('验证码接口需要后端支持');
  return Promise.resolve({
    data: 'https://raw.githubusercontent.com/produck/svg-captcha/1.x/media/example.png',
  });
}
