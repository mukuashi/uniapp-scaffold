<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list` ]">
    <section>
      <ad-card :bordered="false">
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>基本使用</text>
        </template>
        <view class="item">
          <ad-text-animate
            v-if="textAnimate.autoplay"
            :color="textAnimate.color"
            :speed="textAnimate.speed"
            :animation="textAnimate.animation"
            :weight="textAnimate.fontWeight"
            :size="textAnimate.size"
            content="我是一棵小树 妈妈是一只大鸟 大鸟飞去远方 小树慢慢长大 等大鸟回来了 小树给它一个家"/>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>个性化</text>
        </template>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>字体是否加粗</text>
          <switch :checked="textAnimate.fontWeight" @change="val=>handleCommonSwitch(val,'fontWeight')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>主题</text>
          <picker :value="colorIndex" :range="theme" range-key="name" @change="val=>handleCommonSwitch(val,'color')">
            <ad-tag :bg-color="textAnimate.color" color="#fff" size="large">{{theme[colorIndex].name}}</ad-tag>
          </picker>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>动画类型</text>
          <picker :value="textAnimateIndex" :range="app.animations" @change="val=>handleCommonSwitch(val,'animation')">
            <text>{{textAnimate.animation}}</text>
          </picker>
        </view>
        <view :class="[ `${app.prefix}ui-item`,`${app.prefix}ui-item-margin` ]">
          <text>自定义动画时长(秒)</text>
          <slider
            show-value
            :value="textAnimate.speed"
            min=1
            max=5
            step=0.5
            @change="val=>handleCommonSwitch(val,'speed')"
          />
        </view>
        <view :class="[ `${app.prefix}ui-item`,`${app.prefix}ui-item-margin` ]">
          <text>自定义字体大小(px)</text>
          <slider
            show-value
            :value="textAnimate.size"
            min=12
            max=24
            step=2
            @change="val=>handleCommonSwitch(val,'size')"
          />
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>
import app from '@/config'

export default {
  data() {
    return {
      textAnimate: {
        fontWeight: false,
        color: app.theme.default,
        animation: 'fadeIn',
        speed: 1.5,
        size: 14,
        autoplay: true,
      },
    };
  },
  computed: {
    theme() {
      const { default: primary, success, info, error,warning } = this.app.theme
      return [
        {
          name: 'primary',
          value: primary
        },
        {
          name: 'success',
          value: success
        },
        {
          name: 'info',
          value: info
        },
        {
          name: 'warning',
          value: warning
        },
        {
          name: 'error',
          value: error
        },
        {
          name: '#fb3c8f',
          value: '#fb3c8f'
        },
      ]
    },
    colorIndex() {
      return this.theme.findIndex(row => row.value === this.textAnimate.color)
    },
    textAnimateIndex() {
      return this.app.animations.findIndex(row => row === this.textAnimate.animation)
    }
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
      title: 'TextAnimate',
      path: 'pages/adui/interact/text-animate/index',
    };
  },
  methods: {
    handleCommonSwitch(e,type) {
      const { value } = e.detail

      // 重新播放
      const autoplay = () => {
        this.textAnimate.autoplay = false
        setTimeout(() => {
          this.textAnimate.autoplay = true
        })
      }

      switch (type){
        case 'color':
          this.textAnimate.color = this.theme[value].value
          break;
        case 'animation':
          this.textAnimate.animation = this.app.animations[value]
          autoplay()
          break;
        case 'speed':
          this.textAnimate.speed = value
          autoplay()
          break
        default:
          this.textAnimate[type] = value
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
