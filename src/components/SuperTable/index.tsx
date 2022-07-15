import type { TableProps, TabPaneProps, TabsProps } from 'antd';
import { Card, Table, Tabs } from 'antd';
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';

import type { SearchFormProps } from '@/components/SearchForm';
import { SearchForm } from '@/components/SearchForm';

import styles from './style.module.less';

const { TabPane } = Tabs;

interface DataType {
  total: number;
  totals?: number[];
  records: any[];
}

interface ParamsType {
  current: number;
  size: number;
  [key: string]: any;
}

interface SuperTableRefProps {
  /** 请求列表数据的函数 */
  request: () => void;
  /** 当前列表接口中的参数 */
  params: ParamsType;
}

interface SuperTableProps {
  /** 用于 SearchForm 组件的 props */
  searchForm?: Omit<SearchFormProps, 'onSearch'>;
  /** 用于配置 Table 组件上方展示的 Tabs 组件 */
  tabs?: {
    /**
     * 是否展示每个tab页面列表数据的总数，默认不展示。如果要展示每个tab的数据总数，
     * 需要接口中增加 `totals` 字段（表示每个 tab 类型下的数据总数）
     */
    showTotal?: boolean;
    /** 用于 Tabs 组件的 props */
    root?: TabsProps;
    /** 用于 TabPane 组件的 props */
    panes?: (TabPaneProps & {
      /** 用于当前Tab中列表接口的筛选参数 */
      filterParams: Record<string, any>;
    })[];
  };
  /** 用于 Table 组件的 props */
  tableProps: TableProps<any>;
  /** 是否禁止在最外层包裹一个 Card 组件，默认不禁止 */
  noCard?: boolean;
  /** 请求列表数据的api服务 */
  service: (params?: any) => Promise<any>;
  /** 调用列表接口结束后的钩子函数 */
  afterService?: () => void;
  /** 用于列表接口的额外参数 */
  serviceParams?: Record<string, any>;
  /** 分页参数，默认 `{ current: 1, size: 10 }` */
  paginationParams?: { current?: number; size?: number };
}

export const SuperTable = React.forwardRef<SuperTableRefProps, SuperTableProps>(
  function InnerSuperTable(props, ref) {
    const {
      searchForm,
      tabs,
      tableProps,
      service,
      afterService,
      noCard = false,
      serviceParams,
      paginationParams,
    } = props;
    const [data, setData] = useState<DataType>({
      total: 0,
      records: [],
    });

    const [params, setParams] = useState<ParamsType>({
      current: 1,
      size: 10,
      ...paginationParams,
    });

    const [loading, setLoading] = useState(false);
    const request = useCallback(() => {
      setLoading(true);
      service({ ...params, ...serviceParams })
        .then(({ data }) => {
          setData(data);
          if (afterService) afterService();
        })
        .finally(() => setLoading(false));
    }, [service, params, afterService, serviceParams]);

    useImperativeHandle(ref, () => ({ request, params }), [request, params]);
    useEffect(() => request(), [request]);

    const content = (
      <div className={styles.superTable}>
        {searchForm && (
          <SearchForm
            {...searchForm}
            onSearch={(values) => setParams((val) => ({ ...val, current: 1, ...values }))}
          />
        )}
        {tabs && tabs.root && Array.isArray(tabs.panes) && tabs.panes.length > 0 ? (
          <Tabs
            {...tabs.root}
            onChange={(k) => {
              const filterParams = tabs.panes![Number.parseInt(k, 10)].filterParams;
              setParams((val) => ({ ...val, current: 1, ...filterParams }));
              if (tabs.root!.onChange) tabs.root!.onChange(k);
            }}>
            {tabs.panes.map((el, index) => {
              let tab = el.tab;
              let showTotal = tabs.showTotal && Array.isArray(data.totals);
              // prettier-ignore
              if (showTotal) tab = <div>{el.tab}({data.totals![index]})</div>
              return <TabPane {...el} key={`${index}`} tab={tab} />;
            })}
          </Tabs>
        ) : null}
        <Table
          {...tableProps}
          dataSource={data.records || []}
          loading={loading}
          pagination={{
            current: params.current,
            pageSize: params.size,
            total: data.total || 0,
            showTotal: (total) => `共${total}条`,
            onChange: (page, pageSize) => {
              setParams((val) => ({ ...val, current: page, size: pageSize }));
            },
          }}
        />
      </div>
    );
    return noCard ? content : <Card>{content}</Card>;
  },
);
