import fly from "../../http/api.js"
import Vue from 'vue'
export default {
	// 命名空间
	namespaced: true,
	state: {
		order: [],
	},
	mutations: {
		setOrder(state, data) {
			state.order = data
		},
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数

		// 添加 
		async addOrder({
			commit
		}, params) {
			try {
				let res = await fly.addOrder(params)
				if (res.code === 200) {
					// console.log(res)
					uni.switchTab({
						url: `/pages/homepage/homepage`
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 删除
		async delOrder({
			commit
		}, params) {
			try {
				let res = await fly.delOrder(params)
				if (res.code === 200) {
					console.log('删除', res)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取
		async getAppOrder({
			commit
		}, params) {
			try {
				let res = await fly.getAppOrder(params)
				if (res.code === 200) {
					console.log(res.data)
					commit('setOrder', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},

	},
}
