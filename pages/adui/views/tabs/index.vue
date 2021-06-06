<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'tabs' ]">
    <section v-for="(row,index) in tabs.list" :key="index">
      <ad-card :bordered="false">
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>{{ row.name }}</text>
        </template>
        <ad-tabs
          :list="row.value"
          :current="row.current"
          :show-bar="row.showBar"
          :vibrate-short="row.vibrateShort"
          :bar-style="row.barStyle"
          :active-color="activeColor"
          :bold="tabs.bold"
          :active-item-style="row.activeItemStyle"
          @change="handleTabsChange($event, row)"
        />
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
        <view
          :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]"
        >
          <text>主题风格</text>
          <picker :value="tabs.colorIndex" :range="tabs.types" @change="val=>handleCommonSwitch(val,'colorIndex')">
            <ad-tag :bg-color="activeColor" color="#fff" size="large">
              {{ tabs.types[ tabs.colorIndex ] }}
            </ad-tag>
          </picker>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>激活后是否加粗文本</text>
          <switch :checked="tabs.bold" @change="val=>handleCommonSwitch(val,'bold')" />
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>

const initValue = {
  showBar: false,
  vibrateShort: true,
};

export default {
  data() {
    return {
      initValue,
      tabs: {
        list: [
          {
            name: '默认类型',
            current: 0,
            value: [
              {
                name: '正在疯抢',
              },
              {
                name: '即将开始',
              },
            ],
          },
          {
            name: '是否带底部线条',
            current: 0,
            showBar: true,
            value: [
              {
                name: '正在疯抢',
              },
              {
                name: '即将开始',
              },
              {
                name: '明日预告',
              },
              {
                name: '未来计划',
              },
            ],
            barStyle: {
              bottom: '-4rpx',
            },
          },
          {
            name: '自定义滑块样式(支持滚动)',
            current: 0,
            value: [
              {
                name: '精选',
              },
              {
                name: '居家生活',
              },
              {
                name: '美食厨房',
              },
              {
                name: '服饰珠宝',
              },
              {
                name: '美妆洗护',
              },
              {
                name: '家用电器',
              },
              {
                name: '运动女装',
              },
            ],
            activeItemStyle: {
              borderRadius: '50rpx',
              color: '#fff',
            },
          },
        ],
        // 主题色
        types: ['default', 'success', 'warning', 'error', '#ff5acd'],
        colorIndex: 0,
        bold: true,
      },
    };
  },
  computed: {
    activeColor() {
      const { types, colorIndex } = this.tabs;
      return this.app.theme[types[colorIndex]] || types[colorIndex];
    },
  },
  created() {
    this.init();
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
      title: 'Tabs',
      path: 'pages/adui/views/tabs/index',
    };
  },
  methods: {
    init(value, type) {
      for (const [index, item] of this.tabs.list.entries()) {
        this.tabs[index] = {
          ...this.initValue,
          ...item,
        };
        if (index === 2) {
          this.tabs.list[2].activeItemStyle.backgroundColor = this.activeColor;
        }
      }
    },
    handleTabsChange(index, item) {
      item.current = index;
      this.$forceUpdate();
    },
    handleCommonSwitch(e, type) {
      const { value } = e.detail;
      this.tabs[type] = value;
      this.init(value, type);
      if (['colorIndex'].includes(type)) {

      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
