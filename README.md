### 项目描述

基于 uni-app 的外卖 APP 用户端，部署到 Android 手机。不做前后端分离，不联网，所有数据记录在本地。

### 项目结构

```
src/
├── pages/                  # 页面目录（按功能模块划分）
│   ├── home/               # 首页相关
│   │   ├── HomePage.vue    # 首页
│   │   └── ShopListPage.vue # 商家列表页
│   ├── shop/               # 商家相关
│   │   ├── ShopDetailPage.vue # 商家详情页
│   │   └── FoodDetailPage.vue # 菜品详情页
│   ├── cart/               # 购物车与订单
│   │   ├── CartPage.vue     # 购物车页
│   │   ├── OrderConfirmPage.vue # 确认订单页
│   │   ├── OrderListPage.vue # 订单列表页
│   │   └── OrderDetailPage.vue # 订单详情页
│   └── profile/            # 个人中心
│       ├── ProfilePage.vue  # 个人中心页
│       └── AddressEditPage.vue # 地址编辑页
├── components/             # 公共组件
│   ├── bottom-cart/        # 底部购物车相关
│   │   ├── BottomCart.vue  # 底部购物车
│   │   └── BottomCartList.vue # 底部购物车内部列表
│   └── FoodCountController.vue # 商品加减按钮组件
│   ├── ShopHeader.vue      # 商家Header组件
│   ├── Tab.vue             # 滑动切换组件
│   ├── FoodList.vue        # 菜品列表组件
│   ├── CommentList.vue     # 评论列表组件
│   ├── ShopCard.vue        # 商家卡片组件
│   ├── FoodCard.vue        # 菜品卡片组件
│   ├── CartItem.vue        # 购物车商品项
│   └── OrderItem.vue       # 订单项组件
├── static/                 # 静态资源（图片、JSON数据）
│   ├── images/             # 图片资源
│   │   ├── logo.png        # 应用Logo
│   │   └── kfc.jpg         # 商家图片
│   └── data/               # 模拟数据（JSON文件）
│       ├── shops.js        # 商家数据
│       └── foods.js        # 菜品数据
├── store/                  # Vuex状态管理（模拟数据持久化）
│   ├── index.js            # Vuex主文件
│   ├── mutation-types.js   # mutation类型
│   ├── modules/            # 模块划分
│   │   ├── user.js         # 用户信息
│   │   ├── cart.js         # 购物车数据
│   │   └── order.js        # 订单数据
├── utils/                  # 工具函数
│   ├── storage.js          # 本地存储封装（localStorage/uni.setStorage）
│   └── filter.js           # 过滤器（如价格格式化）
├── App.vue                 # 应用根组件
└── main.js                 # 应用入口文件
```

### 代码

#### pages

##### home

HomePage.vue

