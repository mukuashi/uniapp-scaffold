<template>
	<block v-if="position==='top'">
		<view :class="[ 
      'k-tips-class', 
      'k-toptips',
      `${prefixCls}-${type}`,
      tips ? 'k-toptips-show': '' 
    ]">{{msg}}
    </view>
	</block>
	<block v-else>
		<view :class="[ 
        'k-tips-class','k-toast',
        `${prefixCls}-${position}`,
        tips ? 'k-toast-show' :''
      ]"
    >
			<view class="k-tips-content" :class="[`${prefixCls}-${type}`]">
				{{msg}}
			</view>
		</view>
	</block>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | tips、toast等轻交互组件，支持上中下布局和事件方式引入，配置项 option （msg：'文案'，type | 主题，duration | 自定义时间显示（秒））
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-10 // Initial version.
 * @Date: 2019-07-10 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2019-12-02 11:16:15
 */
const prefixCls = 'k-tips'

export default {
  name:"KpTips",
  props: {
    //top bottom center
    position: {
      type: String,
      validator (value) {
        return [ 'top', 'center', 'bottom'].includes(value)
      },
      value: 'bottom'
    }
  },
  data: () => ({
    prefixCls,
    timer: null,
    tips: false,
    msg: "服务异常，请稍后再试~",
    type: "default"   // default、primary、success、warning、danger等style
  }),
  methods: {
    show: function(options) {
      const { type = 'default', duration = 2 } = options;
      clearTimeout(this.timer);
      this.tips = true;
      this.duration = duration < 2 ? 2 : duration;
      this.type = options.type || type;
      this.msg = options.msg || this.msg
      this.timer = setTimeout(() => {
        this.tips = false;
        clearTimeout(this.timer);
        this.timer = null;
      }, duration*1000);
    }
  }
}
</script>