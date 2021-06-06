<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list` ]">
    <section>
      <ad-card 
        :bordered="false"
        :class-name='[`${app.prefix}ui-card-bottom`]'
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>基本使用</text>
        </template>
        <view
          class="item item-bottom item-block"
          v-for="(row,index) in progress.types"
          :key="index"
        >
          <text>{{ row }}</text>
          <ad-progress 
            :percent="`${index*10+30}`"
            :round='progress.round'
            :show-percent='progress.showPercent'
            :active-animate='progress.activeAnimate'
            :height='progress.height'
            :striped='progress.striped'
            :status='row'
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
          <text>自定义激活背景纯色</text>
        </template>
        <view>
          <ad-progress 
            percent=66
            :round='progress.round'
            :show-percent='progress.showPercent'
            :active-animate='progress.activeAnimate'
            :height='progress.height'
            :active-color='app.theme.info'
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
          <text>自定义激活背景渐变色</text>
        </template>
        <view>
          <ad-progress 
            percent=80
            :round='progress.round'
            :show-percent='progress.showPercent'
            :active-animate='progress.activeAnimate'
            :height='progress.height'
            :active-color='progress.gradient'
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
          <text>自定义比例区</text>
        </template>
        <view>
          <ad-progress 
            percent=60
            status='success'
            :round='progress.round'
            :show-percent='progress.showPercent'
            :active-animate='progress.activeAnimate'
            :height='progress.height'
            :striped='progress.striped'
          >
          <text>60%</text>
          <view :class="[`${app.prefix}ui-flex`]">
            <text>10%</text>
            <ad-icon 
              type='triangle_up' 
              :color='app.theme.success' 
            />
          </view>
          </ad-progress>
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
          <text>是否带圆角</text>
          <switch :checked="progress.round" @change="val=>handleCommonSwitch(val,'round')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否展示进度比例</text>
          <switch :checked="progress.showPercent" @change="val=>handleCommonSwitch(val,'showPercent')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否展示激活态过渡色动画</text>
          <switch :checked="progress.activeAnimate" @change="val=>handleCommonSwitch(val,'activeAnimate')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否展示激活色条纹(纯色背景)</text>
          <switch :checked="progress.striped" @change="val=>handleCommonSwitch(val,'striped')"/>
        </view>
        <view :class="[ `${app.prefix}ui-item`,`${app.prefix}ui-item-margin` ]">
          <text>进度条高度自定义</text>
          <slider
            show-value
            :value="progress.height"
            min=1
            max=50
            step=1
            @change="val=>handleCommonSwitch(val,'height')"
          />
        </view>
      </ad-card>
    </section>
  </view>
</template>

<script>
import { getRandomItem } from '@/utils';

export default {
  data() {
    const { gradients } = this.$store.state.app
    return {
      progress: {
        round: false,
        showPercent: true,
        activeAnimate: true,
        height: 24,
        striped: false,
        gradient: getRandomItem(gradients).replace('bottom','right'),
        types: [
          'default','success','error','warning'
        ]
      }
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
      title: 'Progress',
      path: 'pages/adui/basic/progress/index',
    };
  },
  methods: {
    handleCommonSwitch(e, type) {
      const { value } = e.detail
      this.progress[type] = value
      if (['height'].includes(type)) {
        uni.vibrateShort();
      }
    },
  },
}
</script>
<style lang="scss" scoped src="./index.scss"></style>
