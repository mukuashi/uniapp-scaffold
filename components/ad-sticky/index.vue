<template>
  <view :class="prefixCls">
    <!--sticky 容器-->
    <view :class="[isFixed && `${prefixCls}-fixed`]" :style="[ stickyStyle ]">
      <slot name="header"/>
    </view>
    <!--sticky 容器-->
    <!--内容-->
    <slot name="content"/>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Sticky吸顶容器
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 19:01:12
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-24 19:40:56
 */
import app from '@/config';

export default {
  name: 'AdSticky',
  props: {
    scrollTop: {
      type: Number,
    },
    // 吸顶容器距离顶部距离 px
    stickyTop: {
      type: [Number, String],
      // #ifdef APP-PLUS || MP
      default: 0,
      // #endif
      // #ifdef H5
      default: 44,
      // #endif
    },
    // 是否指定容器，即内容放置插槽content内
    container: {
      type: Boolean,
      default: false,
    },
    // 是否是原生自带header
    isNativeHeader: {
      type: Boolean,
      default: true,
    },
    // 吸顶容器
    stickyHeight: String,
    // 占位容器背景颜色
    bgColor: {
      type: String,
      default: 'transparent',
    },
    // 是否重新计算[有异步加载时使用,设置大于0的数]
    recalc: {
      type: Number,
      default: 0,
    },
    // 列表中的索引值
    index: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-sticky`,
      timer: null,
      top: 0,
      height: 0,
      isFixed: false,
      initialize: 0, // 重新初始化
    };
  },
  computed: {
    stickyStyle() {
      const style = {};
      const { customBar,statusBarHeight } = this.systemInfo;
      if (this.bgColor) style.backgroundColor = this.bgColor;
      if (this.isFixed) {
        style.top = `${this.stickyTop}px`;
        style.height = (this.stickyHeight && `${this.stickyHeight}px`) || `${statusBarHeight + customBar}px`;
      }
      return style;
    },
  },
  watch: {
    scrollTop(newValue, oldValue) {
      if (this.initialize != 0) {
        this.updateScrollChange(() => {
          this.updateStickyChange();
          this.initialize = 0;
        });
      } else {
        this.updateStickyChange();
      }
    },
    recalc(newValue, oldValue) {
      this.updateScrollChange(() => {
        this.updateStickyChange();
        this.initialize = 0;
      });
    },
  },
  created() {
    this.initialize = this.recalc;
  },
  mounted() {
    setTimeout(() => {
      this.updateScrollChange();
    }, 20);
  },
  methods: {
    updateStickyChange() {
      const top = this.top;
      const height = this.height;
      const scrollTop = this.scrollTop;
      let stickyTop = this.stickyTop;
      // #ifdef H5
      if (this.isNativeHeader) {
        stickyTop = stickyTop - 44;
        stickyTop = stickyTop < 0 ? 0 : stickyTop;
      }
      // #endif
      if (this.container) {
        this.isFixed = !!(scrollTop + stickyTop >= top && scrollTop + stickyTop < top + height);
      } else {
        this.isFixed = scrollTop + stickyTop >= top;
      }
      // 是否吸顶
      this.$emit('sticky', {
        isFixed: this.isFixed,
        index: this.index,
      });
    },
    updateScrollChange(callback) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        const className = `.${this.prefixCls}`;
        const query = uni.createSelectorQuery().in(this);
        query
          .select(className)
          .boundingClientRect((res) => {
            if (res) {
              this.top = res.top + (this.scrollTop || 0);
              this.height = res.height;
              callback && callback();
              this.$emit('change', {
                index: Number(this.index),
                top: this.top,
              });
            }
          })
          .exec();
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
