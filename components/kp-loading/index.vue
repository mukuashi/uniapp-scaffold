<template>
	<!-- loading 加载 -->
	<view class="k-loading">
		<view class="k-loading-wrapper">
			<image 
				class="icon" 
				src="https://loading.io/mod/spinner/color-ring/index.svg"
			/>
		</view>
	</view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
export default {
	name:'KpLoading',
	props: {
		top: {
			//距离顶部距离，单位rpx
			type: Number,
			default: 0
		},
	},
	data() {
		return {

		};
	},
	methods: {
		
	}
}
</script>