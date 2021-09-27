<template>
	<view>
		<view class="topBox">
			<view class="leftBox">
				<image src="../../static/arrow.png" class="secede"></image>
			</view>
			<view style="font-size: 40rpx;font-weight: 700;">优惠卷</view>
		</view>
		<view class="subject">
			<view v-for="(item,index) in coupon" :key='index'>
				<view class="box">
					<view class="color">{{item.name}}</view>
					<view class="color">优惠金额：￥{{item.threshold}}</view>
					<view class="color">使用条件：{{item.amount}}</view>
					<view class="color">开始时间：{{item.start_time}}</view>
					<view class="color">结束时间：{{item.end_time}}</view>
					<view class="gotobox" @click="goto">去使用</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let couponModule = createNamespacedHelpers('coupon')
	let {
		mapState: couponState,
		mapActions: couponActions
	} = couponModule

	export default {
		components: {},
		props: {},
		data() {
			return {}
		},
		methods: {
			...couponActions(['getCoupon']),
			goto() {
				uni.switchTab({
					url: `/pages/homepage/homepage`
				})
			}
		},
		mounted() {
			this.getCoupon()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...couponState(['coupon'])
		},
		watch: {
			coupon(e) {
				e.map(item => {
					item.start_time = dayjs(item.start_time).format('YYYY:MM:DD HH:mm:ss'),
						item.end_time = dayjs(item.end_time).format('YYYY:MM:DD HH:mm:ss')

				})
				console.log(e);
			}
		},
	}
</script>

<style scoped lang="scss">
	.gotobox {
		margin: 20rpx 0rpx;
		padding: 20rpx;
		color: #FFFFFF;
		width: 100rpx;
		font-size: 10rpx;
		background-color: #00BFFF;
	}

	.box {
		padding: 20rpx;
		background-color: #FF6347;
		margin: 30rpx;
		border-radius: 20rpx;
	}

	.color {
		color: #FFFFFF;
	}

	.subject {
		position: relative;
		top: 100rpx;
	}

	.topBox {
		display: flex;
		justify-content: center;
		height: 80rpx;
		align-items: center;
		position: fixed;
		top: 10;
		left: 0;
		right: 0;
	}

	.leftBox {
		position: absolute;
		left: 20rpx;
	}

	.secede {
		width: 50rpx;
		height: 50rpx;
	}
</style>
