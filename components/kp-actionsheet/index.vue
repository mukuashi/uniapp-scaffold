<template>
  <kp-mask
    v-model="value"
    :locked="locked"
    position="bottom"
    :animation-cancel="animationCancel"
    @close="handleClickAction('close')"
  >
    <view :class="[ `${prefixCls}`]">
      <view class="tips" :style="{ color: tipsColor}" v-if="tips">{{tips}}</view>
      <view :class="[ 
          `${prefixCls}-content`
        ]">
        <image
          v-if="tipsImage"
          :src="tipsImage"
          mode="widthFix"
          webp
          @tap="handlePreviewImage"
        >
        <view
          :class="[
            isCancel && (!itemList.length && `${prefixCls}-line`),
            itemInline ? `${prefixCls}-inline` : `${prefixCls}-box`
          ]"
        >
          <block v-for="(item,index) in itemList" :key="index">
            <button
              :class="[
              `${prefixCls}-btn`,
              !itemInline && `${prefixCls}-divider`,
              `${prefixCls}-btn-last` && (!isCancel && index===itemList.length-1)
            ]"
              :data-index="index"
              :open-type="item.opentype"
              :style="{ color:item.color }"
              @tap="handleClickItem"
            >{{item.text}}</button>
          </block>
          <button
            :class="[
          `${prefixCls}-btn`,
          `${prefixCls}-cancel`
        ]"
            v-if="isCancel"
            @tap="handleClickAction('cancel')"
          >{{cancelText}}</button>
        </view>
      </view>
    </view>
  </kp-mask>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | ActionSheet操作反馈菜单
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-02-25 // Initial version.
 * @Date: 2020-02-25 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-17 20:09:48
 */
import KpMask from "../kp-mask";
export default {
  name: "KpActionsheet",
  components: {
    KpMask
  },
  props: {
    // 显示操作菜单开关
    value: {
      type: Boolean,
      default: false
    },
    //点击遮罩 是否可关闭
    maskClosed: {
      type: Boolean,
      default: true
    },
    //菜单按钮数组，自定义文本颜色，红色参考色：#e53a37
    itemList: {
      type: Array,
      default: () => [{ text: "确定" }]
    },
    itemInline: Boolean, // 功能选项inline内敛模式，居中排一列，默认不开启
    //提示文字
    tips: {
      type: String,
      default: ""
    },
    //提示文字颜色
    tipsColor: String,
    //操作选项添加图片展示
    tipsImage: String,
    //是否需要取消按钮
    isCancel: {
      type: Boolean,
      default: true
    },
    // 取消文案
    cancelText: {
      type: String,
      default: "取消"
    },
    // 蒙层锁定点击遮罩不可关闭
    locked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: "k-actionsheet",
      animationCancel: false
    };
  },
  methods: {
    handleClickItem(e) {
      if (!this.value) return;
      const data = e.currentTarget.dataset;
      this.$emit("confirm", data.index);
      this.handleClickAction("cancel");
    },
    handleClickAction(type) {
      if (type === "close") {
        this.$emit("cancel", false);
      }
      if (type === "cancel") {
        this.animationCancel = true;
        setTimeout(() => {
          this.animationCancel = false;
          this.$emit("cancel", false);
        }, 300);
      }
    },
    handlePreviewImage() {
      uni.previewImage({
        current: this.tipsImage,
        urls: [this.tipsImage]
      });
    }
  }
};
</script>
