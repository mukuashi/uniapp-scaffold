<template>
  <view :class="[
    `${prefixCls}-class`,
    `${prefixCls}-box`]">
    <svg :class="[`${prefixCls}-svg`]" aria-hidden="true" @click="onClick" v-if="svg">
      <use :xlink:href="iconName"></use>
    </svg>
    <view
      v-else
      :class="[ prefixCls,`${prefixCls}-${type}` ]"
      :style="{ color: color, 'font-size': size + 'rpx' }"
      @click="onClick"
    />
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Icon组件 H5图标库，基于阿里iconfont的托管（Svg），目前支持两种引用方式（默认iconfont，如需svg方式引入需打开配置）
 * API Usage    | 建议图标放弃图片选用此方式使用，参考中心地址：https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1156204&keyword=
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date: 2019-07-08 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-03-06 11:27:30
 */
import { loadExternalJS } from "@/utils";

export default {
  name: "KpIcon",
  props: {
    /**
     * 图标类型
     */
    type: String,
    /**
     * 图标大小
     */
    size: {
      type: [Number, String],
      default: 28
    },
    /**
     * 图标颜色
     */
    color: {
      type: String,
      default: "#fff"
    },
    // 是否为svg方式引入，默认false
    svg: Boolean
  },
  data() {
    return {
      prefixCls: "m-icon"
    };
  },
  created() {
    if (this.svg) {
      loadExternalJS(["https://at.alicdn.com/t/font_1411765_dy1q2y9unph.js"]);
    }
  },
  computed: {
    iconName() {
      return `#${this.prefixCls}-${this.type}`;
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>