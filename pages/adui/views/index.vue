<template>
  <view :class="[ `${app.prefix}ui-container`,'views' ]">
   <header :class="[ `${app.prefix}ui-header` ]">
      <h1>Views</h1>
      <p>视图组件，数据及信息展示的标准化方式</p>
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
 * @fileoverview | 交互组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-08 // Initial version.
 * @Date:   2021-03-08 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-26 16:28:32
 */

export default {
  data() {
    return {
      routers: [
        {
          name: 'Author',
          icon: 'author',
          desc: '作者组件',
          url: './author/index',
        },
        {
          name: 'Tabs',
          icon: 'tabs',
          desc: '标签页组件',
          url: './tabs/index',
        },
        {
          name: 'Navbar',
          icon: 'nav',
          desc: '自定义顶部导航栏组件',
          url: './navbar/index',
        },
        {
          name: 'Skeleton',
          icon: 'transition',
          desc: '骨架屏组件',
          url: './skeleton/index',
        },
        {
          name: 'Sticky',
          icon: 'sticky',
          desc: '吸顶容器组件',
          disable: true,
        },
        {
          name: 'Swiper',
          icon: 'swiper',
          desc: '堆叠轮播组件',
          disable: true,
        },
        {
          name: 'Tree',
          icon: 'tree',
          desc: '树选择组件',
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
      path: 'pages/adui/views/index',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
