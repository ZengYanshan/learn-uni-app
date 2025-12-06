<template>
  <view class="food-card">
    <image class="food-image" :src="food.image" mode="aspectFill" />
    <view class="food-info">
      <text class="food-name">{{ food.name }}</text>
      <text class="food-desc">{{ food.description }}</text>
      <view class="food-footer">
        <text class="food-price">￥{{ food.price.toFixed(2) }}</text>
        <view class="food-actions">
          <text 
            v-if="food.quantity > 0" 
            class="action-btn minus" 
            @click.stop="updateQuantity(-1)"
          >-</text>
          <text v-if="food.quantity > 0" class="quantity">{{ food.quantity }}</text>
          <text 
            class="action-btn plus" 
            @click.stop="updateQuantity(1)"
          >+</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'FoodCard',
  props: {
    food: {
      type: Object,
      required: true
    },
    shopId: {
      type: Number,
      required: true
    }
  },
  methods: {
    updateQuantity(change) {
      const newQuantity = Math.max(0, this.food.quantity + change);
      this.$emit('update-quantity', {
        foodId: this.food.id,
        shopId: this.shopId,
        quantity: newQuantity
      });
    }
  }
};
</script>

<style scoped>
.food-card {
  display: flex;
  padding: 30rpx;
  background: white;
  border-bottom: 1rpx solid #f5f5f5;
}

.food-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 10rpx;
  margin-right: 30rpx;
}

.food-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.food-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.food-desc {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 20rpx;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.food-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.food-price {
  font-size: 32rpx;
  color: #FF5A5F;
  font-weight: bold;
}

.food-actions {
  display: flex;
  align-items: center;
}

.action-btn {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  background: #FF5A5F;
  color: white;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.minus {
  background: #f5f5f5;
  color: #333;
}

.quantity {
  margin: 0 20rpx;
  font-size: 28rpx;
  color: #333;
  min-width: 40rpx;
  text-align: center;
}
</style>