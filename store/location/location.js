import fly from "../../http/api.js"
import Vue from 'vue'
export default {
	// 命名空间
	namespaced: true,
	state: {
		seat: [],
	},
	mutations: {
		setSeat(state, data) {
			state.seat = data
		},
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数

		// 添加 
		async addAddress({
			commit
		}, params) {
			try {
				let res = await fly.addAddress(params)
				if (res.code === 200) {
					// console.log(res)
					uni.navigateTo({
						url: `/pages/location/location`
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		async setDefault({
			commit
		}, params) {
			try {
				let res = await fly.setDefault(params)
				if (res.code === 200) {
					console.log(res)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 删除
		async delAddress({
			commit
		}, params) {
			try {
				let res = await fly.delAddress(params)
				if (res.code === 200) {
					// console.log('删除', res)

				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取
		async getAppAddress({
			commit
		}, params) {
			try {
				let res = await fly.getAppAddress(params)
				if (res.code === 200) {
					// console.log(res.data)
					let arr = []
					res.data.map(item => {
						return arr.push({
							id: item['id'],
							name: item['username'],
							tel: item['mobile'],
							address: item['address'],
							isDefault: item['isDefault'],
						})
					})
					uni.setStorageSync('list', arr)
					commit('setSeat', arr)
				}
			} catch (err) {
				console.log(err)
			}
		},

	},
}
