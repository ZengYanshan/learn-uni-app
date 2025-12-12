<template>
	<text class="bubble">
		{{ num }}
	</text>
</template>

<script>
	export default {
		name: 'bubble',
		props: {
			num: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style scoped>
	.bubble {
		display: inline-block;
		padding: 0 1rpx;
		width: 32rpx;
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		border-radius: 32rpx;
		font-family: sans-serif;
		font-weight: bold;
		font-size: 20rpx;
		color: white;
		background: linear-gradient(to right, #ff9900, #ff3300);
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
	}
</style>