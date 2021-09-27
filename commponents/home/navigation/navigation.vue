<template>
	<view>
		<view style="display: flex;flex-wrap: wrap;width: 800rpx;">
			<view v-for="(item,index) in getNavList" :key='index'>
				<view @click="goto(item)">
					<image :src=item.url style="width: 150rpx;height: 150rpx;"></image>
				</view>
			</view>
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
			...homepageActions(['getNav']),
			goto(e) {
				if (e.title == '小米秒杀') {
					uni.navigateTo({
						url: `/pages/seckill/seckill`
					})
				}
			}
		},
		mounted() {
			this.getNav()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homepageState(['getNavList'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
