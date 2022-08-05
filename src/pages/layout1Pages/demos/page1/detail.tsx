import { Card, Form, message, Row, Tag } from 'antd';
import { clsx } from 'clsx';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FileHolder } from '@/components/FileHolder';
import { IconFont } from '@/components/IconFont';
import { PageWrapper } from '@/components/PageWrapper';
import { requestDetail } from '@/services/demo';
import { detailCol } from '@/utils/antd';
import { PROCESS_STATUS, PROCESS_STATUS_COLOR } from '@/utils/enum';
import { headerCard } from '@/utils/style';

import styles from './style.module.less';

export default function DetailPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    requestDetail(id)
      .then(({ data }) => {
        setData({ ...data });
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <PageWrapper
      pageType="detail"
      className={clsx(styles.detail)}
      loading={loading}
      header={{ onBack: () => nav('../'), title: '查看详情' }}>
      <Form form={form} labelWrap>
        <Card
          className={headerCard()}
          style={{ marginBottom: 16 }}
          title={
            <div>
              <IconFont type="icon-shipin" />
              <span style={{ padding: '0 10px' }}>业务ID：{data.id}</span>
              <Tag color={PROCESS_STATUS_COLOR[PROCESS_STATUS[data.status]]}>
                {PROCESS_STATUS[data.status]}
              </Tag>
            </div>
          }>
          <div style={{ display: 'flex' }}>
            <Form.Item label="所属项目" style={{ margin: 0, paddingLeft: 26 }}>
              {data.projectName || '-'}
            </Form.Item>
            <Form.Item label="创建时间" style={{ margin: 0, paddingLeft: 26 }}>
              {moment(data.startTime).format('YYYY-MM-DD HH:mm:ss')}
            </Form.Item>
            <Form.Item label="更新时间" style={{ margin: 0, paddingLeft: 26 }}>
              {moment(data.updateTime).format('YYYY-MM-DD HH:mm:ss')}
            </Form.Item>
          </div>
        </Card>

        <Card style={{ marginBottom: 16 }} title="详情信息">
          <Card size="small" style={{ marginBottom: 16 }} title="银行信息">
            <Row gutter={24}>
              {detailCol(12, '银行编号', data.title)}
              {detailCol(12, '银行名称', data.title)}
              {detailCol(12, '银行业务流水号', data.title)}
            </Row>
          </Card>
          <Card size="small" style={{ marginBottom: 16 }} title="用户信息">
            <Row gutter={24}>
              {detailCol(12, '用户类型', '个人')}
              {detailCol(12, '用户', data.title)}
              {detailCol(12, '用户联系方式', data.title)}
              {detailCol(12, '用户证件号码', data.title)}
              {detailCol(12, '收款账户开户行', data.title)}
              {detailCol(12, '收款银行账号', data.title)}
            </Row>
          </Card>
          <Card size="small" style={{ marginBottom: 16 }} title="奖励信息">
            <Row gutter={24}>
              {detailCol(12, '金额(元)', data.title)}
              {detailCol(12, '奖励1(元)', data.title)}
              {detailCol(12, '奖励2(元)', data.title)}
              {detailCol(12, '其他奖励(元)', data.title)}
              {detailCol(
                12,
                <div>
                  <div>总计奖励(元)</div>
                  <a
                    color="blue"
                    onClick={() => {
                      message.info('这是薛定谔的计算过程');
                    }}>
                    查看计算过程
                  </a>
                </div>,
                data.title,
              )}
            </Row>
          </Card>
          <Card size="small" style={{ marginBottom: 16 }} title="提交材料信息">
            <Row gutter={24}>
              {[['证明材料', data.xxx]].map((el) =>
                detailCol(
                  24,
                  el[0],
                  el[1] ? <FileHolder file={el[1]} width={400} /> : '-',
                  { key: el[0] },
                ),
              )}
            </Row>
          </Card>
        </Card>
      </Form>
    </PageWrapper>
  );
}
