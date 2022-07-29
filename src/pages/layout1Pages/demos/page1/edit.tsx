import { Button, Card, DatePicker, Form, Input, InputNumber, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AsyncButton } from '@/components/AsyncButton';
import { PageWrapper } from '@/components/PageWrapper';
import { SuperUpload } from '@/components/SuperUpload';
import { TinyMCE } from '@/components/TinyMCE';
import { requestDetail, requestEdit } from '@/services/page1';

import styles from './style.module.less';

export default function RoleManage() {
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const nav = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const isEdit = !!id;
  const [data, setData] = useState<any>({});

  const breadcrumbList = [
    { path: '', breadcrumbName: '一级菜单' },
    { path: '../', breadcrumbName: '二级菜单' },
    { path: '', breadcrumbName: isEdit ? '编辑' : '添加' },
  ];

  useEffect(() => {
    if (!isEdit) return;
    requestDetail(id).then(({ data }) => {
      setData(data);
      form.setFieldsValue({
        ...data,
        coverFiles: [
          {
            uid: '1',
            name: 'cover',
            id: ((data.coverFiles || [])[0] || {}).id,
            url: ((data.coverFiles || [])[0] || {}).id,
          },
        ],
        range: [moment(data.startTime), moment(data.endTime)],
      });
    });
  }, [id, form, isEdit]);
  const handleOk = (pub: number) => {
    // 保存 0 发布 1
    return new Promise((resolve, reject) => {
      form
        .validateFields()
        .then((value) => {
          const request = requestEdit;
          console.log(value, 'value');
          // const request = isEdit ? requestEditHuoDong : requestEditHuoDong;
          if (pub) setPublishing(true);
          else setSaving(true);
          request({
            ...value,
            display: pub === 1 ? true : false,
            id: isEdit ? id : undefined,
            startTime: value.range[0].format('YYYY-MM-DD'),
            endTime: value.range[1].format('YYYY-MM-DD'),
            coverFiles: (value.coverFiles || []).map((el) => ({
              name: el.id,
              // url: el.id,
              id: el.id,
            })),
            range: undefined,
          })
            .then(() => {
              message.success(pub ? '发布成功' : '保存成功');
              nav('../');
            })
            .finally(() => {
              setSaving(false);
              setPublishing(false);
              resolve(null);
            });
        })
        .catch((errorInfo) => {
          console.log(errorInfo);
          reject();
        });
    });
  };

  return (
    <PageWrapper
      className={styles.root}
      header={{ breadcrumb: { routes: breadcrumbList } }}
      footer={
        <div>
          <Button style={{ marginRight: 16 }} onClick={() => nav(-1)}>
            取消
          </Button>
          <Button
            style={{ marginRight: 16 }}
            onClick={() => handleOk(0)}
            loading={saving}>
            保存
          </Button>
          <AsyncButton
            content="发布"
            isButton
            buttonProps={{ type: 'primary', loading: publishing }}
            popContent="确定发布？"
            asyncService={() => {
              return handleOk(1);
            }}
          />
        </div>
      }>
      <Card title={isEdit ? '编辑' : '添加'}>
        <Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
          <Card style={{ marginBottom: 16 }} title={<div id="基本信息">基本信息</div>}>
            <Form.Item
              label="活动标题"
              name="title"
              rules={[{ required: true, message: '请输入' }]}>
              <Input maxLength={30} style={{ width: 400 }} placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="活动时间"
              name="range"
              rules={[{ required: true, message: '请输入' }]}>
              <DatePicker.RangePicker
                style={{ width: 400 }}
                disabled={[data.editStatus == 2 && isEdit, false]}
              />
            </Form.Item>
            <Form.Item
              label="封面"
              name="coverFiles"
              rules={[{ required: true, message: '请上传图片' }]}>
              <SuperUpload
                showTips
                name="file"
                imageRatio="297x180"
                listType="picture-card"
                maxFileSize={20 * 1024 * 1024}
              />
            </Form.Item>
          </Card>
          <Card title="详情介绍" style={{ marginBottom: 16 }}>
            <Form.Item
              label="活动地址"
              name="address"
              rules={[{ required: true, message: '请输入' }]}>
              <Input maxLength={30} style={{ width: 400 }} placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="参与人数"
              name="participateNum"
              rules={[{ required: true, message: '请输入' }]}>
              <InputNumber
                max={99999}
                min={1}
                precision={0}
                type="number"
                style={{ width: 400 }}
                placeholder="请输入"
              />
            </Form.Item>
            <Form.Item
              label="报名价格"
              name="participatePrice"
              rules={[{ required: true, message: '请输入' }]}>
              <InputNumber
                max={99999}
                type="number"
                min={0}
                precision={2}
                style={{ width: 400 }}
                placeholder="请输入"
                disabled={data.editStatus == 1 && isEdit}
                addonAfter="元"
              />
            </Form.Item>

            <Form.Item
              label="活动内容介绍"
              name="content"
              rules={[{ required: true, message: '请输入' }]}>
              <TinyMCE style={{ width: 750 }} />
            </Form.Item>
          </Card>
        </Form>
      </Card>
    </PageWrapper>
  );
}
