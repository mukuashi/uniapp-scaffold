/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 图表种类配置，http://doc.ucharts.cn/1172125
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-06-10 // Initial version.
 * @Date:   2020-06-10 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-01 17:20:40
 */
import app from './index';

const { colors } = app.theme;

// 所有图表全局默认配置
const chartsTpl = {
  fontSize: 10,
  padding: [0, 4, 0, 0],
  colors,
  animation: true, // 是否动画展示
  duration: 500,
  dataLabel: true, // 是否在图表中显示数据标签内容值
  dataPointShape: false, // 是否在图表中显示数据点图形标识
  legend: {
    position: 'top',
    float: 'right',
    fontSize: 12,
    margin: 24,
  },
  extra: {
    tooltip: {
      showBox: true,
      gridColor: '#E7E8E7',
    },
  },
  xAxis: {
    disableGrid: true, // 不绘制X轴网格
    axisLine: false,
  },
  yAxis: {
    splitNumber: 4,
    data: [
      {
        axisLine: false, // 不绘制y轴，仅显示数据刻度
      },
    ],
    fontColor: 'rgba(0,0,0,0.65)',
    gridColor: 'rgba(0,0,0,0.04)',
  },
};

export default {
  /**
   * column 柱状图
   */
  column: {
    ...chartsTpl,
    type: 'column',
    yAxis: {
      ...chartsTpl.yAxis,
      data: [
        {
          disabled: true,
        },
      ],
    },
  },
  /**
   * 折线图
   */
  line: {
    ...chartsTpl,
    type: 'line',
    dataLabel: false,
  },
  /**
   * 环状图
   */
  ring: {
    ...chartsTpl,
    type: 'ring',
    dataLabel: false,
    extra: {
      pie: {
        offsetAngle: 0,
        ringWidth: 40,
        labelWidth: 15,
      },
    },
    legend: {
      float: 'center',
      position: 'right',
      lineHeight: 30,
    },
  },
};
