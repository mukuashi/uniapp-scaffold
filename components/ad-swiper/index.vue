<template>
  <view
    class="swiper"
    :style="{
			minHeight: `${1.1*dotsSize}rpx`
		}"
    @touchstart="startMove"
    @touchend="endMove"
  >
    <view
      v-for="(item, index) in value"
      :key="index"
      class="swiper-item"
      :style="{
				transform: itemStyle[index].transform,
				zIndex: itemStyle[index].zIndex,
				opacity: itemStyle[index].opacity
			}"
    >
      <view class="swiper-item-children">
        <image
          mode="widthFix"
          :src="item"
          :style="{ width: `${dotsSize}rpx` }"
          :class="{ active: index===current }"
        >
      </image></view>
    </view>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 自定义堆叠轮播，对官方swiper的修饰改造.
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-02-25 17:11:26
 */
import { debounce, deepClone } from '@/utils';

export default {
  props: {
    value: {
      type: Array,
      value: () => [],
    },
    // 缩略图大小，目前自动适配为正方形
    dotsSize: {
      type: Number,
      default: 100,
    },
    // 轮播激活次序
    dotsIndex: {
      type: Number,
      value: 0,
    },
    // 轮播方向
    dotsDirection: String,
  },
  data() {
    return {
      slideNote: {
        x: 0,
        y: 0,
      },
      screenWidth: 0,
      itemStyle: [],
    };
  },
  computed: {
    // 当前swiper激活次序
    current: {
      // getter
      get() {
        return this.dotsIndex;
      },
      // setter
      set(newValue) {
        this.$emit('update', newValue);
      },
    },
  },
  watch: {
    dotsIndex(newVal, oldVal) {
      if (this.dotsDirection) {
        debounce(this.endMove(this.dotsDirection));
      }
    },
  },
  created() {
    const macInfo = uni.getSystemInfoSync();
    this.screenWidth = macInfo.screenWidth;
    // 计算swiper样式
    this.value.forEach((item, index) => {
      this.itemStyle.push(this.getStyle(index));
    });
  },
  methods: {
    getStyle(e) {
      if (e > this.value.length / 2) {
        const right = this.value.length - e;
        return {
          transform:
            `scale(${
            1 - right / 10
             }) translate(-${
             right * 9
             }%,${
             right * 2
             }px)`,
          zIndex: 9000 - right,
          opacity: 0.8 / right,
        };
      }
        return {
          transform:
            `scale(${
            1 - e / 10
             }) translate(${
             e * 9
             }%,${
             e * 2
             }px)`,
          zIndex: 9000 - e,
          opacity: 0.8 / e,
        };
    },
    startMove(e) {
      this.slideNote.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
      this.slideNote.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
    },
    endMove(e) {
      const newList = deepClone(this.itemStyle);
      const left = () => {
        // 向左滑动
        const last = newList[newList.length - 1];
        for (let i = newList.length - 1; i > 0; i--) {
          newList[i] = newList[i - 1];
        }
        newList[0] = last;
      };
      const right = () => {
        // 向右滑动
        const first = newList[0];
        for (let i = 1; i < newList.length; i++) {
          newList[i - 1] = newList[i];
        }
        newList[newList.length - 1] = first;
      };
      if (e instanceof Object) {
        if (e.changedTouches[0].pageX - this.slideNote.x < 0) {
          left();
        } else {
          right();
        }
        this.current = newList.findIndex(row => row.opacity === Infinity || row.transform.includes('scale(1)'));
      } else {
        if (e === 'left') {
          left();
        }
        if (e === 'right') {
          right();
        }
      }
      this.itemStyle = newList;
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