```
<template>
  <view class="home-page">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <image src="/static/images/logo.png" class="logo" />
      <text class="app-name">自定义标题</text>
      <view class="nav-actions">
        <image src="/static/images/icon-search.png" class="search-icon" />
        <image src="/static/images/icon-user.png" class="user-icon" />
      </view>
    </view>

    <!-- 轮播图 -->
    <swiper class="banner-swiper" autoplay circular>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <image :src="item.image" mode="aspectFill" class="banner-img" />
      </swiper-item>
    </swiper>

    <!-- 分类导航 -->
    <scroll-view class="category-scroll" scroll-x>
      <view class="category-item" v-for="cat in categories" :key="cat.id">
        <image :src="cat.icon" class="category-icon" />
        <text class="category-name">{{ cat.name }}</text>
      </view>
    </scroll-view>

    <!-- 推荐商家 -->
    <view class="section-title">
      <text>推荐商家</text>
      <text class="section-more" @click="gotoShopList">查看全部</text>
    </view>
    
    <scroll-view class="shop-list" scroll-y>
      <block v-for="shop in shops" :key="shop.id">
        <ShopCard :shop="shop" @click="gotoShopDetail(shop.id)" />
      </block>
    </scroll-view>
  </view>
</template>

<script>
import ShopCard from '@/components/ShopCard.vue';
import SHOPS from '@/static/data/shops.js';

export default {
  components: { ShopCard },
  data() {
    return {
      banners: [
        { id: 1, image: '/static/images/banner1.jpg' },
        { id: 2, image: '/static/images/banner2.jpg' }
      ],
      categories: [
        { id: 1, name: '美食', icon: '/static/images/cat-food.png' },
        { id: 2, name: '商超', icon: '/static/images/cat-market.png' },
        { id: 3, name: '甜品', icon: '/static/images/cat-dessert.png' }
      ],
      shops: [] // 商家数据
    };
  },
  onLoad() {
    this.loadShops();
  },
  methods: {
    // 加载商家数据
    async loadShops() {
      // try {
      //   const res = await uni.request({
      //     url: '/static/data/shops.json',
      //     dataType: 'json'
      //   });
      //   this.shops = res.data;
      // } catch (e) {
      //   console.error('加载商家数据失败', e);
      // }
	  this.shops = shops;
	  console.log(this.shop);
    },
    // 跳转到商家列表页
    gotoShopList() {
      uni.navigateTo({ url: '/pages/home/ShopListPage' });
    },
    // 跳转到商家详情页
    gotoShopDetail(shopId) {
      uni.navigateTo({
        url: `/pages/shop/ShopDetailPage?id=${shopId}`
      });
    }
  }
};
</script>

<style>
.home-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 自定义导航栏 */
.custom-navbar {
  display: flex;
  align-items: center;
  padding: 15rpx 30rpx;
  background-color: #FF5A5F;
  color: white;
}
.logo {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}
.app-name {
  font-size: 36rpx;
  font-weight: bold;
}
.nav-actions {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.search-icon, .user-icon {
  width: 44rpx;
  height: 44rpx;
  margin-left: 30rpx;
}

/* 轮播图 */
.banner-swiper {
  height: 350rpx;
}
.banner-img {
  width: 100%;
  height: 100%;
}

/* 分类导航 */
.category-scroll {
  white-space: nowrap;
  background: white;
  padding: 20rpx 0;
}
.category-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 150rpx;
  margin: 0 20rpx;
}
.category-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}
.category-name {
  font-size: 26rpx;
  color: #333;
}

/* 推荐商家 */
.section-title {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background: white;
  font-size: 32rpx;
  font-weight: bold;
}
.section-more {
  color: #999;
  font-size: 28rpx;
  font-weight: normal;
}
.shop-list {
  height: calc(100vh - 400rpx);
  background: white;
}
</style>
```

ShopListPage.vue

