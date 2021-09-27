import fly from "../../http/api.js"
import Vue from 'vue'
export default {
	// 命名空间
	namespaced: true,
	state: {
		words: [],
		searchList: [],
	},
	mutations: {
		setWords(state, data) {
			state.words = data
		},
		setSearchList(state, data) {
			state.searchList = data
		},
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数

		// 获取新品
		async getSearchWords({
			commit
		}) {
			try {
				let res = await fly.getSearchWords()
				if (res.code === 200) {
					// console.log(res.data)
					commit('setWords', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取推荐商品
		// 获取导航商品详情
		async search({
			commit
		}, params) {
			try {
				let res = await fly.search(params)
				if (res.code === 200) {
					// console.log(res.data)
					commit('setSearchList', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
	},
}
