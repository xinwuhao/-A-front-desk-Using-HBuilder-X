<template>
	<view>
		<cc-address-list :value="moid" :list="list" default-tag-text="默认" @edit='bian' @select='select' @add='add'>
		</cc-address-list>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			list: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				moid: '',
				id: '',
			}
		},
		methods: {
			select(e) {
				// console.log(e.item.id);
				uni.setStorageSync('locat', e.item)
				uni.navigateTo({
					url: `/pages/payment/payment`
				})
			},
			add(){
				uni.navigateTo({
					url: `/pages/location/addLocation`
				})
			},
			bian(e) {
				let a = JSON.stringify(e.item)
				uni.navigateTo({
					url: `/pages/location/addLocation?id=${a}`
				})
			},
		},
		mounted() {
			this.id = uni.getStorageSync('login')._id
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {

		},
		watch: {},
	}
</script>

<style scoped lang="scss">
</style>
