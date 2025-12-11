// store/index.js

// #ifndef VUE3
import Vue from 'vue';
import * as Vuex from 'vuex';
import cart from './modules/cart';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		cart: {
			namespaced: true, // 显式声明命名空间
			...cart // 导入模块配置
		}
	}
});
export default store;
// #endif

// #ifdef VUE3
import {
	createStore
} from "vuex";
import cart from './modules/cart';
const store = createStore({
	modules: {
		cart: {
			namespaced: true, // 显式声明命名空间
			...cart // 导入模块配置
		}
	}
});
export default store;
// #endif