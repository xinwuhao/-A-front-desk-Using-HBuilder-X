<template>
	<view>
		<view class="topBox">
			<image src="../../static/arrow.png" class="arrow" @click="out"></image>
			<view style="font-weight: 700;">确认订单</view>
		</view>
		<view class="subjectBox">
			<Site></Site>
			<view v-for="(item,index) in list" :key='index'>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;">
						<image :src=item.goods.cover class="cover"></image>
						<view>
							<view>{{item.goods.name}}</view>
							<view v-for="(item1,index1) in item.goods.sku" :key='index1'>
								{{item1.name}}:{{item1.checked}}
							</view>
						</view>
					</view>
					<view>
						<view> ￥{{item.goods.presentPrice}}</view>
						<view> x{{item.count}}</view>
					</view>
				</view>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20rpx;">
				<view>优惠券</view>
				<view style="display: flex;">
					<view>无可用</view>
					<image src="../../static/rightArrow.png" class="oarrow"></image>
				</view>
			</view>
		</view>
		<view class="bottomBox">
			<cc-submit-bar :price="sun" @submit='submit'></cc-submit-bar>
		</view>
		<cc-password-input :value.sync="show" @complete="handleComplete">
		</cc-password-input>
	</view>

</template>

<script>
	import Site from '../../commponents/payment/site.vue'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let paymentModule = createNamespacedHelpers('payment')
	let {
		mapState: paymentState,
		mapActions: paymentActions
	} = paymentModule

	export default {
		components: {
			Site
		},
		props: {},
		data() {
			return {
				list: null,
				show: false,
				value: '',
				id: '',
				arr: [],
				obj: {}
			}
		},
		methods: {
			...paymentActions(['addOrder']),
			out() {
				uni.navigateBack()
			},
			submit() {
				this.show = true
			},
			// 输入完成
			handleComplete(val) {
				let a = 0
				this.list.map(item => {
					a += item.count
				})
				// console.log(a); 
				if (val == 123456) {
					console.log(val)
					this.addOrder({
						user_id: this.id,
						price: this.sun,
						address: this.obj.address,
						count: a,
						pay_time: new Date(),
						goods_list: this.list,
						mobile: this.obj.tel,
					})
				} else {
					console.log('输入错误');
				}
			}
		},
		mounted() {
			this.list = uni.getStorageSync('cart')
			this.id = uni.getStorageSync('login')._id
			this.arr = uni.getStorageSync('list')
			this.arr.map(item => {
				if (item.isDefault == true) {
					this.obj = item
				}
			})
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...paymentState(['seat']),
			sun() {
				let sun = 0
				if (this.list) {
					this.list.map(item => {
						sun += item.goods.presentPrice * item.count
					})
				}
				return sun * 100
			}
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.topBox {
		position: fixed;
		/* #ifdef H5 */
		top: 0;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 50rpx;
		/* #endif */
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding: 20rpx;
	}

	.bottomBox {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 0rpx;
	}

	.oarrow {
		width: 50rpx;
		height: 50rpx;
		margin-left: 20rpx;
	}

	.arrow {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.subjectBox {
		position: relative;
		/* #ifdef H5 */
		top: 100rpx;
		/* #endif */
		padding: 20rpx;
		/* #ifdef MP-WEIXIN */
		top: 130rpx;
		/* #endif */
	}

	.cover {
		width: 200rpx;
		height: 200rpx;
	}
</style>
