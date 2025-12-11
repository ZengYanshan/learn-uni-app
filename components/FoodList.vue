<template>
	<view class="food-list">
		<!-- 左侧分类导航 -->
		<scroll-view class="category-nav" scroll-y>
			<view v-for="(category, index) in foodsCategorizedInShop" :key="index" class="category-item"
				:class="{ 'active': currentCategory === category.name }" @click="switchCategory(category.name)">
				<text>{{ category.name }}</text>
				<view v-if="currentCategory === category.name" class="active-indicator"></view>
			</view>
		</scroll-view>

		<!-- 右侧商品列表 -->
		<scroll-view class="food-container" scroll-y>
			<view v-for="(category, idx) in foodsCategorizedInShop" :key="idx">
				<!-- 分类名称 -->
				<view class="category-title">
					<text>{{ category.name }}</text>
				</view>

				<!-- 食物列表 -->
				<view v-for="food in category.foods" :key="food.id" class="food-item" @click="clickFood(food)">
					<view class="food-header">
						<image class="food-img" :src="food.image" mode="aspectFill" />
						<view class="food-info">
							<text class="name">{{ food.name }}</text>
							<text class="desc">{{ food.description }}</text>
							<!-- 							<view class="extra">
								<text class="count">月售{{ food.sellCount }}份</text>
								<text>好评率{{ food.rating }}%</text>
							</view> -->
							<view class="price">
								<text class="now">¥{{ food.price }}</text>
								<!-- <text v-if="food.oldPrice" class="old">¥{{ food.oldPrice }}</text> -->
							</view>
						</view>
						<!-- 加减号 -->
						<view class="food-count-controller-wrapper">
							<food-count-controller @add='onAdd' @sub='onSub' :food='food' />
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部购物车 -->
		<view class="bottom-cart-wrapper">
			<bottom-cart ref="bottomCart" :selected-foods="selectedFoods" :delivery-fee="data.shop.deliveryFee"
				@add='onAdd' @sub='onSub' @pay="onPay" @clear="onClear" />
		</view>
	</view>
</template>

