<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'avatar' ]">
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>圆角类型</text>
        </template>
        <view
          v-for="(row,index) in types"
          :key="index"
          class="item item-right"
        >
          <ad-avatar
            :image="app.gallery[index]"
            :shape="row.type"
            :shadow="attrs.shadow"
          >
          </ad-avatar>
          <text>{{ row.name }}</text>
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
          <text>尺寸大小</text>
        </template>
        <view
          v-for="(row,index) in sizes"
          :key="index"
          class="item item-right"
        >
          <ad-avatar
            :image='app.gallery[index]'
            :size='row.type'
            :shadow="attrs.shadow"
          >
          </ad-avatar>
           <text>{{ row.name }}</text>
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
          <text>搭配图标</text>
        </template>
        <view class="item item-right">
          <ad-avatar icon='cafe' :shadow="attrs.shadow"/>
        </view>
        <view class="item item-right">
          <ad-avatar icon='pay' icon-color="#fff" :avatar-bg="colors[0]" :shadow="attrs.shadow" />
        </view>
        <view class="item item-right">
          <ad-avatar icon='pay' icon-size="36" icon-color="#fff" :avatar-bg="colors[1]" :shadow="attrs.shadow" />
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
          <text>搭配文字</text>
        </template>
        <view class="item item-right">
          <ad-avatar :shadow="attrs.shadow">T</ad-avatar>
        </view>
        <view class="item item-right">
          <ad-avatar :shadow="attrs.shadow" avatar-bg="#2db7f5">M</ad-avatar>
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
          <text>渐变色背景</text>
        </template>
        <view
          v-for="(row,index) in gradients"
          :key="index"
          class="item"
        >
          <ad-avatar
            icon='cafe'
            :shadow="attrs.shadow"
            :avatar-bg="row"
          >
          </ad-avatar>
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
          <text>是否显示阴影</text>
          <switch :checked="attrs.shadow" @change="val=>handleCommonSwitch(val,'shadow')"/>
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>
  import app from '@/config';

  export default {
    data() {
      return {
        attrs: {
          shadow: false,
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
        types: [
          {
            type: 'circle',
            name: '默认'
          },
          {
            type: 'square',
            name: '直角'
          }
        ],
        colors: app.theme.colors,
        gradients: app.gradients.slice(0,5),
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
        title: 'Avatar',
        path: 'pages/adui/basic/avatar/index',
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
