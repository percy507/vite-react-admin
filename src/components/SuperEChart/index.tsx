import { useSize } from 'ahooks';
import { Empty } from 'antd';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import { BarChart, LineChart } from 'echarts/charts';
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import baseOptions from './baseOptions';
import styles from './style.module.less';

export type EChartInstance = echarts.ECharts;
export const linearGradient = echarts.graphic.LinearGradient;

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | LegendComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

type AutoAction = {
  type: 'select' | 'highlight';
  /** 轮播间隔，单位毫秒 */
  interval: number;
  /** 用来标记定时器，必须唯一 */
  timerFlag: string;
};

export type SuperEChartProps = {
  /** 图表容器宽度 */
  width?: number;
  /** 图表容器高度 */
  height?: number;
  /** 图表配置 */
  options: ECOption & {
    /** 用来标记图表是否是空的，具体判断逻辑由用户自行实现 */
    empty?: boolean;
  };
  /** 图表自动轮播配置 */
  autoAction?: AutoAction;
  /** 更新图表配置信息时，是否要合并上次渲染时的配置信息。默认 false */
  mergeOptions?: boolean;
  setInstance?: (EChartInstance) => void;
  [key: string]: any;
};

const autoActionTimer: Record<string, number> = {};

export function SuperEChart(props: SuperEChartProps) {
  const {
    width,
    height,
    options,
    autoAction,
    setInstance,
    mergeOptions: __mergeOptions = false,
    ...restProps
  } = props;

  const isEmpty = !!options.empty;
  const mergeOptions = autoAction ? true : __mergeOptions;

  const [chartInstance, setChartInstance] = useState<EChartInstance | null>(null);
  const pageSize = useSize(document.body);

  const chartOptions = useMemo(() => {
    let temp = options;

    if (autoAction) {
      // 轮播的图表，会禁用图表的鼠标交互
      if (Array.isArray(temp.series) && temp.series.length !== 0) {
        temp.series[0].silent = true;
      }
    }

    return baseOptions.merge(temp);
  }, [autoAction, options]);

  if (!Array.isArray(chartOptions.series)) {
    throw new Error('EChart series must be an array');
  }

  if (chartOptions.series.length === 0) {
    throw new Error('EChart series can not be an empty array');
  }

  const chartType = chartOptions.series[0].type;

  // 目前仅适用于饼图的轮播效果
  const autoActionHandler = useCallback(() => {
    if (isEmpty) return;
    if (!autoAction?.type) return;
    if (!chartInstance) return;
    if (chartType !== 'pie') return;

    const reverseTypeMap = {
      select: 'unselect',
      highlight: 'downplay',
    };

    const dataLength =
      Array.isArray(chartOptions.series) && chartOptions.series.length !== 0
        ? (chartOptions.series[0].data as any[]).length || 0
        : 0; // 数据长度
    let actionItemIndex = 0; // 当前活跃的数据索引

    chartInstance.dispatchAction({
      type: autoAction.type,
      seriesIndex: 0,
      dataIndex: actionItemIndex,
    });

    window.clearInterval(autoActionTimer[autoAction.timerFlag]);
    autoActionTimer[autoAction.timerFlag] = window.setInterval(() => {
      // 对上一个元素执行反向操作
      chartInstance.dispatchAction({
        type: reverseTypeMap[autoAction.type],
        seriesIndex: 0,
      });

      setTimeout(() => {
        if (actionItemIndex < dataLength - 1) {
          actionItemIndex += 1;
        } else {
          actionItemIndex = 0;
        }

        // 对当前元素执行正向操作
        chartInstance.dispatchAction({
          type: autoAction.type,
          seriesIndex: 0,
          dataIndex: actionItemIndex,
        });
      }, 200);
    }, autoAction.interval);
  }, [isEmpty, autoAction, chartInstance, chartOptions.series, chartType]);

  const [dom, setDom] = useState<HTMLDivElement | null>(null);
  const domRef = useRef(dom);

  const renderChart = useCallback(() => {
    if (isEmpty) return;
    if (!dom) return;
    let instance = chartInstance;

    // 如果chart实例不存在或dom变了，则重新init chart
    if (!instance || domRef.current !== dom) {
      instance = echarts.init(dom, 'myTheme');
      setChartInstance(instance);
      if (setInstance) setInstance(instance);
    }

    domRef.current = dom;
    instance.setOption(
      chartOptions,
      mergeOptions ? {} : { notMerge: true, lazyUpdate: true, silent: true },
    );
    window.setTimeout(() => {
      instance?.resize();
    }, 1000); // 设置1秒的绘制延迟
  }, [isEmpty, dom, chartInstance, chartOptions, setInstance, mergeOptions]);

  useEffect(() => renderChart(), [renderChart, pageSize]);
  useEffect(() => autoActionHandler(), [autoActionHandler]);
  useEffect(() => {
    return () => {
      if (autoAction) {
        window.clearInterval(autoActionTimer[autoAction.timerFlag]);
      }
      chartInstance?.dispose();
    };
  }, [chartInstance, autoAction]);

  let realWidth = typeof width === 'number' ? width : width;
  let realHeight = typeof height === 'number' ? height : height;

  return isEmpty ? (
    <Empty style={{ height: realHeight }} />
  ) : (
    <div
      ref={setDom}
      style={{ width: realWidth, height: realHeight }}
      className={styles.superEchart}
      {...restProps}
    />
  );
}
