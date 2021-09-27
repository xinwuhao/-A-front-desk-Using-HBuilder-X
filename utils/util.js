// #ifdef H5
const key = '0dd66797d0a17db3c0c72e7f65ace0ad'
import AMapLoader from '@amap/amap-jsapi-loader'
// #endif

// #ifdef MP-WEIXIN
const amapFile = require('../lib/amap-wx.js')
const key = ' 3a6e5364924bc444faf5e00345f6df86'
const myAmapFun = new amapFile.AMapWX({
	key
})
// #endif

export default {
	saveHistory({
		key,
		data,
		attr
	}) {
		// 如果是其余的数据 判断的属性可能就不叫name了
		// 拼接一个名字
		let name = key + 'History'
		let history = uni.getStorageSync(name)
		if (history) {
			// 之前存储过
			let arr = uni.getStorageSync(name)
			// 检测数据是否已经存在
			let item = null
			if (typeof data === 'string') {
				arr = arr.filter(i => {
					return i[attr] !== data
				})
				let obj = {
					[attr]: data
				}
				arr.unshift(obj)
			} else {
				arr = arr.filter(i => {
					return i[attr] !== data[attr]
				})
				arr.unshift(data)
			}
			uni.setStorageSync(name, arr)
		} else {
			// 第一次存储
			// 把存储的数据都转换成对象
			let arr = []
			if (typeof data === 'string') {
				let obj = {
					name: data
				}
				arr.unshift(obj)
			} else {
				arr.unshift(data)
			}
			uni.setStorageSync(name, arr)
		}
	},
	// 获取存储记录
	getHistory({
		key
	}) {
		let name = key + 'History'
		let arr = uni.getStorageSync(name)
		if (arr) return arr
		else return null
	},
	// 清除
	removeHistory({
		key,
		data,
	}) {
		let name = key + 'History'
		let list = this.getHistory({
			key
		})
		let newlist = list.filter(item => {
			return item.gid !== data
		})
		uni.setStorageSync(name, newlist)
	},
	getLocation(item) {
		// #ifdef H5
		return new Promise((resovle, reject) => {
			AMapLoader.load({
					key,
					version: '1.4.15',
					Loca: {
						// 是否加载 Loca， 缺省不加载
						version: '1.3.2' // Loca 版本，缺省 1.3.2
					}
				})
				.then(AMap => {
					if (item === '') {
						this.map = new AMap.Map('container')
					} else {
						this.map = new AMap.Map('container', {
							'center': [item.position.lng, item.position
								.lat
							]
						})
						let temp =
							'<text><image src="http://i8.mifile.cn/v1/a1/87fbaa8d-73a4-247a-acea-dea9fed47099.png" style="width:70px;height:70px"></image></text>'

						let marker = new AMap.Marker({
							position: new AMap.LngLat(item.position
								.lng, item.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
							title: item.store_name,
							content: temp
						});
						this.map.add(marker);
					}
					return this.map.plugin('AMap.Geolocation', function() {
						var geolocation = new AMap.Geolocation({
							// 是否使用高精度定位，默认：true
							enableHighAccuracy: true,
							// 设置定位超时时间，默认：无穷大
							timeout: 10000,
							// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
							buttonOffset: new AMap.Pixel(10, 20),
							//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
							zoomToAccuracy: true,
							//  定位按钮的排放位置,  RB表示右下
							buttonPosition: 'RB'
						})

						geolocation.getCurrentPosition(function(status, result) {
							if (status == 'complete') {
								onComplete(result)
							} else {
								onError(result)
							}
						})

						function onComplete(data) {
							// data是具体的定位信息
							resovle({
								code: 200,
								msg: '定位成功',
								data
							})
							// console.log(data)
						}

						function onError(data) {
							// 定位出错
							reject({
								code: 500,
								msg: '定位失败',
								data
							})
						}
					})
				})
				.catch(e => {
					console.log(e)
				})
		})
		// #endif
	}
}
