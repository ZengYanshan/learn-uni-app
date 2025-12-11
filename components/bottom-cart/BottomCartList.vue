<template>
	<transition name="fade">
		<view class="popup-mask" v-show="visible" @tap="maskClick">
			<transition name="move">
				<view class="popup-content" v-show="visible" @tap.stop>
					<view class="list-header">
						<text class="title">购物车</text>
						<text class="clear" @tap="clear">清空</text>
					</view>
					<!-- 食物列表 -->
					<scroll-view class="list-content" scroll-y ref="listContent" :style="{maxHeight: '400rpx'}">
						<view v-for="(food, index) in selectedFoods" :key="index" class="food">
							<image class="img" :src="food.image" mode="aspectFill" />
							<text class="name">{{food.name}}</text>
							<view class="price">
								<text>￥{{food.price * food.count}}</text>
							</view>
							<view class="food-count-controller-wrapper">
								<food-count-controller @add="onAdd" @sub="onSub" :food="food"></food-count-controller>
							</view>
						</view>
					</scroll-view>
				</view>
			</transition>
		</view>
	</transition>
</template>

<script>
	import FoodCountController from '@/components/FoodCountController.vue';
	import FOODS from '../../static/data/foods';

	export default {
		name: 'BottomCartList',
		props: {
			selectedFoods: {
				type: Array,
				default: () => []
			},
			visible: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onAdd(food) {
				this.$emit('add', food);
			},
			onSub(food) {
				this.$emit('sub', food);
			},
			maskClick() {
				this.$emit('hide');
			},
			clear() {
				this.$emit('clear');
			}
		},
		components: {
			FoodCountController
		}
	}
</script>

<style>
	.popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 90;
	}
	/* 遮罩层出现、消失动画 */
	.popup-mask.fade-enter-from,
	.popup-mask.fade-leave-to {
		opacity: 0;
	}
	.popup-mask.fade-enter-to,
	.popup-mask.fade-leave-from {
		opacity: 1;
	}
	.popup-mask.fade-enter-active,
	.popup-mask.fade-leave-active {
		transition: opacity 0.3s ease-in-out;
	}

	.popup-content {
		position: absolute;
		left: 0;
		right: 0;
		/* bottom 与 FoodList.vue 中保持一致 */
		bottom: 100rpx;
		background: white;
	}
	/* 购物车列表出现、消失动画 */
	/* 修正后的动画配置 */
	.popup-content.move-enter-from,
	.popup-content.move-leave-to {
	  transform: translate3d(0, 100%, 0); /* 进入前/离开后状态 */
	}
	.popup-content.move-enter-to,
	.popup-content.move-leave-from {
	  transform: translate3d(0, 0, 0);    /* 进入后/离开前状态 */
	}
	.popup-content.move-enter-active,
	.popup-content.move-leave-active {
	  transition: all 0.3s ease-in-out;   /* 统一过渡配置 */
	}

	.list-header {
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 18rpx;
		background: background-ssss;
	}

	.list-header .title {
		float: left;
		font-size: $fontsize-medium;
		color: dark-grey;
	}

	.list-header .clear {
		float: right;
		font-size: $fontsize-small;
		color: blue;
	}

	.list-content {
		padding: 0 18rpx;
		overflow-y: auto;
	}

	.list-content .food {
		position: relative;
		padding: 12rpx 0;
		box-sizing: border-box;
	}
	
	.list-content .food .img {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 8rpx;
	}

	.list-content .food .name {
		position: absolute;
		/* 与 .list-content .food padding 保持一致 */
		top: 12rpx;
	}

	.list-content .food .price {
		position: absolute;
		/* 与 .list-content .food .img width + margin-right 保持一致 */
		left: 140rpx;
		/* 与 .list-content .food padding 保持一致 */
		bottom: 12rpx;
		font-weight: 700;
		color: red;
	}

	.list-content .food .food-count-controller-wrapper {
		position: absolute;
		right: 30rpx;
		bottom: 12rpx;
	}
</style>