import type { TableProps, TabPaneProps, TabsProps } from 'antd';
import { Card, Table, Tabs } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { ColumnType } from 'antd/es/table';
import { atom, useAtomValue, useSetAtom } from 'jotai';
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
import { useIsFirstRenderRef } from '@/hooks';

import styles from './style.module.less';

export type { SearchFormProps } from '@/components/SearchForm';
export { deconverterDateRange } from '@/components/SearchForm';
export type { ColumnsType } from 'antd/es/table';

/** 基于路由缓存列表页的筛选、分页状态 */
const atomListPageState = atom<Record<string, string | undefined>>({});

const pathKey = () => location.pathname.replace(/\/+$/, '');

/** 基于路由缓存对象 */
function useSaveListPageState() {
  const set = useSetAtom(atomListPageState);
  return (params: Record<string, any> = {}) => {
    set((old) => ({ ...old, [pathKey()]: JSON.stringify(params) }));
  };
}

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
  [key: string]: any;
}

interface ParamsType {
  [T_CURRENT]: number;
  [T_SIZE]: number;
  [key: string]: any;
}

interface SuperTableRefProps {
  /** 筛选表单的实例 */
  form?: FormInstance;
  /** 当前列表接口中的参数 */
  params: ParamsType;
  /** 表格数据 */
  data: DataType;
  /** 请求列表数据，不会重置筛选项，也不会设置页码 */
  request: () => void;
  /** 请求列表数据，但会重置筛选项，并设置页码到第一页 */
  freshRequest: (extraParams?: { [key: string]: any }) => void;
  /** 手动触发筛选表单的查询操作 */
  search: () => void;
}

export interface SuperTableProps {
  /** 用于 SearchForm 组件的 props */
  searchForm?:
    | Omit<SearchFormProps, 'onSearch' | 'ref'>
    | ((data: DataType) => Omit<SearchFormProps, 'onSearch' | 'ref'>);
  /** 是否基于路由缓存搜索项，默认 true */
  cacheSearch?: boolean;
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
    panes?: TabPaneProps[];
  };
  /** 用于 Table 组件的 props */
  tableProps: TableProps<any> | ((params: ParamsType) => TableProps<any>);
  /** 是否增加首行为序号行 @defaultValue `true`  */
  enableIndex?: boolean | 'fixedLeft';
  /**
   * 启用随机rowKey。多个接口复用一个表格，在数据切换时，如果数据间存在相同的rowKey，
   * 可能会造成数据错乱，此时可使用随机rowKey
   * @defaultValue `false`
   */
  enableRandomRowKey?: boolean;
  /** 是否禁止在最外层包裹一个 Card 组件，默认不禁止 */
  noCard?: boolean;
  /** 请求列表数据的api服务 */
  service: (params?: any) => Promise<any>;
  /** 判断是否可以发起请求。返回 false 则不会发起请求 */
  canService?: () => boolean;
  /** 调用列表接口结束后的钩子函数 */
  afterService?: (params: ParamsType, data: DataType) => void;
  /** 重新处理接口返回数据 */
  mapData?: (data: DataType) => DataType;
  /** 用于列表接口的额外参数 */
  serviceParams?: Record<string, any>;
  /** 分页参数，默认 `{ [T_CURRENT]: 1, [T_SIZE]: 10 }` */
  paginationParams?: { [T_CURRENT]?: number; [T_SIZE]?: number };
}

