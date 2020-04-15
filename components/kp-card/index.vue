<template>
    <div :class="classes" :style="resetStyles">
      <div :class="headClasses" @click="handleHeadClick">
        <slot name="title">
          <div class="k-card-head-content">
            <kp-avatar v-if="icon || image" :size="size" :image="image" :icon="icon" />
            <p class="k-card-head-paragraph" :style="(!icon && !image) && 'paddingLeft:0'">
              <span v-if="title" class="title">
                {{title}}
                <slot name="title-after" />
              </span>
              <span v-if="desc" class="desc">{{desc}}</span>
            </p>
          </div>
        </slot>
        <div :class="extraClasses">
          <slot name="extra"></slot>
        </div>
      </div>
      <div :class="bodyClasses" :style="resetStyles" v-if="showBody">
        <slot />
      </div>
    </div>
</template>

<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Card组件，支持title、desc、头像等自定义
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date: 2019-07-08 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2019-07-11 13:15:14
 */
import KpAvatar from '../kp-avatar'
import KpIcon from '../kp-icon'
const prefixCls = 'k-card'

export default {
  name: 'KpCard',
  components: { 
    KpAvatar,
    KpIcon
  },
  props: {
    // 边框
    bordered: {
      type: Boolean,
      default: true
    },
    // body content
    showBody: {
      type: Boolean,
      default: true
    },
    size: String,
    title: String,
    desc: String,
    icon: String,
    image: String
  },
  data () {
    return {
      
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        this.bordered ? [`${prefixCls}-bordered`]: ''
      ]
    },
    headClasses () {
      return `${prefixCls}-head`;
    },
    extraClasses () {
      return `${prefixCls}-extra`;
    },
    bodyClasses () {
      return `${prefixCls}-body`;
    },
    resetStyles () {
      if (!this.title) {
        return {
          paddingTop: 0
        }
      }
    }
  },
  mounted () {
    
  },
  methods: {
    handleHeadClick(e) {
      this.$emit('on-head', e)
    }
  }
}
</script>
