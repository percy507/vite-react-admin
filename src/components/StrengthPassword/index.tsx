import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { InputProps, PopconfirmProps } from 'antd';
import { Input, Popconfirm } from 'antd';
import { useState } from 'react';

import styles from './style.module.less';

const specialChars = '\\.\\@\\$\\!\\%\\*\\#\\_\\~\\?\\&\\^';

const isMatchRule = (value, options) => {
  const {
    minCharNum = 1, // 最少字符数
    maxCharNum = '', // 最多字符数
    // 字符组合数数组
    // [1]表示只匹配只包含一种字符的value
    // [1,2]表示匹配只包含一种或两种字符的value
    // [2,3]表示匹配只包含两种或三种字符的value
    groupArr = [],
    matchAnyChar = false, // 是否匹配任意字符
  } = options;
  const resultBoolArr: boolean[] = [];

  const isMatchAnyChar = new RegExp(`^.{${minCharNum},${maxCharNum}}$`).test(value);
  const isAllCharValid = new RegExp(
    `^[a-zA-Z\\d${specialChars}]{${minCharNum},${maxCharNum}}$`,
  ).test(value);

  const isContainLetter = /[a-zA-Z]/.test(value);
  const isContainLetterLower = /[a-z]/.test(value);
  const isContainLetterUpper = /[A-Z]/.test(value);

  const isContainNumber = /\d/.test(value);
  const isContainSpecialChar = new RegExp(`[${specialChars}]`).test(value);

  const isMatchOneKindChar =
    (isContainLetter && !isContainNumber && !isContainSpecialChar) ||
    (!isContainLetter && isContainNumber && !isContainSpecialChar) ||
    (!isContainLetter && !isContainNumber && isContainSpecialChar);
  const isMatchTwoKindChar =
    (isContainLetter && isContainNumber && !isContainSpecialChar) ||
    (isContainLetter && !isContainNumber && isContainSpecialChar) ||
    (!isContainLetter && isContainNumber && isContainSpecialChar);
  const isMatchThreeKindChar = isContainLetter && isContainNumber && isContainSpecialChar;

  const matchCharObj = {
    1: isMatchOneKindChar,
    2: isMatchTwoKindChar,
    3: isMatchThreeKindChar,
    4: isContainSpecialChar,
    5: isContainLetterLower,
    6: isContainLetterUpper,
    7: isContainNumber,
  };

  if (matchAnyChar) {
    resultBoolArr.push(isMatchAnyChar);
  } else {
    resultBoolArr.push(isMatchAnyChar, isAllCharValid);
  }

  if (groupArr.length) {
    const groupBoolArr = groupArr.map((id) => matchCharObj[id]);
    resultBoolArr.push(groupBoolArr.includes(true));
  }

  return !resultBoolArr.includes(false);
};

const getPassRules = (value) => {
  return [
    {
      label: '8-16位',
      isMatch: isMatchRule(value, { minCharNum: 8, maxCharNum: 16, matchAnyChar: true }),
    },
    // {
    //   label: '字母、数字、特殊字符任意两种以上组合',
    //   isMatch: isMatchRule(value, {
    //     minCharNum: 8,
    //     maxCharNum: 16,
    //     matchAnyChar: true,
    //     groupArr: [2, 3]
    //   })
    // },
    {
      label: `至少需要一个或多个大写字母`,
      isMatch: isMatchRule(value, { minCharNum: 8, maxCharNum: 16, groupArr: [6] }),
    },
    {
      label: `至少需要一个或多个小写字母`,
      isMatch: isMatchRule(value, { minCharNum: 8, maxCharNum: 16, groupArr: [5] }),
    },
    {
      label: `至少需要一个数字`,
      isMatch: isMatchRule(value, { minCharNum: 8, maxCharNum: 16, groupArr: [7] }),
    },
    {
      label: `至少需要一个非字母数字字符（${specialChars.replace(/\\/g, '')}）`,
      isMatch: isMatchRule(value, { minCharNum: 8, maxCharNum: 16, groupArr: [4] }),
    },
  ];
};

interface StrengthPasswordProps {
  placement?: PopconfirmProps['placement'];
  value?: string;
  onChange?: (value: string) => void;
  inputProps?: Omit<InputProps, 'value' | 'onChange'>;
}

/** 可以展示密码强度的密码输入框 */
export function StrengthPassword(props: StrengthPasswordProps) {
  const { value, onChange, inputProps, placement = 'rightTop' } = props;
  const [visible, setVisible] = useState(false);

  const renderHintContent = (v) => {
    const value = v || '';
    const strengthArr = [
      isMatchRule(value, { minCharNum: 8, maxCharNum: 12, groupArr: [2] }),
      isMatchRule(value, { minCharNum: 12, maxCharNum: 16, groupArr: [2] }),
      isMatchRule(value, { minCharNum: 8, maxCharNum: 16, groupArr: [3] }),
    ];
    const rules = getPassRules(value);

    if (strengthArr[2]) {
      strengthArr[0] = true;
      strengthArr[1] = true;
    } else if (strengthArr[1]) {
      strengthArr[0] = true;
    }

    return (
      <div className={styles.hint}>
        <div className={styles.hint__head}>
          <span>密码强度</span>
          <span>
            {strengthArr.map((isMatch, index) => {
              return (
                <span
                  key={index}
                  className={styles.hint__head__block}
                  style={{ backgroundColor: isMatch ? '#52c41a' : '#f6f6f6' }}
                />
              );
            })}
          </span>
        </div>
        <div className={styles.hint__content}>
          {rules.map((rule) => {
            return (
              <div key={rule.label}>
                <span>
                  {rule.isMatch ? (
                    <CheckOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <CloseOutlined style={{ color: '#F04134' }} />
                  )}
                </span>
                <span>{rule.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Popconfirm
      visible={visible}
      placement={placement}
      title={renderHintContent(value)}
      icon={null}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyTooltipOnHide>
      <Input.Password
        {...inputProps}
        maxLength={16}
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        onBlur={() => setVisible(false)}
        onFocus={() => setVisible(true)}
      />
    </Popconfirm>
  );
}

StrengthPassword.validator = (_rule, value, callback) => {
  const rules = getPassRules(value || '');
  const isRulesAllPass = !rules.map((el) => el.isMatch).includes(false);

  if (isRulesAllPass) {
    callback();
  } else {
    callback('请输入有效的密码');
  }
};
