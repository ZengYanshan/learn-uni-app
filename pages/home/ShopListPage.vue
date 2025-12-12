<template>
  <view class="shop-list-page">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <image src="/static/images/icon-back.png" class="back-icon" @click="goBack" />
      <text class="page-title">商家列表</text>
      <!-- <view class="filter-btn" @click="toggleFilter">
        <text>筛选</text>
        <image src="/static/images/icon-filter.png" class="filter-icon" />
      </view> -->
    </view>

    <!-- 搜索栏 -->
    <view class="search-bar">
      <input 
        class="search-input" 
        placeholder="搜索商家/菜品" 
        v-model="searchKey" 
        @confirm="searchShops"
      />
      <!-- <image src="/static/images/icon-search.png" class="search-icon" /> -->
    </view>

    <!-- 筛选条件 
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
    </view>-->

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
import SHOPS from '@/static/data/shops.js';

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
	  this.allShops = SHOPS;
	  this.filteredShops = SHOPS;
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