```
<template>
  <view class="shop-list-page">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <image src="/static/images/icon-back.png" class="back-icon" @click="goBack" />
      <text class="page-title">商家列表</text>
      <view class="filter-btn" @click="toggleFilter">
        <text>筛选</text>
        <image src="/static/images/icon-filter.png" class="filter-icon" />
      </view>
    </view>

    <!-- 搜索栏 -->
    <view class="search-bar">
      <input 
        class="search-input" 
        placeholder="搜索商家/菜品" 
        v-model="searchKey" 
        @confirm="searchShops"
      />
      <image src="/static/images/icon-search.png" class="search-icon" />
    </view>

    <!-- 筛选条件 -->
    <view class="filter-bar">
      <view 
        class="filter-item" 
        v-for="filter in filters" 
        :key="filter.type"
        @click="selectFilter(filter.type)"
      >
        <text class="filter-text">{{ filter.label }}</text>
        <text v-if="currentFilter === filter.type" class="active-indicator">✓</text>
      </view>
    </view>

    <!-- 商家列表 -->
    <scroll-view class="shop-list" scroll-y>
      <block v-for="shop in filteredShops" :key="shop.id">
        <ShopCard :shop="shop" @click="gotoShopDetail(shop.id)" />
      </block>
      <view v-if="filteredShops.length === 0" class="empty-tip">
        <text>未找到相关商家</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import ShopCard from '@/components/ShopCard.vue';
import shops from '@/static/data/shops.js';

export default {
  components: { ShopCard },
  data() {
    return {
      searchKey: '',
      currentFilter: 'default',
      filters: [
        { type: 'default', label: '综合排序' },
        { type: 'sales', label: '销量最高' },
        { type: 'rating', label: '评分最高' },
        { type: 'delivery', label: '配送最快' }
      ],
      allShops: [], // 所有商家数据
      filteredShops: [] // 过滤后的商家
    };
  },
  onLoad() {
    this.loadShops();
  },
  methods: {
    // 加载商家数据
    async loadShops() {
      // try {
      //   const res = await uni.request({
      //     url: '/static/data/shops.json',
      //     dataType: 'json'
      //   });
      //   this.allShops = res.data;
      //   this.filteredShops = res.data;
      // } catch (e) {
      //   console.error('加载商家数据失败', e);
      // }
	  this.allShops = shops;
	  this.filteredShops = shops;
    },
    // 搜索商家
    searchShops() {
      if (!this.searchKey) {
        this.filteredShops = this.allShops;
        return;
      }
      this.filteredShops = this.allShops.filter(shop => 
        shop.name.includes(this.searchKey) || 
        shop.tags.some(tag => tag.includes(this.searchKey))
      );
    },
    // 选择筛选条件
    selectFilter(type) {
      this.currentFilter = type;
      // 根据类型排序商家
      switch(type) {
        case 'sales':
          this.filteredShops.sort((a, b) => b.sales - a.sales);
          break;
        case 'rating':
          this.filteredShops.sort((a, b) => b.rating - a.rating);
          break;
        case 'delivery':
          this.filteredShops.sort((a, b) => a.deliveryTime - b.deliveryTime);
          break;
        default:
          this.filteredShops = this.allShops;
      }
    },
    // 跳转商家详情页
    gotoShopDetail(shopId) {
      uni.navigateTo({
        url: `/pages/shop/ShopDetailPage?id=${shopId}`
      });
    },
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 切换筛选面板
    toggleFilter() {
      uni.showActionSheet({
        itemList: this.filters.map(f => f.label),
        success: (res) => {
          this.selectFilter(this.filters[res.tapIndex].type);
        }
      });
    }
  }
};
</script>

<style>
.shop-list-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

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
  text-align: center;
  font-size: 36rpx;
  font-weight: bold;
}
.filter-btn {
  display: flex;
  align-items: center;
}
.filter-icon {
  width: 36rpx;
  height: 36rpx;
  margin-left: 10rpx;
}

/* 搜索栏 */
.search-bar {
  padding: 20rpx 30rpx;
  background: white;
}
.search-input {
  height: 70rpx;
  padding: 0 20rpx;
  border-radius: 35rpx;
  background: #f5f5f5;
  font-size: 28rpx;
}
.search-icon {
  position: absolute;
  right: 50rpx;
  top: 25rpx;
  width: 40rpx;
  height: 40rpx;
}

/* 筛选条件 */
.filter-bar {
  display: flex;
  justify-content: space-around;
  background: white;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
}
.filter-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
}
.active-indicator {
  margin-left: 8rpx;
  color: #FF5A5F;
}

/* 商家列表 */
.shop-list {
  height: calc(100vh - 250rpx);
}
.empty-tip {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  color: #999;
}
</style>
```

#### components

FoodList.vue

```
<template>
	<view class="food-list">
		<!-- 左侧分类导航 -->
		<scroll-view class="category-nav" scroll-y>
			<view v-for="(category, index) in foodCategories" :key="index" class="category-item"
				:class="{ 'active': currentCategory === category.name }" @click="switchCategory(category.name)">
				<text>{{ category.name }}</text>
				<view v-if="currentCategory === category.name" class="active-indicator"></view>
			</view>
		</scroll-view>

		<!-- 右侧商品列表 -->
		<scroll-view class="food-container" scroll-y>
			<view v-for="(category, idx) in foodCategories" :key="idx">
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
							<food-count-controller @add='onAdd' :food='food' />
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部购物车 -->
		<view class="bottom-cart-wrapper">
			<bottom-cart ref="bottomCart" :selected-foods="selectedFoods" :delivery-fee="data.shop.deliveryFee"
				@pay="handlePay" @clear="handleClear" />
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
				foodCategories: [],
				allFoods: []
			};
		},
		computed: {
			selectedFoods() {
				// let _selectedFoods = [];
				// this.foodCategories.forEach((category) => {
				// 	category.foods.forEach((food) => {
				// 		if (food.count) {
				// 			_selectedFoods.push(food);
				// 		}
				// 	})
				// })
				// return _selectedFoods;
				return this.$store.state.cart.cart.map(item => {
				  const food = FOODS.find(f => f.id === item.foodId);
				  return {
				    ...food,
				    count: item.count
				  };
				});
			},
		},
		watch: {
			// 监听data变化，当shop数据就绪时初始化
			'data.shop': {
				handler(newVal) {
					if (newVal && newVal.menu) {
						console.log("watched");
						this.initializeFoodData();
					}
				},
				immediate: true, // 立即执行一次
				deep: true
			}
		},
		methods: {
			async loadFoodData() {
				// try {
				// 	const res = await uni.request({
				// 		url: '/static/data/foods.json',
				// 		dataType: 'json'
				// 	});
				// 	this.allFoods = res.data;
				// 	console.log("加载food数据成功");
				// } catch (error) {
				// 	console.error('加载菜品数据失败', error);
				// }
				this.allFoods = FOODS;
			},
			async initializeFoodData() {
				console.log('initializeFoodData()');
				if (this.allFoods.length === 0) {
					console.log('开始加载foods数据...');
					await this.loadFoodData();
				}
				// 添加防御性检查
				if (!this.data?.shop?.menu || !Array.isArray(this.data.shop.menu)) {
					console.warn('Shop menu data is not ready yet');
					return;
				}

				const categoryMap = new Map();
				// 遍历
				this.data.shop.menu.forEach(category => {
					const foods = [];

					// 添加安全检查
					if (category.items && Array.isArray(category.items)) {
						category.items.forEach(item => {
							const food = this.allFoods.find(f => f.id === item.foodId);
							if (food) {
								foods.push({
									...food,
									count: 0,
									category: category.category
								});
							}
						});
					}

					categoryMap.set(category.category, {
						name: category.category,
						foods
					});
				});

				this.foodCategories = Array.from(categoryMap.values());
				if (this.foodCategories.length > 0) {
					this.currentCategory = this.foodCategories[0].name;
				}
				// console.log("foodCategories = ", this.foodCategories);
			},
			switchCategory(categoryName) {
				this.currentCategory = categoryName;
			},
			clickFood(food) {
				// 跳转到菜品详情页
				uni.navigateTo({
					url: `/pages/shop/FoodDetailPage?id=${food.id}`
				});
			},
			async onAdd(target) {
				const food = this.selectedFoods.find(f => f.id === target.foodId);
				await this.$store.dispatch('cart/addFood', {
					food,
					count: target.count
				});
				this.$refs.bottomCart.drop(target);
			},
			handlePay(totalPrice) {
				// TODO 处理支付逻辑
				console.log('支付金额:', totalPrice);
			},
			async handleClear() {
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
```

