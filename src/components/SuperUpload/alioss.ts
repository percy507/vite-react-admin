import OSS from 'ali-oss';
import type { UploadProps } from 'antd';
import { message } from 'antd';
import { useEffect, useState } from 'react';

import config from '@/utils/config';

// 获取STS授权
function requestSTS() {
  return Promise.resolve({
    accessKeyId: '111',
    accessKeySecret: '222',
    securityToken: '333',
  });
}

const FILE_EXPIRES = 50 * 365 * 24 * 3600;

export const requestAliOSSUpload = async (
  file: File,
  // @ts-ignore
  // eslint-disable-next-line
  { onSuccess, onProgress, onError }: any = {},
) => {
  try {
    const stsRes = await requestSTS();
    const ossData = stsRes;

    const getOSSOptions = (write = false) => {
      const common = {
        region: 'oss-cn-shanghai',
        accessKeyId: ossData.accessKeyId,
        accessKeySecret: ossData.accessKeySecret,
        endpoint: 'https://oss-cn-shanghai.aliyuncs.com',
        bucket: config.alioss_bucket,
      };
      const extra = { stsToken: ossData.securityToken, secure: true };
      return write ? { ...common, ...extra } : common;
    };

    const clientWrite = new OSS(getOSSOptions(true));
    const objectKey = file.name.replace(/(\.[^.]+)$/, `${Date.now()}$1`);
    // client.append 使用追加上传，因为追加上传使用的post请求，符合等保要求。但是需要保证objectKey唯一，否则上传会报错
    // client.put 简单上传的默认请求是put请求，虽然可以设置为post，但是会报跨域错误，不知如何解决
    // client.multipartUpload 分片上传只支持put请求
    const uploadRes = await clientWrite.append(objectKey, file, {
      // 只有分片上传支持
      // progress: (p) => {
      //   if (onProgress) onProgress({ percent: p * 100 });
      // },
    });

    if (uploadRes.res.status === 200) {
      const clientRead = new OSS({
        ...getOSSOptions(),
        accessKeyId: 'wtfxsadfkjsdaflasdf',
        accessKeySecret: 'WTFaskldfjalfjl',
      });
      const url = clientRead.signatureUrl(objectKey, { expires: FILE_EXPIRES });
      console.log('uploadRes', uploadRes, url);
      const response = { ...uploadRes, name: file.name, url };
      if (onSuccess) onSuccess(response);
      return response;
    } else throw new Error('上传失败');
  } catch (e) {
    message.error('上传失败');
    if (onError) onError(e, file);
  }
};

export function useAliOSS() {
  const [cr, setCR] = useState<UploadProps['customRequest']>();

  useEffect(() => {
    const request: UploadProps['customRequest'] = (options) => {
      if (!options) return;
      const { file: __file, onSuccess, onError, onProgress } = options;
      const file = __file as File;
      requestAliOSSUpload(file, { onSuccess, onError, onProgress });
    };
    setCR(() => request);
  }, []);
  return { customRequest: cr };
}
