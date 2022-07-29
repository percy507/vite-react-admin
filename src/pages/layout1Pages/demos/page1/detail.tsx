import { Button, Card, Form } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IconFont } from '@/components/IconFont';
import { PageWrapper } from '@/components/PageWrapper';
import { TinyMCE } from '@/components/TinyMCE';
import { requestDetail } from '@/services/page1';
import { enumTag, PROCESS_STATUS, PROCESS_STATUS_COLOR } from '@/utils/enum';

import styles from './style.module.less';

export default function RoleManage() {
  const [data, setData] = useState<any>({});
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    requestDetail(id).then(({ data }) => {
      setData(data);
    });
  }, [id]);

  return (
    <PageWrapper
      pageType="detail"
      className={styles.detail}
      header={{
        subTitle: '二级标题',
        breadcrumb: {
          routes: [
            { path: '../', breadcrumbName: '一级菜单' },
            { path: '', breadcrumbName: '查看详情' },
          ],
        },
      }}
      footer={
        <div>
          <Button type="primary" style={{ marginRight: 16 }} onClick={() => nav(-1)}>
            返回
          </Button>
        </div>
      }>
      <Form form={form} labelWrap>
        <Card
          style={{ marginBottom: 16 }}
          title={
            <div className={styles.detailTitle}>
              <IconFont type="icon-layout-masonry-fill" />
              <span style={{ padding: '0 10px' }}>{data.title}</span>
              {enumTag(data.status || 1, PROCESS_STATUS, PROCESS_STATUS_COLOR)}
            </div>
          }>
          <div className={styles.numberTitle}>
            <Form.Item label="关注人数：">{data.attentionNum || 0}</Form.Item>
            <Form.Item label="浏览数：">{data.browserNum || 0}</Form.Item>
            <Form.Item label="分享数：">{data.shareNum || 0}</Form.Item>
          </div>
        </Card>

        <Card style={{ marginBottom: 16 }} title={<div id="基本信息">基本信息</div>}>
          <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="活动标题">
            {data.title || '-'}
          </Form.Item>
          <Form.Item label="活动时间" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {moment(data.startTime).format('YYYY-MM-DD')} -{' '}
            {moment(data.endTime).format('YYYY-MM-DD')}
          </Form.Item>
          <Form.Item label="封面" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {<img src={((data.coverFiles || [])[0] || {}).name} width="150" alt="" />}
          </Form.Item>
        </Card>
        <Card style={{ marginBottom: 16 }} title={<div id="详情介绍">详情介绍</div>}>
          <Form.Item label="地址" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <div>{data.address}</div>
          </Form.Item>
          <Form.Item label="参与人数" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <div>{data.participateNum || 0}</div>
          </Form.Item>
          <Form.Item label="价格" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <div>{data.participatePrice + '元'}</div>
          </Form.Item>
          <Form.Item label="内容介绍" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <div className={styles.wrap}>
              <TinyMCE readOnly value={data.content} />
            </div>
          </Form.Item>
        </Card>
      </Form>
    </PageWrapper>
  );
}
