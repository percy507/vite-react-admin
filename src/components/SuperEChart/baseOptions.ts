import { cloneDeep, merge } from 'lodash';

import type { ECOption } from './index';

// 直角坐标系样式
const getAxisStyle = () => {
  const axisStyle = {
    // 坐标轴名称
    nameTextStyle: {
      color: 'rgba(0,0,0,0.65)',
      fontSize: 16,
      fontWeight: 600,
    },
    // 坐标轴轴线
    axisLine: {
      lineStyle: {
        color: 'rgba(79, 133, 149, 0.4)',
        width: 2,
      },
    },
    // 坐标轴刻度标签
    axisLabel: {
      color: 'rgba(0,0,0,0.65)',
      margin: 8,
      fontSize: 12,
      lineHeight: 14,
    },
    // 坐标轴在 grid 区域中的分隔线
    splitLine: {
      show: false,
      lineStyle: { color: 'rgba(0, 0, 0, 0.15)' },
    },
  };

  return {
    xAxisStyle: merge(cloneDeep(axisStyle), {
      axisLabel: {
        // 默认会采用标签不重叠的策略间隔显示标签，设置成 0 强制显示所有标签
        interval: 'auto',
        color: 'rgba(0,0,0,0.85)',
      },
    }),
    yAxisStyle: cloneDeep(axisStyle),
  };
};

// 图例样式
const getLegendStyle = () => {
  return {
    icon: 'rect',
    top: 'top',
    selectedMode: true,
    padding: 5,
    itemGap: 10,
    itemWidth: 17,
    itemHeight: 17,
    textStyle: {
      color: 'rgba(0, 0, 0, 1)',
      fontSize: 20,
      overflow: 'truncate',
    },
  };
};

// 图标样式
const getChartStyle = () => {
  const { xAxisStyle, yAxisStyle } = getAxisStyle();
  const legendStyle = getLegendStyle();

  return {
    line: {
      legend: legendStyle,
      xAxis: cloneDeep(xAxisStyle),
      yAxis: cloneDeep(yAxisStyle),
    },
    bar: {
      legend: merge(legendStyle, {
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: 'rgba(0, 0, 0, 0.6)',
          fontSize: 14,
          overflow: 'truncate',
        },
      }),
      xAxis: cloneDeep(xAxisStyle),
      yAxis: cloneDeep(yAxisStyle),
    },
    pie: {
      legend: legendStyle,
      tooltip: {
        show: false,
        className: 'echarts-tooltip',
        padding: 6,
        textStyle: {
          fontSize: 14,
        },
      },
    },
  };
};

const customMerge = (defaultOptions: ECOption, options: ECOption) => {
  const { xAxisStyle, yAxisStyle } = getAxisStyle();

  if (Array.isArray(options.xAxis)) {
    options.xAxis = options.xAxis.map((el) => merge(cloneDeep(xAxisStyle), el));
  }

  if (Array.isArray(options.yAxis)) {
    options.yAxis = options.yAxis.map((el) => merge(cloneDeep(yAxisStyle), el));
  }

  return merge(defaultOptions, options);
};

export default {
  merge: (options: ECOption) => {
    const { series } = options;

    if (Array.isArray(series) && series.length !== 0) {
      const chartType = series[0].type!;

      if (chartType === 'line') {
        return customMerge(getChartStyle().line as ECOption, options);
      } else if (['bar', 'pictorialBar'].includes(chartType)) {
        return customMerge(getChartStyle().bar as ECOption, options);
      }
      // else if (chartType === 'pie') {
      //   return customMerge(getChartStyle().pie as ECOption, options);
      // }
    }

    return options;
  },
};
