import fly from "../../http/api.js"
export default {
	// 命名空间
	namespaced: true,
	state: {
		getBannerlist: [],
		getNavList: [],
		getNewList: [],
		getRecommendNavList: [],
		getNavGoodsList: []
	},
	mutations: {
		setBanner(state, data) {
			state.getBannerlist = data
		},
		setNav(state, data) {
			state.getNavList = data
		},
		setNew(state, data) {
			state.getNewList = data
		},
		setRecommendNav(state, data) {
			state.getRecommendNavList = data
		},
		setNavGoods(state, data) {
			state.getNavGoodsList = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		// 获取轮播图
		async getBanner({
			commit
		}) {
			try {
				let res = await fly.getBanner()
				if (res.code === 200) {
					// console.log(res);
					res.data.map(item => {
						item.image = item.url
					})
					commit('setBanner', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取导航
		async getNav({
			commit
		}) {
			try {
				let res = await fly.getNav()
				if (res.code === 200) {
					// console.log(res.data);
					commit('setNav', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取新品
		async getNew({
			commit
		}) {
			try {
				let res = await fly.getNew()
				if (res.code === 200) {
					// console.log(res.data)
					commit('setNew', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取首页推荐导航
		async getRecommendNav({
			commit
		}) {
			try {
				let res = await fly.getRecommendNav()
				if (res.code === 200) {
					// console.log(res.data)
					commit('setRecommendNav', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 获取导航商品详情
		async getNavGoods({commit}, params) {
			try {
				let res = await fly.getNavGoods(params)
				if (res.code === 200) {
					// console.log(res.data)
					commit('setNavGoods', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
	},
}
