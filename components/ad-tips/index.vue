<template>
  <view v-if="tips">
    <block v-if="position === 'top'">
      <view
        :class="[
          `${prefixCls}-toptips`,
          `${prefixCls}-${type}`,
          tips && `${prefixCls}-show`
        ]"
      >{{ desc }}
      </view>
    </block>
    <block v-else>
      <view
        :class="[
          `${prefixCls}-toast`,
          `${prefixCls}-${position}`,
          tips && `${prefixCls}-toast-show`
        ]"
      >
        <view
          :class="[
            `${prefixCls}-content`,
            `${prefixCls}-${type}`
          ]"
        >{{ desc }}
        </view>
      </view>
    </block>
  </view>
</template>

<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | tips轻交互组件
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-16 16:14:08
 */
import app from '@/config';

export default {
  name: 'AdTips',
  props: {
    // 在屏幕上出现的位置
    position: {
      type: String,
      validator(value) {
        return ['top', 'center', 'bottom'].includes(value)
      },
      default: 'bottom',
    },
    type: {
      type: String,
      validator(value) {
        return ['primary', 'success', 'warning','error'].includes(value)
      },
      default: 'primary'
    },
    desc: {
      type: String,
      default: '欢迎参观我们的小程序实验室'
    },
    options: {
      type: Object,
      default: () => ({
        duration: 2  // 秒
      })
    }
  },
  data() {
    return {
      prefixCls: `${app.prefix}-tips`,
      timer: null,
      tips: false
    }
  },
  methods: {
    show() {
      const { duration } = this.options;
      clearTimeout(this.timer);
      this.tips = true;
      this.timer = setTimeout(() => {
        this.tips = false;
        clearTimeout(this.timer);
        this.timer = null;
      }, duration * 1000)
    },
  },
}
</script>
<style lang="scss" scoped src="./index.scss"></style>
