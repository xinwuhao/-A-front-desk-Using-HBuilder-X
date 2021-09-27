import Vue from "vue"
import Vuex from 'vuex'
import homepage from './homepage/index.js'
import details from './details/details.js'
import sort from './sort/sort.js'
import search from './search/search.js'
import login from './login/login.js'
import shoppingCart from './shoppingCart/shoppingCart.js'
import location from './location/location.js'
import payment from './payment/payment.js'
import coupon from './coupon/coupon.js'
import orders from './orders/orders.js'
import evaluate from './evaluate/evaluate.js'
import seckill from './seckill/seckill.js'
import mi from './mi/mi.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {

	},
	mutations: {

	},
	actions: {

	},
	// 模块化
	modules: {
		homepage,
		details,
		sort,
		search,
		login,
		shoppingCart,
		location,
		payment,
		coupon,
		orders,
		evaluate,
		seckill,
		mi
	}
})
