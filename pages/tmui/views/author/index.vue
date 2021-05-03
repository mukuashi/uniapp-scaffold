<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'author' ]">
    <section>
      <tm-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <tm-badge dot :bg-gradient='gradient' />
          <text>默认</text>
        </template>
        <view class="column">
          <tm-author
            :padding='false'
            :avatar="app.gallery[0]"
            title="爱喝美式的小野"
            desc="自律给你自由，ACE认证教练"
          />
        </view>
        <view class="column">
          <tm-author
            :padding='false'
            title="我不需要头像"
            desc="自律给你自由，知名社区健身博主"
          />
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
          <text>支持点击跳转</text>
        </template>
        <view>
          <tm-author
            :padding='false'
            :avatar="app.gallery[0]"
            title="爱喝美式的小野"
            desc="自律给你自由，ACE认证教练"
            navigator="../index"
            extra
          />
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
          <text>自定义导航区</text>
        </template>
        <view>
          <tm-author
            :padding='false'
            :avatar="app.gallery[3]"
            title="lululemon"
            desc="与你一种健康的生活方式"
          >
          <tm-button
            slot='extra'
            :type="attrs.follow ? 'default' : 'success'"
            @tap='handleAuthorFollow'
          >{{ `${ attrs.follow ? '已' : ''}关注` }}
          </tm-button>
          </tm-author>
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
          <text>自定义图标</text>
        </template>
        <view
          v-for="(row,index) in icons"
          :key="index"
          class="column"
        >
          <tm-author
            :padding='false'
            :icon="row.icon"
            :avatar-bg='row.avatar_bg'
            :desc="row.desc"
            :navigator="row.url"
            :extra='row.extra'
            title="我是可以跳转的标题"
          />
        </view>
      </tm-card>
    </section>
  </view>
</template>

<script>
import app from '@/config';
import { getRandomItem } from "@/utils";

export default {
  data() {
    return {
      attrs: {
        shadow: false,
        follow: false
      },
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
      icons: [
        {
          icon: 'button',
          extra: 'wechat',
          desc: '这是一条button组件的入口',
          url: '../../basic/button/index'
        },
        {
          icon: 'card',
          extra: 'miniprogram',
          desc: '这是一条card组件的入口',
          url: '../../basic/card/index'
        },
        {
          icon: 'avatar',
          avatar_bg: getRandomItem(app.gradients),
          extra: {
            icon: 'avatar',
            color: app.theme.error
          },
          desc: '这是一条avatar组件的入口',
          url: '../../basic/avatar/index'
        },
      ]
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
      title: 'Author',
      path: 'pages/tmui/views/author/index',
    };
  },
  methods: {
    handleCommonSwitch(e,type) {
      this.attrs[type] = e.detail.value
      if(['shape'].includes(type)) {
        uni.vibrateShort()
      }
    },
    handleAuthorFollow(e) {
      const { follow } = this.attrs
      this.attrs.follow = !follow
    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