##### bottom-cart

BottomCart.vue

```
<template>
	<!-- 底部购物车 -->
	<view class="bottom-cart">
		<!-- 购物车主体 -->
		<view class="content" @click="toggleList">
			<!-- 左栏 -->
			<view class="content-left">
				
				<view class="logo-wrapper">
					<!-- 购物车图标 -->
					<view class="logo" :class="{'highlight': totalCount > 0}">
						<image class="icon-bottom_cart" :class="{'highlight': totalCount > 0}"
							src="/static/images/icon-cart.png" />
					</view>
					<!-- 总数 -->
					<view class="num" v-show="totalCount > 0">
						<bubble :num='totalCount' />
					</view>
				</view>
				<!-- 总价 -->
				<text class="price" :class="{'highlight': totalPrice > 0}">
					￥{{ totalPrice }}
				</text>
				<!-- 配送费 -->
				<text class="desc">另需配送费￥{{ deliveryFee }}元</text>
			</view>
			<!-- 支付按钮 -->
			<view class="content-right" @click.stop="pay">
				<view class="pay" :class="payClass">
					{{ payDesc }}
				</view>
			</view>
		</view>

		<!-- TODO 动画小球 -->
		<view class="ball-container">
			<view v-for="(ball,index) in balls" :key="index">
				<transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<view class="ball" v-show="ball.show">
						<view class="inner inner-hook"></view>
					</view>
				</transition>
			</view>
		</view>

		<bottom-cart-list :visible='listShow' :selected-foods='selectedFoods' @hide='hideList'
			@add="onAdd" @clear="clearList" />

	</view>
</template>

<script>
	import BottomCartList from './BottomCartList.vue';
	import Bubble from '@/components/Bubble.vue';

	const BALL_COUNT = 10;
	const INNER_CLASS_HOOK = 'inner-hook';

	function createBalls() {
		let balls = [];
		for (let i = 0; i < BALL_COUNT; i++) {
			balls.push({
				show: false
			});
		}
		return balls;
	}

	export default {
		name: 'BottomCart',
		props: {
			selectedFoods: {
				type: Array,
				default: () => []
			},
			deliveryFee: {
				type: Number,
				default: 0
			},
			sticky: {
				type: Boolean,
				default: false
			},
			fold: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				balls: createBalls(),
				listFold: this.fold,
				listShow: false // 控制购物车列表显示
			};
		},
		created() {
			this.balls = [];
		},
		computed: {
			totalPrice() {
				return this.selectedFoods.reduce(
					(total, food) => total + food.price * food.count,
					0
				);
			},
			totalCount() {
				return this.selectedFoods.reduce(
					(count, food) => count + food.count,
					0
				);
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return `未选择`;
				} else {
					return '去结算';
				}
			},
			payClass() {
				return this.totalCount ? 'enough' : 'not-enough';
			}
		},
		methods: {
			toggleList() {
				if (this.listFold) {
					if (!this.totalCount) return;
					this.listFold = false;
					this.listShow = true;
					this.$emit('toggle-list');
				} else {
					this.hideList();
				}
			},
			hideList() {
				this.listFold = true;
				this.listShow = false;
			},

			async pay(e) {

				await uni.showModal({
					title: '支付确认',
					content: `您需要支付${this.totalPrice}元`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('payment-confirmed');
						}
					}
				});
			},

			drop(el) {
				for (let i = 0; i < this.balls.length; i++) {
					const ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeDrop(el) {
				const ball = this.dropBalls[this.dropBalls.length - 1];
				const rect = ball.el.getBoundingClientRect();
				const x = rect.left - 32;
				const y = -(window.innerHeight - rect.top - 22);
				el.style.display = '';
				el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
				const inner = el.getElementsByClassName(innerClsHook)[0];
				inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
			},
			dropping(el, done) {
				this._reflow = document.body.offsetHeight;
				el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`;
				const inner = el.getElementsByClassName(innerClsHook)[0];
				inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`;
				el.addEventListener('transitionend', done);
			},
			afterDrop(el) {
				const ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;
					el.style.display = 'none';
				}
			},
			
			clearList() {
				// 清空购物车
				this.$emit('clear');
				this.hideList();
			}
		},
		watch: {
			fold(newVal) {
				this.listFold = newVal;
			}
		},
		components: {
			BottomCartList,
			Bubble
		}
	};
</script>

<style scoped>
	.bottom-cart {
		height: 100%;
		position: relative;
	}

	.content {
		display: flex;
		background: #2d343c;
		color: rgba(255, 255, 255, 0.4);
		font-size: 0;
		
		position: relative;
		z-index: 100;
	}

	.content-left {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.logo-wrapper {
		position: relative;
		margin: 0 24rpx;
		padding: 12rpx;
		width: 112rpx;
		height: 112rpx;
		box-sizing: border-box;
		border-radius: 50%;
		background: #2d343c;
	}

	.logo {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		text-align: center;
		background: #2b333b;
	}

	.logo.highlight {
		background: #00a0dc;
	}

	.icon-bottom_cart {
		display: block;
		width: 44rpx;
		height: 44rpx;
		margin: 22rpx auto;
	}

	.icon-bottom_cart.highlight {
		color: #fff;
	}

	.num {
		position: absolute;
		top: -10rpx;
		right: 0;
		background: #f01414;
		border-radius: 30rpx;
		padding: 0 16rpx;
		min-width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
	}

	.price {
		display: inline-block;
		vertical-align: top;
		margin-top: 24rpx;
		line-height: 48rpx;
		padding-right: 24rpx;
		box-sizing: border-box;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		font-weight: 700;
		font-size: 32rpx;
	}

	.price.highlight {
		color: #fff;
	}

	.desc {
		display: inline-block;
		vertical-align: top;
		margin: 24rpx 0 0 24rpx;
		line-height: 48rpx;
		font-size: 24rpx;
	}

	.content-right {
		flex: 0 0 210rpx;
		width: 210rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pay {
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		font-weight: 700;
		font-size: 28rpx;
	}

	.pay.not-enough {
		background: #2b333b;
		color: rgba(255, 255, 255, 0.4);
	}

	.pay.enough {
		background: #00b43c;
		color: #fff;
	}

	.ball-container {
		position: absolute;
		left: 0;
		bottom: 100rpx;
		z-index: 200;
	}

	.ball-container.ball {
		position: fixed;
		left: 32rpx;
		bottom: 22rpx;
		z-index: 200;
		transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}

	.ball-container.ball.inner {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background: blue;
		transition: all 0.4s linear;
	}
</style>
```

