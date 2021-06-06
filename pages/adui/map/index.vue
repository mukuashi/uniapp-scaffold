<template>
  <view :class="[ `${app.prefix}ui-container`,'map' ]">
   <header :class="[ `${app.prefix}ui-header` ]">
      <h1>地图</h1>
      <p>导览、地图导航等等相关组件或页面</p>
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
 * @fileoverview | 地图组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-22 // Initial version.
 * @Date:   2021-03-22 17:10:01
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-30 16:31:35
 */
export default {
  data() {
    const { core } = this.$store.state.app;
    const { sid } = core;
    return {
      routers: [
         {
          name: 'Guide',
          icon: 'guide',
          desc: '导览子包',
          url: `../../guide/home/index?sid=${sid}`,
          // disable: true,
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
      path: 'pages/adui/map/index',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