<script>
	import BottomCart from '@/components/bottom-cart/BottomCart.vue';
	import FoodCountController from '@/components/FoodCountController.vue';
	import Bubble from '@/components/Bubble.vue';
	import FOODS from '@/static/data/foods.js';

	export default {
		name: 'FoodList',
		props: {
			data: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				currentCategory: '',
				// foodsCategorizedInShop: [],
			};
		},
		computed: {
			foodsCategorizedInShop() {
				// 创建购物车数据的映射，以foodId为键
				const cartMap = new Map();
				this.$store.state.cart.cartData.forEach(item => {
					cartMap.set(item.foodId, item.count);
				});

				// 构建分类数据结构
				const categories = [];
				if (this.data.shop?.menu) {
					this.data.shop.menu.forEach(category => {
						const foods = [];
						if (category.items && Array.isArray(category.items)) {
							category.items.forEach(item => {
								const food = FOODS.find(f => f.id === item.foodId);
								if (food) {
									foods.push({
										...food,
										// 从购物车映射中获取数量，不存在则为0
										count: cartMap.get(food.id) || 0,
										category: category.category
									});
								}
							});
						}
						categories.push({
							name: category.category,
							foods
						});
					});
				}
				return categories;
			},
			selectedFoods() {
				// let _selectedFoods = [];
				// this.foodsCategorizedInShop.forEach((category) => {
				// 	category.foods.forEach((food) => {
				// 		if (food.count) {
				// 			_selectedFoods.push(food);
				// 		}
				// 	})
				// })
				// return _selectedFoods;
				// console.log("update selectedFoods");
				let _selectedFoods = this.$store.state.cart.cartData.map(item => {
					const food = FOODS.find(f => f.id === item.foodId);
					return {
						...food,
						count: item.count
					};
				});
				console.log("selectedFoods = ", _selectedFoods);
				return _selectedFoods;
			},
		},
		// watch: {
		// 	// 监听data变化，当shop数据就绪时初始化
		// 	'data.shop': {
		// 		handler(newVal) {
		// 			if (newVal && newVal.menu) {
		// 				console.log("watched");
		// 				this.initializeFoodData();
		// 			}
		// 		},
		// 		immediate: true, // 立即执行一次
		// 		deep: true
		// 	}
		// },
		methods: {
			// async initializeFoodData() {
			// 	console.log('initializeFoodData()');

			// 	const categoryMap = new Map();
			// 	// 遍历
			// 	this.data.shop.menu.forEach(category => {
			// 		const foods = [];

			// 		// 添加安全检查
			// 		if (category.items && Array.isArray(category.items)) {
			// 			category.items.forEach(item => {
			// 				const food = FOODS.find(f => f.id === item.foodId);
			// 				if (food) {
			// 					foods.push({
			// 						...food,
			// 						count: 0,
			// 						category: category.category
			// 					});
			// 				}
			// 			});
			// 		}

			// 		categoryMap.set(category.category, {
			// 			name: category.category,
			// 			foods
			// 		});
			// 	});

			// 	this.foodsCategorizedInShop = Array.from(categoryMap.values());
			// 	if (this.foodsCategorizedInShop.length > 0) {
			// 		this.currentCategory = this.foodsCategorizedInShop[0].name;
			// 	}
			// 	console.log("foodsCategorizedInShop = ", this.foodsCategorizedInShop);
			// },
			switchCategory(categoryName) {
				this.currentCategory = categoryName;
			},
			clickFood(food) {
				// 跳转到菜品详情页
				uni.navigateTo({
					url: `/pages/shop/FoodDetailPage?id=${food.id}`
				});
			},
			async onAdd(food) {
				console.log(food);
				await this.$store.dispatch('cart/addFood', {
					foodId: food.id
				});
				// this.$refs.bottomCart.drop(target);
			},
			async onSub(food) {
				await this.$store.dispatch('cart/subFood', {
					foodId: food.id
				});
				// this.$refs.bottomCart.drop(target);
			},
			onPay(totalPrice) {
				// TODO 处理支付逻辑
				console.log('支付金额:', totalPrice);
			},
			async onClear() {
				await this.$store.dispatch('cart/clearCart');
			}
		},
		components: {
			Bubble,
			BottomCart,
			FoodCountController
		}
	};
</script>

<style scoped>
	.food-list {
		display: flex;
		height: 100%;
		background: #f5f5f5;
	}

	.category-nav {
		width: 160rpx;
		background: white;
	}

	.category-item {
		position: relative;
		padding: 30rpx 20rpx;
		font-size: 26rpx;
		text-align: center;
		border-bottom: 1rpx solid #eee;
	}

	.category-item.active {
		color: #FF5A5F;
		font-weight: bold;
		background: #FFF1F0;
	}

	.active-indicator {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 6rpx;
		height: 40rpx;
		background: #FF5A5F;
		border-radius: 3rpx;
	}

	.food-container {
		flex: 1;
		padding: 0 20rpx;
		overflow: auto;
	}

	.category-title {
		padding: 20rpx 0;
		font-size: 32rpx;
		font-weight: bold;
	}

	.food-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
		padding: 20rpx;
		background: white;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.food-header {
		display: flex;
		align-items: center;
	}

	.food-img {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 8rpx;
	}

	.food-info {
		flex: 1;
	}

	.name {
		font-size: 30rpx;
		color: #333;
		margin-bottom: 10rpx;
	}

	.desc {
		font-size: 24rpx;
		color: #999;
		margin-bottom: 15rpx;
	}

	.extra {
		display: flex;
		font-size: 22rpx;
		color: #999;
		margin-bottom: 15rpx;
	}

	.count {
		margin-right: 15rpx;
	}

	.price {
		display: flex;
		align-items: center;
	}

	.now {
		font-size: 32rpx;
		color: #FF5A5F;
		margin-right: 10rpx;
	}

	.old {
		font-size: 24rpx;
		color: #999;
		text-decoration: line-through;
	}

	.food-count--controller-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.bottom-cart-wrapper {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 100rpx;
	}
</style>