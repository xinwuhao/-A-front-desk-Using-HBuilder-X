// #ifdef APP-PLUS || APP-PLUS-NVUE || MP-WEIXIN
  import Fly from 'flyio/dist/npm/wx'
// #endif

// #ifdef H5
  import Fly from 'flyio/dist/npm/fly'
// #endif

const fly = new Fly
// #ifdef H5
fly.config.baseURL = 'http://localhost:7001'
// #endif
// #ifdef MP-WEIXIN
fly.config.baseURL = 'http://localhost:7001' 
// #endif

fly.interceptors.request.use(config => {
  uni.showLoading({
    title: '加载中...'
  })
  let token = uni.getStorageSync('token')
  if (token) {
    config.headers.authorization = token
  }
  return config
}, err => {
  uni.hideLoading()
  return Promise.reject(err)
})

fly.interceptors.response.use(res => {
  uni.hideLoading()
  return res.data
}, err => {
  uni.hideLoading()
  console.log(err)
  return Promise.reject(err)
})

export default fly