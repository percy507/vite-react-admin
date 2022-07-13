import type { ButtonProps } from 'antd';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';

interface AsyncButtonProps {
  style?: React.CSSProperties;
  /** 按钮内容 */
  content: React.ReactNode;
  /** 弹窗内容 */
  popContent: React.ReactNode;
  /** 弹窗内是否有自定义表单 */
  hasForm?: boolean;
  /** 是否是按钮样式 */
  isButton?: boolean;
  buttonProps?: ButtonProps;
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
    isButton = false,
    buttonProps = {},
  } = props;
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleOk = () => {
    if (!hasForm) setSubmitting(true);

    asyncService(() => setSubmitting(true))
      .then(() => {
        setVisible(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Popconfirm
      title={popContent}
      visible={visible}
      onConfirm={handleOk}
      okButtonProps={{ loading: submitting }}
      onCancel={() => setVisible(false)}>
      {isButton ? (
        <Button {...buttonProps} style={style} onClick={() => setVisible(true)}>
          {content}
        </Button>
      ) : (
        <a style={{ ...style }} onClick={() => setVisible(true)}>
          {content}
        </a>
      )}
    </Popconfirm>
  );
}
