<template>
  <view
    :class="[
      prefixCls
    ]"
    :style="[ flexStyle ]"
  >
    <slot />
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | flex布局
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-25 // Initial version.
 * @Date: 2021-03-25 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-25 14:58:36
 */
export default {
  name: 'AdFlex',
  props: {
    
  },
  data() {
    const { app } = this.$store.state
    return {
      prefixCls: `${app.prefix}-flex`
    }
  },
  computed: {
    flexStyle() {
      let style = {}
      return style
    },
  },
  methods: {
    
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
