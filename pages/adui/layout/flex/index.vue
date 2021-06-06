<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'flex' ]">
    
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
          <text>布局方向</text>
          <radio-group @change="val=>handleCommonSwitch(val,'shape')">
            <label
              v-for="(row,index) in shapes"
              :key="index"
            >
              <radio :value="row.type" :checked="row.type === button.shape" />
              <text>{{row.name}}</text>
            </label>
          </radio-group>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>垂直居中</text>
          <switch :checked="flex.round" @change="val=>handleCommonSwitch(val,'round')"/>
        </view>
         <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>水平居中</text>
          <switch :checked="flex.round" @change="val=>handleCommonSwitch(val,'round')"/>
        </view>
      </ad-card>
    </section>
  </view>
</template>

<script>

export default {
  data() {
    return {
      directions: [
        {
          type: 'row',
          name: '横向'
        },
        {
          type: 'clumn',
          name: '纵向'
        }
      ],
      flex: {
        direction: 'row'
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
      title: 'Flex',
      path: 'pages/adui/layout/flex/index',
    };
  },
  methods: {
    handleCommonSwitch() {

    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
