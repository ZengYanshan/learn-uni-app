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
		padding: 0 10rpx;
		min-width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 40rpx;
		font-family: sans-serif;
		font-weight: bold;
		font-size: 24rpx;
		color: white;
		background: linear-gradient(to right, #ff9900, #ff3300);
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
	}
</style>