import { Tag } from 'antd';

export const EnumStatus = {
  1: '未开始',
  2: '进行中',
  3: '已结束',
};

export const getStatusLabel = (status: number) => EnumStatus[status];
export const renderStatusTag = (status: number) => {
  return (
    <Tag color={status === 1 ? 'orange' : status === 2 ? 'blue' : 'grey'}>
      {EnumStatus[status]}
    </Tag>
  );
};
