import {
	SET_CART
} from '../mutation-types';

const CART_DATA_KEY = 'cart-data-key';

export default {
	namespace: true,
	state: {
		cartData: [] // 购物车数据格式: [{foodId: 101, count: 2}]
	},
	mutations: {
		[SET_CART](state, payload) {
			state.cartData = payload;
			// 保存到本地
			uni.setStorage({
				key: CART_DATA_KEY,
				data: payload
			});
			
			console.log(`uni.setStorage(${payload}) called`, payload);
		}
	},
	actions: {
		async loadCart({
			commit
		}) {
			try {
				const res = await uni.getStorage({
					key: CART_DATA_KEY
				});
				commit(SET_CART, res.data);
			} catch (e) {
				commit(SET_CART, []);
			}
		},
		addFood({
			commit,
			state
		}, {
			foodId,
			count = 1
		}) {
			const newCartData = [...state.cartData];
			const itemIndex = newCartData.findIndex(item => item.foodId === foodId);
			if (itemIndex >= 0) {
				const item = newCartData[itemIndex];
				item.count++;
				newCartData[itemIndex] = item;
			} else {
				newCartData.push({
					foodId: foodId,
					count: count
				});
			}

			commit(SET_CART, newCartData);
		},
		subFood({
			commit,
			state
		}, {
			foodId,
			count = 1
		}) {
			const newCartData = [...state.cartData];
			// 查找要减少的商品
			const itemIndex = newCartData.findIndex(item => item.foodId === foodId);
			// 如果商品不存在于购物车中，直接返回
			if (itemIndex === -1) {
				console.warn(`商品 ${foodId} 不在购物车中`);
				return;
			}
			const item = newCartData[itemIndex];
			// 减少商品数量
			item.count -= count;
			newCartData[itemIndex] = item;
			// 如果数量小于等于0，从购物车中移除该商品
			if (item.count <= 0) {
				newCartData.splice(itemIndex, 1);
			}
			// 提交变更
			commit(SET_CART, newCartData);
		},
		clearCart({
			commit
		}) {
			commit(SET_CART, []);
		}
	}
}