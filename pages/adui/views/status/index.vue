<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`, 'status' ]">
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>基本使用</text>
        </template>
        <ad-status 
          v-model="status.value"
          :type='status.type'
          :fix='status.fix'
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
          <text>自定义文案及操作按钮</text>
        </template>
        <ad-status 
          v-model="status.value"
          :type='status.type'
          :fix='status.fix'
          button-text='返回首页'
          button-type='success'
          :navigator="{
            path: '../../../home/index',
            type: 'switchTab'
          }"
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
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>状态展示类型</text>
          <radio-group @change="val=>handleCommonSwitch(val,'type')">
            <label
              v-for="(row,index) in types"
              :key="index"
            >
              <radio :value="row" :checked="row === status.type" />
              <text>{{ row }}</text>
            </label>
          </radio-group>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否全屏容器</text>
          <switch :checked="status.fix" @change="val=>handleCommonSwitch(val,'fix')"/>
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>

export default {
  data() {
    return {
      status: {
        value: true,
        fix: false,
        type: 'data',
      },
      types: [ 'data','auth','error' ],
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
      title: 'Status',
      path: 'pages/adui/views/status/index',
    };
  },
  methods: {
    handleCommonSwitch(e, type) {
      const { value } = e.detail;
      this.status[type] = value;
      if(['type'].includes(type)) {
        uni.vibrateShort()
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
