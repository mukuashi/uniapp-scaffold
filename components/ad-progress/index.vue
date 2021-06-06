<template>
	<view
    :class="[ prefixCls ]"
  >
    <view
      :class="[
        `${prefixCls}-bg`,
        round && `${prefixCls}-round`
      ]"
      :style="{
        backgroundColor: inactiveColor,
        height: `${height}rpx`
      }"
    >
      <view
        :class="[
          `${prefixCls}-active`,
          `${prefixCls}-${status}`,
          activeAnimate && `${prefixCls}-active-animate`,
          striped && `${prefixCls}-striped`
        ]"
        :style="[ progressActiveStyle ]"
      />
    </view>
    <view :class="[`${prefixCls}-percent`]" v-if="showPercent || $slots.default">
      <slot v-if="$slots.default" />
      <block v-else>
        {{ `${percent}%` }}
      </block>
    </view>
	</view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 进度条
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-10-13 // Initial version.
 * @Date: 2020-10-13 10:11:11
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-15 09:34:57
 */
import app from '@/config';

export default {
  name: 'AdProgress',
  props: {
    // 进度百分比，数值
    percent: {
      type: [Number, String],
      default: 0,
    },
    // 状态
    status: {
      type: String,
      validator(value) {
        return ['default','success', 'error', 'warning'].includes(value);
      },
      default: 'default'
    },
    // 是否半圆角
    round: {
      type: Boolean,
      default: false,
    },
    // 激活部分的颜色(默认纯色，现已支持渐变色，配置含gradient)
    activeColor: String,
    // 是否展示激活态过渡色动画
    activeAnimate: {
      type: Boolean,
      default: true,
    },
    // 未激活背景色
    inactiveColor: {
      type: [String],
      default: 'rgba(0,0,0,.04)',
    },
    // 进度条的高度，单位rpx
    height: {
      type: [Number, String],
      default: 24,
    },
    // 是否在进度条内部显示百分比的值
    showPercent: {
      type: Boolean,
      default: true,
    },
    // 是否显示条纹（建议激活色非渐变时用）
    striped: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      prefixCls: `${app.prefix}-progress`,
    };
  },
  computed: {
    progressActiveStyle() {
      const style = {};
      style.width = `${this.percent}%`;
      if (this.activeColor) {
        if(this.activeColor.includes('gradient')) {
          style.backgroundImage = this.activeColor
        } else {
          style.backgroundColor = this.activeColor
        }
      }
      return style;
    },
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
