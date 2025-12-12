<template>
	<view class="shop-detail">
		<view class="custom-navbar">
			<image src="/static/images/icon-back.png" class="back-icon" @click="goBack" />
			<text class="page-title">{{ shop.name }}</text>
		</view>
		<view class="main-container">
			<shop-header :shop="shop" />

			<!-- <view class="tab-wrapper">
				<tab :tabs="tabs" />
			</view> -->
			
			<view class="food-list-wrapper">
				<food-list :data="{shop: shop}"/>
			</view>
		</view>
	</view>
</template>

<script>
	import ShopHeader from '@/components/ShopHeader.vue';
	// import Tab from '@/components/Tab.vue';
	import FoodList from '@/components/FoodList.vue';
	import CommentList from '@/components/CommentList.vue';
	import SHOPS from '@/static/data/shops.js';

	export default {
		components: {
			ShopHeader,
			FoodList
			// Tab
		},
		data() {
			return {
				shop: {},
			};
		},
		computed: {
			tabs() {
				if (this.shop) {
					console.log("shop数据已加载，可传正确tab");
				}
				
				return [{
						label: '商品',
						component: FoodList,
						data: {
							shop: this.shop
						}
					},
					{
						label: '评论',
						component: CommentList,
						data: {
							shop: this.shop
						}
					}
				]
			},
		},
		onLoad(options) {
			this.loadShopData(options.id);
		},
		methods: {
			loadShopData(shopId) {
				// try {
				// 	// 加载商家数据
				// 	const shopRes = await uni.request({
				// 		url: '/static/data/shops.json',
				// 		dataType: 'json'
				// 	});
				// 	this.shop = shopRes.data.find(s => s.id == shopId) || {};
				// 	// this.isShopDataLoaded = true;
				// 	console.log("加载shop数据成功");
				// } catch (e) {
				// 	console.error('加载数据失败', e);
				// }
				this.shop = SHOPS.find(s => s.id == shopId) || {};
			},

			goBack() {
				uni.navigateBack();
			}
		}
	};
</script>

<style>
	.shop-detail {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: #f5f5f5;
	}

	.custom-navbar {
		display: flex;
		align-items: center;
		padding: 15rpx 30rpx;
		background-color: #FF5A5F;
		color: white;
	}

	.back-icon,
	.action-icon {
		width: 44rpx;
		height: 44rpx;
	}

	.main-container {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.tab-wrapper {
		position: fixed;
		top: 256rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		/* 		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx; */
	}
	
	.food-list-wrapper {
		position: fixed;
		top: 256rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
	}
</style>