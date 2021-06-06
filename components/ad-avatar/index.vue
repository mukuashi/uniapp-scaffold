<template>
  <view
    v-if="image || icon || Object.keys($slots).length"
    :class="[
      prefixCls,
      `${prefixCls}-${shape}`,
      `${prefixCls}-${size}`,
      shadow && `${prefixCls}-shadow`,
      !!image ? `${prefixCls}-image` : '',
      !!icon || customIcon ? `${prefixCls}-icon` : ''
    ]"
    :style="[ avatarStyle ]"
    @tap="handleBoxClick"
  >
    <image
      v-if="image"
      lazy-load
      :src="image"
      :mode="mode"
      @error="handleImgError"
    />
    <ad-icon
      v-else-if="icon"
      :type="icon"
      :size="iconSize"
      :color="iconColor"
    />
    <text v-else :class="[ `${prefixCls}-text` ]">
      <slot />
    </text>
    <block>
      <slot name="tips" />
    </block>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Avatar头像圆字组件，支持图标、文本自定义等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-13 22:25:41
 */
import app from '@/config';
//
export default {
  name: 'AdAvatar',
  props: {
    shape: {
      validator(value) {
        return ['circle', 'square'].includes(value);
      },
      default: 'circle',
    },
    size: {
      type: [String, Number],
      // "small", "default", "large", 自定义Number
      default: 'default',
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    image: String,
    icon: String,
    iconColor: String,
    iconSize: {
      type: [Number, String],
      default: 28,
    },
    avatarBg: String,
    // 更多模式参考 https://uniapp.dcloud.io/component/image
    mode: {
      type: String,
      default: 'aspectFill',
    },
    // 更多自定义style
    customStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-avatar`,
    };
  },
  computed: {
    avatarStyle() {
      const style = {};
      if (this.avatarBg) {
        if (this.avatarBg.includes('gradient')) {
          style.backgroundImage = this.avatarBg;
        } else {
          style.backgroundColor = this.avatarBg;
        }
      }
      if (this.size && Number(this.size)) {
        style.width = `${this.size}rpx`;
        style.height = `${this.size}rpx`;
      }
      return {
        ...style,
        ...this.customStyle,
      };
    },
  },
  methods: {
    handleBoxClick(e) {
      this.$emit('on-click', e);
    },
    handleImgError(e) {
      this.$emit('on-error', e);
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
