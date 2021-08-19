import { WarningOutlined } from '@ant-design/icons';
import React from 'react';

import styles from './style.module.less';

interface ErrorBoundaryProps {
  children: JSX.Element;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * 捕获子组件的异常，并降级UI展示
 * https://zh-hans.reactjs.org/docs/error-boundaries.html
 */
export default class ErrorBoundary extends React.PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
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
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <WarningOutlined className={styles.errorIcon} />
          <div>加载出错,请刷新页面</div>
        </div>
      );
    }

    return this.props.children;
  }
}
