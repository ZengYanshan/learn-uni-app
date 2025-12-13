<template>
	<!-- 自定义导航栏 -->
	<view class="custom-navbar">
		<image src="/static/images/icon-back.png" class="back-icon" @click="goBack" />
		<text class="page-title">购物车</text>
	</view>
	
	<view class="cart-page">
		<!-- 空购物车状态 -->
		<view v-if="groupedCart.length === 0" class="empty-cart">
			<image src="/static/images/empty-cart.png" class="empty-icon" />
			<text class="empty-text">购物车还是空的，快去挑选美食吧！</text>
			<button class="go-shopping-btn" @click="goToHome">去逛逛</button>
		</view>

		<!-- 有商品状态 -->
		<scroll-view v-else scroll-y class="cart-scroll">
			<!-- 商店分组 -->
			<view v-for="(shopGroup, index) in groupedCart" :key="index" class="shop-group">
				<!-- 商店头部 -->
				<view class="shop-header" @click="goToShopDetail(shopGroup.shop.id)">
					<image :src="shopGroup.shop.image" class="shop-image" />
					<text class="shop-name">{{ shopGroup.shop.name }}</text>
					<text class="delivery-fee">配送费: ¥{{ shopGroup.shop.deliveryFee }}</text>
				</view>

				<!-- 食物列表 -->
				<view class="food-list">
					<view v-for="food in shopGroup.foods" :key="food.id" class="food-item" @click="goToFoodDetail(shopGroup.shop.id, food.id)">
						<image :src="food.image" class="food-image" mode="aspectFill" />
						<view class="food-info">
							<text class="food-name">{{ food.name }}</text>
							<text class="food-price">¥{{ food.price }}</text>
							<!-- <text class="food-desc">{{ food.description }}</text> -->
						</view>
						<view class="food-count">
							<food-count-controller :food="food" @add='onAdd' @sub='onSub' />
						</view>
						<!-- <view class="delete-btn" @click="removeFood(food)">删除</view> -->
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部结算栏 -->
		<view v-if="groupedCart.length > 0" class="bottom-bar">
			<text class="total-price">总价: ¥{{ totalPrice }}</text>
			<button class="pay-btn" @click="goToPay">去支付</button>
		</view>
	</view>
</template>

<script>
	import SHOPS from '@/static/data/shops.js';
	import FOODS from '@/static/data/foods.js';
	import FoodCountController from '@/components/FoodCountController.vue';

	export default {
		components: {
			FoodCountController
		},
		computed: {
			groupedCart() {
				console.log("cartData = ", this.$store.state.cart.cartData);
				const shopMap = new Map();
				this.$store.state.cart.cartData.forEach(item => {
					const food = FOODS.find(f => f.id === item.foodId);
					if (!food) return;

					const shop = SHOPS.find(s =>
						s.menu.some(cat =>
							cat.items.some(i => i.foodId === item.foodId)
						)
					);


					if (shop) {
						if (!shopMap.has(shop.id)) {
							shopMap.set(shop.id, {
								shop,
								foods: []
							});
						}

						const shopGroup = shopMap.get(shop.id); // 引用类型，可修改shopMap
						shopGroup.foods.push({
							...food,
							count: item.count
						});
					}
				});

				let _groupedCart = Array.from(shopMap.values());
				console.log("groupedCart = ", _groupedCart);
				return _groupedCart;
			},
			totalPrice() {
				return this.groupedCart.reduce(
					(total, shopGroup) => total +
					shopGroup.foods.reduce(
						(sum, food) => sum + food.price * food.count,
						0
					) + shopGroup.shop.deliveryFee,
					0
				);
			}
		},
		methods: {
			goToShopDetail(shopId) {
				let _url = `/pages/shop/ShopDetailPage?shopId=${shopId}`;
				uni.navigateTo({
					url: _url
				});
			},
			goToFoodDetail(shopId, foodId) {
				let _url = `/pages/shop/ShopDetailPage?shopId=${shopId}&foodId=${foodId}`;
				uni.navigateTo({
					url: _url
				});
			},
			async onAdd(food) {
				await this.$store.dispatch('cart/addFood', {
					foodId: food.id
				});
			},
			async onSub(food) {
				await this.$store.dispatch('cart/subFood', {
					foodId: food.id
				});
			},
			// 删除食物
			removeFood(food) {
				this.subFood({
					foodId: food.id,
					count: food.count
				});
			},

			// 跳转首页
			goToHome() {
				uni.switchTab({
					url: '/pages/home/HomePage'
				});
			},

			// 去支付
			goToPay() {
				// TODO
			}
		}
	};
</script>

<style scoped>
	/* 自定义导航栏 */
	.custom-navbar {
		display: flex;
		align-items: center;
		padding: 15rpx 30rpx;
		background-color: #FF5A5F;
		color: white;
	}
	
	.back-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
	
	.page-title {
		flex: 1;
		/* text-align: center; */
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.cart-page {
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;

		padding: 20rpx;
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		text-align: center;
	}

	.empty-icon {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 40rpx;
	}

	.empty-text {
		font-size: 32rpx;
		color: #999;
		margin-bottom: 40rpx;
	}

	.go-shopping-btn {
		background-color: #FF5A5F;
		color: white;
		padding: 20rpx 40rpx;
		border-radius: 40rpx;
	}

	.cart-scroll {
		flex: 1;
		overflow: auto;
	}

	.shop-group {
		background-color: white;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.shop-header {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1rpx solid #eee;
	}

	.shop-image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}

	.shop-name {
		font-size: 32rpx;
		font-weight: bold;
		margin-right: 20rpx;
	}

	.delivery-fee {
		font-size: 28rpx;
		color: #999;
	}

	.food-list {
		padding: 20rpx;
	}

	.food-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.food-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}

	.food-info {
		flex: 1;
	}

	.food-name {
		font-size: 30rpx;
		color: #333;
		margin-bottom: 10rpx;
	}

	.food-price {
		font-size: 32rpx;
		color: #FF5A5F;
	}

	.food-desc {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.food-count {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}

	.delete-btn {
		font-size: 28rpx;
		color: #999;
	}

	.bottom-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 90rpx;
		left: 0;
		right: 0;
		height: 100rpx;
		padding: 0 30rpx;
		background-color: white;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.total-price {
		font-size: 36rpx;
		color: #FF5A5F;
	}

	.pay-btn {
		background-color: #FF5A5F;
		color: white;
		padding: 0 40rpx;
		border-radius: 40rpx;
	}
</style>