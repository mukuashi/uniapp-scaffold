<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'badge' ]">
    <section>
      <tm-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <tm-badge dot :bg-gradient='gradient' />
          <text>主题风格</text>
        </template>
        <view
          v-for="(row,index) in types"
          :key="index"
          class="item"
        >
          <tm-badge :type="row.type" :dot="attrs.dot">
            <text v-if="!attrs.dot">{{row.name}}</text>
          </tm-badge>
        </view>
      </tm-card>
    </section>
    <section>
      <tm-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <tm-badge dot :bg-gradient='gradient' />
          <text>尺寸大小</text>
        </template>
        <view
          v-for="(row,index) in sizes"
          :key="index"
          class="item"
        >
          <tm-badge :size='row.type' :dot="attrs.dot">
            <text v-if="!attrs.dot">{{row.name}}</text>
          </tm-badge>
        </view>
      </tm-card>
    </section>
    <section>
      <tm-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <tm-badge dot :bg-gradient='gradient' />
          <text>自定义背景色</text>
        </template>
        <view
          v-for="(row,index) in colors"
          :key="index"
          class="item"
        >
          <tm-badge :bgColor='row' color="#fff" :dot="attrs.dot">
            <text v-if="!attrs.dot">99</text>
          </tm-badge>
        </view>
      </tm-card>
    </section>
    <section>
      <tm-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <tm-badge dot :bg-gradient='gradient' />
          <text>自定义背景渐变色</text>
        </template>
        <view
          v-for="(row,index) in gradients.slice(0,8)"
          :key="index"
          class="item"
        >
          <tm-badge :bg-gradient="row" :bgColor='colors[0]' color="#fff" :dot="attrs.dot">
            <text v-if="!attrs.dot">99</text>
          </tm-badge>
        </view>
      </tm-card>
    </section>
    <section>
      <tm-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <tm-badge dot :bg-gradient='gradient' />
          <text>个性化</text>
        </template>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否是圆点</text>
          <switch :checked="attrs.dot" @change="val=>handleCommonSwitch(val,'dot')"/>
        </view>
      </tm-card>
    </section>
  </view>
</template>
<script>
  import app from '@/config';

  export default {
    data() {
      return {
        attrs: {
          dot: false,
        },
        types: [
          {
            type: 'default',
            name: '99'
          },
          {
            type: 'primary',
            name: '99'
          },
          {
            type: 'warning',
            name: '99'
          },
          {
            type: 'error',
            name: '99'
          }
        ],
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
        colors: app.theme.colors,
        gradients: app.gradients,
      };
    },
    onLoad(options) {
      console.log(options);
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
        title: 'Badge',
        path: 'pages/tmui/basic/badge/index',
      };
    },
    methods: {
      handleCommonSwitch(e,type) {
        this.attrs[type] = e.detail.value
        if(['shape'].includes(type)) {
          uni.vibrateShort()
        }
      }
    },
  };
</script>
<style lang="scss" scoped src="./index.scss"></style>