BottomCartList.vue

```
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
								<food-count-controller @add="onAdd" :food="food"></food-count-controller>
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
			onAdd(target) {
				this.$emit('add', target);
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
```

#### store

##### modules

cart.js

```
import {SET_CART} from '../mutation-types';

const CART_DATA_KEY = 'cart-data';

export default {
	state: {
		cart: [] // 购物车数据格式: [{foodId: 101, count: 2}]
	},
	mutations: {
		[SET_CART](state, payload) {
			state.cart = payload;
			// 保存到本地
			uni.setStorage({
				key: CART_DATA_KEY,
				data: payload
			});
		}
	},
	actions: {
		async loadCart({commit}) {
			try {
				const res = await uni.getStorage({
					key: CART_DATA_KEY
				});
				commit(SET_CART, res.data);
			} catch (e) {
				commit(SET_CART, []);
			}
		},
		addFood({commit, state}, {food, count}) {
			const item = state.cart.find(item => item.foodId === food.id);
			const newCart = [...state.cart];

			if (item) {
				item.count += count;
			} else {
				newCart.push({
					foodId: food.id,
					count: count
				});
			}

			commit(SET_CART, newCart);
		},
		clearCart({commit}) {
			commit(SET_CART, []);
		}
	}
}
```

#### static

##### data

