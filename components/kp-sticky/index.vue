<template>
  <view class="k-sticky-class">
    <!--sticky 容器-->
    <view
      :class="[ isFixed && `${prefixCls}-fixed` ]"
      :style="{
				top: isFixed ? `${stickyTop}px` :'auto',
        height: isFixed ? `${stickyHeight}px` : stickyHeight,
				background: bgColor
			}"
    >
      <slot name="header"/>
    </view>
    <!--sticky 容器-->
    <!--内容-->
    <slot name="content"/>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Sticky吸顶容器
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-02-12 // Initial version.
 * @Date: 2020-02-12 19:01:12
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-27 00:51:35
 */
export default {
  name: "KpSticky",
  props: {
    scrollTop: {
      type: Number
    },
    //吸顶容器距离顶部距离 px
    stickyTop: {
      type: [Number, String],
      // #ifdef APP-PLUS || MP
      default: 0,
      // #endif
      // #ifdef H5
      default: 44
      // #endif
    },
    //吸顶容器 高度 px
    stickyHeight: {
      type: String,
      default: "auto"
    },
    //占位容器背景颜色
    bgColor: {
      type: String,
      default: "none"
    },
    //列表中的索引值
    index: {
      type: [Number, String],
      default: 0
    }
  },
  watch: {
    scrollTop(newValue, oldValue) {
      this.updateStickyChange();
    }
  },
  // #ifdef H5
  mounted() {
    this.updateScrollChange();
  },
  // #endif
  onReady() {
    this.updateScrollChange();
  },
  data() {
    return {
      prefixCls: "k-sticky",
      timer: null,
      top: 0,
      height: 0,
      isFixed: false
    };
  },
  methods: {
    updateStickyChange() {
      const top = this.top;
      const scrollTop = this.scrollTop;
      let stickyTop = this.stickyTop;
      // #ifdef H5
      stickyTop = stickyTop - 44;
      stickyTop = stickyTop < 0 ? 0 : stickyTop;
      // #endif
      this.isFixed = scrollTop + stickyTop >= top ? true : false;
    },
    updateScrollChange() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        const className = ".k-sticky-class";
        const query = uni.createSelectorQuery().in(this);
        query
          .select(className)
          .boundingClientRect(res => {
            if (res) {
              this.top = res.top + (this.scrollTop || 0);
              this.height = res.height;
              this.$emit("change", {
                index: Number(this.index),
                top: this.top
              });
            }
          })
          .exec();
      }, 0);
    }
  }
};
</script>