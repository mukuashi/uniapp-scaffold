<template>
  <view :class="[prefixCls]">
    <image
      v-show="url"
      mode="widthFix"
      :class="[`${prefixCls}-image`]"
      :src="url"
      :style="{
        opacity: opacity,
        top: top + 'px',
        left: left + 'px',
      }"
      @click="clickImg"/>
    <view v-show="controlTab" :class="[`${prefixCls}-control`]">
      <view :class="[`${prefixCls}-control-top`]">
        <view class="choose-img" @click="chooseImg">
          <text class="cross-line"></text>
          <text class="vertical-line"></text>
        </view>
        <view>
          <ad-button width="120" size="small" @click.native="reset">reset</ad-button>
          <view class="input-top">
            <text>top:</text>
            <view class="input">
              <input type="text" v-model="top"/>
            </view>
          </view>
        </view>
        <view class="move-warp">
          <ad-icon color="#000" type="more" class="arrow icon-top" rotate="270" @touchstart="touchstartTop" @touchend="touchend" @click="topMove"/>
          <ad-icon color="#000" type="more" class="arrow icon-right" @touchstart="touchstartRight" @touchend="touchend" @click="rightMove"/>
          <ad-icon color="#000" type="more" class="arrow icon-bottom" rotate="90" @touchstart="touchstartBottom" @touchend="touchend" @click="bottomMove"/>
          <ad-icon color="#000" type="more" class="arrow icon-left" rotate="180" @touchstart="touchstartLeft" @touchend="touchend" @click="leftMove"/>
        </view>
      </view>
      <view :class="[`${prefixCls}-control-opacity`]">
        <slider min="0" max="1" step="0.1" :value="opacity" activeColor="rgb(63,132,255)" @changing="moveSlider"/>
      </view>
    </view>
  </view>
</template>
<script>
/*
 * 用于视觉对比
 */
import app from '@/config';

const duration = 300; // 长按箭头多少秒开始移动
const intervalTime = 10; // 长按移动频率
let interval; let timeout;

export default {
  props: {
    url: String,
  },
  data() {
    return {
      prefixCls: `${app.prefix}-compare`,
      opacity: 0.5, // 透明度
      top: 0,
      left: 0,
      controlTab: true, // 控制栏是否显示
    };
  },
  methods: {
    touchstartTop() {
      timeout = setTimeout(() => {
        interval = setInterval(this.topMove, intervalTime);
      }, duration);
    },
    touchstartBottom() {
      timeout = setTimeout(() => {
        interval = setInterval(this.bottomMove, intervalTime);
      }, duration);
    },
    touchstartLeft() {
      timeout = setTimeout(() => {
        interval = setInterval(this.leftMove, intervalTime);
      }, duration);
    },
    touchstartRight() {
      timeout = setTimeout(() => {
        interval = setInterval(this.rightMove, intervalTime);
      }, duration);
    },
    touchend() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = '';
      }
      if (interval) {
        clearInterval(interval);
        interval = '';
      }
    },
    /**
     * 选择图片
     */
    chooseImg () {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          this.$emit('update:url', res.tempFilePaths[0]);
        },
      });
    },
    /**
     * 点击图片，显示下面操作栏
     */
    clickImg () {
      this.controlTab = !this.controlTab;
    },
    // 左移
    leftMove () {
      this.left -= 1;
    },
    // 右移
    rightMove () {
      this.left += 1;
    },
    // 上移
    topMove () {
      this.top -= 1;
    },
    // 下移
    bottomMove () {
      this.top += 1;
    },
    // 重置
    reset () {
      this.top = 0;
      this.left = 0;
      this.$emit('update:url', '');
    },
    // 透明度调整
    moveSlider (e) {
      this.opacity = e.detail.value;
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
