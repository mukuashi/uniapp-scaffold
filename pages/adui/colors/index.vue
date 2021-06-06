<template>
  <view :class="[ `${app.prefix}ui-container`,'colors' ]">
   <header :class="[ `${app.prefix}ui-header` ]">
      <h1>Colorful</h1>
      <p>色彩，{{ app.name }}经过大量实践和研究，在移动端方向输出一套系统级和产品级色彩体系。
        以主题色和产品衍生色贯穿整个产品的组件和页面，遵循「有效、清晰、准确、美」的原则，为您的应用带来统一且鲜明的视觉效果。</p>
    </header>
    <section
      v-for="(row,index) in colors"
      :key="index"
    >
      <h3>{{ row.title }}</h3>
      <view
        :class="[ 'item',!tt.plain && 'item-plain' ]"
        v-for="(tt,tIndex) in row.list"
        :key="tIndex"
        @tap='handleCommonCopy(`${tt.name}`)'
      >
        <ad-author
          card
          :title="tt.name"
          :desc="tt.value"
          :custom-style="{
            backgroundColor: tt.value
          }"
        />
      </view>
    </section>
  </view>
</template>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 色彩组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-05 // Initial version.
 * @Date:   2021-03-05 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-03 22:25:22
 */

export default {
  data() {
    const { theme } = this.$store.state.app
    return {
      colors: [
        {
          title: '主色',
          list: [
            {
              name: 'theme',
              value: theme.default
            }
          ]
        },
        {
          title: '辅助色',
          list: [
            {
              name: 'primary',
              value: theme.default
            },
            {
              name: 'success',
              value: theme.success
            },
            {
              name: 'info',
              value: theme.info
            },
            {
              name: 'warning',
              value: theme.warning
            },
            {
              name: 'error',
              value: theme.error
            },
            {
              name: 'disable',
              value: theme.disable
            }
          ]
        },
        {
          title: '中性色',
          list: [
            {
              name: '标题',
              value: '#333'
            },
            {
              name: '淡灰',
              value: '#666'
            },
            {
              name: '默认',
              value: '#888'
            },
            {
              name: '轻灰',
              value: '#999'
            }
          ]
        },
        {
          title: '背景色',
          list: [
            {
              name: '默认',
              value: '#f8f8f8',
              plain: true
            },
            {
              name: '轻色',
              value: '#ccc'
            }
          ]
        },
        {
          title: '暗黑模式',
          list: [
            {
              name: 'background',
              value: '#11121c'
            }
          ]
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
      title: 'Colors',
      path: 'pages/adui/colos/index',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped src="./index.scss"></style>