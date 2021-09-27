<template>
	<view>
		<view v-if="this.seat.length==0">
			<view class="locationBox" @click="location">
				<image src="../../static/add.png" class="addBox"></image>
				<view>添加地址</view>
			</view>
		</view>
		<view @click="location">
			<view v-for="(item,index) in seat" v-if="item.isDefault==true">
				<cc-contact-card :tel=item.tel :name=item.name type="edit">
				</cc-contact-card>
				<view class="siteBox">地址：{{item.address}}</view>
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

	export default {
		components: {},
		props: {},
		data() {
			return {
				id: '',
				arr: {}
			}
		},
		methods: {
			...locationActions(['getAppAddress']),
			location() {
				uni.navigateTo({
					url: `/pages/location/location`
				})
			}
		},
		mounted() {
			this.id = uni.getStorageSync('login')._id
			this.getAppAddress(this.id)
		},
		onLoad() {},
		onShow() {

		},
		filters: {},
		computed: {
			...locationState(['seat'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.locationBox {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #F5F5F5;
		height: 100rpx;
	}

	.addBox {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.siteBox {
		position: relative;
		bottom: 46rpx;
		left: 110rpx;
		font-size: 10rpx;
	}
</style>
