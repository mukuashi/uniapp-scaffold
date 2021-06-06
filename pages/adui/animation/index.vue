<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'animation' ]">
    <header :class="[ `${app.prefix}ui-header` ]">
      <h1>Animation & Motion</h1>
      <p>在企业级产品设计体系中，遵循自然、高效、克制的动效原则，提供50+轻交互过渡效果，增加用户体验舒适度和界面活力，更好的帮助用户认知下一步意图。</p>
    </header>
    <section>
      <ad-card
        :bordered="false"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>动画效果</text>
        </template>
        <view
          class="animation-item"
          :style="{
            animationName: animation.current,
            animationDuration: `${animation.duration}s`
          }"
        >
          <ad-icon type="heart" size="52" />
          <text>{{ animation.current }}</text>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered="false">
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>个性化</text>
        </template>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>动画类型</text>
          <picker
            :range="app.animations"
            :value="animationIndex"
            @change="val=>handleCommonSwitch(val,'animation')"
          >
          <ad-tag type="success" size="large">{{ animation.current }}</ad-tag>
          </picker>
        </view>
        <view :class="[ `${app.prefix}ui-item`,`${app.prefix}ui-item-margin` ]">
          <text>自定义动画时长(秒/s)</text>
          <slider
            show-value
            :value="animation.duration"
            min=".5"
            max="10"
            step=".5"
            @change="val=>handleCommonSwitch(val,'duration')"
          />
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 图标组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-24 // Initial version.
 * @Date:   2020-07-24 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-03 21:32:53
 */
export default {
  data() {
    return {
      animation: {
        current: 'heartBeat',
        duration: 1.5,
      },
    };
  },
  computed: {
    animationIndex() {
      return this.app.animations.findIndex(row => row === this.animation.current);
    },
  },
  onReady() {
    // 初始化分享配置（朋友、朋友圈）
    // #ifndef H5
    uni.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
    // #endif
  },
  onShareAppMessage(options) {
    return {
      title: 'Animation',
      path: 'pages/adui/animation/index',
    };
  },
  methods: {
    handleCommonSwitch(e, type) {
      const { value } = e.detail;
      if (type === 'animation') {
        this.animation.current = this.app.animations[value];
        return;
      }
      this.animation[type] = value;
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
