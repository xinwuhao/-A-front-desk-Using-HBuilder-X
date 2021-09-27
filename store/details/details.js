import fly from "../../http/api.js"
import Vue from 'vue'
export default {
	// 命名空间
	namespaced: true,
	state: {
		goodsList: [],
		hot: [],
		recommend: []
	},
	mutations: {
		setGoods(state, data) {
			state.goodsList = data
		},
		setHot(state, data) {
			state.hot = data
		},
		setRecommend(state, data) {
			state.recommend = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		// 获取导航商品详情
		async goodsDetail({
			commit
		}, params) {
			try {
				let res = await fly.goodsDetail(params)
				if (res.code === 200) {
					let arr = []
					res.data.spec.map((item) => {
						Vue.set(item, 'showFlag', 0)
						if (item.checkList[0]) {
							arr.push({
								name: item.name,
								checked: item.checkList[0]
							})
						}
					})
					Vue.set(res.data, 'sku', arr)
					commit('setGoods', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		//添加购物车
		async addCart({
			commit
		}, params) {
			try {
				let res = await fly.addCart(params)
				if (res.code === 200) {
					// console.log(res)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取新品
		async getHot({
			commit
		}) {
			try {
				let res = await fly.getHot()
				if (res.code === 200) {
					// console.log('hot',res.data)
					commit('setHot', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取推荐商品
		async getRecommend({
			commit
		}) {
			try {
				let res = await fly.getRecommend()
				if (res.code === 200) {
					// console.log('Recommend',res.data)
					commit('setRecommend', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
	},
}