shops.js

```
const SHOPS = [
  {
    "id": 1,
    "name": "肯德基",
    "image": "/static/images/kfc.png",
    "rating": 4.8,
    "deliveryTime": 30,
	"deliveryFee": 5,
    "tags": ["24小时营业", "免配送费", "品牌连锁"],
    "menu": [
		{
			"category": "主食",
			"items": [
				{"foodId": 101},
				{"foodId": 102}
			]
		},
		{
			"category": "其他",
			"items": [
				{"foodId": 103}
			]
		}
    ]
  },
  {
    "id": 2,
    "name": "麦当劳",
    "image": "/static/images/mcd.png",
    "rating": 4.7,
    "deliveryTime": 25,
	"deliveryFee": 10,
    "tags": ["24小时营业", "免配送费", "品牌连锁"],
    "menu": [
      {
      	"category": "主食",
      	"items": [
      		{"foodId": 201},
      		{"foodId": 202}
      	]
      },
      {
      	"category": "其他",
      	"items": [
      		{"foodId": 203}
      	]
      }
    ]
  },
  {
    "id": 3,
    "name": "必胜客",
    "image": "/static/images/pizzahut.png",
    "rating": 4.5,
    "deliveryTime": 35,
	"deliveryFee": 0,
    "tags": ["品牌连锁", "套餐优惠"],
    "menu": [
      {
      	"category": "主食",
      	"items": [
      		{"foodId": 301},
      		{"foodId": 302}
      	]
      },
      {
      	"category": "其他",
      	"items": [
      		{"foodId": 303}
      	]
      }
    ]
  }
];
export default SHOPS;
```

foods.js

```
const FOODS = [
  {
    "id": 101,
    "name": "香辣鸡腿堡",
    "image": "/static/images/food-burger.jpg",
    "price": 22.00,
    "description": "经典香辣鸡腿堡，外酥里嫩，辣味十足"
  },
  {
    "id": 102,
    "name": "吮指原味鸡",
    "image": "/static/images/food-chicken.jpg",
    "price": 12.50,
    "description": "酥脆外皮，鲜嫩多汁，一口满足"
  },
  {
    "id": 103,
    "name": "薯条",
    "image": "/static/images/food-fries.jpg",
    "price": 8.00,
    "description": "黄金酥脆，搭配番茄酱更美味"
  },
  {
    "id": 201,
    "name": "巨无霸汉堡",
    "image": "/static/images/food-burger.jpg",
    "price": 25.00,
    "description": "双层牛肉饼，搭配新鲜蔬菜，分量十足"
  },
  {
    "id": 202,
    "name": "麦辣鸡翅",
    "image": "/static/images/food-wings.jpg",
    "price": 15.00,
    "description": "香辣可口，外酥里嫩，回味无穷"
  },
  {
    "id": 203,
    "name": "麦乐鸡",
    "image": "/static/images/food-chicken.jpg",
    "price": 18.00,
    "description": "精选鸡肉，搭配特制酱料"
  },
  {
    "id": 301,
    "name": "超级至尊披萨",
    "image": "/static/images/food-pizza.jpg",
    "price": 68.00,
    "description": "丰富的配料，芝士浓郁，口感丰富"
  },
  {
    "id": 302,
    "name": "意式肉酱面",
    "image": "/static/images/food-pasta.jpg",
    "price": 32.00,
    "description": "经典意式肉酱，搭配劲道面条"
  },
  {
    "id": 303,
    "name": "提拉米苏",
    "image": "/static/images/food-dessert.jpg",
    "price": 28.00,
    "description": "意大利经典甜品，咖啡香与马斯卡彭奶酪的完美结合"
  }
];
export default FOODS;
```
