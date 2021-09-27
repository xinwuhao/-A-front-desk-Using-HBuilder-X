<template>
	<view>
		<image src="../../static/bg.63c8e19851.png" class="bottomImg"></image>
		<!-- 登录注册头像 -->
		<view class="oneBox">
			<view style="display: flex;align-items: center;">
				<image :src=avatar class="avatar"></image>
				<view>
					<view v-if="user=='登录/注册'">
						<view class="textlogin" @click="goto">{{user}}</view>
					</view>
					<view v-if="user!=='登录/注册'">
						<view class="textlogin">{{user}}</view>
						<view class="textlogin" @click="goto">退出登录</view>
					</view>
				</view>
			</view>
			<!-- 我的订单 -->
			<view class="wholeBox" @click="goOrders">
				<view>我的订单</view>
				<view style="display: flex;align-items: center;">
					<view>全部订单</view>
					<view>
						<image src="../../static/enter.png" class="enter"></image>
					</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-around;">
				<view v-for="(item,index) in Icon" :key='index'>
					<image :src=item.icon class="Icon"></image>
					<view style="text-align: center;">{{item.name}}</view>
				</view>
			</view>
			<view>
				<scroll-view scroll-y="true" class="scbox">
					<view v-for="(item,index) in img" :key='index'>
						<view @click="goCoupon(item.name)">
							<view style="display: flex;justify-content: space-between;padding: 20rpx;">
								<view>
									<image :src=item.img class="Icon"></image>
								</view>
								<view>
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view>{{item.name}}</view>
										<image src="../../static/rightArrow.png" class="Icon"></image>
									</view>
									<view class="Line"></view>
								</view>
							</view>
							<view v-if="item.i==1" class="thickLine"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				avatar: '../../static/icon-user-selected.png',
				Icon: [{
						name: '待付款',
						icon: '../../static/wallet.png'
					},
					{
						name: '待收货',
						icon: '../../static/vehicle.png'
					},
					{
						name: '退换修',
						icon: '../../static/spanner.png'
					}
				],
				img: [{
						name: '会员中心',
						img: '../../static/huiyuanzhongxin.png',
						i: 0
					},
					{
						name: '我的优惠',
						img: '../../static/youhui.png',
						i: 1
					},
					{
						name: '服务中心',
						img: '../../static/fuwuzhongxin.png',
						i: 0
					},
					{
						name: '小米之家',
						img: '../../static/xiaomizhijia.png',
						i: 1
					},
					{
						name: '我的F码',
						img: '../../static/fma.png',
						i: 0
					},
					{
						name: '礼物码脱换',
						img: '../../static/liwu.png',
						i: 1
					}, {
						name: '设置',
						img: '../../static/shezhi.png',
						i: 0
					}
				],
				user: '登录/注册'
			}
		},
		methods: {
			goto() {
				uni.navigateTo({
					url: `/pages/login/login`
				})
			},
			goOrders() {
				uni.navigateTo({
					url: `/pages/orders/orders`
				})
			},
			goCoupon(e) {
				if (e == '小米之家') {
					uni.navigateTo({
						url: `/pages/xim/xim`
					})
				}
				if (e == '我的优惠') {
					uni.navigateTo({
						url: `/pages/coupon/coupon`
					})
				}
				if (e == '设置') {
					uni.navigateTo({
						url: `/pages/location/location`
					})
				}
				if (e == '服务中心') {
					uni.navigateTo({
						url: `/pages/service/service`
					})
				}
			}
		},
		mounted() {
			this.user = uni.getStorageSync('login').username
			// console.log(this.user);
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.scbox {
		margin-top: 50rpx;
		/* #ifdef H5 */
		height: 830rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 550rpx;
		/* #endif */
	}

	.thickLine {
		width: 100%;
		height: 20rpx;
		margin: 10rpx 0rpx;
		background-color: #F5F5F5;
	}

	.Line {
		margin-top: 20rpx;
		width: 600rpx;
		height: 2rpx;
		background-color: #D3D3D3;
	}

	.Icon {
		width: 60rpx;
		height: 60rpx;
	}

	.enter {
		margin-top: 10rpx;
		width: 50rpx;
		height: 40rpx;
		margin-left: 10rpx;

	}

	.wholeBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		/* #ifdef MP-WEIXIN */
		margin-top: 50rpx;
		/* #endif */
	}

	.bottomImg {
		width: 100%;
		/* #ifdef H5 */
		height: 150rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 400rpx;
		/* #endif */
		background-color: rgb(243, 125, 15);
	}

	.oneBox {
		/* #ifdef H5 */
		top: 0;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 60rpx;
		/* #endif */
		left: 0;
		right: 0;
		bottom: 0;
		position: fixed;
	}

	.textlogin {
		color: #FFFFFF;
		position: relative;
		/* #ifdef MP-WEIXIN */
		top: 40rpx;
		left: 30rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 15rpx;
		left: 30rpx;
		/* #endif */
	}

	.avatar {
		/* #ifdef H5 */
		margin-left: 40rpx;
		margin-top: 20rpx;
		width: 80rpx;
		height: 80rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 150rpx;
		width: 150rpx;
		margin-top: 80rpx;
		margin-left: 50rpx;
		/* #endif */
		padding: 20rpx;
		background-color: #C0C0C0;
		border-radius: 100%;
	}
</style>
