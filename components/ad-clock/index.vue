<template>
	<view :class="[`${prefixCls}-box`]">
		<view
      v-if="days"
      :class="[`${prefixCls}-item`]"
      :style="[ itemStyle(d) ]"
    >
			<view
        :class="[
          `${prefixCls}-time`,
          scale && `${prefixCls}-scale`
        ]"
        :style="[ timeStyle ]"
      >
				{{ d }}
			</view>
		</view>
		<view
      v-if="days"
      :class="[
        `${prefixCls}-colon`,
        borderColor == 'transparent' && `${prefixCls}-colon-pad`
      ]"
			:style="[ colonStyle ]"
		>
			{{ separator==='colon' ? (hours ? ':' : '') : '天' }}
		</view>
		<view
      v-if="hours"
      :class="[`${prefixCls}-item`]"
      :style="[ itemStyle(h) ]"
    >
			<view
        :class="[
          `${prefixCls}-time`,
          scale && `${prefixCls}-scale`
        ]"
        :style="[ timeStyle ]"
      >
				{{ h }}
			</view>
		</view>
		<view
      v-if="hours"
			:class="[
        `${prefixCls}-colon`,
        borderColor == 'transparent' && `${prefixCls}-colon-pad`
      ]"
			:style="[ colonStyle ]"
		>
			{{ separator==='colon' ? (minutes ? ':' : '') : '时' }}
		</view>
		<view
			v-if="minutes"
			:class="[`${prefixCls}-item`]"
			:style="[ itemStyle(i) ]"
		>
			<view
        :class="[
          `${prefixCls}-time`,
          scale && `${prefixCls}-scale`
        ]"
        :style="[ timeStyle ]"
      >
				{{ i }}
			</view>
		</view>
		<view
			v-if="minutes"
			:class="[
        `${prefixCls}-colon`,
        borderColor == 'transparent' && `${prefixCls}-colon-pad`
      ]"
			:style="[ colonStyle ]"
		>
			{{ separator==='colon' ? (seconds ? ':' : '') : '分' }}
		</view>
		<view
			v-if="seconds"
			:class="[`${prefixCls}-item`]"
			:style="[ itemStyle(s) ]"
		>
			<view
        :class="[
          `${prefixCls}-time`,
          scale && `${prefixCls}-scale`
        ]"
        :style="[ timeStyle ]"
      >
				{{ s }}
			</view>
		</view>
		<view
			v-if="seconds && separator!=='colon'"
			:class="[
        `${prefixCls}-colon`,
        borderColor == 'transparent' && `${prefixCls}-colon-pad`
      ]"
			:style="[ colonStyle ]"
		>秒
		</view>

		<view
      v-if="seconds && millisecond && separator==='colon'"
      :class="[`${prefixCls}-colon`]"
      :style="[ colonStyle ]"
    >.</view>
		<view
      v-if="seconds && millisecond"
			:class="[`${prefixCls}-ms`]"
			:style="{
				background: backgroundColor,
				borderColor: borderColor,
				fontSize: msSize + 'rpx',
				color: msColor,
				height: height + 'rpx',
				width: msWidth > 0 ? msWidth + 'rpx' : 'auto'
			}"
		>
			<view
        :class="[ ani && `${prefixCls}-ms-list` ]"
      >
				<view
          v-for="(item, index) in ms"
          :key="index"
          :class="[ `${prefixCls}-ms-item` ]"
          :style="{ height: height + 'rpx' }"
        >
					<view :class="[scale && `${prefixCls}-scale`]">
            {{ item }}
          </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Clock时钟组件
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 12:11:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:41:11
 */
import { getTransformNumber } from '@/utils';

