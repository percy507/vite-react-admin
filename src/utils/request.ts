import { message, Modal, notification } from 'antd';
import * as qs from 'qss';

import config from './config';
import { getAuthToken } from './storage';

declare global {
  interface Blob {
    fileName?: string;
  }
}

export function redirectToLogin() {
  localStorage.clear();
  window.location.href = `/login?${qs.encode({
    from_page: encodeURIComponent(location.href),
  })}`;
}

// 标准后端响应数据格式
export interface STD_RESPONSE_FORMAT {
  code: BUSINESS_CODE;
  data: any;
  message: string;
}

// 业务code
export enum BUSINESS_CODE {
  SUCCESS_CODE = 0, // 请求成功
  TOKEN_FORMAT_ERROR = 9009, // token格式错误，不是有效token
  TOKEN_INVALID = 9010, // token过期
  TOKEN_CRYPT_ERROR = 9011, // token加解密异常
  PEOJECT_ACCESS_ERROR = 9040, // 用户没有该项目的权限
}

type CancelablePromise = Promise<any> & {
  cancel: () => void;
};

let isMaintainModalOpen = false;

enum RequestErrType {
  TimeoutErr = 'timeoutErr',
  HttpErr = 'httpErr',
  BizErr = 'bizErr',
}

class Request {
  serverUrl = config.BASE_API;
  timeout = 60000; // 60 * 1000ms

  fetch = (url: string, options: RequestInit = {}) => {
    let realUrl = url.match(/^(http)|(\/\/)/) ? url : `${this.serverUrl}${url}`;
    let headers = { ...(options.headers ? options.headers : {}) };
    if (getAuthToken()) headers['Authorization'] = getAuthToken();

    const controller = new AbortController();
    const result = Promise.race([
      window.fetch(realUrl, { ...options, headers, signal: controller.signal }),
      new Promise((_, reject) => {
        setTimeout(() => {
          controller.abort();
          reject({ __type: RequestErrType.TimeoutErr, message: '请求超时' });
        }, this.timeout);
      }),
    ])
      .then((response) => response as Response)
      .then(this.checkHttpStatus)
      .then(this.parseResponseResult)
      .then(this.checkBusinessCode)
      .catch((err) => {
        if (err?.__type === RequestErrType.TimeoutErr) {
          notification.error({ message: '请求超时', description: realUrl });
        } else if (err?.__type === RequestErrType.HttpErr) {
          notification.error({ message: err.message, description: err.url });
        } else if (err?.__type === RequestErrType.BizErr && err.message) {
          message.error(err.message);
        } else if (!isMaintainModalOpen) {
          isMaintainModalOpen = true;
          // 调接口时，除过超时报错、业务code报错、http状态码非2xx错误，其他的比如cors报错、网络无法连接错误等都会弹窗。
          Modal.warning({
            title: '系统正在维护中，请稍后再试！',
            onCancel: () => (isMaintainModalOpen = false),
            onOk: () => (isMaintainModalOpen = false),
          });
        }
        return Promise.reject(err);
      }) as CancelablePromise;

    result.cancel = () => controller.abort();
    return result;
  };

  checkHttpStatus = (response: Response) => {
    const { status: statusCode, statusText, url } = response;
    if (statusCode >= 200 && statusCode < 300) return response;
    const message = `请求错误: ${statusCode}[${statusText}]`;
    return Promise.reject({ __type: RequestErrType.HttpErr, message, url });
  };

  parseResponseResult = async (response: Response) => {
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.indexOf('json') > -1) {
      return response.json();
    } else if (contentType && contentType.indexOf('octet-stream') > -1) {
      const blob = await response.blob();
      // 需要后端配合设置自定义响应头 X-Filename, 并设置 Access-Control-Expose-Headers:  X-Filename
      const fileName = response.headers.get('X-Filename');
      blob.fileName = fileName ? decodeURI(fileName) : undefined;
      return blob;
    } else if (contentType && contentType.indexOf('image') > -1) {
      return response.blob();
    }

    return response.text();
  };

  checkBusinessCode = (response: any) => {
    if (typeof response === 'object' && response.code !== undefined) {
      const stdResponse = response as STD_RESPONSE_FORMAT;
      const code = stdResponse.code;
      const msg = stdResponse.message;

      switch (code) {
        case BUSINESS_CODE.SUCCESS_CODE:
          return stdResponse;
        case BUSINESS_CODE.TOKEN_INVALID:
        case BUSINESS_CODE.TOKEN_FORMAT_ERROR:
        case BUSINESS_CODE.TOKEN_CRYPT_ERROR:
          setTimeout(() => redirectToLogin(), 1200);
          break;
        case BUSINESS_CODE.PEOJECT_ACCESS_ERROR:
        default:
          break;
      }

      return Promise.reject({ __type: RequestErrType.BizErr, message: msg, response });
    }

    return response;
  };

  get = (url: string, data?: Record<string, any>) => {
    return this.fetch(data ? `${url}?${qs.encode(data)}` : url, { method: 'GET' });
  };

  post = (url: string, data?: Record<string, any>) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
      body: data ? qs.encode(data) : undefined,
    });
  };

  postJson = (url: string, data?: Record<string, any>) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  // post large binary data, eg: file
  postFormData = (url: string, data?: Record<string, any>) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        if (data[key] != null) formData.append(key, data[key]);
      });
    }
    return this.fetch(url, { method: 'POST', body: formData });
  };

  putJson = (url: string, data?: Record<string, any>) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  delete = (url: string, data?: Record<string, any>) => {
    return this.fetch(data ? `${url}?${qs.encode(data)}` : url, { method: 'DELETE' });
  };
}

export default new Request();
