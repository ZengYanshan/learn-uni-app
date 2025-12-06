<template>
	<view class="tab">
		<!-- 自定义标签栏 -->
		<scroll-view class="tab-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft"
			:scroll-into-view="`tab-${currentIndex}`">
			<view v-for="(tab, index) in tabs" :key="index" class="tab-item" :id="`tab-${index}`"
				:style="{ width: tabWidth + 'px' }" :class="{ 'active': currentIndex === index }"
				@click="changeTab(index)">
				<text>{{ tab.label }}</text>
				<view v-if="currentIndex === index" class="slider"></view>
			</view>
		</scroll-view>

		<!-- 滑动内容区域 -->
		<swiper class="swiper-container" :current="currentIndex" @change="onSwiperChange"
			:style="{ height: swiperHeight + 'px' }">
			<swiper-item v-for="(tab, index) in tabs" :key="index">
				<view class="swiper-item">
					<component :is="tab.component" :data="tab.data" v-if="currentIndex === index"></component>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'Tab',
		props: {
			tabs: {
				type: Array,
				default: () => []
			},
			initialIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				currentIndex: this.initialIndex,
				scrollLeft: 0,
				swiperHeight: 0,
				tabWidth: 100, // 默认宽度
				screenWidth: 0
			};
		},
		mounted() {
			this.calculateDimensions();
			window.addEventListener('resize', this.calculateDimensions);
			this.$watch('tabs', this.calculateDimensions);
		},
		beforeUnmount() {
			window.removeEventListener('resize', this.calculateDimensions);
		},
		methods: {
			calculateDimensions() {
				// 获取屏幕信息
				const systemInfo = uni.getSystemInfoSync();
				this.screenWidth = systemInfo.windowWidth;

				// 计算每个tab的宽度（留出边距）
				if (this.tabs.length > 0) {
					this.tabWidth = this.screenWidth / this.tabs.length;
				}

				// 计算swiper高度
				this.calculateSwiperHeight();
			},

			// 切换标签
			changeTab(index) {
				this.currentIndex = index;
			},

			// 计算swiper高度
			calculateSwiperHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.swiper-container').boundingClientRect(rect => {
					if (rect) {
						this.swiperHeight = rect.height;
					}
				}).exec();
			},

			// swiper滑动事件
			onSwiperChange(e) {
				const current = e.detail.current;
				this.currentIndex = current;
			}
		}
	};
</script>

<style scoped>
	.tab {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.tab-bar {
		white-space: nowrap;
		background: white;
		border-bottom: 1rpx solid #eee;
		overflow: hidden;
	}

	.tab-item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 88rpx;
		position: relative;
		text-align: center;
	}

	.tab-item.active {
		color: #FF5A5F;
	}

	.slider {
		position: absolute;
		bottom: -10rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 40rpx;
		height: 6rpx;
		background: #FF5A5F;
		border-radius: 3rpx;
	}

	.swiper-container {
		flex: 1;
		overflow: hidden;
	}

	.swiper-item {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>