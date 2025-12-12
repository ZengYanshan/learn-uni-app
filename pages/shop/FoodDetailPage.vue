<template>
	<view class="food-detail">
		<!-- 顶部导航 -->
		<view class="header">
			<image class="back-icon" src="/static/images/icon-back.png" @click="goBack"></image>
			<text class="header-title">商品详情</text>
		</view>

		<!-- 主内容区 -->
		<scroll-view scroll-y class="detail-content">
			<!-- 食物大图 -->
			<view class="image-section">
				<image class="food-image" :src="currentFood.image" mode="widthFix"></image>
			</view>

			<!-- 基础信息 -->
			<view class="info-section">
				<text class="food-name">{{currentFood.name}}</text>
				<view class="price-row">
					<text class="price">¥{{currentFood.price}}</text>
					<!-- <text class="monthly">月售{{monthlySales}}份</text> -->
				</view>
				<text class="description">{{currentFood.description}}</text>
			</view>

			<!-- 商品信息 -->
			<view v-if="currentFood.info" class="info-section">
				<view class="section-header">
					<text class="section-title">商品信息</text>
				</view>
				<text class="info-text">{{currentFood.info}}</text>
			</view>

			<!-- 评价区域 -->
			<view class="rating-section">
				<view class="section-header">
					<text class="section-title">商品评价</text>
					<text class="rating-count">({{ratings.length}}条评价)</text>
				</view>

				<!-- 评价筛选 -->
				<view class="filter-row">
					<view class="filter-tag" :class="{active: filterType === 'all'}" @click="setFilter('all')">
						全部
					</view>
					<view class="filter-tag" :class="{active: filterType === 'positive'}"
						@click="setFilter('positive')">
						好评
					</view>
					<view class="filter-tag" :class="{active: filterType === 'negative'}"
						@click="setFilter('negative')">
						差评
					</view>
				</view>

				<!-- 评价列表 -->
				<view class="rating-list">
					<view v-for="(rating, idx) in filteredRatings" :key="idx" class="rating-item">
						<view class="rating-header">
							<view class="rating-user">
								<text class="username">{{rating.username || '匿名用户'}}</text>
								<text class="rating-date">{{formatDate(rating.rateTime)}}</text>
							</view>
							<view class="rating-stars">
								<image v-for="n in 5" :key="n"
									:src="n <= rating.rating ? '/static/images/star-full.png' : '/static/images/star-empty.png'"
									class="star-icon" />
							</view>
						</view>
						<text class="rating-content">{{rating.text}}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部按钮 -->
		<view class="bottom-wrapper">
			<view class="cart-icon" >
				
			</view>
			<view class="add-cart-btn" @click="addFood">
				<text>加入购物车</text>
			</view>
			<!-- 底部购物车 
			<view class="bottom-cart-wrapper">
				<bottom-cart ref="bottomCart" :selected-foods="selectedFoods" :delivery-fee="data.shop.deliveryFee"
					@add='onAdd' @sub='onSub' @pay="onPay" @clear="onClear" />
			</view>-->
		</view>
	</view>
</template>

<script>
	import FOODS from '@/static/data/foods.js';

	export default {
		data() {
			return {
				food: {}
			};
		},
		computed: {
			currentFood() {
				return this.data.foods.find(f => f.id == this.foodId) || {};
			},
			deliveryFee() {
				return this.data.shop?.deliveryFee || 0;
			},
			filteredRatings() {
				if (this.filterType === 'positive') {
					return this.ratings.filter(r => r.rating >= 4);
				} else if (this.filterType === 'negative') {
					return this.ratings.filter(r => r.rating < 4);
				}
				return this.ratings;
			}
		},
		onLoad(options) {
			this.foodId = options.id;
			loadFoodData();
		},
		methods: {
			loadFoodData(foodId) {
				this.food = FOODS.find(f => f.id == foodId) || {};
			},
			goBack() {
				uni.navigateBack();
			},
			addFood() {
				this.addFood({
					foodId: this.currentFood.id,
					count: 1
				});
				uni.showToast({
					title: '已加入购物车',
					icon: 'success'
				});
			}
		}
	};
</script>

<style scoped>
	.food-detail {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: #f8f8f8;
	}

	.header {
		position: relative;
		height: 100rpx;
		background: #fff;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
	}

	.back-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.header-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}

	.detail-content {
		flex: 1;
		padding: 30rpx;
		overflow: auto;
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

	.monthly {
		font-size: 28rpx;
		color: #999;
		margin-left: 20rpx;
	}

	.description {
		font-size: 30rpx;
		color: #666;
		line-height: 1.6;
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

	.rating-count {
		font-size: 26rpx;
		color: #999;
		margin-left: 10rpx;
	}

	.info-text {
		font-size: 30rpx;
		color: #666;
		line-height: 1.6;
	}

	.filter-row {
		display: flex;
		margin-bottom: 30rpx;
	}

	.filter-tag {
		padding: 10rpx 24rpx;
		background: #f5f5f5;
		border-radius: 50rpx;
		font-size: 28rpx;
		color: #666;
		margin-right: 20rpx;
	}

	.filter-tag.active {
		background: #fff3f0;
		color: #e93b3b;
		border: 1rpx solid #fcd5cf;
	}

	.rating-item {
		background: #fff;
		padding: 30rpx;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
	}

	.rating-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.rating-user {
		display: flex;
		flex-direction: column;
	}

	.username {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 8rpx;
	}

	.rating-date {
		font-size: 24rpx;
		color: #999;
	}

	.rating-stars {
		display: flex;
	}

	.star-icon {
		width: 28rpx;
		height: 28rpx;
		margin-left: 4rpx;
	}

	.rating-content {
		font-size: 30rpx;
		color: #333;
		line-height: 1.5;
	}

	.bottom-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		height: 120rpx;
		background: #fff;
		padding: 0 30rpx;
		box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.05);
	}

	.price-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.total-price {
		font-size: 40rpx;
		font-weight: bold;
		color: #e93b3b;
	}

	.delivery-fee {
		font-size: 24rpx;
		color: #999;
	}

	.add-cart-btn {
		width: 240rpx;
		height: 80rpx;
		background: linear-gradient(to right, #fcd5cf, #e93b3b);
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 32rpx;
		font-weight: bold;
		box-shadow: 0 4rpx 12rpx rgba(233, 59, 59, 0.2);
	}
</style>