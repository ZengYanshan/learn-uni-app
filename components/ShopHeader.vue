<template>
  <view class="header">
    <view class="content-wrapper">
      <view class="avatar">
        <image mode="aspectFill" :src="shop.image" />
      </view>
      <view class="content">
        <view class="title">
          <!-- <image src="/static/images/brand-icon.png" class="brand-icon" /> -->
          <text class="name">{{ shop.name }}</text>
        </view>
        <view class="description">
          {{ shop.description || `${shop.rating}星商家 | ${shop.deliveryTime}分钟送达` }}
        </view>
        <view v-if="shop.tags" class="support">
           <!-- <support-ico :size="1" :type="shop.tags[0].type" /> -->
          <text class="text">{{ shop.tags[0].name }}</text>
        </view>
      </view>
  <!--    <view v-if="shop.tags" class="support-count">
        <text class="count">{{ shop.tags.length }}个活动</text>
        <image src="/static/images/icon-arrow-right.png" class="arrow-icon" />
      </view> -->
    </view>
    
<!--    <view v-if="shop.bulletin" class="bulletin-wrapper">
      <image src="/static/images/bulletin-icon.png" class="bulletin-icon" />
      <text class="bulletin-text">{{ shop.bulletin }}</text>
      <image src="/static/images/icon-arrow-right.png" class="arrow-icon" />
    </view> -->
    
    <view class="background">
      <image :src="shop.image" mode="aspectFill" style="width: 100%; height: 100%;" />
      <view class="blur-filter"></view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'ShopHeader',
  props: {
    shop: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
  }
};
</script>

<style>
.header {
  position: relative;
  width: 100%;
  height: 200rpx;
  overflow: hidden;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  /* padding-bottom: 20rpx; */
}

.content-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: 30rpx 20rpx 20rpx 30rpx;
}

.avatar {
  flex: 0 0 120rpx;
  width: 160rpx;
  margin-right: 30rpx;
  border-radius: 10rpx;
  overflow: hidden;
}
.avatar image {
	width: 120rpx;
	height: 120rpx;
}

.content {
  flex: 1;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.brand-icon {
  width: 40rpx;
  height: 24rpx;
  margin-right: 10rpx;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
}

.description {
  margin-bottom: 15rpx;
  font-size: 24rpx;
}

.support {
  display: flex;
  align-items: center;
  margin-top: 10rpx;
}

.support .text {
  margin-left: 8rpx;
  font-size: 22rpx;
}

.support-count {
  position: absolute;
  right: 30rpx;
  bottom: 20rpx;
  display: flex;
  align-items: center;
  padding: 8rpx 20rpx;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 30rpx;
}

.count {
  font-size: 22rpx;
  margin-right: 8rpx;
}

.arrow-icon {
  width: 20rpx;
  height: 20rpx;
}

.bulletin-wrapper {
  display: flex;
  align-items: center;
  height: 60rpx;
  padding: 0 20rpx;
  margin-top: 20rpx;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 30rpx;
}

.bulletin-icon {
  width: 24rpx;
  height: 24rpx;
  margin-right: 10rpx;
}

.bulletin-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 22rpx;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.blur-filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(40rpx);
}
</style>