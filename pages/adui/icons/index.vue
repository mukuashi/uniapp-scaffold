<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'icons' ]">
    <header :class="[ `${app.prefix}ui-header` ]">
      <h1>Iconfont</h1>
      <p>https://www.iconfont.cn</p>
      <p>以产品和项目为维度的常用场景图标库。美观一致、易小便用、矢量高清、扩展性强等特性，贯穿整个产品设计体系，并提供可视化平台便于研发、设计、产品统一在线管理视觉图标库。</p>
    </header>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>常规图标</text>
        </template>
        <view class="icons-container">
          <view class="icons-wrapper">
            <view
              v-for="(row,index) in icons"
              :key="index"
              :class="[ 'item','item-bottom', row.active && 'active' ]"
              @click="handleCurrentActive(row)"
            >
              <view class="icon-wrapper">
                <ad-icon size="40" :type="row.type" />
              </view>
              <text>{{ row.type }}</text>
            </view>
          </view>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>自定义大小</text>
        </template>
        <view class="icons-container">
          <view class="icons-wrapper">
            <view
              v-for="(row,index) in sizes"
              :key="index"
              :class="[ 'item','item-bottom', row.active && 'active' ]"
              @click="handleCurrentActive(row)"
            >
              <view class="icon-wrapper">
                <ad-icon :size="row.size" :type="row.type"/>
              </view>
              <text>{{ row.name }}</text>
            </view>
          </view>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>自定义颜色</text>
        </template>
        <view class="icons-container">
          <view class="icons-wrapper">
            <view
              v-for="(row,index) in app.theme.colors"
              :key="index"
              class="item item-bottom"
            >
              <view class="icon-wrapper">
                <ad-icon size="40" type="wechat" :color="row"/>
              </view>
              <text>{{ row }}</text>
            </view>
          </view>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>自定义旋转角度</text>
        </template>
        <view class="icons-container">
          <view class="icons-wrapper">
            <view
              v-for="(row,index) in rotates"
              :key="index"
              :class="[ 'item','item-bottom', row.active && 'active' ]"
              @click="handleCurrentActive(row)"
            >
              <view class="icon-wrapper">
                <ad-icon size="40" type="arrow_right" :rotate="row.rotate" />
              </view>
              <text>{{ `${row.rotate}°` }}</text>
            </view>
          </view>
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
 * @Last Modified time: 2021-04-26 16:31:12
 */
export default {
  data() {
    return {
      current: -1,
      icons: [
        {
          type: 'progress',
        },
        {
          type: 'status',
        },
        {
          type: 'calendar',
        },
        {
          type: 'clock',
        },
        {
          type: 'tips',
        },
        {
          type: 'triangle_up',
        },
        {
          type: 'text',
        },
        {
          type: 'close',
        },
        {
          type: 'spin',
        },
        {
          type: 'tabs',
        },
        {
          type: 'actionsheet',
        },
        {
          type: 'mask',
        },
        {
          type: 'view',
        },
        {
          type: 'charts',
        },
        {
          type: 'avatar',
        },
        {
          type: 'tag',
        },
        {
          type: 'author',
        },
        {
          type: 'button',
        },
        {
          type: 'card',
        },
        {
          type: 'badge',
        },
        {
          type: 'calendar-outline',
        },
        {
          type: 'animation',
        },
        {
          type: 'layout',
        },
        {
          type: 'form',
        },
        {
          type: 'location',
        },
        {
          type: 'cafe',
        },
        {
          type: 'heart_beat',
        },
        {
          type: 'wechat',
        },
        {
          type: 'camera',
        },
        {
          type: 'close_circle',
        },
        {
          type: 'heart',
        },
        {
          type: 'heart_filled',
        },
        {
          type: 'male',
        },
        {
          type: 'share',
        },
        {
          type: 'pay',
        },
        {
          type: 'checkbox',
        },
        {
          type: 'eyes',
        },
        {
          type: 'download',
        },
        {
          type: 'home',
        },
        {
          type: 'navigation',
        },
        {
          type: 'arrow_left',
        },
        {
          type: 'arrow_right',
        },
        {
          type: 'photos',
        },
        {
          type: 'link',
        },
        {
          type: 'set_filled',
        },
        {
          type: 'language',
        },
        {
          type: 'miniprogram',
        },
        {
          type: 'message',
        },
        {
          type: 'explore',
        },
      ],
      sizes: [
        {
          size: '30',
          name: 'size=30',
          type: 'wechat',
        },
        {
          size: '40',
          name: 'size=40',
          type: 'wechat',
        },
        {
          size: '50',
          name: 'size=50',
          type: 'wechat',
        },
      ],
      rotates: [
        {
          type: 'rotate',
          rotate: 90,
        },
        {
          type: 'rotate',
          rotate: 180,
        },
        {
          type: 'rotate',
          rotate: 270,
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
    return {
      title: 'Icons',
      path: 'pages/adui/icon/index',
    };
  },
  methods: {
    handleCurrentActive(item) {
      for (const row of [...this.icons, ...this.sizes, ...this.rotates]) {
        if (row.active) delete row.active;
      }
      item.active = true;
      this.$forceUpdate();
      this.handleCommonCopy(`${item.type}已复制`, true, 'none');
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
