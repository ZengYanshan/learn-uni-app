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
						<image class="bottom-cart-icon" :class="{'highlight': totalCount > 0}"
							src="/static/images/icon-cart.png" />
					</view>
					<!-- 总数 -->
					<view class="bottom-cart-count" v-show="totalCount > 0">
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

		<bottom-cart-list :visible='listShow' :selected-foods='selectedFoods' @hide='hideList' @add="onAdd" @sub='onSub'
			@clear="onClear" @click-food="onClickFood" />

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

			pay(e) {
				this.$emit('pay', this.totalPrice);
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
			onAdd(food) {
				this.$emit('add', food);
			},
			onSub(food) {
				this.$emit('sub', food);
			},
			onClear() {
				// 清空购物车
				this.$emit('clear');
				this.hideList();
			},
			onClickFood(food) {
				this.$emit('click-food', food);
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
		top: -22rpx;
		margin: 0 24rpx;
		padding: 12rpx;
		width: 112rpx;
		height: 112rpx;
		box-sizing: border-box;
		border-radius: 50%;
		background: #2d343c;
	}

	.logo {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		text-align: center;
		background: #2b333b;
	}

	.logo.highlight {
		background: #00a0dc;
	}

	.bottom-cart-icon {
		display: block;
		width: 44rpx;
		height: 44rpx;
		margin: 22rpx auto;
	}

	.bottom-cart-icon.highlight {
		color: #fff;
	}

	.bottom-cart-count {
		position: absolute;
		right: 2rpx;
		top: 2rpx;
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
		width: 100%;
		height: 100%;
		line-height: 100rpx;
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