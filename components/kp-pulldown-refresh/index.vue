<template>
	<!-- #ifdef H5	 -->	
	<view 
		class="k-refresh"
		:style="{
			transform: 'translateY('+ pageDeviation +'px)',
			transition: pageTransition + 's',
			height: 'calc(100% - ' + pageTop + 'px)',
			maxHeight: 'calc(100% - ' + pageTop + 'px)'
		}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
	<!-- #endif -->
	<!-- #ifndef H5	 -->	
	<view 
		class="k-refresh"
		:style="{
			transform: 'translateY('+ pageDeviation +'px)',
			transition: pageTransition + 's',
			height: 'calc(100vh - ' + pageTop + 'px)',
			maxHeight: 'calc(100vh - ' + pageTop + 'px)'
		}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
	<!-- #endif -->
		<!-- 下拉刷新 -->
		<kp-loading v-if="refreshReady || refreshing" />
		<slot />
	</view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2014-Now MUX Lab, All rights reseved.
 * @fileoverview | 下拉刷新组件，不断扩展中...
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date: 2019-07-08 14:41:58 
 * @Last Modified by: mukuashi
 * @Last Modified time: 2019-07-11 11:44:36
 */
let startY, moveY, windowHeight = 500, platform;
let timeDiff = 0;
let touchending;

import KpLoading from '../kp-loading'

export default {
	name:'KpPulldownRefresh',
	components: {
		KpLoading
	},
	props: {
		top: {
			//距离顶部距离，单位upx
			type: Number,
			default: 0
		},
	},
	data() {
		return {
			pageDeviation: 0, //下偏移量
			pageTransition: 0, //回弹过渡时间
			refreshReady: false, //进入刷新准备状态
			refreshing: false, // 进入刷新状态
		};
	},
	computed: {
		pageTop(){
			return uni.upx2px(this.top);
		}
	},
	created(){
		uni.getSystemInfo({
			success: function(e) {
				platform = e.platform;
				windowHeight = e.windowHeight;
			}
		})
	},
	methods: {
		pageTouchstart(e){
			touchending = false;
			this.pageTransition = 0;
			startY = e.touches[0].pageY;
		},
		pageTouchmove(e){
			if(touchending){
				return;
			}
			moveY = (e.touches[0].pageY - startY) * 0.4;
			if(moveY >= 0){
				this.pageDeviation = moveY;
				
				this.$emit('setEnableScroll', false);
			}
			if(moveY >= 50 && this.refreshReady === false){
				this.refreshReady = true;
			}else if(moveY < 50 && this.refreshReady === true){
				this.refreshReady = false;
			}
			if(platform === 'ios' && e.touches[0].pageY > windowHeight + 10){
				this.pageTouchend();
			}
		},
		pageTouchend(){
			touchending = true;
			if(moveY === 0){
				return;
			}
			this.pageTransition = 0.3;
			if(moveY >= 50){
				this.startPulldownRefresh();
			}else{
				this.pageDeviation = 0;
			}
			
			if(this.refreshReady === true){
				this.refreshReady = false;
			}
			//修复下拉一点回弹后页面无法滚动的bug
			this.$emit('setEnableScroll', true);
			startY = moveY = 0;
		},
		//开启下拉刷新
		startPulldownRefresh(){
			if(+new Date() - timeDiff < 100){
				return;
			}
			timeDiff = +new Date();
			this.refreshing = true;
			this.pageDeviation = uni.upx2px(90);
			this.$emit('refresh');
		},
		//结束下拉刷新
		endPulldownRefresh(){
			this.refreshing = false;
			this.pageDeviation = uni.upx2px(0);
			//this.$emit('setEnableScroll', true);
		},
	}
}
</script>