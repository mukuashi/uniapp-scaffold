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
        <view class="row">
          <ad-button type="success" @click.native="value = true">单日期模式</ad-button>
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
          <text>自定义时间范围</text>
        </template>
        <view class="row">
          <ad-button type="success" @click.native="handleShowCalendar('range')"> 日期段模式</ad-button>
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
          <text>自定义时间段文本</text>
        </template>
        <view class="row">
          <ad-button type="success" @click.native="handleShowCalendar('buttontext')"> 文本模式</ad-button>
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
          <text>自定义标题</text>
        </template>
        <view class="row">
          <ad-button type="success" @click.native="handleShowCalendar('dateText')">标题模式</ad-button>
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
          <text>主题</text>
          <picker :value="colorIndex" :range="theme" range-key="name" @change="val=>handleCommonSwitch(val,'activeBgColor')">
            <ad-tag :bg-color="initValue.activeBgColor" color="#fff" size="large">{{theme[colorIndex].name}}</ad-tag>
          </picker>
        </view>
      </ad-card>
    </section>

    <ad-calendar
      v-model="value"
      :mode="initValue.mode"
      :start-text="initValue.startText"
      :end-text="initValue.endText"
      :tool-tip="initValue.toolTip"
      :active-bg-color="initValue.activeBgColor"
      @close="init"
    />
  </view>
</template>
<script>
  import app from '@/config';
  const initValue = {
    mode: 'date',
    startText: '开始',
    endText: '结束',
    toolTip: '选择日期',
  };
  export default {
    data() {
      return {
        initValue: {
          ...initValue,
          activeBgColor: app.theme.default,
        },
        calendar: {
          range: {
            mode: 'range',
          },
          color: {
            mode: 'range',
            activeBgColor: app.theme.wechat,
            default: app.theme.wechat,
          },
          buttontext: {
            mode: 'range',
            startText: '入住',
            endText: '离店',
          },
          dateText: {
            toolTip: '自定义日期文案',
          },
        },
        value: false,
      };
    },
    computed: {
      theme() {
        const { default: primary, success, info, error } = this.app.theme
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
            name: 'error',
            value: error
          },
          {
            name: '#f09819',
            value: '#f09819'
          },
          {
            name: '#fb3c8f',
            value: '#fb3c8f'
          },
        ]
      },
      colorIndex() {
        return this.theme.findIndex(row => row.value === this.initValue.activeBgColor)
      }
    },
    onLoad(options) {
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
        title: 'Tag',
        path: 'pages/adui/form/calendar/index',
      };
    },
    methods: {
      init() {
        for (const key in initValue) {
          this.initValue[key] = initValue[key];
        }
      },
      handleCommonSwitch(e, type) {
        this.initValue[type] = this.theme[e.detail.value].value;
      },
      handleShowCalendar (name) {
        for (const key in this.calendar[name]) {
          this.initValue[key] = this.calendar[name][key];
        }
        this.value = true;
      },
    },
  };
</script>
<style lang="scss" scoped src="./index.scss"></style>
