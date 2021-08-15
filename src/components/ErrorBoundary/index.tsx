import { WarningOutlined } from '@ant-design/icons';
import React from 'react';

import styles from './style.module.less';

interface Props {
  children: JSX.Element;
}

interface State {
  hasError: boolean;
}

/**
 * 捕获子组件
 * https://zh-hans.reactjs.org/docs/error-boundaries.html
 */
export default class ErrorBoundary extends React.PureComponent<Props, State> {
  constructor(props: Props) {
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
