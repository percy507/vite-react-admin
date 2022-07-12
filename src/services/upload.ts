import type { UploadProps } from 'antd';

import request from '@/utils/request';

export function requestUpload(params: any) {
  return request.postFormData('https://api.imgbb.com/1/upload', params);
}

export const requestUploadConfig = (): Pick<UploadProps, 'action' | 'data'> => ({
  action: 'https://api.imgbb.com/1/upload',
  data: { key: '49e27928735c3bd80e8aa27349a34c5b' },
});
