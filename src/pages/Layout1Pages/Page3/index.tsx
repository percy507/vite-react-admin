import { Alert, Button, Card, Collapse, message, Tooltip } from 'antd';

import PageWrapper from '@/components/PageWrapper';
import useRequest from '@/hooks/useRequest';
import {
  requestBusinessError,
  requestHttpError,
  requestSuccess1,
  requestSuccess2,
} from '@/services/test';

import styles from './style.module.less';

const { Panel } = Collapse;

export default function Page3() {
  const { run: getHttpError } = useRequest(requestHttpError, {
    onFail: () => {
      message.error('自定义请求失败消息: http error');
    },
  });
  const { run: getArticleDetail0 } = useRequest(requestBusinessError, {
    onSuccess: () => {
      message.success('请求0成功');
    },
    onFail: () => {
      message.error('自定义请求失败消息: business error');
    },
  });
  const {
    loading: loading1,
    data: data111,
    run: getArticleDetail,
  } = useRequest(requestSuccess1, {
    onSuccess: () => {
      message.success('请求1成功');
    },
  });
  const {
    loading: loading2,
    data: data222,
    run: getArticleDetail2,
    cancel: cancelRequest2,
  } = useRequest(requestSuccess2, {
    onSuccess: () => {
      message.success('请求2成功');
    },
  });

  const componentList = [
    {
      title: 'request、useRequest 测试',
      children: (
        <div>
          <Alert
            message={
              <div>
                测试前，需要启动一个后端服务。
                <a
                  href="https://github.com/percy507/koa2-template"
                  target="_blank"
                  rel="noreferrer"
                >
                  参考这里
                </a>
              </div>
            }
            type="warning"
            showIcon
          />
          <div className={styles.buttonGroup}>
            <Button onClick={() => getHttpError()}>HTTP异常</Button>
            <Button onClick={() => getArticleDetail0()}>业务异常</Button>
            <Tooltip
              placement="bottom"
              title={<pre>{data111 ? JSON.stringify(data111, null, 4) : '暂无数据'}</pre>}
            >
              <Button loading={loading1} onClick={() => getArticleDetail()}>
                测试响应成功1
              </Button>
            </Tooltip>
            <Tooltip
              placement="bottom"
              title={<pre>{data111 ? JSON.stringify(data222, null, 4) : '暂无数据'}</pre>}
            >
              <Button loading={loading2} onClick={() => getArticleDetail2()}>
                测试响应成功2
              </Button>
            </Tooltip>
            <Button onClick={() => cancelRequest2()}>取消请求(测试响应成功2)</Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper className={styles.Page3}>
      <Card title="各种测试集合">
        <Collapse accordion>
          {componentList.map((el) => {
            return (
              <Panel header={el.title} key={el.title}>
                {el.children}
              </Panel>
            );
          })}
        </Collapse>
      </Card>
    </PageWrapper>
  );
}
