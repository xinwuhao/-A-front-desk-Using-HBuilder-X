import App from './App'
import ccUI from 'cc-ui-uni-app'
import store from './store/index.js'
import utils from './utils/util.js'
import io from '@hyoga/uni-socket.io'

const socket = io('http://localhost:3000', {
	query: {},
	transports: ['websocket', 'polling'],
	timeout: 1000,
})

Vue.use(ccUI)

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$store = store
Vue.prototype.$socket = socket
App.mpType = 'app'

const app = new Vue({

	...App,
	store
})
app.$mount()
// #endif






// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
