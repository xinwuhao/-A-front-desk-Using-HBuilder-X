import fly from "../../http/api.js"
export default {
	// 命名空间
	namespaced: true,
	state: {
		coupon: [],
	},
	mutations: {
		setCoupon(state, data) {
			state.coupon = data
		},
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		// 获取轮播图
		async getCoupon({
			commit
		}) {
			try {
				let res = await fly.getCoupon()
				if (res.code === 200) {
					console.log(res);
					commit('setCoupon', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
	},
}
