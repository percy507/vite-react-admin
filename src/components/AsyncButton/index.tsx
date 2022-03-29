import { Popconfirm } from 'antd';
import { useState } from 'react';

type PageWrapProps = {
  title: string;
  label: string;
  color?: string;
  asyncService: () => Promise<any>;
};

export default function AsyncButton(props: PageWrapProps) {
  const { color, title, label, asyncService } = props;
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleOk = () => {
    setSubmitting(true);
    asyncService()
      .then(() => {
        setVisible(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Popconfirm
      title={title}
      visible={visible}
      onConfirm={handleOk}
      okButtonProps={{ loading: submitting }}
      onCancel={() => setVisible(false)}
    >
      <a style={{ color }} onClick={() => setVisible(true)}>
        {label}
      </a>
    </Popconfirm>
  );
}
