<template>
  <div>
    <span
      v-for="(letter, idx) in actualText"
      :key="idx"
      :class="[
        prefixCls,
        animation ? `animation-${animation}` : ''
      ]"
      :style="[ styles ]"
    >
      <span v-if="text.charCodeAt(idx) == 32">&nbsp;</span>
      <span v-else>{{ letter }}</span>
    </span>
  </div>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 文字动画 - 支持自定义animation type，需要加到styles/animate库里
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-05-21 // Initial version.
 * @Date:   2020-05-21 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-22 15:31:05
 */
import app from '@/config';

export default {
  name: 'AdTextAnimate',
  props: {
    content: {
      type: [ Number,String ],
      required: true,
    },
    // 淡入速度
    speed: {
      type: Number,
      required: false,
      default: 1.5,
    },
    // 动画类型
    animation: {
      type: String,
      required: false,
      default: 'fadeInRight',
    },
    // 内容字号大小
    size: {
      type: [String, Number],
      default: 14,
    },
    color: {
      type: String,
      default: '#fff',
    },
    // 是否加粗
    weight: [Boolean, Number, String],
  },
  data() {
    return {
      prefixCls: `${app.prefix}-animation`,
      actualText: [],
      text: '',
      index: 0,
    };
  },
  computed: {
    styles() {
      const style = {};
      if (this.size) style.fontSize = `${this.size}px`;
      if (this.weight) {
        // font-weight可能为true、weight（string）或100、500这种数字
        style.fontWeight = typeof this.weight === 'boolean' ? 600 : this.weight;
      }
      if (this.color) style.color = this.color;
      if (this.animation) style.animationName = this.animation
      return style;
    },
  },
  mounted() {
    this.text = this.content;
    const int = setInterval(() => {
      this.actualText.push(this.text.charAt(this.index))
      this.index++;
      if (this.index >= this.text.length) {
        clearInterval(int);
      }
    }, this.speed * 100);
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>