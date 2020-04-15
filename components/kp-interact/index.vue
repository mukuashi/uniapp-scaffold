<template>
  <view :class="[ 'interact',fixed && 'interact-fixed']">
    <view class="op op-left">
      <view class="item" @tap="handleInteractSet">
        <!-- <kp-icon size='22' type='like_normal' /> -->
        <text>{{ interactData.likes }}</text>人喜欢
      </view>
      <view class="item" @tap="handleInteractSet">
        <!-- <kp-icon size='22' type='collect_normal' /> -->
        <text>{{ interactData.favoriteCount }}</text>人收藏
      </view>
    </view>
    <view class="op op-right">
      <button
        class="item"
        hover-class="none"
        open-type="share"
        :data-share="interactData"
        @tap="handleOpenShare"
      >
        <kp-icon type="share" size="22"/>
      </button>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 互动组件，加油、喜欢、评论、分享等配置
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-11 // Initial version.
 * @Date: 2019-07-11 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-01-13 12:44:29
 */
import KpIcon from "../kp-icon";

export default {
  name: "KpInteract",
  components: {
    KpIcon
  },
  props: {
    // 是否固定在底部，默认否
    fixed: {
      type: Boolean,
      value: false
    },
    // 主要操作按钮(加油、收藏、评论)等初始化数据
    value: {
      type: Object,
      value: () => {}
    }
  },
  computed: {
    interactData: function() {
      return this.value;
    }
  },
  methods: {
    // 互动
    handleInteractSet() {},
    // 分享
    handleOpenShare() {}
  }
};
</script>S