<template>
  <article :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'navbar' ]">
    <header>
      <ad-navbar
        v-if="navbar.left||navbar.title"
        :fixed="navbar.fixed"
        :color="color"
        :bg-image="bgImage"
        :bg-color="bgColor"
        :left="lefts"
        :title="app.name"
      >
        <block
          slot="left"
          class="navbar-left"
          @tap="feedback.home=true"
        >
          <open-data v-if="navbar.left" type="userAvatarUrl" />
        </block>
        <block
          slot="title"
          class="navbar-title"
        >
          <picker
            v-if="navbar.title"
            :value="city.current"
            :range="city.list"
            @change="val=>handleSwitchChange(val,'cityName')"
          >
            <ad-button
              shape="circle"
              :type="(bgColor || bgImage) ? 'ghost' : 'default'"
              :icon-color="app.theme.success"
              plain
            >
              {{ city.list[city.current] }}
              <ad-icon type="arrow_right" rotate="90" />
            </ad-button>
          </picker>
        </block>
      </ad-navbar>
      <ad-navbar
        v-else
        :fixed="navbar.fixed"
        :color="color"
        :bg-image="bgImage"
        :bg-color="bgColor"
        :left="lefts"
        :title="app.name"
      />
    </header>
    <footer>
      <ad-card :bordered="false">
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>个性化</text>
        </template>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>自定义背景纯色</text>
          <switch :checked="navbar.bgColor" @change="val=>handleSwitchChange(val,'bgColor')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>自定义背景渐变色</text>
          <switch :checked="navbar.bgImage" @change="val=>handleSwitchChange(val,'bgImage')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>自定义左侧内容区</text>
          <switch :checked="navbar.left" @change="val=>handleSwitchChange(val,'left')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>自定义中间内容区</text>
          <switch :checked="navbar.title" @change="val=>handleSwitchChange(val,'title')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否固定顶部</text>
          <switch :checked="navbar.fixed" @change="val=>handleSwitchChange(val,'fixed')"/>
        </view>
      </ad-card>
    </footer>
    <ad-actionsheet
      v-model="feedback.home"
      tips="您确定要退出当前页面？"
      @confirm="handleCommonRoute('../../../home/index',true)"
    />
  </article>
</template>

<script>

import { getRandomItem } from '@/utils';

export default {
  data() {
    return {
      navbar: {
        fixed: false,
        left: false,
        title: false,
        bgColor: false,
        bgImage: false,
      },
      lefts: {
        tabBar: true,
      },
      city: {
        list: ['北京', '上海', '广州', '深圳'],
        current: 0,
      },
      feedback: {
        home: false,
      },
    };
  },
  computed: {
    color() {
      const { bgColor, bgImage } = this.navbar;
      return (bgColor || bgImage) ? '#fff' : '#000';
    },
    bgColor() {
      return this.navbar.bgColor && this.app.theme[getRandomItem(['default', 'success', 'info', 'warning', 'error'])];
    },
    bgImage() {
      return this.navbar.bgImage && getRandomItem(this.app.gradients);
    },
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
      title: 'Navbar',
      path: 'pages/adui/views/navbar/index',
    };
  },
  methods: {
    handleSwitchChange(e, type) {
      const { value } = e.detail;
      switch (type) {
        case 'cityName':
          this.city.current = value;
          break;
        default:
          this.navbar[type] = value;
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
