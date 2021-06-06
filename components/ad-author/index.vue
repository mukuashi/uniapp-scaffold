<template>
  <view
    :class="[
      prefixCls,
      padding && `${prefixCls}-padding`,
      card && `${prefixCls}-card`,
      disable && `${prefixCls}-disable`
    ]"
    :style="[ authorStyle ]"
    @click="handleClick"
  >
    <ad-avatar
      v-if="avatar || icon"
      :image="avatar"
      :icon="icon"
      :icon-size="iconSize"
      :shape="shape"
      :avatar-bg="avatarBg"
      :class="[ `${prefixCls}-left` ]"
    />
    <view :class="[ `${prefixCls}-content` ]">
      <text v-if="title" class="nickname">{{ title }}</text>
      <text v-if="desc" class="desc">{{ desc }}</text>
      <slot />
    </view>
    <view :class="[ `${prefixCls}-extra` ]">
      <ad-icon
        v-if="extra"
        :size="extraObj.size"
        :type="extraObj.icon"
        :color="extraObj.color"
      />
      <slot name="extra" />
    </view>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Author组件，支持头像、标题、描述及额外信息载入等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:37:17
 */
import app from '@/config';

export default {
  name: 'AdAuthor',
  props: {
    avatar: String,
    avatarBg: String,
    icon: String,
    iconSize: {
      type: [String, Number],
      default: 48,
    },
    title: String,
    desc: String,
    // 右侧额外信息，默认导航小箭头形式（如想自定义图标或颜色可按照配置混入Object类型）
    extra: {
      type: [Boolean, String, Object],
      default: false,
    },
    // 卡片上下间距
    padding: {
      type: Boolean,
      default: true,
    },
    // 卡片风格样式，上下左右间距
    card: {
      type: Boolean,
      default: false,
    },
    shape: {
      validator(value) {
        return ['circle', 'square'].includes(value);
      },
      default: 'circle',
    },
    // 路径形式，导航页面，保留当前页面，跳转到应用内的某个页面
    navigator: String,
    // 是否禁用
    disable: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      prefixCls: `${app.prefix}-author`,
    }
  },
  computed: {
    extraObj() {
      const tpl = {
        size: 45,
        icon: 'arrow_right'
      };
      const { theme } = app
      switch (this.extra) {
        case 'miniprogram':
          return {
            ...tpl,
            icon: 'miniprogram',
            color: theme.miniprogram
          };
          break;
        case 'wechat':
          return {
            ...tpl,
            icon: 'wechat',
            size: 40,
            color: theme.wechat
          };
          break;
        default:
          break;
      }
      return this.extra && this.extra instanceof Object
        ? { ...tpl, ...this.extra }
        : tpl;
    },
    authorStyle() {
      const style = {};
      return {
        ...style,
        ...this.customStyle,
      };
    }
  },
  methods: {
    handleClick(e) {
      // 指定navigator路径后不再传递父子组件事件
      if (this.navigator) {
        return uni.navigateTo({
          url: this.navigator,
        });
      }
      //
      this.$emit('navigate', e);
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
