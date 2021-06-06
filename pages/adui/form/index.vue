<template>
  <view :class="[ `${app.prefix}ui-container`,'form' ]">
   <header :class="[ `${app.prefix}ui-header` ]">
      <h1>Form</h1>
      <p>表单组件，用于信息的增删改查及引导式设置</p>
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
 * @fileoverview | 表单组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-12 // Initial version.
 * @Date:   2021-03-12 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-15 09:35:01
 */
export default {
  data() {
    return {
      routers: [
         {
          name: 'Calendar',
          icon: 'calendar',
          desc: '日历组件',
          url: './calendar/index'
        }
      ]
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
      path: 'pages/adui/form/index',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped src="./index.scss"></style>