<template>
	<view>
		<view style="display: flex;justify-content: space-between;padding: 20rpx;" @click="open5">
			<view>已选择</view>
			<view style="display: flex;">
				<view>{{arr.name}}</view>
				<view v-for="(item,index) in arr.sku">
					<view style="display: flex;" class="text-overflow">
						<view>{{item.name}}:</view>
						<view>{{item.checked}}</view>
					</view>
				</view>
			</view>
			<view>
				<image src="../../../static/rightArrow.png" class="imgArrow"></image>
			</view>
		</view>
		<!-- 弹出层 -->
		<cc-popup :show.sync="show5" mode="bottom">
			<view class="box">
				<view class="imgbox">
					<view style="display: flex;align-items: center;">
						<view class="chart">
							<image :src=arr.cover class="imgcover"></image>
						</view>
						<view style="margin-left: 20rpx;">
							<view class="textColor">￥{{arr.presentPrice}}</view>
							<view>{{arr.name}}</view>
							<view style="display: flex;">
								<view v-for="(item,index) in arr.sku">
									<view
										style="display: flex; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">
										<view>{{item.checked}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view>
						<image src="../../../static/取消.png" class="imgArrow" @click="Off"></image>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 400rpx;margin-top: 10rpx;">
					<view style="margin-top: 20rpx;">
						<view v-for="(item,index) in arr.spec" :key='index'>
							<view v-if="item.checkList.length!==0" style="margin-bottom: 10rpx;">
								<view>{{item.name}}</view>
								<view style="display: flex;flex-wrap: wrap;">
									<view v-for="(item1,index1) in item.checkList" :key='index1'>
										<view @click="btn(item,index,item1,index1)">
											<view class="textBox" :class="{'textBoxcolor':item.showFlag ==index1}">
												{{item1}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view style="display: flex;justify-content: space-between;margin-top: 40rpx;padding-right: 40rpx;">
					<view>购买数量</view>
					<cc-stepper :value.sync="value"></cc-stepper>
				</view>
				<view class="bttbox">
					<view class="addBox" @click="join">加入购物车</view>
					<view class="vehicle" @click="promptly">立即购买</view>
				</view>
			</view>
		</cc-popup>
		<view class="bttbox">
			<cc-goods-action :options="options" :buttons="buttons" @click='bb' @clickButton='aa'></cc-goods-action>
		</view>
		<cc-popup :show.sync="show1" width='300'>
			<view style="display: flex;justify-content: center;align-items: center;">
				<view>
					<view>您还没有登录哟！</view>
					<view class="login" @click="gologin">去登录</view>
				</view>
			</view>
		</cc-popup>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let detailsModule = createNamespacedHelpers('details')
	let {
		mapState: detailsState,
		mapActions: detailsActions
	} = detailsModule

	export default {
		components: {},
		props: {
			arr: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				value: 1,
				show5: false,
				show1: false,
				id: '',
				options: [{
						text: '首页',
						icon: 'home',
					},
					{
						text: '购物车',
						icon: 'cart',
					}
				],
				buttons: [{
						text: '加入购物车'
					},
					{
						text: '立即购买'
					}
				],
			}
		},
		methods: {
			...detailsActions(['addCart']),
			gologin() {
				uni.navigateTo({
					url: `/pages/login/login`
				})
			},
			//加入购物车
			join() {
				let a = uni.getStorageSync('login')
				if (this.id == undefined) {
					this.show1 = true
				} else {
					this.addCart({
						user_id: a._id,
						count: this.value,
						goods: this.arr,
						spec: this.arr.sku
					})
				}
			},
			//立即购买
			promptly() {
				if (this.id == undefined) {
					this.show1 = true
				} else {
					let a=[]
					a.push({
						check:true,
						count:this.value,
						goods:this.arr,
						spec:this.arr.sku
					})
					uni.setStorageSync('cart', a)
					uni.navigateTo({
						url: `/pages/payment/payment`
					})
				}
			},
			aa(e) {
				// console.log(e);
				this.show5 = true
			},
			bb(e) {
				if (e.index == 0) {
					uni.switchTab({
						url: `/pages/homepage/homepage`
					})
				}
				if (this.id !== undefined) {
					if (e.index == 1) {
						uni.switchTab({
							url: `/pages/shoppingCart/shoppingCart`
						})
					}
				} else {
					this.show1 = true
				}
			},
			open5() {
				this.show5 = true
			},
			Off() {
				this.show5 = false
			},
			btn(item, index, item1, index1) {
				this.$set(item, 'showFlag', index1)
				this.$set(this.arr.sku, index, {
					name: item.name,
					checked: item1
				})
			},
		},
		mounted() {
			this.id = uni.getStorageSync('login')._id
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			value() {
				// console.log(this.value);
			}
		},
	}
</script>

<style scoped lang="scss">
	.login {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		padding: 20rpx;
		background-color: #DD524D;
	}

	.imgArrow {
		width: 50rpx;
		height: 40rpx;
	}

	.imgcover {
		width: 200rpx;
		height: 200rpx;
	}

	.imgbox {
		display: flex;
		justify-content: space-between;
		padding-right: 30rpx;
	}

	.chart {
		border: 15rpx solid #DCDCDC;
		border-radius: 10rpx;
	}

	.box {
		height: 900rpx;
		width: 100vw;
		padding: 20rpx;
	}

	.textColor {
		color: #FF4500;
		font-size: 38rpx;
		font-weight: 700;
		margin-bottom: 20rpx;
	}

	.textBox {
		padding: 10rpx 20rpx;
		margin: 10rpx 20rpx;
		background-color: #F5F5F5;
		border-radius: 25rpx 25rpx;
	}

	.textBoxcolor {
		padding: 10rpx 20rpx;
		margin: 10rpx 20rpx;
		background-color: #FFA07A;
		color: #FF4500;
		border: 1rpx solid #FF4500;
		border-radius: 25rpx 25rpx;
	}

	.text-overflow {
		width: 110rpx;
		white-space: nowrap;
		/* 文字不换行 */
		overflow: hidden;
		/* 文字超出后隐藏 */
		text-overflow: ellipsis;
	}

	.bttbox {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: #FFFFFF;
		padding-bottom: 20rpx;
		position: fixed;
		z-index: 1;
		bottom: 0rpx;
	}

	.addBox {
		display: flex;
		justify-content: center;
		padding: 30rpx 0rpx;
		width: 40%;
		border-radius: 50rpx 0rpx 0rpx 50rpx;
		background-color: rgb(254, 165, 1);
		color: #FFFFFF;
	}

	.vehicle {
		display: flex;
		justify-content: center;
		padding: 30rpx 0rpx;
		width: 40%;
		border-radius: 0rpx 50rpx 50rpx 0rpx;
		background-color: rgb(254, 74, 3);
		color: #FFFFFF;
	}
</style>
