<template>
	<view>
		<view class="topBox">
			<image src="../../static/arrow.png" class="arrow" @click="out"></image>
			<view style="font-weight: 700;">地址列表</view>
		</view>
		<view class="subjectBox">
			<view v-if="list.length==0">暂无收货地址</view>
			<Increase v-if="this.list.length>0" :list='list'></Increase>
			<view class="bottomBox">
				<cc-button type="primary" block @click='gotoAdd'>手动添加地址</cc-button>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let locationModule = createNamespacedHelpers('location')
	let {
		mapState: locationState,
		mapActions: locationActions
	} = locationModule
	import Increase from '../../commponents/location/increase/increase.vue'

	export default {
		components: {
			Increase,
		},
		props: {},
		data() {
			return {
				id: '',
				list: []
			}
		},
		methods: {
			...locationActions(['getAppAddress']),
			
			out() {
				uni.navigateBack()
			},
			gotoAdd() {
				uni.navigateTo({
					url: `/pages/location/addLocation`
				})
			},
			add(){
				console.log(123);
			}
		},
		mounted() {
			this.id = uni.getStorageSync('login')._id
			this.getAppAddress(this.id)
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...locationState(['seat'])
		},
		watch: {
			seat(e) {
				this.list = e
			}
		},
	}
</script>

<style scoped lang="scss">
	.bottomBox {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0rpx;
		display: flex;
		align-items: center;
	}

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
</style>
