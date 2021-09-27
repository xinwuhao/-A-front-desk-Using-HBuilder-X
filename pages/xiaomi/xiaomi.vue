<template>
	<view>
		<view class="topBox">
			<view class="leftBox" @click="out">
				<image src="../../static/arrow.png" class="arrow"></image>
			</view>
			<view>小米之家</view>
		</view>
		<!-- 地图 -->
		<view class="opids">
			<view id='container' style="width: 750rpx;height: 600rpx;"></view>
			<scroll-view scroll-y="true" style="height: 100vh;white-space: nowrap;">
				<view v-if="getStoreHomeList[0]">
					<view style="padding: 20rpx;">
						<view v-for="(item,index) in getStoreHomeList[0].store_list" :key='index'
							style="margin-top: 30rpx;" @click="getdetile(item)">
							<view class="rightd display align-c justify-s">
								<view class="font">{{item.store_name}}</view>
								<view style="font-size: 12px;color: gray;">1</view>
							</view>
							<!-- 工作日 -->
							<view style="font-size: 12px;color: gray;margin-top: 10rpx;margin-bottom: 10rpx;">
								{{item.shop_time}}
							</view>
							<view class="opdw">{{item.address}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let miModule = createNamespacedHelpers('mi')
	let {
		mapState: miState,
		mapActions: miActions
	} = miModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				list: {},
				show: true,
			}
		},
		methods: {
			// 返回上一步
			out() {
				uni.navigateBack({})
			},
			...miActions(['getStoreHome']),
			// 点击
			getdetile(e) {
				uni.setStorageSync('city2', e)
				uni.navigateTo({
					url: '/pages/mapdet/mapdet'
				})
			}
		},
		mounted() {
			this.list = uni.getStorageSync('city')
			this.getStoreHome({
				// 地区名字
				area_name: this.list.name,
				// 地区id
				area_id: this.list.id
			})
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...miState(['getStoreHomeList'])
		},
		watch: {
			getStoreHomeList(val) {
				if (val) {
					this.$utils.getLocation(val[0].store_list[0])
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

	.font {
		width: 520rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 18px;
	}

	.opids {
		/* #ifdef H5 */
		margin-top: 100rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		margin-top: 150rpx;
		/* #endif */
	}

	.opdw {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 12px;
		color: gray;
		width: 500rpx;
	}
</style>
