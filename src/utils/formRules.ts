import type { Rule } from 'antd/es/form';

const cb = (msg: string) => Promise.reject(new Error(msg));

export const idNumberRule: Rule = {
  validator(_, value) {
    if (!value) return cb('请输入');
    if (!/^([0-9]{17}[0-9X])$/.test(value)) return cb('证件号码格式不正确');
    return Promise.resolve();
  },
};

export const phoneNumberRule: Rule = {
  validator(_, value) {
    if (!value) return cb('请输入');
    if (!/^1\d{10}$/.test(value)) return cb('手机号格式不正确');
    return Promise.resolve();
  },
};
