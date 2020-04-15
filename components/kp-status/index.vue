<template>
  <div v-if="show" class="k-status" :style="{ background: bgColor }">
    <slot v-if="showSlot" name="custom"/>
    <div v-else class="k-status-content">
      <image v-if="image" :src="image"></image>
      <image v-else :src="types.image"></image>
      <span v-if="describe">{{ describe }}</span>
      <span v-else>{{types.text}}</span>
      <kp-button class="k-button-class" v-if="buttonText" @on-click="onBtn">{{buttonText}}</kp-button>
      <kp-button
        class="k-button-class"
        v-if="!buttonText && type =='network'"
        @on-click="onBtn"
      >重新加载</kp-button>
    </div>
  </div>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 状态结果页，常用于数据、状态等结果页的落地.
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-06-03 // Initial version.
 * @Date: 2019-06-03 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-24 21:19:31
 */
import KpButton from "../kp-button";
import KpIcon from "../kp-icon";
const prefixCls = "k-status";
export default {
  name: "KpStatus",
  components: {
    KpButton,
    KpIcon
  },
  props: {
    // 状态show
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      value: "data"
    },
    image: String,
    describe: String,
    buttonText: String,
    bgColor: {
      type: String,
      valure: "#fff"
    }
  },
  data() {
    return {
      show: this.value,
      showSlot: false,
      types: {
        image: null,
        text: null
      }
    };
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    }
  },
  mounted() {
    this.handleStatus();
    this.showSlot = this.$slots.custom !== undefined;
  },
  methods: {
    handleStatus() {
      switch (this.type) {
        case "cash":
          this.types = {
            image: "https://loading.io/mod/spinner/color-ring/index.svg",
            text: "暂时还没有现金红包哦 ~"
          };
          break;
        case "data":
          this.types = {
            image: "https://loading.io/mod/spinner/color-ring/index.svg",
            text: "暂时没有相关数据哦~"
          };
          break;
        case "error":
          this.types = {
            image: "https://loading.io/mod/spinner/color-ring/index.svg",
            text: "操作失败~"
          };
          break;
        case "network":
          this.types = {
            image: "https://loading.io/mod/spinner/color-ring/index.svg",
            text: "糟糕！网络错误~"
          };
          break;
      }
    },
    onBtn() {
      this.triggerEvent("lintap", {}, {});
      this.triggerEvent("lintapcatch", {}, { bubbles: true });
    }
  }
};
</script>