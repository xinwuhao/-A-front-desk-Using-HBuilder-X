<template>
	<view>
		<view style="padding: 30rpx; width: 700rpx;height: 300rpx;" v-if="getBannerlist">
			<cc-swiper :list="getBannerlist" bottom="30" right="100" height='300'></cc-swiper>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let homepageModule = createNamespacedHelpers('homepage')
	let {
		mapState: homepageState,
		mapActions: homepageActions
	} = homepageModule

	export default {
		components: {},
		props: {},
		data() {
			return {}
		},
		methods: {
			...homepageActions(['getBanner']),
		},
		mounted() {
			this.getBanner()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homepageState(['getBannerlist'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
