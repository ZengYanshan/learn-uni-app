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
│   ├── modules/            # 模块划分
│   │   ├── user.js         # 用户信息
│   │   ├── cart.js         # 购物车数据
│   │   └── order.js        # 订单数据
├── utils/                  # 工具函数
│   ├── request.js          # 模拟请求（读取本地JSON）
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
import shops from '@/static/data/shops.js';

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

#### static

##### data

shops.js

```
const shops = [
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
export default shops;
```

foods.js

```
const foods = [
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
export default foods;
```

