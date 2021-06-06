<template>
  <view
    :class="[
      prefixCls,
      className,
      bordered && `${prefixCls}-bordered`,
      shadow && `${prefixCls}-shadow`,
      skeleton && `${prefixCls}-skeleton`
    ]"
    :style="[ cardStyle ]"
  >
    <ad-spin v-if="loading" />
    <view v-else>
      <ad-spin v-if="spin" :s-height="150" />
      <view
        v-if="showHead"
        :class="[`${prefixCls}-head`]"
        :style="{
          visibility: spin ? 'hidden' : 'visible'
        }"
      >
        <!-- 封面次序 -->
        <view v-if="badge" :class="[`${prefixCls}-head-current`]">
          {{ badge }}
        </view>
        <!-- 标题区 -->
        <slot name="head">
          <view
            :class="[`${prefixCls}-head-content`]"
            @tap.stop.prevent="handleHeadClick"
          >
            <ad-avatar
              v-if="icon || image"
              :size="size"
              :image="image"
              :shape="imageShape"
              :icon="icon"
              :icon-color="iconColor"
              :icon-size="iconSize"
              :avatar-bg='avatarBg'
              class="avatar"
            />
            <view class="paragraph">
              <block v-if="$slots['title']">
                <slot name="title" />
              </block>
              <h1 v-else-if="title">
                {{ title }}
                <slot name="title-after" />
              </h1>
              <p v-if="desc || $slots['desc-ps']">
                {{ desc }}
                <slot name="desc-ps" />
              </p>
            </view>
          </view>
        </slot>
        <view :class="[ `${prefixCls}-extra` ]">
          <slot name="extra" />
        </view>
      </view>
      <!-- 内容区 -->
      <view
        v-if="showBody"
        :class="[`${prefixCls}-body`]"
        :style="[ bodyStyle ]"
        @tap="handleBodyClick"
      >
        <slot />
      </view>
    </view>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Card组件，支持title、desc、头像等自定义
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:40:30
 */
import app from '@/config';

export default {
  name: 'AdCard',
  props: {
    // 边框
    bordered: {
      type: Boolean,
      default: true,
    },
    // 阴影
    shadow: {
      type: Boolean,
      default: true,
    },
    // head content
    showHead: {
      type: Boolean,
      default: true,
    },
    // body content
    showBody: {
      type: Boolean,
      default: true,
    },
    // 卡片骨架屏
    skeleton: {
      type: Boolean,
      default: false,
    },
    // 卡片loading（v-if方式）
    loading: {
      type: [String, Boolean],
      default: false,
    },
    // 卡片loading（visibility方式）
    spin: {
      type: [String, Boolean],
      default: false,
    },
    // 卡片的整体高度（默认单位rpx）
    height: [String, Number],
    className: String,
    // 头像大小
    size: [Number, String],
    title: String,
    desc: String,
    icon: String,
    iconColor: String,
    iconSize: [ Number,String ],
    avatarBg: String,
    image: String,
    imageShape: {
      validator(value) {
        return ['circle', 'square'].includes(value);
      },
      default: 'circle',
    },
    badge: [String, Number, Boolean],
    // card style
    customStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-card`,
    };
  },
  computed: {
    cardStyle() {
      const style = {};
      if (this.height) style.minHeight = `${this.height}rpx`;
      return {
        ...style,
        ...this.customStyle,
      }
    },
    bodyStyle() {
      const style = {};
      if (!this.title) style.paddingTop = 0;
      if (this.spin) style.visibility = 'hidden';
      return style;
    }
  },
  methods: {
    handleHeadClick(e) {
      this.$emit('on-head', e);
    },
    handleBodyClick(e) {
      this.$emit('on-body', e);
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
