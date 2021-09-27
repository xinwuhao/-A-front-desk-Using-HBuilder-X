<template>
	<view>
		<view class="car">购物车</view>
		<view v-if="id==undefined">
			<view style="display: flex; justify-content: center;align-items: center;
		height: 600rpx;">
				<view>
					您还未登录，请登良路！！
					<view class="gouwu" @click="goLogin">登录</view>
				</view>
			</view>
		</view>
		<view v-if="list.length==0&&id!==undefined">
			<view style="display: flex; justify-content: center;align-items: center;
			height: 600rpx;">
				<view>
					您还没有商品，请添加！！
					<view class="gouwu" @click="goshopping">去购物</view>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in list" :key='index'>
			<cc-swipe-cell>
				<view style="padding: 20rpx; display: flex;align-items: center;">
					<cc-checkbox @change="handleChange($event,item)" :checked.sync="item.check" :option="item1">
					</cc-checkbox>
					<view style="display: flex;width: 100%;">
						<image :src=item.goods.cover class="imgbox"></image>
						<view style="margin-left: 20rpx;">
							<view>{{item.goods.name}}</view>
							<view class="center">
								<view>
									<view v-for="(item1,index1) in item.spec" :key='index1'>
										<view>{{item1.name}}:{{item1.checked}}</view>
									</view>
								</view>
								<view>
									<image src="../../static/xiala.png" class="drop-down"></image>
								</view>
							</view>
							<view class="textColor">￥{{item.goods.presentPrice}}</view>
						</view>
					</view>
				</view>
				<template #right>
					<view class="delete" @click="btn(item)">删除</view>
				</template>
			</cc-swipe-cell>
		</view>
		<view class="bottombox" v-if="list.length>0&&id!==undefined">
			<view class="end">
				<cc-checkbox @change="handleChange1" :checked.sync="check2" :option="item2"></cc-checkbox>
				<view>
					<view style="display: flex;align-items: center;">
						<view>合计：</view>
						<view class="textColor">{{sums}}</view>
						<view class="whole" @click="goto">结算({{cst}})</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let shoppingCartModule = createNamespacedHelpers('shoppingCart')
	let {
		mapState: shoppingCartState,
		mapActions: shoppingCartActions
	} = shoppingCartModule


	export default {
		components: {},
		props: {},
		data() {
			return {
				item1: {
					label: ''
				},
				item2: {
					label: '全选'
				},
				check1: false,
				check2: false,
				id: '',
				list: [],
				abc: 0,
				checkbox: false,
			}
		},
		methods: {
			...shoppingCartActions(['getCart', 'delCart']),
			goshopping() {
				uni.switchTab({
					url: `/pages/homepage/homepage`
				})
			},
			goLogin() {
				uni.navigateTo({
					url: `/pages/login/login`
				})
			},
			goto() {
				let arr = []
				this.list.map((item) => {
					if (item.check == true) {
						arr.push(item)
					}
					// console.log(arr);
				})
				if (arr.length > 0) {
					uni.setStorageSync('cart', arr)
					uni.navigateTo({
						url: `/pages/payment/payment`
					})
				}
			},
			// 全选
			handleChange1(e) {
				this.list.map((item) => {
					return item.check = e
				})
			},
			// 单选
			handleChange(e, item) {
				item.check = e
				this.check2 = this.list.every((item1) => {
					return item1.check == true
				})
			},
			//删除
			btn(e) {
				console.log(e._id);
				this.delCart({
					user_id: this.id,
					id: e._id
				})
				this.getCart(this.id)
			}
		},
		mounted() {
			this.id = uni.getStorageSync('login')._id
			console.log(this.id);
			this.getCart(this.id)
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...shoppingCartState(['cart']),
			sums() {
				let sum = 0
				this.list.map((a) => {
					if (a.check) {
						sum += Number(a.goods.presentPrice) * Number(a.count);
					}
				})
				return Number(sum).toFixed(2);
			},
			cst() {
				let a = []
				let long = 0
				this.list.map(item => {
					if (item.check == true) {
						a.push(item)
					}
				})
				long = a.length
				return long
			}
		},
		watch: {
			cart(e) {
				this.list = e
				console.log(e);
				this.list.map((item) => {
					this.$set(item, 'check', false)
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.gouwu {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		margin-left: 120rpx;
		color: #FFFFFF;
		width: 120rpx;
		height: 80rpx;
		background-color: #999999;
	}

	.car {
		/* #ifdef MP-WEIXIN */
		margin-top: 75rpx;
		/* #endif */
		font-size: 46rpx;
		font-weight: 600;
		margin-left: 30rpx;
	}

	.whole {
		padding: 20rpx 10rpx;
		margin: 0rpx 10rpx;
		text-align: center;
		width: 200rpx;
		border-radius: 50rpx;
		color: #FFFFFF;
		background-color: #FF4500;
	}

	.end {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.drop-down {
		margin-left: 20rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.imgbox {
		width: 200rpx;
		height: 200rpx;
	}

	.delete {
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background-color: red;
	}

	.textColor {
		color: #FF4500;
	}

	.bottombox {
		position: fixed;
		/* #ifdef H5 */
		bottom: 100rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 0;
		/* #endif */
		left: 0;
		right: 0;
	}
</style>
