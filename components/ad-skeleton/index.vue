<template>
	<view
    v-if="loading"
    :style="{
      width: windowWidth + 'px',
      height: windowHeight + 'px',
      backgroundColor: bgColor,
      position: 'absolute',
      left: left + 'px',
      top: top + 'px',
      zIndex: 998,
      overflow: 'hidden'
    }"
	 @touchmove.stop.prevent
  >
		<view
      v-for="(item, index) in RectNodes"
      :key="guid"
      :class="[animation ? `${prefixCls}-animation` : '']"
      :style="{
        width: item.width + 'px',
        height: `${item.height+2}px`,
        backgroundColor: elColor,
        position: 'absolute',
        left: (item.left - left) + 'px',
        top: (item.top - top) + 'px'
      }"
    />
		<view
      v-for="(item, index) in circleNodes"
      :key="guid"
      :class="animation ? `${prefixCls}-animation` : ''"
      :style="{
        width: item.width + 'px',
        height: item.height + 'px',
        backgroundColor: elColor,
        borderRadius: item.width/2 + 'px',
        position: 'absolute',
        left: (item.left - left) + 'px',
        top: (item.top - top) + 'px'
      }"
    />
		<view
      v-for="(item, index) in filletNodes"
      :key="guid"
      :class="animation ? `${prefixCls}-animation` : ''"
      :style="{
        width: item.width + 'px',
        height: `${item.height+2}px`,
        backgroundColor: elColor,
        borderRadius: borderRadius + 'rpx',
        position: 'absolute',
        left: (item.left - left) + 'px',
        top: (item.top - top) + 'px'
      }"
    />
	</view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Skeleton 骨架屏组件，组件内获取数据用默认模板，Page页面里获取数据绑定class或preloadData即可
 * @useage | 需要在业务页面视图层按形状绑定class => ad-skeleton-rect（矩形），ad-skeleton-circular（圆形），ad-skeleton-fillet（圆角矩形）
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-06 12:24:52
 */
import { getUid } from '@/utils';

export default {
  name: 'AdSkeleton',
  props: {
    // 需要渲染的元素背景颜色，十六进制或者rgb等都可以
    elColor: String,
    // 整个骨架屏页面的背景颜色
    bgColor: {
      type: String,
      default: 'transparent',
    },
    // 是否显示加载动画
    animation: {
      type: Boolean,
      default: true,
    },
    // 圆角值，只对类名为ad-skeleton-fillet的元素生效，为数值，不带单位
    borderRadius: {
      type: [String, Number],
      default: '10',
    },
    // 是否显示骨架，true-显示，false-隐藏
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const { app } = this.$store.state;
    return {
      guid: getUid(),
      prefixCls: `${app.prefix}-skeleton`,
      windowWidth: 750, // 骨架屏宽度
      windowHeight: 1500, // 骨架屏高度
      filletNodes: [], // 圆角元素
      circleNodes: [], // 圆形元素
      RectNodes: [], // 矩形元素
      top: 0,
      left: 0,
    };
  },
  // 组件被挂载
  mounted() {
    const { windowWidth, windowHeight } = this.systemInfo;
    // 获取系统信息
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.selecterQueryInfo();
  },
  methods: {
    // 查询各节点的信息
    selecterQueryInfo() {
      // 获取整个父组件容器的高度，当做骨架屏的高度
      // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
      let query = '';
      // #ifdef MP
      query = uni.createSelectorQuery().in(this.$parent);
      // #endif
      // #ifndef MP
      query = uni.createSelectorQuery();
      // #endif
      query.selectAll(`.${this.prefixCls}`).boundingClientRect()
.exec((res) => {
        this.windowHeight = res[0][0]?.height;
        this.windowWidth = res[0][0]?.width;
        this.top = res[0][0]?.bottom - res[0][0]?.height;
        this.left = res[0][0]?.left;
      });
      // 矩形骨架元素
      this.getRectEls();
      // 圆形骨架元素
      this.getCircleEls();
      // 圆角骨架元素
      this.getFilletEls();
    },
    // 矩形元素列表
    getRectEls() {
      let query = '';
      // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
      // #ifdef MP
      query = uni.createSelectorQuery().in(this.$parent);
      // #endif
      // #ifndef MP
      query = uni.createSelectorQuery();
      // #endif
      query.selectAll(`.${this.prefixCls}-rect`).boundingClientRect()
.exec((res) => {
        this.RectNodes = res[0];
      });
    },
    // 圆角元素列表
    getFilletEls() {
      let query = '';
      // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
      // #ifdef MP
      query = uni.createSelectorQuery().in(this.$parent);
      // #endif
      // #ifndef MP
      query = uni.createSelectorQuery();
      // #endif
      query.selectAll(`.${this.prefixCls}-fillet`).boundingClientRect()
.exec((res) => {
        this.filletNodes = res[0];
      });
    },
    // 圆形元素列表
    getCircleEls() {
      let query = '';
      // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
      // #ifdef MP
      query = uni.createSelectorQuery().in(this.$parent);
      // #endif
      // #ifndef MP
      query = uni.createSelectorQuery();
      // #endif
      query.selectAll(`.${this.prefixCls}-circle`).boundingClientRect()
.exec((res) => {
        this.circleNodes = res[0];
      });
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
