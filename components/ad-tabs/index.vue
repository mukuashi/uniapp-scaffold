<template>
	<view
    :class="[ prefixCls ]"
    :style="[ tabStyle ]"
  >
  <view :id="id">
    <scroll-view
      scroll-x
      :class="[`${prefixCls}-view`]"
      :scroll-left="scrollLeft"
      scroll-with-animation
    >
      <view
        :class="[
          `${prefixCls}-box`,
          !isScroll && `${prefixCls}-flex`
        ]"
      >
        <view
          v-for="(item, index) in list"
          :id="`${prefixCls}-item-${index}`"
          :key="index"
          :class="[
            `${prefixCls}-item`,
            index === current && `${prefixCls}-item-active`
          ]"
          :style="[tabItemStyle(index)]"
          @tap="clickTab(index)"
        >{{ item[name || 'name'] }}
        </view>
        <view v-if="showBar" :class="[ `${prefixCls}-bar` ]" :style="[tabBarStyle]" />
      </view>
    </scroll-view>
  </view>
	</view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | tabs标签页，支持设置字体颜色、字体大小、背景色、高度等（滚动版）。
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-11-25 // Initial version.
 * @Date: 2020-11-25 10:11:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:41:38
 */
import app from '@/config';
import { getUid, addUnit } from '@/utils';
/**
 * tabs 标签
 * @description 该组件，是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。 该组件的一个特点是配置为滚动模式时，激活的tab会自动移动到组件的中间位置。
 * @property {Boolean} is-scroll tabs是否可以左右拖动（默认true）
 * @property {Array} list 标签数组，元素为对象，如[{name: '推荐'}]
 * @property {String Number} current 指定哪个tab为激活状态（默认0）
 * @property {String Number} height 导航栏的高度，单位rpx（默认80）
 * @property {String Number} font-size tab文字大小，单位rpx（默认30）
 * @property {String Number} duration 滑块移动一次所需的时间，单位秒（默认0.5）
 * @property {String} active-color 滑块和激活tab文字的颜色（默认主题色）
 * @property {String} inactive-color tabs文字颜色（默认#333）
 * @property {String Number} bar-width 滑块宽度，单位rpx（默认40）
 * @property {Object} active-item-style 活动tabs item的样式，对象形式
 * @property {Object} bar-style 底部滑块的样式，对象形式
 * @property {Boolean} show-bar 是否显示底部的滑块（默认false）
 * @property {String Number} bar-height 滑块高度，单位rpx（默认6）
 * @property {String Number} item-width 标签的宽度（默认auto）
 * @property {String Number} gutter 单个tab标签的左右内边距之和，单位rpx（默认40）
 * @property {String} bg-color tabs导航栏的背景颜色（默认#fff）
 * @property {String} name 组件内部读取的list参数中的属性名（tab名称），见官网说明（默认name）
 * @property {Boolean} bold 激活选项的字体是否加粗（默认true）
 * @event {Function} change 点击标签时触发
 * @example <ad-tabs ref="tabs" :list="list" :is-scroll="false"></ad-tabs>
 */
	export default {
		name: 'AdTabs',
		props: {
			// 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度
			isScroll: {
				type: Boolean,
				default: true,
			},
			// 需循环的标签列表
			list: {
				type: Array,
				default: () => [],
			},
			// 当前活动tab的索引
			current: {
				type: [Number, String],
				default: 0,
			},
			// 导航栏的宽度
			width: {
			  type: String,
			  default: '100%',
			},
			// 导航栏的高度和行高
			height: {
				type: [String, Number],
				default: 64,
			},
			// 字体大小
			fontSize: {
				type: [String, Number],
				default: 30,
			},
			// 过渡动画时长, 单位s
			duration: {
				type: [String, Number],
				default: 0.35,
			},
			// 选中项的主题颜色
			activeColor: {
				type: String,
				default: app.theme.default,
			},
			// 未选中项的默认颜色
			inactiveColor: {
				type: String,
				default: '#333',
			},
      // 是否显示底部的滑块
			showBar: {
				type: Boolean,
				default: false,
			},
			// 菜单底部移动的bar的宽度，单位rpx
			barWidth: {
				type: [String, Number],
				default: 40,
			},
			// 移动bar的高度
			barHeight: {
				type: [String, Number],
				default: 6,
			},
			// 单个tab的左或有内边距（左右相同）
			gutter: {
				type: [String, Number],
				default: 32,
			},
			// 导航栏的背景颜色
			bgColor: String,
			// 读取传入的数组对象的属性(tab名称)
			name: {
				type: String,
				default: 'name',
			},
			// 活动tab字体是否加粗
			bold: {
				type: [Boolean, String, Number],
				default: true,
			},
			// 当前活动tab item的样式
			activeItemStyle: {
				type: Object,
				default: () => {},
			},
			// 底部滑块的自定义样式
			barStyle: {
				type: Object,
				default: () => {},
			},
			// 标签的宽度
			itemWidth: {
				type: [Number, String],
				default: 'auto',
      },
      // 点击标签的轻微振动，默认开启（小程序端）
      vibrateShort: {
        type: Boolean,
        default: true,
      },
		},
		data() {
			return {
        id: getUid(),
        prefixCls: `${app.prefix}-tabs`,
				scrollLeft: 0, // 滚动scroll-view的左边滚动距离
				tabQueryInfo: [], // 存放对tab菜单查询后的节点信息
				componentWidth: 0, // 屏幕宽度，单位为px
				scrollBarLeft: 0, // 移动bar需要通过translateX()移动的距离
				parentLeft: 0, // 父元素(tabs组件)到屏幕左边的距离
				currentIndex: this.current,
				barFirstTimeMove: true, // 滑块第一次移动时(页面刚生成时)，无需动画，否则给人怪异的感觉
			};
		},
		computed: {
      tabStyle() {
        const style = {};
        if (this.bgColor) style.backgroundColor = this.bgColor;
        style.width = this.width;
        return style;
      },
			// 移动bar的样式
			tabBarStyle() {
				const style = {
					width: `${this.barWidth}rpx`,
					transform: `translate(${this.scrollBarLeft}px, -100%)`,
					// 滑块在页面渲染后第一次滑动时，无需动画效果
					'transition-duration': `${this.barFirstTimeMove ? 0 : this.duration }s`,
					'background-color': this.activeColor,
					height: `${this.barHeight}rpx`,
					// 设置一个很大的值，它会自动取能用的最大值，不用高度的一半，是因为高度可能是单数，会有小数出现
					'border-radius': `${this.barHeight / 2}px`,
				};
        Object.assign(style, this.barStyle);
				return style;
			},
			// tab的样式
			tabItemStyle() {
				return (index) => {
					let style = {
						height: `${this.height}rpx`,
						'line-height': `${this.height}rpx`,
						'font-size': `${this.fontSize}rpx`,
						transition: `color .18s，background ${this.duration}s`,
						padding: this.isScroll ? `0 ${this.gutter}rpx` : '',
						flex: this.isScroll ? 'auto' : '1',
						width: addUnit(this.itemWidth),
          };
					// 字体加粗
					if (index === this.currentIndex && this.bold) {
            if (typeof this.bold === 'boolean') {
              style.fontWeight = 'bold';
            } else {
              style.fontWeight = this.bold;
            }
          }
					if (index === this.currentIndex) {
						style.color = this.activeColor;
						// 给选中的tab item添加外部自定义的样式
						style = Object.assign(style, this.activeItemStyle);
					} else {
						style.color = this.inactiveColor;
					}
					return style;
				};
			},
		},
		watch: {
			// 监听tab的变化，重新计算tab菜单的布局信息，因为实际使用中菜单可能是通过
			// 后台获取的（如新闻app顶部的菜单），获取返回需要一定时间，所以list变化时，重新获取布局信息
			list(n, o) {
				// list变动时，重制内部索引，否则可能导致超出数组边界的情况
				if (n.length !== o.length) {
          this.currentIndex = this.current;
          // 用$nextTick等待视图更新完毕后再计算tab的局部信息，否则可能因为tab还没生成就获取，就会有问题
          this.$nextTick(() => {
            this.init();
          });
        }
			},
			current: {
				immediate: true,
				handler(nVal, oVal) {
					// 视图更新后再执行移动操作
					this.$nextTick(() => {
						this.currentIndex = nVal;
						this.scrollByIndex();
					});
				},
			},
		},
		mounted() {
			this.init();
		},
		methods: {
			// 设置一个init方法，方便多处调用
			async init() {
        const res = await this.handleGetRect(`#${this.id}`);
        // tabs组件距离屏幕左边的宽度
        this.parentLeft = res.left;
        // tabs组件的宽度
        this.componentWidth = res.width;
        this.getTabRect();
			},
			// 点击某一个tab菜单
			clickTab(index) {
				// 点击当前活动tab，不触发事件
				if (index === this.currentIndex) return;
				// 发送事件给父组件
        this.$emit('change', index);
        // 轻微触感
        if (this.vibrateShort) uni.vibrateShort();
			},
			// 查询tab的布局信息
			getTabRect() {
				// 创建节点查询
				const query = uni.createSelectorQuery().in(this);
				// 历遍所有tab，这里是执行了查询，最终使用exec()会一次性返回查询的数组结果
				for (const i in this.list) {
          // 只要size和rect两个参数
					query.select(`#${this.prefixCls}-item-${i}`).fields({
						size: true,
						rect: true,
					});
				}
				// 执行查询，一次性获取多个结果
				query.exec((res) => {
						this.tabQueryInfo = res;
						// 初始化滚动条和移动bar的位置
						this.scrollByIndex();
					});
			},
			// 滚动scroll-view，让活动的tab处于屏幕的中间位置
			scrollByIndex() {
        // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
        const tabInfo = this.tabQueryInfo[this.currentIndex];
				if (!tabInfo) return;
				// 活动tab的宽度
				const tabWidth = tabInfo.width;
				// 活动item的左边到tabs组件左边的距离，用item的left减去tabs的left
				const offsetLeft = tabInfo.left - this.parentLeft;
				// 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
				const scrollLeft = offsetLeft - (this.componentWidth - tabWidth) / 2;
        this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;
				// 当前活动item的中心点到左边的距离减去滑块宽度的一半，即可得到滑块所需的移动距离
        const left = tabInfo.left + tabInfo.width / 2 - this.parentLeft;
        // 计算当前活跃item到组件左边的距离
        this.scrollBarLeft = left - uni.upx2px(this.barWidth) / 2;
				// 第一次移动滑块的时候，barFirstTimeMove为true，放到延时中将其设置false
				// 延时是因为scrollBarLeft作用于computed计算时，需要一个过程需，否则导致出错
				if (this.barFirstTimeMove) {
					setTimeout(() => {
						this.barFirstTimeMove = false;
					}, 100);
				}
			},
		},
	};
</script>
<style lang="scss" scoped src="./index.scss"></style>
