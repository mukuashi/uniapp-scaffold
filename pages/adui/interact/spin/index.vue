<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list` ]">
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>尺寸大小</text>
        </template>
        <view
          v-for="(row,index) in sizes"
          :key="index"
          class="item item-right"
        >
          <ad-spin :size="row.type"/>
          <text>{{row.name}}</text>
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
          <text>自定义加载文案</text>
        </template>
        <view
          v-for="(row,index) in sizes"
          :key="index"
          class="item item-right"
        >
          <ad-spin
            :size="row.type"
            :inline='spin.inline'
          >{{ `load${index+1}...` }}</ad-spin>
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
          <text>自定义加载图片</text>
        </template>
        <view
          v-for="(row,index) in app.loading.slice(0,3)"
          :key="index"
          class="item item-right"
        >
          <ad-spin
            :load-image="row"
            :load-image-size="80"
          />
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
          <text>自定义加载颜色</text>
        </template>
        <text v-if='spin.fix'>屏幕上会生成一个全屏loading</text>
        <view
          v-for="(row,index) in app.theme.colors.slice(0,3)"
          :key="index"
          class="item item-right"
        >
          <ad-spin
            :color="row"
            :fix='spin.fix'
          />
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
          <text>是否内敛模式</text>
          <switch :checked="spin.inline" @change="val=>handleCommonSwitch(val,'inline')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否全屏容器</text>
          <switch :checked="spin.fix" @change="val=>handleCommonSwitch(val,'fix')"/>
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>

export default {
  data() {
    return {
      spin: {
        inline: false,
        fix: false
      },
      sizes: [
        {
          type: 'small',
          name: '小号'
        },
        {
          type: 'default',
          name: '默认'
        },
        {
          type: 'large',
          name: '大号'
        }
      ],
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
      title: 'Spin',
      path: 'pages/adui/interact/spin/index',
    };
  },
  methods: {
    handleCommonSwitch(e,type) {
      this.spin[type] = e.detail.value
    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
