<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'grid' ]">
    
  </view>
</template>

<script>

export default {
  data() {
    return {
      
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
  onShareAppMessage() {
    return {
      title: 'Grid',
      path: 'pages/adui/layout/grid/index',
    };
  },
  methods: {
    
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>