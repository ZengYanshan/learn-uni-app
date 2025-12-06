<template>
  <view class="shop-card" @click="$emit('click')">
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
</template>

<script>
export default {
  name: 'ShopCard',
  props: {
    shop: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.shop-card {
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
</style>