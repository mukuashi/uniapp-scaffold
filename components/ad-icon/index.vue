<template>
  <view :class="[`${prefixCls}-box`]">
    <view v-if="svg">
      <view v-if="url" :style="[svgExternalStyle]" :class="[prefixCls, `${prefixCls}-external`]" />
      <svg v-else :width="width" :height="height" :fill="color" :class="[ className ]" aria-hidden="true">
        <use :xlink:href="iconName" />
      </svg>
    </view>
    <view
      v-else
      :class="[prefixCls, className, `${prefixCls}-iconfont`, `${prefixCls}-${type}`]"
      :style="[iconStyle]"
      @tap="onClick"
    />
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Icon组件 H5图标库，基于阿里iconfont的托管（Svg），目前支持两种引用方式（默认iconfont，如需svg方式引入需打开配置）
 * API Usage    | 建议图标放弃图片选用此方式使用，参考中心地址：https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1156204&keyword=
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:36:19
 */
import app from '@/config';
import { isUrl } from '@/utils/regexp';

export default {
  name: 'AdIcon',
  props: {
    // 图标类型，唯一标识name（与assets/icons/svg下文件名对应）
    type: {
      type: String,
      required: true,
    },
    // 图标颜色
    color: String,
    // 用于业务层自定义class及动画style等
    className: String,
    // 图标宽度
    width: [Number, String],
    // 图标高度
    height: [Number, String],
    // 图标大小
    size: {
      type: [Number, String],
      default: 28,
    },
    // 是否为svg方式引入
    svg: {
      type: Boolean,
      default: false,
    },
    // 图标是否旋转角度
    rotate: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-icon`,
    };
  },
  computed: {
    url() {
      return isUrl(this.type);
    },
    svgExternalStyle() {
      return {
        mask: `url(${this.type}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.type}) no-repeat 50% 50%`,
      };
    },
    iconName() {
      return `#${app.prefix}-${this.type}`;
    },
    iconStyle () {
      const style = {};
      if (this.color) style.color = this.color;
      if (this.size) style.fontSize = `${this.size}rpx`;
      if (this.rotate) style.transform = `rotate(${this.rotate}deg)`;
      return style;
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>