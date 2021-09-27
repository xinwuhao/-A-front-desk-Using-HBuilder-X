<template>
	<view style="background-color: #F1F1F1;height: 100vh;">
		<view class="topBox">
			<view class="leftBox" @click="out">
				<image src="../../static/arrow.png" class="arrow"></image>
			</view>
			<view>全部订单</view>
		</view>
		<view class="subjectBox">
			<view v-for="(item,index) in orders" :key='index'>
				<view class="box">
					<view style="margin-left: 20rpx;font-size: 20rpx;color:'#A9A9A9'">交易时间：{{item.pay_time}}</view>
					<view v-for="(item1,index1) in item.goods_list" :key='index1'>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="display: flex;align-items: center;">
								<view>
									<image :src=item1.goods.cover class="imgBox"></image>
								</view>
								<view style="margin-left: 20rpx;">
									<view>{{item1.goods.name}}</view>
									<view v-for="(item2,index2) in item1.spec">
										<view>
											{{item2.name}}:{{item2.checked}}
										</view>
									</view>
								</view>
							</view>
							<view>
								x{{item1.count}}
							</view>
						</view>
						<view style="display: flex; justify-content: space-between; padding: 20rpx;">
							<view v-if="item1.isComment==false">
								<view @click="evaluate(item1,item)">去评价</view>
							</view>
							<view v-else></view>
							<view @click="delet(item)">删除订单</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<cc-popup :show.sync="show1" width='400'>
			<view>您确定需要删除？</view>
			<view style="display: flex;width: 100%;margin-top: 40rpx;justify-content: flex-end;">
				<view>
					<cc-button type="error" @click='san'>确定</cc-button>
				</view>
				<view>
					<cc-button type="primary" @click='qu'>取消</cc-button>
				</view>
			</view>
		</cc-popup>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let ordersModule = createNamespacedHelpers('orders')
	let {
		mapState: ordersState,
		mapActions: ordersActions
	} = ordersModule

	export default {
		components: {},
		props: {},
		data() {
			return {
				id: '',
				list: [],
				goods_list: [],
				show1: false,
				arr: {}
			}
		},
		methods: {
			...ordersActions(['getAppOrder', 'delOrder']),
			out() {
				uni.navigateBack()
			},
			qu() {
				this.show1 = false
			},
			evaluate(e, item) {
				// console.log(e, item.id);
				uni.setStorageSync('evaluate', e)
				uni.setStorageSync('ordersId', item.id)
				uni.navigateTo({
					url: `/pages/evaluate/evaluate`
				})
			},
			san() {
				this.delOrder({
					orderId: this.arr.orderId,
					user_id: this.arr.user_id,
				})
				this.getAppOrder(this.id)
				this.show1 = false
			},
			delet(e) {
				this.show1 = true
				this.arr = {
					orderId: e.id,
					user_id: e.user_id
				}
			}
		},
		mounted() {
			this.id = uni.getStorageSync('login')._id
			this.getAppOrder(this.id)
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...ordersState(['orders'])
		},
		watch: {
			orders(e) {
				console.log(e);
			}
		},
	}
</script>

<style scoped lang="scss">
	.arrow {
		width: 50rpx;
		height: 50rpx;
	}

	.topBox {
		/* #ifdef MP-WEIXIN */
		height: 110rpx !important;
		padding: 20rpx;
		align-items: flex-end;
		/* #endif */
		top: 0;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		align-items: center;
		height: 80rpx;
		/* #endif */
		display: flex;
		position: fixed;
		background-color: #FFFFFF;
		justify-content: center;
	}

	.leftBox {
		position: absolute;
		left: 20rpx;
	}

	.subjectBox {
		position: relative;
		/* #ifdef H5 */
		top: 90rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 180rpx;
		/* #endif */
		padding: 20rpx;
	}

	.imgBox {
		width: 200rpx;
		height: 200rpx;
	}

	.box {
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 50rpx;
		background-color: #FFFFFF;
	}
</style>
