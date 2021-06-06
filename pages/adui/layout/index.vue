<template>
  <view :class="[ `${app.prefix}ui-container`,'layout' ]">
   <header :class="[ `${app.prefix}ui-header` ]">
      <h1>Layout</h1>
      <p>布局组件，基于「动态、体系化」的角度，灵活衍生出不同的「秩序之美」，为设计者构筑理性之美的空间。</p>
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
          :disable="row.disable"
        />
      </view>
    </section>
  </view>
</template>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 布局组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-10 // Initial version.
 * @Date:   2021-03-10 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-26 16:40:18
 */

export default {
  data() {
    return {
      routers: [
        {
          name: 'Flex',
          icon: 'flex',
          desc: '弹性布局',
          url: './flex/index',
          disable: true,
        },
        {
          name: 'Grid',
          icon: 'grid',
          desc: '网格布局',
          disable: true,
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
      path: 'pages/adui/layout/index',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
