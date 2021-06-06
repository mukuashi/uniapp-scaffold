<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'tips' ]">
    <section v-for="(item,index) in tips.list" :key="index">
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>{{item.name}}</text>
        </template>
        <ad-button
          type="success"
          @on-click="handleCommonSwitch(true,index)"
          @on-click="handleTipsOpen(true,index)"
        >{{ item.btn }}</ad-button>
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
          <text>提示浮层位置</text>
          <radio-group @change="val=>handleCommonSwitch(val,'position')">
            <label
              v-for="(row,index) in positions"
              :key="index"
            >
              <radio :value="row.type" :checked="row.type === tips.list[tips.current].position" />
              <text>{{row.name}}</text>
            </label>
          </radio-group>
        </view>
      </ad-card>
    </section>
    <ad-tips
      v-model="tips.list[tips.current].value"
      :position="tips.list[tips.current].position"
      :type="tips.list[tips.current].type"
      :desc="tips.list[tips.current].desc"
    />
  </view>
</template>

<script>
// tips初始化配置
const initValue = {
  value: false,
  type: 'primary',
  position: 'bottom',
  desc: '欢迎参观我们的小程序实验室'
}

export default {
  data() {
    return {
      initValue,
      tips: {
        current: 0,
        list: [
          {
            name: '基本使用',
            btn: '复合模式',
            value: true
          }
        ]
      },
      positions: [
        {type: 'top', name: '顶部'},
        {type: 'center', name: '居中'},
        {type: 'bottom', name: '底部'}
      ]
    };
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
      title: 'Tips',
      path: 'pages/adui/interact/tips/index',
    };
  },
  methods: {
    init(value, type) {
      for (const [index, item] of this.tips.list.entries()) {
        this.tips.list[index] = {
          ...this.initValue,
          ...item
        }
        if (type) {
          this.tips.list[index][type] = value
        }
      }
    },
    handleTipsOpen(val, index) {
      if (index !== undefined) this.tips.current = index
      this.$set(this.tips.list[this.tips.current], 'switch', val)
      this.$forceUpdate()
    },
    handleTipsClose(val) {
      const {current} = this.tips
      this.tips.list[current].switch = val
      this.$forceUpdate()
      this.tips.list[this.tips.current].value = val
    },
    handleCommonSwitch(e, type) {
      const {value} = e.detail
      this.initValue[type] = value
      this.init(value, type)
      if (['position', 'opacity'].includes(type)) {
        if (['position'].includes(type)) {
          uni.vibrateShort()
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>

