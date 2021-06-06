<template>
  <view :class="[
    prefixCls,
    fixed && `${prefixCls}-fixed` ]"
    :style="[ navbarStyle ]"
  >
    <!-- 状态栏 -->
    <view v-if="statusBar" class="status_bar" :style="[ statusBarStyle ]" />
    <!-- 内容区 -->
    <view
      :class="[`${prefixCls}-content`]"
      :style="[ navbarInnerStyle ]"
    >
      <view v-if="$slots.left" class="left">
        <slot name="left"/>
      </view>
      <view v-else-if="left" class="left" @tap="handleCommonNavigate">
        <ad-icon
          :type="leftIcon || (pages > 1 ? 'arrow_left' : 'home')"
          :size="leftIconSize || (pages > 1 ? 51 : 48)"
          :color="color"
        />
      </view>
      <view class="title" @tap="handleNavTitle">
        <slot
          v-if="$slots.title"
          name="title"
        />
        <view
          v-else-if="title"
          class="title-name"
          :style="[ titleStyle ]"
        >{{ title }}
        </view>
      </view>
      <view class="right">
        <slot name="right"/>
      </view>
    </view>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 自定义顶部导航栏
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-03 16:13:57
 */
import app from '@/config';

export default {
  name: 'AdNavbar',
  props: {
    // 标题
    title: {
      type: [String, Boolean],
      default: '',
    },
    titleCustomStyle: {
      type: Object,
      default: () => {},
    },
    // 标题及左侧导航color
    color: String,
    // 导航栏是否固定于顶部
    fixed: {
      type: Boolean,
      default: true,
    },
    // 是否展示状态栏
    statusBar: {
      type: [Boolean, String],
      default: true,
    },
    // 导航栏背景色(默认透明)
    bgColor: {
      type: String,
      default: 'transparent',
    },
    bgImage: String, // 渐变图片（背景）
    // 左侧导航开关及配置
    left: {
      type: [Boolean, String, Object],
      default: false,
    },
    leftIcon: String,
    leftIconSize: [Number, String],
    // 自定义导航栏高度 单位rpx
    customBarHeight: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-navbar`,
      // 页面栈
      pages: 0,
    };
  },
  computed: {
    // 转换字符数值为真正的数值
    navbarHeight() {
      return this.customBarHeight ? this.customBarHeight : this.systemInfo.customBar;
    },
    // 整个导航栏的样式
    navbarStyle() {
      const style = {};
      if (this.bgColor) style.backgroundColor = this.bgColor;
      if (this.bgImage) style.backgroundImage = this.bgImage.includes('gradient') ? this.bgImage : `url(${this.bgImage})`;
      return style;
    },
    // 导航栏内部盒子的样式
    navbarInnerStyle() {
      const style = {};
      const { menuButton, windowWidth } = this.systemInfo;
      // 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
      style.height = `${this.navbarHeight}px`;
      // #ifdef MP
      style.marginRight = `${windowWidth - menuButton.left}px`;
      // #endif
      return style;
    },
    statusBarStyle() {
      const style = {};
      style.height = `${this.systemInfo.statusBarHeight}px`;
      return style;
    },
    // 导航中间的标题的样式
    titleStyle() {
      const style = {};
      if (this.color) style.color = this.color;
      return {
        ...style,
        ...this.titleCustomStyle,
      };
    },
  },
  created() {
    this.pages = getCurrentPages().length;
  },
  // 方法
  methods: {
    handleCommonNavigate() {
      // 默认首页path
      const home_url = '/pages/home/index';
      // left为自定义跳转路径时且调回非首页
      if (typeof this.left === 'string') {
        uni.navigateTo({
          url: this.left,
        });
      } else {
        if (this.pages > 1) return uni.navigateBack();
        if (typeof this.left === 'object') {
          const { path, tabBar } = this.left;
          const url = path || home_url;
          // 跳转到 tabBar 页面使用 switchTab 跳转
          if (tabBar) {
            uni.switchTab({ url });
          } else {
            uni.redirectTo({ url });
          }
        } else {
          uni.redirectTo({ url: home_url });
        }
      }
    },
    handleNavTitle() {
      this.$emit('onNavTitleTap');
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
