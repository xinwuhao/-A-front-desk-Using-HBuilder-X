<template>
	<view>
		<view class="topBox">
			<image src="../../static/arrow.png" class="arrow" @click="out"></image>
			<view style="font-weight: 700;">添加地址</view>
		</view>
		<view class="subjectBox">
			<cc-address-edit @save='keep' @delete='san' :addressInfo="arr"></cc-address-edit>
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
				user_id: '',
				id: '',
				chaer: {},
				arr: {
					id: '',
					name: '',
					tel: '',
					province: '',
					city: '',
					county: '',
					addressDetail: '',
					areaCode: '',
					isDefault: ''
				}
			}
		},
		methods: {
			...locationActions(['addAddress', 'delAddress']),
			out() {
				uni.navigateBack()
			},
			keep(e) {
				console.log(e);
				this.addAddress({
					user_id: this.user_id,
					username: e.name,
					mobile: e.tel,
					address: `${e.province},${e.city},${e.county}`,
					detailAddress: e.addressDetail,
					isDefault: e.isDefault
				})
			},
			san(e) {
				// console.log(e);
				if (this.id !== '') {
					this.delAddress({
						addressId: this.id,
						user_id: this.user_id
					})
				}
				uni.navigateTo({
					url: `/pages/location/location`
				})
			}
		},
		mounted() {
			this.user_id = uni.getStorageSync('login')._id
			console.log(this.arr);
		},
		onLoad(e) {
			// console.log(e);
			if (e) {
				let a = JSON.parse(e.id)
				this.chaer = JSON.parse(e.id)
				let list = a.address.split(',')
				this.arr.province = list[0],
					this.arr.city = list[1],
					this.arr.county = list[2],
					this.arr.id = a.id,
					this.arr.name = a.name
				this.arr.tel = a.tel
				this.arr.isDefault = a.isDefault
				this.id = a.id
			}
		},
		onShow() {},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
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
		z-index: 9999;
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
