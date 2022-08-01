import type { TableProps, TabPaneProps, TabsProps } from 'antd';
import { Card, Table, Tabs } from 'antd';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import type { SearchFormProps } from '@/components/SearchForm';
import { SearchForm } from '@/components/SearchForm';

import styles from './style.module.less';

export type { SearchFormProps } from '@/components/SearchForm';
export type { ColumnsType } from 'antd/es/table';

const { TabPane } = Tabs;

// 与后端约定的字段名称
const T_CURRENT = 'current'; // 分页参数：当前页
const T_SIZE = 'size'; // 分页参数：每页的数量
const T_TOTAL = 'total'; // 总数
const T_TOTALS = 'totals'; // 用于统计每个tab页面列表数据的总数
const T_RECORDS = 'records'; // 列表数据

interface DataType {
  [T_TOTAL]: number;
  [T_TOTALS]?: number[];
  [T_RECORDS]: any[];
}

interface ParamsType {
  [T_CURRENT]: number;
  [T_SIZE]: number;
  [key: string]: any;
}

interface SuperTableRefProps {
  /** 请求列表数据，不会重置筛选项，也不会设置页码 */
  request: () => void;
  /** 请求列表数据，但会重置筛选项，并设置页码到第一页 */
  freshRequest: () => void;
  /** 当前列表接口中的参数 */
  params: ParamsType;
}

interface SuperTableProps {
  /** 用于 SearchForm 组件的 props */
  searchForm?: Omit<SearchFormProps, 'onSearch' | 'ref'>;
  /** 用于配置 Table 组件上方展示的 Tabs 组件 */
  tabs?: {
    /**
     * 是否展示每个tab页面列表数据的总数，默认不展示。如果要展示每个tab的数据总数，
     * 需要接口中增加 `[T_TOTALS]` 字段（表示每个 tab 类型下的数据总数）
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
  /** 分页参数，默认 `{ [T_CURRENT]: 1, [T_SIZE]: 10 }` */
  paginationParams?: { [T_CURRENT]?: number; [T_SIZE]?: number };
}

export const SuperTable = forwardRef<SuperTableRefProps, SuperTableProps>(
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
      [T_TOTAL]: 0,
      [T_RECORDS]: [],
    });

    const [params, setParams] = useState<ParamsType>({
      [T_CURRENT]: 1,
      [T_SIZE]: 10,
      ...paginationParams,
    });

    const formRef = useRef<React.ElementRef<typeof SearchForm>>(null);
    const spRef = useRef(serviceParams);
    spRef.current = serviceParams;

    const [loading, setLoading] = useState(false);
    const request = useCallback(() => {
      setLoading(true);
      service({ ...params, ...spRef.current })
        .then(({ data }) => {
          setData(data);
          if (afterService) afterService();
        })
        .finally(() => setLoading(false));
    }, [service, params, afterService]);

    useImperativeHandle(
      ref,
      () => ({
        params,
        request,
        freshRequest: () => {
          formRef.current?.form.resetFields();
          setParams({ [T_CURRENT]: 1, [T_SIZE]: params[T_SIZE] });
        },
      }),
      [request, params],
    );
    useEffect(() => request(), [request]);

    const content = (
      <div className={styles.superTable}>
        {searchForm && (
          <SearchForm
            {...searchForm}
            ref={formRef}
            onSearch={(values) => {
              const obj = { [T_CURRENT]: 1, [T_SIZE]: params[T_SIZE] };
              if (!values) setParams({ ...obj });
              else setParams({ ...values, ...obj });
            }}
          />
        )}
        {tabs && tabs.root && Array.isArray(tabs.panes) && tabs.panes.length > 0 ? (
          <Tabs
            {...tabs.root}
            onChange={(k) => {
              const filterParams = tabs.panes![Number.parseInt(k, 10)].filterParams;
              setParams((val) => ({ ...val, [T_CURRENT]: 1, ...filterParams }));
              if (tabs.root!.onChange) tabs.root!.onChange(k);
            }}>
            {tabs.panes.map((el, index) => {
              let tab = el.tab;
              let showTotal = tabs.showTotal && Array.isArray(data[T_TOTALS]);
              // prettier-ignore
              if (showTotal) tab = <div>{el.tab}({data[T_TOTALS]![index]})</div>
              return <TabPane {...el} key={`${index}`} tab={tab} />;
            })}
          </Tabs>
        ) : null}
        <Table
          {...tableProps}
          columns={(tableProps.columns || []).map((el) => {
            if (!el.render) el.render = (v) => v ?? '-';
            if (el.ellipsis === undefined) el.ellipsis = true;
            return el;
          })}
          dataSource={data[T_RECORDS] || []}
          loading={loading}
          pagination={{
            current: params[T_CURRENT],
            pageSize: params[T_SIZE],
            total: data[T_TOTAL] || 0,
            showTotal: (v) => `共${v}条`,
            onChange: (page, pageSize) => {
              setParams((val) => ({ ...val, [T_CURRENT]: page, [T_SIZE]: pageSize }));
            },
          }}
        />
      </div>
    );
    return noCard ? content : <Card>{content}</Card>;
  },
);
