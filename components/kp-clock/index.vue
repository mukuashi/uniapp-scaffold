<template>
  <view class="clock" :style="clockStyle">
    <view class="clock-circle"></view>
    <view class="clock-hour" :style="{transform:hourRotate}"></view>
    <view class="clock-minute" :style="{transform:minuteRotate}"></view>
    <view class="clock-second" :style="{transform:secondRotate}"></view>
    <view class="hour" v-for="h in timeList" :key="h">
      <text :style="{transform:transform}">{{h}}</text>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Clock时钟组件
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-10-01 // Initial version.
 * @Date: 2019-10-01 12:11:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2019-10-01 23:35:23
 */
export default {
  name: "KpClock",
  props: {
    time: [String, Number],
    color: String,
    border: String,
    bg: String,
    size: String
  },
  data() {
    return {
      timeList: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      transform: "scale(1)",
      hourRotate: "rotatez(0deg)",
      minuteRotate: "rotatez(0deg)",
      secondRotate: "rotatez(0deg)"
    };
  },
  computed: {
    clockStyle() {
      return {
        height: this.size,
        width: this.size,
        color: this.color,
        border: this.border,
        background: this.bg
      };
    }
  },
  watch: {
    time() {
      this.show();
    }
  },
  methods: {
    show() {
      this.showTime();
      if (this._timer) clearInterval(this._timer);
      if (!this.time) {
        this._timer = setInterval(() => {
          this.showTime();
        }, 1000);
      }
    },
    showTime() {
      let times;
      if (this.time) {
        times = this.time.split(":");
      } else {
        const now = new Date();
        times = [now.getHours(), now.getMinutes(), now.getSeconds()];
      }
      let hour = +times[0];
      hour = hour > 11 ? hour - 12 : hour;
      let minute = +times[1];
      let second = +times[2] || 0;
      let hourAngle = hour * 30 + ((minute * 6) / 360) * 30;
      let minuteAngle = minute * 6;
      let secondAngle = second * 6;
      this.hourRotate = `rotatez(${hourAngle}deg)`;
      this.minuteRotate = `rotatez(${minuteAngle}deg)`;
      this.secondRotate = `rotatez(${secondAngle}deg)`;
    }
  },
  mounted() {
    let scale = this.$el.clientWidth / 120;
    scale = scale > 3 ? 3 : scale;
    this.transform = `scale(${scale})`;
    this.show();
  },
  destroyed() {
    if (this._timer) clearInterval(this._timer);
  }
};
</script>