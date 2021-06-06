<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list` ]">
  </view>
</template>
<script>

export default {
  data() {
    return {

    };
  },
  onLoad() {
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
  onShareAppMessage() {
    return {
      title: 'Swiper',
      path: 'pages/adui/views/swiper/index',
    };
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
