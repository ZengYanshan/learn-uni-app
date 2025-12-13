<template>
	<view class="shop-card">
		<view class="shop-header-wrapper" @click="onClickShop">
			<image class="shop-image" :src="shop.image" mode="aspectFill" />
			<view class="shop-info">
				<view class="shop-header">
					<text class="shop-name">{{ shop.name }}</text>
					<view class="shop-rating">
						<text class="rating-number">{{ shop.rating.toFixed(1) }}</text>
						<uni-rate :value="shop.rating / 5 * 5" size="12" readonly />
					</view>
				</view>

				<view class="shop-meta">
					<text class="delivery-info">
						配送约{{ shop.deliveryTime }}分钟
					</text>
					<text class="delivery-fee">
						{{ shop.deliveryFee === 0 ? '免配送费' : `配送费￥${shop.deliveryFee}` }}
					</text>
				</view>

				<view class="shop-tags">
					<text v-for="(tag, index) in shop.tags" :key="index" class="tag">
						{{ tag }}
					</text>
				</view>

				<view class="shop-promotion" v-if="shop.promotion">
					<text class="promotion-text">{{ shop.promotion }}</text>
				</view>
			</view>
		</view>

		<view direction="horizontal" class="signature-foods-wrapper">
			<view v-for="signatureFood in signatureFoods" @click="onClickFood(signatureFood)" class="food-card">
				<view class="food-image-wrapper">
					<image :src="signatureFood.image" class="food-image" mode="aspectFill" />
				</view>
				<view class="food-name ellipsis">
					{{ signatureFood.name }}
				</view>
				<view class="food-price">
					¥{{ signatureFood.price.toFixed(2) }}
				</view>
			</view>

			<view class="enter-shop-button" @click="onClickShop">
				进入商店
			</view>
		</view>
	</view>
</template>

<script>
	import FOODS from '@/static/data/foods.js';

	export default {
		name: 'ShopCard',
		data() {
			return {
				signatureFoods: [],
			};
		},
		props: {
			shop: {
				type: Object,
				required: true
			}
		},
		mounted() {
			this.signatureFoods = this.getSignatureFoods(this.shop);
			console.log("signatureFoods = ", this.signatureFoods);
		},
		methods: {
			onClickShop() {
				let options = {
					shopId: this.shop.id
				};
				this.$emit('click-shop', options);
				console.log('click-shop', options);
			},
			onClickFood(food) {
				let options = {
					shopId: this.shop.id,
					foodId: food.id
				};
				this.$emit('click-food', options);
				console.log('click-food', options);
			},
			getSignatureFoods(shop) {
				const signatureFoodIds = this.getSignatureFoodIds(shop);
				const signatureFoodIdsSet = new Set(signatureFoodIds);

				// 筛选
				return FOODS.filter(food => signatureFoodIdsSet.has(food.id));
			},
			getSignatureFoodIds(shop, count = 4) {
				return shop.menu.reduce((acc, category) => {
					// 如果已经收集了足够的数量，停止处理
					if (acc.length >= count) return acc;

					// 遍历当前分类的items
					for (const item of category.items) {
						if (acc.length < count) {
							acc.push(item.foodId);
						} else {
							break; // 已经收集了足够的数量，跳出循环
						}
					}

					return acc;
				}, []);
			}
		}
	};
</script>

<style scoped>
	.shop-card {}

	.shop-header-wrapper {
		display: flex;
		padding: 30rpx;
		background: white;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.shop-image {
		width: 200rpx;
		height: 150rpx;
		border-radius: 10rpx;
		margin-right: 30rpx;
	}

	.shop-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.shop-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.shop-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.shop-rating {
		display: flex;
		align-items: center;
	}

	.rating-number {
		font-size: 24rpx;
		color: #FF5A5F;
		margin-right: 10rpx;
	}

	.shop-meta {
		display: flex;
		margin-bottom: 15rpx;
	}

	.delivery-info {
		font-size: 24rpx;
		color: #666;
		margin-right: 20rpx;
	}

	.delivery-fee {
		font-size: 24rpx;
		color: #666;
	}

	.shop-tags {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 10rpx;
	}

	.tag {
		font-size: 20rpx;
		color: #FF5A5F;
		padding: 4rpx 12rpx;
		border: 1rpx solid #FF5A5F;
		border-radius: 20rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}

	.shop-promotion {
		background: #FFF7F7;
		padding: 10rpx 15rpx;
		border-radius: 8rpx;
	}

	.promotion-text {
		font-size: 24rpx;
		color: #FF5A5F;
	}

	.signature-foods-wrapper {
		display: flex;

	}

	.food-card {
		border: #FF5A5F 1rpx solid;
		width: 160rpx;
		margin: 0 10rpx;
	}

	.food-image-wrapper {}

	.food-image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 8rpx;
	}

	.ellipsis {
		/* 禁止换行 */
		white-space: nowrap;
		/* 超出部分隐藏 */
		overflow: hidden;
		/* 显示省略号 */
		text-overflow: ellipsis;
	}

	.enter-shop-button {
		border: #FF5A5F 1rpx solid;
		width: 80rpx;
		margin: 0 0 0 10rpx;

		writing-mode: vertical-rl;
	}
</style>