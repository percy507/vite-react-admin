import { WarningOutlined } from '@ant-design/icons';
import { Component } from 'react';

import styles from './style.module.less';

interface EBProps {
  children: JSX.Element;
  fallback?: React.ReactNode;
}

interface EBState {
  hasError: boolean;
}

/**
 * 捕获子组件的异常，并降级UI展示
 * https://zh-hans.reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 打印错误信息
    // 或者将错误日志上报给服务器
    console.log(error, errorInfo);
  }

  render() {
    const { children, fallback } = this.props;
    const { hasError } = this.state;
    if (!hasError) return children;
    return fallback ? (
      fallback
    ) : (
      <div className={styles.errorBoundary}>
        <WarningOutlined className={styles.errorIcon} />
        <div>加载出错,请刷新页面</div>
      </div>
    );
  }
}
