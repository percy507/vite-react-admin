import request from '@/utils/request';

export function requestUploadImage(params: any) {
  return request.postFormData('https://api.imgbb.com/1/upload', params);
}
