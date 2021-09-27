<template>
	<view>
		<view @click="goto">
			<view style="display: flex;justify-content: space-between;padding: 20rpx;">
				<view>送至</view>
				<view>
					<view v-for="(item,index) in seat" :key='index'>
						<view v-if="item.isDefault==true">
							<view>{{item.address}}</view>
						</view>
					</view>
				</view>
				<view>
					<image src="../../../static/rightArrow.png" class="imgArrow"></image>
				</view>
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
			return {}
		},
		methods: {
			...locationActions(['getAppAddress']),
			goto() {
				uni.navigateTo({
					url: `/pages/location/location`
				})
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
		watch: {},
	}
</script>

<style scoped lang="scss">
	.imgArrow {
		width: 50rpx;
		height: 40rpx;
	}
</style>
