<template>
  <i
    :style="[ countupStyle ]"
    :class="[ `${app.prefix}-countup` ]">
    {{ displayValue }}
    <slot />
  </i>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 大额数字滚动组件，支持自定义配置（动画、小数等），参考 https://github.com/PanJiaChen/vue-countTo
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-06-05 // Initial version.
 * @version 0.2 | 2020-06-13 // 去掉依赖组件，引入原生动画，自定义CountUp.
 * @Date: 2020-06-05 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:40:52
 */
export default {
  name: 'AdCountup',
  props: {
    value: {
      type: Number,
      required: false,
    },
    start: {
      type: Number,
      required: false,
      default: 0,
    },
    duration: {
      type: Number,
      required: false,
      default: 2000,
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 小数位
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator(value) {
        return value >= 0;
      },
    },
    // 小数点
    decimal: {
      type: String,
      required: false,
      default: '.',
    },
    // 分割器，类似于千百十等分位
    separator: {
      type: String,
      required: false,
      default: '',
    },
    // 前缀
    prefix: {
      type: String,
      required: false,
      default: '',
    },
    // 后缀
    suffix: {
      type: String,
      required: false,
      default: '',
    },
    // 是否使用过渡动画
    useEasing: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 字体样式
    fontWeight: {
      type: [Number, String, Boolean],
      required: false,
      default: 'normal',
    },
  },
  data() {
    return {
      localStartVal: this.start,
      displayValue: this.formatNumber(this.start),
      printVal: null,
      paused: false,
      localDuration: this.duration,
      startTime: null,
      timestamp: null,
      remaining: null,
      rAF: null,
      lastTime: 0, // 上一次的时间
    };
  },
  computed: {
    countupStyle() {
      const style = {};
      if (this.fontWeight) {
        // font-weight可能为true、weight（string）或100、500这种数字
        style.fontWeight = typeof this.fontWeight === 'boolean' ? 600 : this.weight;
      }
      return style;
    },
    countDown() {
      return this.start > this.value;
    },
  },
  watch: {
    start() {
      if (this.autoplay) {
        this.onStart();
      }
    },
    value() {
      if (this.autoplay) {
        this.onStart();
      }
    },
    autoplay(newVal) {
      if (newVal) {
        this.onStart();
      } else {
        this.onPause();
      }
    },
  },
  mounted() {
    if (this.autoplay) {
      this.onStart();
    }
    this.$emit('mountedCallback');
  },
  destroyed() {
    this.cancelAnimationFrame(this.rAF);
  },
  methods: {
    easingFn(t, b, c, d) {
			return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
		},
    requestAnimationFrame(callback) {
			const currTime = new Date().getTime();
			// 为了使setTimteout的尽可能的接近每秒60帧的效果
			const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
			const id = setTimeout(() => {
				callback(currTime + timeToCall);
			}, timeToCall);
			this.lastTime = currTime + timeToCall;
			return id;
    },
    cancelAnimationFrame(id) {
			clearTimeout(id);
		},
    onStart() {
      this.localStartVal = this.start;
      this.startTime = null;
      this.localDuration = this.duration;
      this.paused = false;
      this.rAF = this.requestAnimationFrame(this.count);
    },
    onPause() {
      this.cancelAnimationFrame(this.rAF);
    },
    pauseResume() {
      if (this.paused) {
        this.resume();
        this.paused = false;
      } else {
        this.onPause();
        this.paused = true;
      }
    },
    resume() {
      this.startTime = null;
      this.localDuration = +this.remaining;
      this.localStartVal = +this.printVal;
      this.requestAnimationFrame(this.count);
    },
    reset() {
      this.startTime = null;
      this.cancelAnimationFrame(this.rAF);
      this.displayValue = this.formatNumber(this.start);
    },
    count(timestamp) {
      if (!this.startTime) this.startTime = timestamp;
      this.timestamp = timestamp;
      const progress = timestamp - this.startTime;
      this.remaining = this.localDuration - progress;
      if (this.useEasing) {
        if (this.countDown) {
          this.printVal = this.localStartVal - this.easingFn(progress, 0, this.localStartVal - this.value, this.localDuration);
        } else {
          this.printVal = this.easingFn(
            progress,
            this.localStartVal,
            this.value - this.localStartVal,
            this.localDuration,
          );
        }
      } else {
        if (this.countDown) {
          this.printVal = this.localStartVal - (this.localStartVal - this.value) * (progress / this.localDuration);
        } else {
          this.printVal = this.localStartVal + (this.value - this.localStartVal) * (progress / this.localDuration);
        }
      }
      if (this.countDown) {
        this.printVal = this.printVal < this.value ? this.value : this.printVal;
      } else {
        this.printVal = this.printVal > this.value ? this.value : this.printVal;
      }
      this.displayValue = this.formatNumber(this.printVal);
      if (progress < this.localDuration) {
        this.rAF = this.requestAnimationFrame(this.count);
      } else {
        this.$emit('callback');
      }
    },
    isNumber(val) {
      return !isNaN(parseFloat(val));
    },
    formatNumber(num) {
      num = num.toFixed(this.decimals);
      num += '';
      const x = num.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? this.decimal + x[1] : '';
      const rgx = /(\d+)(\d{3})/;
      if (this.separator && !this.isNumber(this.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, `$1${this.separator}$2`);
        }
      }
      return this.prefix + x1 + x2 + this.suffix;
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
