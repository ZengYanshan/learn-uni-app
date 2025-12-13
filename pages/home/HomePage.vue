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

		<!-- 分类导航 
    <scroll-view class="category-scroll" scroll-x>
      <view class="category-item" v-for="cat in categories" :key="cat.id">
        <image :src="cat.icon" class="category-icon" />
        <text class="category-name">{{ cat.name }}</text>
      </view>
    </scroll-view>-->

		<!-- 推荐商家 -->
		<view class="section-title">
			<text>推荐商家</text>
			<text class="section-more" @click="gotoShopList">查看全部</text>
		</view>

		<scroll-view class="shop-list" scroll-y>
			<block v-for="shop in shops" :key="shop.id">
				<ShopCard :shop="shop" @click-shop="gotoShopDetail" @click-food="gotoShopDetail" />
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import ShopCard from '@/components/ShopCard.vue';
	import SHOPS from '@/static/data/shops.js';

	export default {
		components: {
			ShopCard
		},
		data() {
			return {
				banners: [{
						id: 1,
						image: '/static/images/banner1.jpg'
					},
					{
						id: 2,
						image: '/static/images/banner2.jpg'
					}
				],
				// categories: [{
				// 		id: 1,
				// 		name: '美食',
				// 		icon: '/static/images/cat-food.png'
				// 	},
				// 	{
				// 		id: 2,
				// 		name: '商超',
				// 		icon: '/static/images/cat-market.png'
				// 	},
				// 	{
				// 		id: 3,
				// 		name: '甜品',
				// 		icon: '/static/images/cat-dessert.png'
				// 	}
				// ],
				shops: [] // 商家数据
			};
		},
		onLoad() {
			this.loadShops();
		},
		methods: {
			// 加载商家数据
			loadShops() {
				this.shops = SHOPS;
				// console.log(this.shop);
			},
			// 跳转到商家列表页
			gotoShopList() {
				uni.navigateTo({
					url: '/pages/home/ShopListPage'
				});
			},
			// 跳转到商家详情页
			gotoShopDetail(options) {
				let _url = `/pages/shop/ShopDetailPage?shopId=${options.shopId}`;
				if (options.foodId) {
					_url += `&foodId=${options.foodId}`;
				}
				uni.navigateTo({
					url: _url
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

	.search-icon,
	.user-icon {
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