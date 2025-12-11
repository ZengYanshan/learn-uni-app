<template>
	<view class="food-count-controller">
		<view class="cart-sub" v-show="food.count > 0" @click.stop="sub">
			<text class="icon">−</text>
		</view>
		<view class="cart-count" v-show="food.count > 0">
			<text>{{ food.count }}</text>
		</view>
		<view class="cart-add" @click.stop="add">
			<text class="icon">＋</text>
		</view>
	</view>
</template>

<script>

	export default {
		name: 'FoodCountController',
		props: {
			food: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			add(event) {
				// if (this.food.count === undefined) {
				// 	this.$set(this.food, 'count', 1);
				// } else {
				// 	this.food.count++;
				// }
				// console.log(event.target);
				this.$emit('add', this.food);
			},
			sub() {
				// if (this.food.count > 0) {
				// 	this.food.count--;
				// }
				this.$emit('sub', this.food);
			}
		}
	};
</script>

<style scoped>
	.food-count-controller {
		display: flex;
		align-items: center;
	}

	.cart-sub,
	.cart-add {
		width: 48rpx;
		height: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: #0091ff;
		color: white;
		font-size: 40rpx;
	}

	.cart-count {
		min-width: 60rpx;
		text-align: center;
		font-size: 28rpx;
		color: #333;
		margin: 0 20rpx;
	}

	.icon {
		font-weight: bold;
	}
</style>