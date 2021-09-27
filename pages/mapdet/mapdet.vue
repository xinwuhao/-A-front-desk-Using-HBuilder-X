<template>
	<view>
		<view class="topBox">
			<view class="leftBox" @click="out">
				<image src="../../static/arrow.png" class="arrow"></image>
			</view>
			<view>小米之家</view>
		</view>
		<view class="opids">
			<view id='container' style="width: 750rpx;height: 600rpx;"></view>
			<view class="xiName">
				{{obj.store_name}}
			</view>

			<view style="padding: 20rpx;">
				<view class="oplid">
					<view style="font-size: 16px;color: gray;margin-bottom: 10rpx;">营业时间</view>
					<view style="font-size: 15px;">{{obj.shop_time}}</view>
				</view>
				<view class="oplid">
					<view style="font-size: 16px;color: gray;margin-bottom: 10rpx;">地址</view>
					<view class="iuy">{{obj.address}}</view>
				</view>
				<view class="oplid">
					<view style="font-size: 16px;color: gray;margin-bottom: 10rpx;">电话</view>
					<view class="iuy">{{obj.tel}}</view>
				</view>
				<view class="oplid">
					<view style="font-size: 16px;color: gray;margin-bottom: 10rpx;">支持服务</view>
					<view style="display: flex;align-items: center;width: 100%;flex-wrap: wrap;">
						<view v-for="(item,index) in obj.support_service" :key='index'
							style="margin-right: 20rpx;margin-top: 20rpx;font-size: 15px;">
							{{item}}
						</view>
					</view>
				</view>

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
				obj: {}
			}
		},
		methods: {
			// 返回上一步
			out() {
				uni.navigateBack({})
			},
		},
		mounted() {
			this.obj = uni.getStorageSync('city2')
			// console.log(this.obj);
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			obj(val) {
				if (val) {
					this.$utils.getLocation(val)
				}
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
		top: 0;
		left: 0;
		right: 0;
		height: 80rpx;
		display: flex;
		position: fixed;
		align-items: center;
		background-color: #FFFFFF;
		justify-content: center;
		z-index: 999;
	}

	.leftBox {
		position: absolute;
		left: 20rpx;
	}

	.opids {
		/* #ifdef H5 */
		margin-top: 100rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		margin-top: 150rpx;
		/* #endif */
	}

	.xiName {
		padding: 20rpx;
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		font-size: 15px;
	}

	.iuy {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 550rpx;
		font-size: 15px;
	}

	.oplid {
		margin-bottom: 30rpx;
	}
</style>
