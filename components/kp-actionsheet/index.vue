<template>
  <view @touchmove.stop @scroll.prevent>
    <view
      :class="[
        `${prefixCls}`,
        `${prefixCls}-class`,
        value && `${prefixCls}-show`
      ]"
    >
      <view class="tips" :style="{ color: tipsColor}" v-if="tips">{{tips}}</view>
      <view :class="[ `${prefixCls}-content`, isCancel && `${prefixCls}-box` ]">
        <image v-if="tipsImage" :src="tipsImage" mode="widthFix" show-menu-by-longpress>
        <block v-for="(item,index) in itemList" :key="index">
          <view
            :class="[
              `${prefixCls}-btn`,
              `${prefixCls}-divider`,
              `${prefixCls}-btn-last` && (!isCancel && index===itemList.length-1)
            ]"
            :hover-class="`${prefixCls}-hover`"
            :hover-stay-time="150"
            :data-index="index"
            :style="{ color:item.color || '#333'}"
            @tap="handleClickItem"
          >{{item.text}}</view>
        </block>
      </view>
      <view
        :class="[
          `${prefixCls}-btn`,
          `${prefixCls}-cancel`
        ]"
        :hover-class="`${prefixCls}-hover`"
        :hover-stay-time="150"
        v-if="isCancel"
        @tap="handleClickCancel"
      >取消</view>
    </view>
    <!-- 遮罩，后期用mask组件换掉 -->
    <view
      :class="[
        `${prefixCls}-mask`,
        value && `${prefixCls}-mask-show`
      ]"
      @tap="handleClickMask"
    />
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2015-Now Asako Studio. All rights reseved.
 * @fileoverview | ActionSheet操作反馈菜单
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-02-25 // Initial version.
 * @Date: 2020-02-25 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-29 16:35:52
 */
export default {
  name: "KpActionsheet",
  components: {},
  props: {
    // 显示操作菜单开关
    value: {
      type: Boolean,
      default: false
    },
    //点击遮罩 是否可关闭
    maskClosable: {
      type: Boolean,
      default: true
    },
    //菜单按钮数组，自定义文本颜色，红色参考色：#e53a37
    itemList: {
      type: Array,
      default: () => [
        {
          text: "确定",
          color: "#333"
        }
      ]
    },
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
    }
  },
  data() {
    return {
      prefixCls: "k-actionsheet"
    };
  },
  methods: {
    handleClickMask() {
      if (!this.maskClosable) return;
      this.handleClickCancel();
    },
    handleClickItem(e) {
      if (!this.value) return;
      const data = e.currentTarget.dataset;
      this.$emit("confirm", data.index);
    },
    handleClickCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
