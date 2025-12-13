<template>
	<transition name="fade">
		<view class="popup-mask" v-show="visible" @tap="maskClick">
			<transition name="move">
				<view class="popup-content" v-show="visible" @tap.stop>
					<!-- 主内容区 -->
					<scroll-view scroll-y class="food-detail-wrapper">
						<!-- 食物大图 -->
						<view class="image-section">
							<image class="food-image" :src="currentFood.image" mode="aspectFill"></image>
						</view>

						<!-- 基础信息 -->
						<view class="info-section">
							<text class="food-name">{{currentFood.name}}</text>
							<view class="price-row">
								<text class="price">¥{{currentFood.price}}</text>
							</view>
						</view>

						<!-- 商品信息 -->
						<view v-if="currentFood.description" class="info-section">
							<view class="section-header">
								<text class="section-title">商品信息</text>
							</view>
							<text class="info-text">{{currentFood.description}}</text>
						</view>
					</scroll-view>

					<!-- 加入购物车按钮 -->
					<view class="add-to-cart-button" @click="add">
						加入购物车
					</view>
				</view>
			</transition>
		</view>
	</transition>
</template>

<script>
	export default {
		name: 'FoodDetail',
		props: {
			currentFood: {
				type: Object,
				default: () => ({})
			},
			visible: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			maskClick() {
				this.$emit("hide");
			},
			add() {
				this.$emit("add", this.currentFood);
			}
		}
	};
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
		/* bottom 与 .add-to-cart-button 高度保持一致 */
		bottom: 100rpx;
		background: white;
		border-top-left-radius: 10px;
		/* 左上角圆角 */
		border-top-right-radius: 10px;
		/* 右上角圆角 */
	}

	/* 购物车列表出现、消失动画 */
	/* 修正后的动画配置 */
	.popup-content.move-enter-from,
	.popup-content.move-leave-to {
		transform: translate3d(0, 100%, 0);
		/* 进入前/离开后状态 */
	}

	.popup-content.move-enter-to,
	.popup-content.move-leave-from {
		transform: translate3d(0, 0, 0);
		/* 进入后/离开前状态 */
	}

	.popup-content.move-enter-active,
	.popup-content.move-leave-active {
		transition: all 0.3s ease-in-out;

	}

	.food-detail-wrapper {
		flex: 1;
		padding: 10rpx;
		box-sizing: border-box; /* DEBUG 防止右溢出 */
	}

	.image-section {
		margin-bottom: 40rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.food-image {
		width: 100%;
		height: 600rpx;
		display: block;
	}

	.info-section {
		background: #fff;
		padding: 30rpx;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
	}

	.food-name {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}

	.price-row {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.price {
		font-size: 48rpx;
		color: #e93b3b;
		font-weight: bold;
	}

	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #eee;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.add-to-cart-button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #ff5722;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
</style>