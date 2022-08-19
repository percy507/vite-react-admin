import { Card, message } from 'antd';
import { useEffect, useState } from 'react';

import { PageWrapper } from '@/components/PageWrapper';
import { TinyMCE } from '@/components/TinyMCE';

import { initDatabase } from './init-db';
import styles from './style.module.less';

export default function TryLokijs() {
  const [list1, setList1] = useState<any[]>([]);
  const [select1, setSelect1] = useState<string>();
  const [list2, setList2] = useState<any[]>([]);
  const [select2, setSelect2] = useState<string>();
  const [detail, setDetail] = useState<PostModel>();

  useEffect(() => {
    initDatabase(() => {
      requestList1().then((data) => {
        console.log(data);
        setList1(data);
      });
    });
  }, []);

  return (
    <PageWrapper className={styles.Page3}>
      <Card
        title={
          <div>
            <span>试用 </span>
            <a target="_blank" href="https://github.com/percy507/LokiJS" rel="noreferrer">
              lokijs
            </a>
          </div>
        }>
        <button
          style={{ marginBottom: 10 }}
          onClick={() => {
            window.db.close(() => {
              window.db.deleteDatabase((a, b) => {
                console.log(a, b);
                message.success('清除成功');
              });
            });
          }}>
          清除IndexedDB数据
        </button>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            <h3>文件夹列表</h3>
            {list1.map((el) => (
              <div
                key={el.id}
                onClick={() => {
                  setSelect1(el.id);
                  requestList2(el.id).then((data) => {
                    setList2(data);
                  });
                }}
                className={el.id === select1 ? styles.selected : ''}>
                {el.title}
              </div>
            ))}
          </div>
          <div className={styles.list}>
            <h3>文件列表</h3>
            {list2.map((el) => (
              <div
                key={el.id}
                onClick={() => {
                  setSelect2(el.id);
                  requestArticleDetail(el.id).then((data) => {
                    setDetail(data);
                  });
                }}
                className={el.id === select2 ? styles.selected : ''}>
                {el.title}
              </div>
            ))}
          </div>
          <div className={styles.content}>
            {detail ? (
              <TinyMCE
                value={detail.content}
                onChange={(val) => {
                  requestUpdateArticle({ id: detail.id, content: val });
                }}
              />
            ) : (
              '暂无数据'
            )}
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}

interface PostModel {
  id: string;
  parent: string;
  isFolder: boolean;
  title: string;
  content: string;
  meta: { created: number; updated?: number };
}

async function requestList1() {
  const coll = window.db.getCollection('articles')!;
  return coll.find({ isFolder: true }) as Pick<PostModel, 'id' | 'title'>[];
}

async function requestList2(parent: string) {
  const coll = window.db.getCollection('articles')!;
  return coll.find({ parent }) as Pick<PostModel, 'id' | 'title'>[];
}

async function requestArticleDetail(id: string) {
  const coll = window.db.getCollection('articles')!;
  return coll.findOne({ id }) as PostModel;
}

async function requestUpdateArticle(params: Pick<PostModel, 'id' | 'content'>) {
  const coll = window.db.getCollection('articles')!;
  coll.findAndUpdate({ id: `${params.id}` }, (val) => {
    for (let key in params) val[key] = params[key];
  });
}
