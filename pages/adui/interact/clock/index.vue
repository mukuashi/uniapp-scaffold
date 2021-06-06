<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'clock' ]">
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>基本使用</text>
        </template>
        <ad-clock 
          :time='clock.time' 
          :days='clock.days'
          :hours='clock.hours'
          :minutes='clock.minutes'
          :seconds='clock.seconds'
          :millisecond='clock.millisecond'
          :bordered='clock.bordered'
          :separator='clock.separator'
        />
      </ad-card>
    </section>
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>自定义主题色</text>
        </template>
        <view class="item">
          <ad-clock
            :time='clock.time' 
            :days='clock.days'
            :hours='clock.hours'
            :minutes='clock.minutes'
            :seconds='clock.seconds'
            :millisecond='clock.millisecond'
            :bordered='clock.bordered'
            :separator='clock.separator'
            :background-color='activeColor'
            :colon-color='activeColor'
            :border-color='activeColor'
            color='#fff'
            ms-color='#fff'
          />
        </view>
        <view class="item">
          <ad-clock
            :time='clock.time' 
            :days='clock.days'
            :hours='clock.hours'
            :minutes='clock.minutes'
            :seconds='clock.seconds'
            :millisecond='clock.millisecond'
            :bordered='clock.bordered'
            :separator='clock.separator'
            :background-color='transparent'
            :colon-color='activeColor'
            :border-color='activeColor'
            :color='activeColor'
            :ms-color='activeColor'
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
        <view 
          :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]"
        >
          <text>主题风格</text>
          <picker :value="clock.colorIndex" :range="clock.types" @change="val=>handleCommonSwitch(val,'colorIndex')">
            <ad-tag :bg-color="activeColor" color="#fff" size="large">
              {{ clock.types[ clock.colorIndex ] }}
            </ad-tag>
          </picker>
        </view>
        <view 
          :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]"
          v-for="(row,index) in clock.list"
          :key='index'
        >
          <text>{{ row.name }}</text>
          <switch :checked="clock[row.type]" @change="val=>handleCommonSwitch(val,row.type)" />
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>分隔符类型</text>
          <radio-group @change="val=>handleCommonSwitch(val,'separator')">
            <label
              v-for="(row,index) in clock.divides"
              :key="index"
            >
              <radio :value="row.type" :checked="row.type === clock.separator" />
              <text>{{row.name}}</text>
            </label>
          </radio-group>
        </view>
      </ad-card>
    </section>
  </view>
</template>

<script>

export default {
  data() {
    return {
      clock: {
        time: 7 * 24 * 60 * 60, // 秒
        days: true, // 是否展示天数
        hours: true, // 是否展示小时
        minutes: true, // 是否展示分钟
        seconds: true, // 是否展示秒
        millisecond: false, // 是否展示毫秒
        bordered: true, // 是否带边框
        list: [
          {
            name: '是否带边框',
            type: 'bordered'
          },
          {
            name: '是否展示天数',
            type: 'days'
          },
          {
            name: '是否展示小时',
            type: 'hours'
          },
          {
            name: '是否展示分钟',
            type: 'minutes'
          },
          {
            name: '是否展示秒',
            type: 'seconds'
          },
          {
            name: '是否展示毫秒',
            type: 'millisecond'
          }
        ],
        separator: 'colon', // 分隔符类型，默认冒号
        divides: [
          {
            type: 'colon',
            name: '冒号'
          },
          {
            type: 'dhms',
            name: '日时分秒'
          }
        ],
        // 主题色
        types: [ 'default','success','warning','error','#ff5acd' ],
        colorIndex: 0
      }
    };
  },
  computed: {
    activeColor() {
      const { types,colorIndex } = this.clock
      return this.app.theme[types[colorIndex]] || types[colorIndex]
    }
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
      title: 'Clock',
      path: 'pages/adui/interact/clock/index',
    };
  },
  methods: {
    handleCommonSwitch(e,type) {
      const { value } = e.detail
      this.clock[type] = value
    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
