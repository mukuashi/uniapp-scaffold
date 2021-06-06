<template>
  <view :class="[ `${app.prefix}ui-container`,'interact' ]">
   <header :class="[ `${app.prefix}ui-header` ]">
      <h1>Interactive</h1>
      <p>交互组件，互动反馈及提示元素</p>
    </header>
    <section>
      <view
        v-for="(row,index) in routers"
        :key="index"
        class="item"
      >
        <ad-author
          extra
          card
          :title="row.name"
          :desc="row.desc"
          :icon="row.icon"
          :icon-size="42"
          :avatar-bg="app.gradients[index]"
          :navigator="row.url"
        />
      </view>
    </section>
  </view>
</template>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 交互组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-08 // Initial version.
 * @Date:   2021-03-08 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-26 16:28:20
 */

export default {
  data() {
    return {
      routers: [
        {
          name: 'Mask',
          icon: 'mask',
          desc: '遮罩组件',
          url: './mask/index',
        },
        {
          name: 'Actionsheet',
          icon: 'actionsheet',
          desc: '浮窗叶卡组件',
          url: './actionsheet/index',
        },
        {
          name: 'Countup',
          icon: 'triangle_up',
          desc: '文本递增组件',
          url: './countup/index',
        },
        {
          name: 'TextAnimate',
          icon: 'text',
          desc: '文本动画组件',
          url: './text-animate/index',
        },
        {
          name: 'Spin',
          icon: 'spin',
          desc: 'loading组件',
          url: './spin/index',
        },
        {
          name: 'Clock',
          icon: 'clock',
          desc: '计时器组件',
          url: './clock/index',
        },
      ],
    };
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
    const { shares } = this.app;
    return {
      title: shares.title,
      path: 'pages/adui/interact/index',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
