<template>
  <view
    v-if="value"
    :class="[
      prefixCls,
      fix && `${prefixCls}-fix`
    ]"
    :style="[ statusStyle ]"
  >
    <slot v-if="$slots.default" name="custom" />
    <view
      v-else
      :class="[
        `${prefixCls}-content`
      ]"
    >
      <image
        v-if="image"
        mode="widthFix"
        :src="image"
        :style="[imageNewStyle]"
      />
      <image
        v-else
        mode="widthFix"
        :src="types.image"
        :style="[imageNewStyle]"
      />
      <p v-if="desc">{{ desc }}</p>
      <p v-else>{{ types.text }}</p>
      <ad-button
        v-if="buttonText"
        :type="buttonType"
        class="button"
        @on-click="handleButtonClick"
      >{{ buttonText }}
      </ad-button>
    </view>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 状态结果页，常用于数据、状态等结果页的落地.
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-20 21:54:16
 */
import app from '@/config';

export default {
  name: 'AdStatus',
  props: {
    // 状态show
    value: {
      type: Boolean,
      default: false,
    },
    // 全屏fix
    fix: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'data',
    },
    image: String,
    imageSize: [String, Number],
    // 更多自定义图片样式
    imageStyle: {
      type: Object,
      default: () => {},
    },
    desc: String,
    buttonType: String,
    buttonText: String,
    // 默认path string，对应navigateTo类型，其他类型按照 { path: '/pages/xx', type:'switchTab' }类型传值
    navigator: [Object, String],
    bgColor: String,
    // 更多自定义盒子style
    customStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-status`,
    };
  },
  computed: {
    types() {
      let types = {};
      switch (this.type) {
        case 'auth':
          types = {
            image: 'https://staticweb.keepcdn.com/ug-page/1559531829993/common-status-img-04.png',
            text: '您还没有权限哦 ~',
          };
          break;
        case 'data':
          types = {
            image: 'https://staticweb.keepcdn.com/ug-page/1559531829991/common-status-img-02.png',
            text: '暂时还没有相关数据哦 ~',
          };
          break;
        case 'error':
          types = {
            image: 'https://staticweb.keepcdn.com/ug-page/1559531829993/common-status-img-03.png',
            text: '服务器开小差啦 ~',
          };
          break;
      }
      return types;
    },
    statusStyle() {
      const style = {};
      if (this.bgColor) style.backgroundColor = this.bgColor;
      return {
        ...style,
        ...this.customStyle,
      };
    },
    imageNewStyle() {
      const style = {};
      if (this.imageSize) style.width = `${this.imageSize}rpx`;
      return {
        ...style,
        ...this.imageStyle,
      };
    },
  },
  methods: {
    handleButtonClick(e) {
      // 指定navigator路径后不再传递父子组件事件
      if (this.navigator) {
        if (typeof this.navigator === 'object' && this.navigator.type) {
          return uni[this.navigator.type]({
            url: this.navigator.path,
          });
        }
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