export default {
	name: 'AdClock',
	props: {
		// 数字框宽度
		width: {
			type: Number,
			default: 32,
		},
		// 数字框高度
		height: {
			type: Number,
			default: 32,
		},
    // 是否带数字框
    bordered: {
      type: Boolean,
      default: true,
    },
		// 数字框border颜色
		borderColor: {
			type: String,
			default: '#333',
		},
		// 数字框背景颜色
		backgroundColor: {
			type: String,
			default: '#fff',
		},
		// 数字框字体大小
		size: {
			type: Number,
			default: 24,
		},
		// 数字框字体颜色
		color: {
			type: String,
			default: '#333',
		},
		// 是否缩放 0.9
		scale: {
			type: Boolean,
			default: false,
		},
		// 冒号大小
		colonSize: {
			type: Number,
			default: 28,
		},
		// 冒号颜色
		colonColor: {
			type: String,
			default: '#333',
		},
		// 剩余时间 (单位：秒)
		time: {
			type: [String, Number],
			default: 0,
		},
		// 是否包含天
		days: {
			type: Boolean,
			default: false,
		},
		// 是否包含小时
		hours: {
			type: Boolean,
			default: true,
		},
		// 是否包含分钟
		minutes: {
			type: Boolean,
			default: true,
		},
		// 是否包含秒
		seconds: {
			type: Boolean,
			default: true,
		},
    // 分隔符类型，默认冒号
    separator: {
      validator(value) {
        return ['colon', 'dhms'].includes(value);
      },
      default: 'colon',
    },
		// 是否返回剩余时间
		returnTime: {
			type: Boolean,
			default: false,
		},
		// 是否显示毫秒
		millisecond: {
			type: Boolean,
			default: true,
		},
		msWidth: {
			type: Number,
			default: 32,
		},
		msSize: {
			type: Number,
			default: 24,
		},
		msColor: {
			type: String,
			default: '#333',
		},
	},
	data() {
    const { app } = this.$store.state;
		return {
      prefixCls: `${app.prefix}-clock`,
			countdown: null,
			d: '00',
			h: '00',
			i: '00',
			s: '00',
			// 此处若从9到1，结束需要特殊处理
			ms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			ani: false,
		};
	},
  computed: {
    colonStyle() {
      const style = {};
      if (this.colonSize) {
        style.lineHeight = `${this.colonSize}rpx`;
        style.fontSize = `${this.colonSize}rpx`;
      }
      if (this.colonColor) style.color = this.colonColor;
      return style;
    },
    timeStyle() {
      const style = {};
      if (this.size) {
        style.fontSize = `${this.size}rpx`;
        style.lineHeight = `${this.size}rpx`;
      }
      if (this.color) style.color = this.color;
      return style;
    },
  },
	watch: {
		time(val) {
			this.clearTimer();
			this.doLoop();
		},
	},
	created() {
		this.clearTimer();
		this.doLoop();
	},
	beforeDestroy() {
		this.clearTimer();
	},
	methods: {
    itemStyle(val) {
      const style = {};
      if (this.width) style.width = `${this.getWidth(val, this.width)}rpx`;
      if (this.height) style.height = `${this.height}rpx`;
      if (this.backgroundColor) style.backgroundColor = this.backgroundColor;
      if (this.bordered) {
        if (this.borderColor) style.borderColor = this.borderColor;
      } else {
        style.border = 'none';
      }
      return style;
    },
		getWidth(num, width) {
			return num > 99 ? (width / 2) * num.toString().length : width;
		},
		clearTimer() {
			clearInterval(this.countdown);
			this.countdown = null;
		},
		endOfTime() {
			this.ani = false;
			this.clearTimer();
			this.$emit('end', {});
		},
		doLoop() {
			let seconds = this.time || 0;
			this.ani = true;
			this.countDown(seconds);
			this.countdown = setInterval(() => {
				seconds--;
				if (seconds < 0) {
					this.endOfTime();
					return;
				}
				this.countDown(seconds);
				if (this.returnTime) {
					this.$emit('time', { seconds });
				}
			}, 1000);
		},
		countDown(seconds) {
			let [day, hour, minute, second] = [0, 0, 0, 0];
			if (seconds > 0) {
				day = this.days ? Math.floor(seconds / (60 * 60 * 24)) : 0;
				hour = this.hours ? Math.floor(seconds / (60 * 60)) - day * 24 : 0;
				minute = this.minutes ? Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 : 0;
				second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
			} else {
				this.endOfTime();
			}
			this.d = getTransformNumber(day);
			this.h = getTransformNumber(hour);
			this.i = getTransformNumber(minute);
			this.s = getTransformNumber(second);
		},
	},
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
