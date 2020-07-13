<template>
  <view class="author" @click="handleClick">
    <kp-avatar
      v-if="avatar || icon"
      :image="avatar"
      :icon="icon"
      :icon-size="iconSize"
      :shape="shape"
      :avatar-bg="avatarBg"
      :avatar-gradient="avatarGradient"
    />
    <view class="author-content">
      <text class="nickname" v-if="title">{{title}}</text>
      <text class="info" v-if="info">{{info}}</text>
    </view>
    <view class="author-extra">
      <kp-icon v-if="extra" :size="extraObj.size" :type="extraObj.icon" :color="extraObj.color"/>
      <slot name="extra"/>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Author组件，支持头像、标题、描述及额外信息载入等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-02-10 // Initial version.
 * @Date: 2020-02-10 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-08 01:41:00
 */
import KpIcon from "../kp-icon";
import KpAvatar from "../kp-avatar";
export default {
  name: "KpAuthor",
  components: {
    KpIcon,
    KpAvatar
  },
  props: {
    avatar: String,
    avatarBg: String,
    avatarGradient: String,
    icon: String,
    iconSize: {
      type: [String, Number],
      default: 48
    },
    title: String,
    info: String,
    // 右侧额外信息，默认导航小箭头形式（如想自定义图标或颜色可按照配置混入Object类型）
    extra: {
      type: [Boolean, String, Object],
      default: false
    },
    shape: {
      validator(value) {
        return ["circle", "square"].includes(value);
      },
      default: "circle"
    },
    // 路径形式，导航页面，保留当前页面，跳转到应用内的某个页面
    navigator: String
  },
  computed: {
    extraObj() {
      const tpl = { size: 45, icon: "arrow_right", color: "#585860" };
      switch (this.extra) {
        case "miniprogram":
          return { ...tpl, icon: "miniprogram", color: "#6367ef" };
          break;
        case "wechat":
          return { ...tpl, icon: "wechat", color: "#07C160", size: 40 };
          break;
        default:
          break;
      }
      return this.extra && this.extra instanceof Object
        ? { ...tpl, ...this.extra }
        : tpl;
    }
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
