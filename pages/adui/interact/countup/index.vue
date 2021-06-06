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
        <view
          class="item"
        >
          <ad-countup
            v-model="countup.value"
            :font-weight="countup.fontWeight"
            :duration="countup.duration"
            :autoplay="countup.autoplay"
          />
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered="false">
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>自定义前缀</text>
        </template>
        <view class="item">
          <ad-countup
            prefix="美元："
            :font-weight="countup.fontWeight"
            value="999"
            :autoplay="countup.autoplay"
            :duration="countup.duration"/>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered="false">
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>自定义后缀</text>
        </template>
        <view class="item">
          <ad-countup
            suffix="$"
            :font-weight="countup.fontWeight"
            value="999"
            :autoplay="countup.autoplay"
            :duration="countup.duration"/>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered="false">
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>个性化</text>
        </template>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>字体是否加粗</text>
          <switch :checked="countup.fontWeight" @change="val=>handleCommonSwitch(val,'fontWeight')"/>
        </view>
        <view :class="[ `${app.prefix}ui-item`,`${app.prefix}ui-item-margin` ]">
          <text>自定义动画时长(毫秒/ms)</text>
          <slider
            show-value
            :value="countup.duration"
            min="100"
            max="10000"
            step="100"
            @change="val=>handleCommonSwitch(val,'duration')"
          />
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>

export default {
  data() {
    return {
      countup: {
        value: 1888,
        duration: 2000,
        autoplay: true,
        fontWeight: false,
      },
      sizes: [
        {
          type: 'small',
          name: '小号',
        },
        {
          type: 'default',
          name: '默认',
        },
        {
          type: 'large',
          name: '大号',
        },
      ],
      renderer: true,
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
      title: 'Countup',
      path: 'pages/adui/interact/countup/index',
    };
  },
  methods: {
    handleCommonSwitch(e, type) {
      const { value } = e.detail;
      this.countup[type] = value;
      if (['duration'].includes(type)) {
        uni.vibrateShort();
        this.countup.autoplay = false;
        setTimeout(() => {
          this.countup.autoplay = true;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
