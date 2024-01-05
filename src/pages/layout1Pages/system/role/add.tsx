import { Button, Card, Col, Form, Input, message, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CheckableTree } from '@/components/CheckableTree';
import { PageWrapper } from '@/components/PageWrapper';
import {
  requestAddRole,
  requestEditRole,
  requestPermissionTree,
  requestRoleDetail,
} from '@/services/system';
import { enumToOptions, ROLE_STATUS } from '@/utils/enum';

// import styles from './style.module.less';

export default function AddRole() {
  const [publishing, setPublishing] = useState(false);
  const nav = useNavigate();
  const { deptId, id } = useParams();
  const isEdit = !!id;

  const [form] = Form.useForm();

  const [ptree, setPtree] = useState<any[]>([]);

  useEffect(() => {
    requestPermissionTree().then(({ data }) => {
      setPtree(data || []);
    });
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    requestRoleDetail(id).then(({ data }) => {
      form.setFieldsValue({ ...data });
    });
  }, [isEdit, id, form]);

  const handleOk = () => {
    return new Promise((resolve, reject) => {
      form
        .validateFields()
        .then((values) => {
          const params = { deptId, ...values };
          if (isEdit) params.id = id;
          const req = isEdit ? requestEditRole : requestAddRole;
          setPublishing(true);
          req(params)
            .then(() => {
              message.success('提交成功');
              nav('../');
            })
            .finally(() => {
              setPublishing(false);
              resolve(null);
            });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  return (
    <PageWrapper
      header={{ onBack: () => nav(-1), title: isEdit ? '编辑角色' : '新增角色' }}
      footer={
        <div>
          <Button style={{ marginRight: 16 }} onClick={() => nav(-1)}>
            取消
          </Button>
          <Button type="primary" loading={publishing} onClick={() => handleOk()}>
            提交
          </Button>
        </div>
      }>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        <Card style={{ marginBottom: 16 }}>
          <Row>
            <Col span={12}>
              <Form.Item
                label="角色名称"
                name="roleName"
                rules={[{ required: true, message: '请输入' }]}>
                <Input maxLength={50} placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="状态"
                name="status"
                initialValue={ROLE_STATUS.正常}
                rules={[{ required: true, message: '请选择' }]}>
                <Radio.Group options={enumToOptions(ROLE_STATUS)} optionType="button" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="备注"
                name="remark"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}>
                <Input.TextArea
                  showCount
                  placeholder="请输入"
                  maxLength={500}
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="菜单权限"
                name="menuIds"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                rules={[{ required: true, message: '请选择' }]}>
                <CheckableTree
                  treeData={ptree}
                  autoExpandParent
                  selectable={false}
                  fieldNames={{ title: 'menuName', key: 'id', children: 'children' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </PageWrapper>
  );
}
