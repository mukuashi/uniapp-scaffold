<template>
  <ad-mask
    v-model="value"
    :position="position"
    :locked="locked"
    :animation-cancel="animationCancel"
    @close="handleClickAction('close')"
    @click-mask="handleClickMask"
  >
    <view :class="[
      prefixCls,
      `${prefixCls}-${position}`,
      fillet && `${prefixCls}-fillet`
    ]">
      <view v-if="tips" :class="[ `${prefixCls}-tips`]" :style="[ tipsTextStyle ]">{{ tips }}</view>
      <view :class="[ `${prefixCls}-content`]">
        <slot />
        <view v-if="tipsImage" :class="[ `${prefixCls}-content-img`]">
          <image
            :src="tipsImage"
            mode="widthFix"
            webp
            show-menu-by-longpress
            @tap="handlePreviewImage"
          />
        </view>
        <view
          :class="[
            `${prefixCls}-box`,
            isCancel && (!itemList.length && `${prefixCls}-line`),
            itemInline && `${prefixCls}-inline`,
            !tips && `${prefixCls}-tips-null`
          ]"
        >
          <block v-for="(item,index) in itemList" :key="index">
            <button
              :class="[
              `${prefixCls}-btn`,
              !itemInline && itemList.length && `${prefixCls}-divider`,
              `${prefixCls}-btn-last` && (!isCancel && index===itemList.length-1)
            ]"
              :data-index="index"
              :open-type="item.opentype"
              :style="{
                color: item.color || item.opentype === 'openSetting' && app.theme.error
              }"
              @tap="handleClickItem"
            >{{ item.text }}</button>
          </block>
          <button
            v-if="isCancel"
            :class="[
              `${prefixCls}-btn`,
              `${prefixCls}-cancel`
            ]"
            @tap="handleClickAction('cancel')"
          >{{ cancelText }}</button>
        </view>
      </view>
    </view>
  </ad-mask>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | ActionSheet操作反馈菜单
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:36:56
 */
import app from '@/config';

export default {
  name: 'AdActionsheet',
  props: {
    // 显示操作菜单开关
    value: {
      type: Boolean,
      default: false,
    },
    // 菜单按钮数组，自定义文本颜色
    itemList: {
      type: Array,
      default: () => [{
        text: '确定',
        color: app.theme.success,
      }],
    },
    // 功能选项inline内敛模式，居中排一列，默认关闭
    itemInline: {
      type: Boolean,
      default: false,
    },
    // 是否自带圆角
    fillet: {
      type: Boolean,
      default: true,
    },
    // 提示文字
    tips: String,
    // 提示文字样式
    tipsTextStyle: {
      type: Object,
      default: () => ({}),
    },
    // 操作选项添加图片展示
    tipsImage: String,
    // 图片是否支持点击预览，默认不支持
    tipsImagePreview: {
      type: Boolean,
      default: false,
    },
    // 是否需要取消按钮
    isCancel: {
      type: Boolean,
      default: true,
    },
    // 取消文案
    cancelText: {
      type: String,
      default: '取消',
    },
    // 蒙层锁定点击遮罩不可关闭
    locked: {
      type: Boolean,
      default: false,
    },
    // 功能区位置
    position: {
      type: String,
      default: 'bottom',
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-actionsheet`,
      animationCancel: false,
    };
  },
  methods: {
    handleClickMask(e) {
      if (!this.locked) this.handleClickAction('cancel');
    },
    handleClickItem(e) {
      if (!this.value) return;
      const data = e.currentTarget.dataset;
      this.$emit('confirm', data.index);
      this.handleClickAction('confirm');
    },
    handleClickAction(type) {
      this.animationCancel = true;
      setTimeout(() => {
        this.animationCancel = false;
        if (type !== 'confirm') {
          this.$emit('cancel', false);
        }
        this.$emit('input', false);
      }, 200);
    },
    handlePreviewImage() {
      if (this.tipsImagePreview) {
        uni.previewImage({
          current: this.tipsImage,
          urls: [this.tipsImage],
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
