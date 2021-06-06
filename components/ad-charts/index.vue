<template>
  <view
    :class="[ prefixCls ]"
    :style="{
        minHeight: cHeight && cHeight*pixelRatio+'px'
      }"
  >
    <canvas
      v-if="canvasId"
      :id="canvasId"
      :canvasId="canvasId"
      :class="[className]"
      :style="{
        transform: 'scale('+(1/pixelRatio)+')',
        width: chartStyle.width*pixelRatio+'px',
        height: chartStyle.height*pixelRatio+'px'
      }"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      @error="error"
    />
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 移动端可视化图表库，二次封装于uCharts：http://doc.ucharts.cn/1172125
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-10-26 // Initial version.
 * @version 0.2 | 2020-11-06 // 支持更多type，全局抽离charts配置，注入方式.
 * @Date: 2020-10-26 09:56:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:42:46
 */
import app from '@/config';
import charts from '@/config/charts';
import uCharts from './u-charts';
import { getUid } from '@/utils';

export default {
  name: 'AdCharts',
  props: {
    type: {
      required: true,
      type: String,
      default: 'line',
    },
    opts: {
      required: true,
      type: Object,
      default: () => {},
    },
    className: [String, Array],
    canvasId: {
      type: String,
      default: `${app.prefix}-canvas-${getUid()}`,
    },
    cHeight: [Number, String],
    pixelRatio: {
      type: Number,
      default: 1,
    },
    // tooltip补充信息等
    tooltip: {
      type: [Object, Function],
      default: () => ({}),
    },
  },
  data() {
    return {
      canvases: {},
      chartStyle: {},
      prefixCls: `${app.prefix}-charts`,
    };
  },
  watch: {
    opts(newVal, oldVal) {
      if (oldVal && newVal !== oldVal) {
        this.changeData(this.canvasId, newVal);
      }
    },
  },
  mounted() {
    this.dom = uni.createSelectorQuery().in(this);
    this.dom.select(`.${this.prefixCls}`).boundingClientRect((res) => {
      this.chartStyle = res;
      this.$nextTick(() => {
        this.handleInitChart();
      });
    })
.exec();
  },
  methods: {
    handleInitChart() {
      const { width, height } = this.chartStyle;
      this.canvases[this.canvasId] = new uCharts({
        $this: this,
        canvasId: this.canvasId,
        ...charts[this.type],
        ...this.opts,
        pixelRatio: this.pixelRatio,
        width: width * this.pixelRatio,
        height: (Number(this.cHeight) || height) * this.pixelRatio,
      });
    },
    // 这里仅作为示例传入两个参数，cid为canvas-id,newdata为更新的数据，需要更多参数请自行修改
    changeData(cid, newdata) {
      this.canvases[cid] && this.canvases[cid].updateData({ ...newdata });
    },
    touchStart(e) {
      this.$emit('touchStart', e);
      const { suffix, name, data } = ({
        name: true,
        data: true,
        ...this.tooltip,
      });
      // tooltip点击
      this.canvases[this.canvasId].showToolTip(e, {
        format: (item, category) => {
          const tips_c = category || '';
          const tips_n = !name ? '' : item.name;
          const tips_d = !data ? '' : `：${item.data}`;
          const tips_s = suffix || '';
          return `${tips_c} ${tips_n}${tips_d}${tips_s}`;
        },
      });
      // legend点击
      this.canvases[this.canvasId].touchLegend(e, {
        animation: true,
      });
      this.canvases[this.canvasId].scrollStart(e);
    },
    touchMove(e) {
      this.canvases[this.canvasId].scroll(e);
    },
    touchEnd(e) {
      this.canvases[this.canvasId].scrollEnd(e);
    },
    error(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
