import { message, notification } from 'antd';
import qs from 'qs';

import config from './config';

// import { getAuthToken } from './token';

const httpStatusCodeMap = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 业务code
const SUCCESS_CODE = 200; // 请求成功
const TOKEN_FORMAT_ERROR = 9009; // token格式错误，不是有效token
const TOKEN_INVALID = 9010; // token过期
const TOKEN_CRYPT_ERROR = 9011; // token加解密异常
const PEOJECT_ACCESS_ERROR = 9040; // 用户没有该项目的权限

type httpStatusCode = keyof typeof httpStatusCodeMap;
type Data = {
  [key: string]: any;
};

class Request {
  serverUrl = config.BASE_API;

  fetch = (url: string, options: RequestInit = {}) => {
    const realUrl = url.match(/^(http)|(\/\/)/) ? url : `${this.serverUrl}${url}`;

    const promiseList = [
      window.fetch(realUrl, {
        ...options,
        headers: {
          // Authorization: getAuthToken(),
          ...(options.headers ? options.headers : {}),
        },
      }),
      // fetch 请求60秒超时判断
      new Promise((_resolve, reject) => {
        setTimeout(() => reject(new Error('请求超时')), 60000);
      }),
    ];

    return Promise.race(promiseList)
      .then((response) => response as Response)
      .then(this.checkHttpStatus)
      .then(this.parseResponseResult)
      .then((response: any) => {
        if (typeof response === 'object' && response.code !== undefined) {
          if (!this.checkBusinessCode(response)) {
            throw new Error(`请求异常: ${response.code}-${response.message}\n${realUrl}`);
          }
        }

        return response;
      })
      .catch((error) => {
        return Promise.reject(error && `${error.toString()} : ${realUrl}`);
      });
  };

  toLogin = () => {
    window.location.href = `/login?from_page=${encodeURIComponent(location.href)}`;
  };

  checkHttpStatus = (response: Response) => {
    const statusCode = response.status;

    if (statusCode >= 200 && statusCode < 300) {
      return response;
    }

    const errortext =
      httpStatusCodeMap[response.status as httpStatusCode] || response.statusText;
    const error = new Error(errortext);

    error.name = `${response.status}`;
    // @ts-ignore-next-line
    error.response = response;

    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errortext,
    });

    throw error;
  };

  parseResponseResult = (response: Response) => {
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.indexOf('json') > -1) {
      return response.json();
    } else if (contentType && contentType.indexOf('octet-stream') > -1) {
      return response.blob();
    } else if (contentType && contentType.indexOf('image') > -1) {
      return response.blob();
    }

    return response.text();
  };

  checkBusinessCode = (response: any) => {
    const code = response.status;
    const msg = response.message;

    if (code === SUCCESS_CODE) {
      return true;
    } else if (
      code === TOKEN_FORMAT_ERROR ||
      code === TOKEN_INVALID ||
      code === TOKEN_CRYPT_ERROR
    ) {
      this.toLogin();
    } else if (code === PEOJECT_ACCESS_ERROR) {
      message.error(msg);
      return true;
    }

    message.error(msg);

    return false;
  };

  get = (url: string) => {
    return this.fetch(url, { method: 'GET' });
  };

  post = (url: string, data: Data) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
      body: qs.stringify(data),
    });
  };

  postJson = (url: string, data: Data) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  // post large binary data, eg: file
  postFormData = (url: string, data: Data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.fetch(url, {
      method: 'POST',
      body: formData,
    });
  };

  putJson = (url: string, data: Data) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  delete = (url: string) => {
    return this.fetch(url, { method: 'DELETE' });
  };
}

// How do I cancel an HTTP fetch() request?
// https://stackoverflow.com/questions/31061838/how-do-i-cancel-an-http-fetch-request
export default new Request();
