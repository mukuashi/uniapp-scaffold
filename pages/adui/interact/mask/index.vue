<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'mask' ]">
    <section v-for="(item,index) in mask.list" :key="index">
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
          @on-click="handleMaskOpen(true,index)"
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
          <text>是否需要默认关闭图标</text>
          <switch :checked="initValue.showCloseIcon" @change="val=>handleCommonSwitch(val,'showCloseIcon')" />
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>蒙层锁定且自定义关闭</text>
          <switch :checked="initValue.locked" @change="val=>handleCommonSwitch(val,'locked')" />
        </view>
        <view :class="[ `${app.prefix}ui-item`,`${app.prefix}ui-item-margin` ]">
          <text>蒙层透明度自定义</text>
          <slider
            show-value
            :value="initValue.opacity"
            min=0.1
            max=1
            step=0.1
            @change="val=>handleCommonSwitch(val,'opacity')"
          />
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>蒙层内容区位置</text>
          <radio-group @change="val=>handleCommonSwitch(val,'position')">
          <label
            v-for="(row,index) in positions"
            :key="index"
          >
            <radio :value="row.type" :checked="row.type === mask.list[mask.current].position" />
            <text>{{row.name}}</text>
          </label>
        </radio-group>
        </view>
      </ad-card>
    </section>
    <ad-mask
      v-model="mask.list[mask.current].switch"
      :opacity="mask.list[mask.current].opacity"
      :position="mask.list[mask.current].position"
      :locked="mask.list[mask.current].locked"
      :show-close-icon="mask.list[mask.current].showCloseIcon"
      :custom-style="mask.list[mask.current].customStyle"
      @close="handleMaskClose"
    >
      <view class="mask-content">
        <h1>尼采经典语录</h1>
        <p>每一个不曾起舞的日子，都是对生命的辜负。</p>
        <image mode='widthFix' :src='app.gallery[1]' />
        <ad-icon
          class="close"
          type="close"
          size=38
          @click="handleMaskClose"
          v-if="initValue.locked"
        />
      </view>
    </ad-mask>
  </view>
</template>

<script>
// mask 初始化配置
const initValue = {
  switch: false,
  position: 'center',
  opacity: 0.6,
  showCloseIcon: true
}

export default {
  data() {
    return {
      initValue,
      mask: {
        current: 0,
        list: [
          {
            name: '基本使用',
            btn: '复合模式',
            switch: true
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
      title: 'Mask',
      path: 'pages/adui/interact/mask/index',
    };
  },
  methods: {
    init(value,type) {
      for (const [index, item] of this.mask.list.entries()) {
        this.mask.list[index] = {
          ...this.initValue,
          ...item
        }
        if(type) {
          this.mask.list[index][type] = value
        }
      }
    },
    handleMaskOpen(val,index) {
      if(index !== undefined) this.mask.current = index
      this.$set(this.mask.list[this.mask.current],'switch',val)
      this.$forceUpdate()
    },
    handleMaskClose(val) {
      const { current } = this.mask
      this.mask.list[current].switch = val
      this.$forceUpdate()
    },
    handleCommonSwitch(e,type) {
      const { value } = e.detail
      this.initValue[type] = value
      this.init(value,type)
      if(['position','opacity'].includes(type)) {
        uni.vibrateShort()
      }
    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
