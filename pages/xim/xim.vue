<template>
	<view>
		<view class="topBox">
			<view class="leftBox" @click="out">
				<image src="../../static/arrow.png" class="arrow"></image>
			</view>
			<view style="font-size: 40rpx;font-weight: 700;">选择城市</view>
		</view>
		<view class="box">
			<view class="post">
				<!-- #ifdef H5 -->
				<cc-search :value.sync="value" round style="background-color: #FFFFFF !important;"></cc-search>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="odsera">
					<cc-search :value.sync="value" round></cc-search>
				</view>
				<!-- #endif -->
			</view>
			<view>
				<view v-if="show">
					<view v-if="getArearrList">
						<cc-index-bar v-if="getArearrList.length>0" style="margin-top: 100rpx;">
							<view v-for="(item,index) in getArearrList" :key="index">
								<view>
									{{item.py_head}}
								</view>
								<view v-for="(item1,index1) in item.name_list" :key='index1'
									style="padding: 20rpx 0rpx;" @click="getcity(item1)">
									{{item1.name}}
								</view>
							</view>
						</cc-index-bar>
					</view>
				</view>

				<view v-if="!show">
					<view v-if="getsearchList.data">
						<view v-if="getsearchList.data.area_list.length>0">
							<view v-for="(item,index) in getsearchList.data.area_list" style="padding: 30rpx 0rpx;"
								@click="getcity(item)">
								{{item.name}}
							</view>
						</view>
						<view v-if="getsearchList.data.area_list.length<=0">
							<view style="height: 100vh;display: flex;align-items: center;justify-content: center;">暂无数据
							</view>
						</view>

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
				value: '',
				show: true
			}
		},
		methods: {
			...miActions(['getAreaList', 'getsearchAreaList']),
			// 返回上一步
			out() {
				uni.navigateBack()
			},
			getcity(e) {
				// console.log(e);
				uni.setStorageSync('city', e)
				uni.navigateTo({
					url: '/pages/xiaomi/xiaomi'
				})
			},
			getback() {
				uni.switchTab({
					url: '/pages/my/my'
				})
			}
		},
		mounted() {
			this.getAreaList()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...miState(['getArearrList', 'getsearchList']),
		},
		watch: {
			value(val) {
				// console.log(val);
				if (val) {
					this.getsearchAreaList(val)
					this.show = false
				} else {
					this.show = true
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.box {
		position: relative;
		top: 100rpx;
	}

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
		background-color: #FFFFFF !important;
		justify-content: center;
		z-index: 99;
	}

	.leftBox {
		position: absolute;
		left: 20rpx;
	}

	.post {
		background-color: #FFFFFF !important;
		position: fixed;
		/* #ifdef H5 */
		top: 80rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 160rpx;
		/* #endif */
		left: 0;
		right: 0;

		.sera {
			position: absolute;
			left: 10rpx;
			top: 30rpx
		}
	}
</style>
