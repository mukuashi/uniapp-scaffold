<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'button' ]">
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>主题风格</text>
        </template>
        <view
          v-for="(row,index) in types"
          :key="index"
          class="item item-bottom"
        >
          <ad-button
            :type="row.type"
            :plain="button.plain"
            :shape="button.shape"
            :loading="button.loading"
            :disabled="button.disabled"
          >
            {{ row.name }}
          </ad-button>
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
          <text>尺寸大小</text>
        </template>
        <view
          v-for="(row,index) in sizes"
          :key="index"
          class="item"
        >
          <ad-button
            :size="row.type"
            :type="actives.type"
            :plain="button.plain"
            :shape="button.shape"
            :loading="button.loading"
            :disabled="button.disabled"
          >
            {{ row.name }}
          </ad-button>
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
          <text>搭配图标</text>
        </template>
        <view
          v-for="(row,index) in types.filter(kk=>['primary','success'].includes(kk.type))"
          :key="index"
          class="item"
        >
          <ad-button
            icon="cafe"
            :type="row.type"
            :plain="button.plain"
            :shape="button.shape"
            :loading="button.loading"
            :disabled="button.disabled"
          >
            {{ row.name }}
          </ad-button>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>自定义背景色</text>
        </template>
        <view
          v-for="(row,index) in app.theme.colors.slice(0,5)"
          :key="index"
          class="item item-bottom"
        >
          <ad-button
            color="#fff"
            type="ghost"
            :bg-color="row"
            :plain="button.plain"
            :shape="button.shape"
            :loading="button.loading"
            :disabled="button.disabled"
          >
            {{ `${row}` }}
          </ad-button>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>渐变背景</text>
        </template>
        <view
          v-for="(row,index) in app.gradients.slice(0,6)"
          :key="index"
          class="item item-bottom"
        >
          <ad-button
            :type="actives.type"
            :bg-image="row"
            :plain="button.plain"
            :shape="button.shape"
            :loading="button.loading"
            :disabled="button.disabled"
          >
            {{ `渐变${index+1}` }}
          </ad-button>
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
          <text>个性化</text>
        </template>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否镂空透明</text>
          <switch :checked="button.plain" @change="val=>handleCommonSwitch(val,'plain')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否带loading</text>
          <switch :checked="button.loading" @change="val=>handleCommonSwitch(val,'loading')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否禁用</text>
          <switch :checked="button.disabled" @change="val=>handleCommonSwitch(val,'disabled')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>圆角类型</text>
          <radio-group @change="val=>handleCommonSwitch(val,'shape')">
            <label
              v-for="(row,index) in shapes"
              :key="index"
            >
              <radio :value="row.type" :checked="row.type === button.shape" />
              <text>{{ row.name }}</text>
            </label>
          </radio-group>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>自定义背景图</text>
        </template>
        <view
          v-for="(row,index) in bgImages"
          :key="index"
          class="item item-bottom"
        >
          <ad-button
            :type="actives.type"
            :bg-image="row"
            :plain="button.plain"
            :shape="button.shape"
            :loading="button.loading"
            :disabled="button.disabled"
          >
            {{ `背景图${index+1}` }}
          </ad-button>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>自定义大小（长*宽）</text>
        </template>
        <view
          v-for="(row,index) in cusSizes"
          :key="index"
          class="item item-bottom"
        >
          <ad-button
            :width="row.width"
            :height="row.height"
            :type="actives.type"
            :plain="button.plain"
            :shape="button.shape"
            :loading="button.loading"
            :disabled="button.disabled"
          >
            {{ `${row.width}rpx * ${row.height}rpx` }}
          </ad-button>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card
        :bordered="false"
        :class-name="[`${app.prefix}ui-card-bottom`]"
      >
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient="gradient" />
          <text>开放能力</text>
        </template>
        <view class="user">
          <ad-author
            v-if="userInfo.nickName"
            :avatar="userInfo.avatarUrl"
            :title="userInfo.nickName"
            :desc="userInfo.address"
          />
        </view>
        <view
          v-for="(row,index) in opens"
          :key="index"
          class="item item-bottom item-half"
        >
          <ad-button
            :type="types[index].type"
            :opentype="row.type"
            :plain="button.plain"
            :shape="button.shape"
            :loading="button.loading"
            :disabled="button.disabled"
            @tap="handleUserProfile"
          >
            {{ row.name }}
          </ad-button>
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 基础组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-01 // Initial version.
 * @Date:   2021-03-01 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-03 21:24:18
 */
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      button: {
        disabled: false, // 是否禁用
        loading: false, // 名称前是否带 loading 图标
        plain: false, // 按钮是否镂空，背景色透明
        shape: 'default', // 圆角风格
        opentype: null, // 默认不使用微信开放能力
      },
      shapes: [
        {
          type: 'default',
          name: '默认',
        },
        {
          type: 'circle',
          name: '圆角',
        },
        {
          type: 'square',
          name: '平角',
        },
      ],
      sizes: [
        {
          type: 'small',
          name: '小号',
        },
        {
          type: 'default',
          name: '默认',
        },
        {
          type: 'large',
          name: '大号',
        },
      ],
      cusSizes: [
        {
          width: 240,
          height: 80,
        },
        {
          width: 300,
          height: 100,
        },
      ],
      types: [
        {
          type: 'default',
          name: '默认',
        },
        {
          type: 'dashed',
          name: '虚线',
        },
        {
          type: 'primary',
          name: '主题',
        },
        {
          type: 'success',
          name: '成功',
        },
        {
          type: 'warning',
          name: '警告',
        },
        {
          type: 'error',
          name: '失败',
        },
      ],
      opens: [
        {
          type: 'contact',
          name: '客服消息',
        },
        {
          type: 'openSetting',
          name: '授权设置',
        },
        {
          type: 'getUserProfile',
          name: '用户信息',
        },
        {
          type: 'getPhoneNumber',
          name: '用户手机号',
        },
        {
          type: 'feedback',
          name: '意见反馈',
        },
        {
          type: 'share',
          name: '分享',
        },
      ],
      bgImages: [
        'https://3gimg.qq.com/tencentMapTouch/app/scenic/scenic_website/desktop/banner1.png',
        'https://3gimg.qq.com/tencentMapTouch/app/scenic/scenic_website/desktop/banner2.png',
      ],
      userInfo: {},
    };
  },
  computed: {
    actives() {
      return this.types.find(row => row.type === 'primary');
    },
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
      title: 'Button',
      path: 'pages/adui/basic/button/index',
    };
  },
  methods: {
    ...mapMutations(['userInfoMutation']),
    handleCommonSwitch(e, type) {
      this.button[type] = e.detail.value;
      if (['shape'].includes(type)) {
        uni.vibrateShort();
      }
    },
    handleUserProfile(e) {
      uni.getUserProfile({
        desc: '获取您的昵称头像等信息',
        success: res => {
          const { userInfo } = res
          if (!userInfo) return;
          // 一次性数据
          const { city, province, country } = userInfo;
          this.userInfo = {
            ...userInfo,
            address: `${country || ''} ${province || ''} ${city || ''}`,
          };
          this.userInfoMutation(userInfo);
        }
      })
      
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
