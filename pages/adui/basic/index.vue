<template>
  <view :class="[ `${app.prefix}ui-container`,'basic' ]">
   <header :class="[ `${app.prefix}ui-header` ]">
      <h1>Basic</h1>
      <p>基础组件，常用组件及装饰元素</p>
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
          :title='row.name'
          :desc='row.desc'
          :icon='row.icon'
          :icon-size=42
          :avatar-bg='app.gradients[index]'
          :navigator="row.url"
        />
      </view>
    </section>
  </view>
</template>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 基础组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-01 // Initial version.
 * @Date:   2021-03-01 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-12 21:34:44
 */

export default {
  data() {
    return {
      routers: [
        {
          name: 'Button',
          icon: 'button',
          desc: '按钮组件',
          url: './button/index'
        },
        {
          name: 'Card',
          icon: 'card',
          desc: '卡片组件',
          url: './card/index',
        },
        {
          name: 'Badge',
          icon: 'badge',
          desc: '徽标组件',
          url: './badge/index',
        },
        {
          name: 'Avatar',
          icon: 'avatar',
          desc: '头像组件',
          url: './avatar/index',
        },
        {
          name: 'Tag',
          icon: 'tag',
          desc: '标签组件',
          url: './tag/index',
        },
        {
          name: 'Progress',
          icon: 'progress',
          desc: '进度条组件',
          url: './progress/index',
        },
      ]
    };
  },
  onLoad(options) {},
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
      path: 'pages/adui/basic/index',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
