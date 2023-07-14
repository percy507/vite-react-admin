import type { ButtonProps, PopconfirmProps } from 'antd';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';

export interface AsyncButtonProps {
  style?: React.CSSProperties;
  /** 按钮内容 */
  content: React.ReactNode;
  /** 弹窗内容 */
  popContent: React.ReactNode;
  placement?: PopconfirmProps['placement'];
  icon?: PopconfirmProps['icon'];
  okText?: PopconfirmProps['okText'];
  cancelText?: PopconfirmProps['cancelText'];
  /** 弹窗内是否有自定义表单 */
  hasForm?: boolean;
  /** 是否是按钮样式 */
  isButton?: boolean;
  buttonProps?: ButtonProps;
  onCustomClick?: (
    e: React.MouseEvent,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  /**
   * 异步服务
   * @startLoading 当弹窗内容为自定义表单时，该函数用于手动触发确认按钮的loading效果
   */
  asyncService: (startLoading: () => void) => Promise<any>;
}

/**
 * 集成异步操作的按钮。默认按钮为纯文本样式，也可通过 `isButton`
 * 设置为 antd 的 Button 组件样式。
 */
export function AsyncButton(props: AsyncButtonProps) {
  const {
    style,
    content,
    popContent,
    hasForm = false,
    asyncService,
    placement,
    okText,
    icon,
    cancelText,
    isButton = false,
    buttonProps = {},
    onCustomClick,
  } = props;
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleOk = () => {
    if (!hasForm) setSubmitting(true);

    asyncService(() => setSubmitting(true)).finally(() => {
      setVisible(false);
      setSubmitting(false);
    });
  };

  const onClick = (e) => {
    if (onCustomClick instanceof Function) onCustomClick(e, setVisible);
    else setVisible(true);
  };

  return (
    <Popconfirm
      title={popContent}
      visible={visible}
      icon={icon}
      onConfirm={handleOk}
      placement={placement}
      okButtonProps={{ loading: submitting }}
      okText={okText}
      cancelText={cancelText}
      onCancel={() => setVisible(false)}>
      {isButton ? (
        <Button {...buttonProps} style={style} onClick={onClick}>
          {content}
        </Button>
      ) : (
        <a style={style} onClick={onClick}>
          {content}
        </a>
      )}
    </Popconfirm>
  );
}
