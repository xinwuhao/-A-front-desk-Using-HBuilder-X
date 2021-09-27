import fly from "../../http/api.js"
import Vue from 'vue'
import dayjs from 'dayjs'
export default {
	// 命名空间
	namespaced: true,
	state: {
		orders: [],
	},
	mutations: {
		setOrders(state, data) {
			state.orders = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数

		// 获取
		async getAppOrder({
			commit
		}, params) {
			try {
				let res = await fly.getAppOrder(params)
				if (res.code === 200) {
					// console.log(res.data)
					let arr = res.data.map((item) => {
						return item.pay_time = dayjs(item.pay_time).format('YYYY/MM/DD HH:mm:ss')
					})
					commit('setOrders', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		//删除
		async delOrder({
			commit
		}, params) {
			try {
				let res = await fly.delOrder(params)
				if (res.code === 200) {
					// console.log(res)
				}
			} catch (err) {
				console.log(err)
			}
		},
	},
}
