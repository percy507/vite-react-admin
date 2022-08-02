import type { Rule as RuleType } from 'antd/es/form';

/**
 * Rule 类定义了一些用与 antd 表单校验的常用规则，默认antd会校验所有传入的rules，
 * 如果想逐个校验，可以给 `Form.Item` 设置 `validateFirst` 参数
 */
export class Rule {
  static inputRequired(msg?: string): RuleType {
    return { required: true, message: msg || '请输入' };
  }

  static selectRequired(msg?: string): RuleType {
    return { required: true, message: msg || '请选择' };
  }

  /** 验证中国大陆身份证号格式（15位或18位） */
  static idNumber(msg?: string): RuleType {
    return { pattern: /^(\d{17}[\dxX])|\d{15}$/, message: msg || '证件号码格式不正确' };
  }

  /** 验证中国大陆手机号格式 */
  static phoneNumber(msg?: string): RuleType {
    return { pattern: /^1\d{10}$/, message: msg || '手机号格式不正确' };
  }

  /** 粗略验证联系方式（手机号、座机等）格式 */
  static contactNumber(msg?: string): RuleType {
    return { pattern: /^[\d-]{7,20}$/, message: msg || '联系方式格式不正确' };
  }
}
