import fly from "../../http/api.js"
import Vue from 'vue'
export default {
	// 命名空间
	namespaced: true,
	state: {
		cart: [],
	},
	mutations: {
		setCart(state, data) {
			state.cart = data
		},
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		// 获取购物车
		async getCart({
			commit
		}, params) {
			try {
				let res = await fly.getCart(params)
				if (res.code === 200) {
					commit('setCart', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async delCart({
			commit
		}, params) {
			try {
				let res = await fly.delCart(params)
				if (res.code === 200) {
					console.log(res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},

		//底线
	},
}
