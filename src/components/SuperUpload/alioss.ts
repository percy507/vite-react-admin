import OSS from 'ali-oss';
import type { UploadProps } from 'antd';
import { message } from 'antd';
import { useEffect, useState } from 'react';

import config from '@/utils/config';

// 获取STS授权
function getSTS() {
  return Promise.resolve({
    accessKeyId: '111',
    accessKeySecret: '222',
    securityToken: '333',
  });
}

const FILE_EXPIRES = 50 * 365 * 24 * 3600;

export const requestAliOSSUpload = async (
  file: File,
  { onSuccess, onProgress, onError }: any = {},
) => {
  try {
    const stsRes = await getSTS();
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
    const uploadRes = await clientWrite.multipartUpload(objectKey, file, {
      progress: (p) => {
        if (onProgress) onProgress({ percent: p * 100 });
      },
    });

    if (uploadRes.res.status === 200) {
      const clientRead = new OSS(getOSSOptions());
      const url = clientRead.signatureUrl(objectKey, { expires: FILE_EXPIRES });
      const response = { ...uploadRes, url };
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
