import fly from "../../http/api.js"
import Vue from 'vue'
export default {
	// 命名空间
	namespaced: true,
	state: {
		code: [],
	},
	mutations: {
		setCode(state, data) {
			state.code = data
		},
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数

		// 获取验证码
		async getCode({
			commit
		}, params) {
			try {
				let res = await fly.getCode(params)
				if (res.code === 200) {
					// console.log(res.data)

				}
			} catch (err) {
				console.log(err)
			}
		},
		// 注册
		async register({
			commit
		}, params) {
			try {
				let res = await fly.register(params)
				if (res.code === 200) {
					// console.log(res.data)
					uni.navigateTo({
						url: `/pages/login/password`
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 用户名登录
		async userLogin({
			commit
		}, params) {
			try {
				let res = await fly.userLogin(params)
				if (res.code === 200) {
					// console.log(res)
					uni.setStorageSync('token', res.token)
					uni.setStorageSync('login', res.data)
					uni.switchTab({
						url: `/pages/homepage/homepage`
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 手机号登录
		async mobileLogin({
			commit
		}, params) {
			try {
				let res = await fly.mobileLogin(params)
				if (res.code === 200) {
					uni.setStorageSync('token', res.token)
					uni.setStorageSync('login', res.data)
					uni.switchTab({
						url: `/pages/homepage/homepage`
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
	},
}
