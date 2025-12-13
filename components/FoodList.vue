<template>
	<view class="food-list">
		<!-- 左侧分类导航 -->
		<scroll-view class="category-nav" scroll-y>
			<view v-for="(category, index) in foodsCategorizedInShop" :key="index" class="category-item"
				:class="{ 'active': currentCategory === category.name }" @click="switchCategory(index)">
				<text>{{ category.name }}</text>
				<view v-if="currentCategory === category.name" class="active-indicator"></view>
				<view v-if="category.count > 0" class="category-count">
					<bubble :num='category.count' />
				</view>
			</view>
		</scroll-view>

		<!-- 右侧商品列表 -->
		<scroll-view class="food-container" scroll-y scroll-with-animation :ref="foodContainer"
			:scroll-into-view="scrollIntoView" @scroll="handleScroll">
			<view v-for="(category, idx) in foodsCategorizedInShop" :key="idx" :ref="'category-' + idx"
				:id="'category-' + idx">
				<!-- 分类名称 -->
				<view class="category-title" :id="'title-' + idx">
					<text>{{ category.name }}</text>
				</view>

				<!-- 食物列表 -->
				<view v-for="food in category.foods" :key="food.id" class="food-item" @click="onClickFood(food)">
					<view class="food-header">
						<image class="food-image" :src="food.image" mode="aspectFill" />
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

	</view>
	<!-- 底部购物车 -->
	<view class="bottom-cart-wrapper">
		<bottom-cart ref="bottomCart" :selected-foods="selectedFoodsInShop" :delivery-fee="shop.deliveryFee"
			@add='onAdd' @sub='onSub' @pay="onPay" @clear="onClear" @click-food="onClickFood" />
	</view>

	<!-- 食物详情页 -->
	<food-detail ref="foodDetail" :visible="foodDetailShow" :current-food="currentFood" @hide='hideFoodDetail'
		@add="onAdd" />

</template>

<script>
	import BottomCart from '@/components/bottom-cart/BottomCart.vue';
	import FoodCountController from '@/components/FoodCountController.vue';
	import FoodDetail from '@/components/FoodDetail.vue';
	import Bubble from '@/components/Bubble.vue';
	import FOODS from '@/static/data/foods.js';

	export default {
		name: 'FoodList',
		props: {
			// data: {
			// 	type: Object,
			// 	default: () => ({})
			// }
			shop: {
				type: Object,
				default: {}
			},
			parentSelectedFood: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				currentCategory: '', // 当前高亮的分类
				categoryPositions: [], // 存储各分类的顶部位置
				scrollIntoView: '', // 用于 scroll-into-view 的 id
				scrollTimeout: null,
				currentFood: {},
				foodDetailShow: false
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.calculateCategoryPositions();
			});
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
				if (this.shop?.menu) {
					this.shop.menu.forEach(category => {
						const foods = [];
						if (category.items && Array.isArray(category.items)) {
							category.items.forEach(item => {
								const food = FOODS.find(f => f.id === item.foodId);
								if (food) {
									foods.push({
										...food,
										// 从购物车映射中获取数量，不存在则为0
										count: cartMap.get(food.id) || 0,
										categorcurrentFoody: category.category
									});
								}
							});
						}
						const selectedFoodCount = foods.reduce((total, food) => {
							return total + (food.count > 0 ? food.count : 0); // 统计已加购食物数量
						}, 0);

						categories.push({
							name: category.category,
							count: selectedFoodCount,
							foods
						});
					});
				}
				console.log("foodCategorizedInShop = ", categories);
				return categories;
			},
			selectedFoodsInShop() {
				// 1. 提取当前shop的所有有效foodId
				const foodIdsInShop = new Set();
				if (this.shop?.menu) {
					this.shop.menu.forEach(category => {
						category.items.forEach(item => {
							foodIdsInShop.add(item.foodId);
						});
					});
				}

				// 2. 过滤购物车数据：仅保留属于当前shop的food
				return this.$store.state.cart.cartData
					.map(item => {
						const food = FOODS.find(f => f.id === item.foodId);
						// 确保food存在且属于当前shop
						return food && foodIdsInShop.has(food.id) ? {
								...food,
								count: item.count
							} :
							null;
					})
					.filter(Boolean); // 移除null值
			}
		},
		watch: {
			foodsCategorizedInShop: {
				handler() {
					this.calculateCategoryPositions();
				},
				immediate: true,
			}
		},
		methods: {
			// 滚动事件处理
			handleScroll(e) {
				// console.log("handleScroll()", e);
				const scrollTop = e.detail.scrollTop;
				for (let i = 0; i < this.categoryPositions.length; i++) {
					const start = this.categoryPositions[i];
					const end = this.categoryPositions[i + 1] || Number.MAX_SAFE_INTEGER;
					console.log(start, scrollTop, end, this.categoryPositions);
					if (scrollTop >= start && scrollTop < end) {

						this.currentCategory = this.foodsCategorizedInShop[i].name;
						break;
					}
				}
			},

			// 计算每个分类的位置信息
			calculateCategoryPositions() {
				const query = uni.createSelectorQuery().in(this);
				this.categoryPositions = [];

				this.foodsCategorizedInShop.forEach((_, index) => {
					query.select('#title-' + index).boundingClientRect((res) => {
						if (res) {
							this.categoryPositions[index] = res.top;
						}
					}).exec();
				});
				// 遍历 categoryPositions，每一项都减去 categoryPositions[0]
				this.$nextTick(() => {
					if (this.categoryPositions.length > 0) {
						const basePosition = this.categoryPositions[0];
						this.categoryPositions = this.categoryPositions.map(pos => pos - basePosition);
					}
				});
			},


			// 点击左侧分类导航
			switchCategory(index) {
				this.currentCategory = this.foodsCategorizedInShop[index].name;
				this.scrollIntoView = `category-${index}`; // 设置 scroll-into-view 的目标 id
			},

			onClickFood(food) {
				this.showFoodDetail(food);
			},
			showFoodDetail(food) {
				// 打开菜品详情页
				this.currentFood = food;
				this.foodDetailShow = true;
			},
			hideFoodDetail() {
				this.foodDetailShow = false;
			},
			async onAdd(food) {
				console.log(food);
				await this.$store.dispatch('cart/addFood', {
					foodId: food.id
				});
				this.hideFoodDetail();
			},
			async onSub(food) {
				await this.$store.dispatch('cart/subFood', {
					foodId: food.id
				});
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
			FoodCountController,
			FoodDetail
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

	.category-count {
		position: absolute;
		right: 0;
		top: 0;
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

	.food-image {
		width: 160rpx;
		height: 160rpx;
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

	.food-count-controller-wrapper {
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