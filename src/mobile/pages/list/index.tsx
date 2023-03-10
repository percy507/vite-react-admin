import { List, NoticeBar } from 'antd-mobile';
import { useEffect, useState } from 'react';

import { PageWrapper } from '@/mobile/components/PageWrapper';
import { requestSayingList } from '@/mobile/services';

import styles from './style.module.less';

export default function ChainPage() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);

  const query = new URLSearchParams(location.search);
  const id = query.get('id');
  console.log(id);

  useEffect(() => {
    setLoading(true);
    requestSayingList()
      .then(({ data }) => {
        setList(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper loading={loading} navbar={{ children: '移动端列表页' }}>
      <div className={styles.page}>
        <NoticeBar
          content="该页面为集成在web端项目的移动端页面，关联特定路由，并且打包时会将移动端目录下的所有px单位转换为rem，从而自适配不同机型。"
          wrap
          color="alert"
        />
        <List>
          {list.map((el, index) => {
            return (
              <List.Item key={index} title={el.author || 'Unknown'}>
                {el.content}
              </List.Item>
            );
          })}
        </List>
      </div>
    </PageWrapper>
  );
}
