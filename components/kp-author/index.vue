<template>
  <view class="author" @click="handleClick">
    <kp-avatar
      v-if="avatar || icon"
      :image="avatar"
      :icon="icon"
      :icon-size="iconSize"
      :shape="shape"
      :avatar-bg="avatarBg"
    />
    <view class="author-content">
      <text class="nickname" v-if="title">{{title}}</text>
      <text class="info" v-if="info">{{info}}</text>
    </view>
    <view class="author-extra">
      <slot/>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2015-Now Asako Studio. All rights reseved.
 * @fileoverview | Author组件，支持头像、标题、描述及额外信息载入等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-02-10 // Initial version.
 * @Date: 2020-02-10 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-26 01:49:10
 */
import KpAvatar from "../kp-avatar";
export default {
  name: "KpAuthor",
  components: {
    KpAvatar
  },
  props: {
    avatar: String,
    avatarBg: String,
    icon: String,
    iconSize: {
      type: [String, Number],
      default: 48
    },
    title: String,
    info: String,
    shape: {
      validator(value) {
        return ["circle", "square"].includes(value);
      },
      default: "circle"
    },
    // 路径形式，导航页面，保留当前页面，跳转到应用内的某个页面
    navigator: String
  },
  methods: {
    handleClick(e) {
      // 指定navigator路径后不再传递父子组件事件
      if (this.navigator) {
        return uni.navigateTo({
          url: this.navigator
        });
      }
      //
      this.$emit("navigate", e);
    }
  }
};
</script>
