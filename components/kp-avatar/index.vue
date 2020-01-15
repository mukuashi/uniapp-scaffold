<template>
  <view :class="[
    `${prefixCls}`,
    `${prefixCls}-${shape}`,
    `${prefixCls}-${size}`,
    !!image ? `${prefixCls}-image` : '',
    !!icon || customIcon ? `${prefixCls}-icon`: ''
  ]"
  >
    <image lazy-load="true" :src="`${image}?imageMogr2/thumbnail/120x`" :mode="mode" v-if="image" @error="handleError" />
    <kp-icon :type="icon" :custom="customIcon" v-else-if="icon || customIcon" />
    <text :class="[prefixCls + '-text']" v-else>
      <slot />
    </text>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2014-Now MUX Lab, All rights reseved.
 * @fileoverview | Avatar头像圆字组件，支持图标、文本自定义等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-10 // Initial version.
 * @Date: 2019-07-10 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-01-13 12:44:16
 */
import KpIcon from '../kp-icon'

const prefixCls = 'k-avatar'

export default {
  name: 'KpAvatar',
  components: {
    KpIcon
  },
  props: {
    shape: {
      validator (value) {
        return ['circle', 'square'].includes(value)
      },
      default: 'circle'
    },
    size: {
      validator (value) {
        return ['small', 'default', 'large', 'xlarge'].includes(value)
      },
      default: 'default'
    },
    image: {
      type: String
    },
    icon: {
      type: String
    },
    customIcon: {
      type: String,
      default: ''
    },
    // 更多模式参考 https://uniapp.dcloud.io/component/image
    mode: {
      type: String,
      default: 'widthFix'
    }
  },
  data () {
    return {
      prefixCls,
      scale: 1,
      childrenWidth: 0,
      isSlotShow: false
    }
  },
  computed: {

  },
  methods: {
    handleError (e) {
      this.$emit('on-error', e);
    }
  }
}
</script>