export const SuperTable = forwardRef<SuperTableRefProps, SuperTableProps>(
  function InnerSuperTable(props, ref) {
    const {
      searchForm,
      cacheSearch = true,
      tabs,
      tableProps,
      service,
      canService = () => true,
      afterService,
      mapData,
      enableIndex = true,
      enableRandomRowKey = false,
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

    const canServiceRef = useRef(canService);
    canServiceRef.current = canService;
    const mapDataRef = useRef(mapData);
    mapDataRef.current = mapData;

    const [loading, setLoading] = useState(false);
    const request = useCallback(() => {
      if (!canServiceRef.current()) return;
      setLoading(true);
      let val = { ...params, ...spRef.current };
      service(val)
        .then(({ data }) => {
          if (data != null) {
            let val2 = mapDataRef.current ? mapDataRef.current(data) : data;
            if (enableRandomRowKey) {
              val2 = {
                ...val2,
                list: (val2.list || []).map((el) => ({
                  ...el,
                  __randomId: Math.random().toString(16).slice(2, 10),
                })),
              };
            }
            setData(val2);
          }
          if (afterService) afterService(val, data);
        })
        .finally(() => setLoading(false));
    }, [service, params, afterService, enableRandomRowKey]);

    let __tableProps = typeof tableProps === 'function' ? tableProps(params) : tableProps;
    const __searchFormProps =
      typeof searchForm === 'function' ? searchForm(data) : searchForm;

    if (enableRandomRowKey) {
      __tableProps = { ...__tableProps, rowKey: '__randomId' };
    }

    const deconvertFormValues = (values: Record<string, any>) => {
      if (!__searchFormProps) return;
      const items = __searchFormProps.items;
      const result: Record<string, any> = {};
      items.forEach((item) => {
        if (!item) return;
        if (item.converter) {
          if (item.deconverter) result[item.name] = item.deconverter(values);
          else
            console.warn(
              `[warn] deconverter should be provided or you will not restore the last form value of this field: ${item.name}`,
            );
        } else result[item.name] = values[item.name];
      });
      return result;
    };
    const deconvertFormValuesRef = useRef(deconvertFormValues);
    deconvertFormValuesRef.current = deconvertFormValues;

    const isFirstRenderRef = useIsFirstRenderRef();
    const listPageState = useAtomValue(atomListPageState);
    const lastParamsRef = useRef<Record<string, any> | null>(null);
    lastParamsRef.current = JSON.parse(listPageState[pathKey()] || 'null');

    useEffect(() => {
      if (isFirstRenderRef.current) {
        let form = formRef.current?.form;
        let searchParams =
          lastParamsRef.current || formRef.current?.getSearchParams() || {};
        if (lastParamsRef.current) {
          form?.setFieldsValue(deconvertFormValuesRef.current(lastParamsRef.current));
        }
        if (JSON.stringify(searchParams) !== '{}') {
          return setParams((val) => ({
            ...searchParams,
            ...val,
            ...(searchParams.pageNo != null ? { pageNo: searchParams.pageNo } : {}),
            ...(searchParams.pageSize != null ? { pageSize: searchParams.pageSize } : {}),
          }));
        }
      }
      request();
    }, [request, isFirstRenderRef]);

    const _columns = __tableProps.columns || [];
    const indexColumn: ColumnType<any> = {
      title: '序号',
      width: 60,
      fixed: enableIndex === 'fixedLeft' ? 'left' : undefined,
      render: (_v, _r, index) => (params[T_CURRENT] - 1) * params[T_SIZE] + index + 1,
    };
    const columns = (enableIndex ? [indexColumn, ..._columns] : _columns).map((el) => {
      if (!el.render) el.render = (v) => v ?? '-';
      if (el.ellipsis === undefined) el.ellipsis = true;
      return el;
    });

    const saveListPageState = useSaveListPageState();

    const pageSize = params[T_SIZE];
    const handleSearch = useCallback(
      (values) => {
        let obj = { [T_CURRENT]: 1, [T_SIZE]: pageSize };
        if (JSON.stringify(values) === '{}') obj = { ...obj };
        else obj = { ...values, ...obj };
        setParams(obj);
        if (cacheSearch) saveListPageState(obj);
      },
      [pageSize, cacheSearch, saveListPageState],
    );

    const content = (
      <div className={styles.superTable}>
        {__searchFormProps && (
          <SearchForm {...__searchFormProps} ref={formRef} onSearch={handleSearch} />
        )}
        {tabs && tabs.root && Array.isArray(tabs.panes) && tabs.panes.length > 0 ? (
          <Tabs
            {...tabs.root}
            onChange={(k) => {
              setParams((val) => ({ ...val, [T_CURRENT]: 1 }));
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
          {...__tableProps}
          columns={columns}
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

    useImperativeHandle(
      ref,
      () => ({
        form: formRef.current?.form,
        params,
        data,
        request,
        freshRequest: (extraParams = {}) => {
          formRef.current?.form.resetFields();
          setParams({ ...extraParams, [T_CURRENT]: 1, [T_SIZE]: params[T_SIZE] });
        },
        search: () => {
          handleSearch(formRef.current?.getSearchParams() || {});
        },
      }),
      [params, data, request, handleSearch],
    );

    return noCard ? content : <Card>{content}</Card>;
  },
);
