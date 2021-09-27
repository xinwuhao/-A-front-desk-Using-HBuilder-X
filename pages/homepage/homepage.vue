<template>
	<view>
		<view style="background-color: rgb(255,87,0);height: 350rpx;border-radius:0rpx 0rpx 25% 25% ;">
			<view style="display: flex;padding:50rpx 30rpx; align-items: center;">
				<view>
					<view style="background-color: #FFFFFF;
					margin-right: 20rpx;
					border-radius: 10rpx;
					align-items: center;
					justify-content: center;">
						<image src="../../static/IMlog.png" style="width: 40rpx;height: 30rpx;padding:10rpx;">
						</image>
					</view>
				</view>
				<view @click="gotoSearch">
					<view class="imgbox">
						<image src="../../static/sousuo.png" class="img"></image>
						<view style="color: #C0C0C0;">搜索商品</view>
					</view>
				</view>
			</view>
		</view>
		<view style="position: absolute;top: 130rpx;">
			<!-- 轮播图 -->
			<Swiper></Swiper>
			<!-- 导航 -->
			<Navigation></Navigation>
			<!-- 新品 -->
			<NewProduct></NewProduct>
			<!-- 推荐分类 -->
			<Recommend></Recommend>
			<view class="box"></view>
		</view>
	</view>
</template>

<script>
	import Swiper from '../../commponents/home/swiper/swiper.vue'
	import Navigation from '../../commponents/home/navigation/navigation.vue'
	import NewProduct from '../../commponents/home/newProduct/newProduct.vue'
	import Recommend from '../../commponents/home/recommend/recommend.vue'

	export default {
		components: {
			Swiper,
			Navigation,
			NewProduct,
			Recommend
		},
		props: {},
		data() {
			return {}
		},
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: `/pages/search/search`
				})
			}
		},
		mounted() {

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
	.imgbox {
		/* #ifdef H5 */
		width: 600rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		width: 400rpx;
		/* #endif */
		margin-top: 5rpx;
		height: 75rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 50rpx;
	}

	.img {
		width: 40rpx;
		height: 40rpx;
		margin: 0rpx 20rpx;
	}

	.box {
		width: 100%;
		/* #ifdef H5 */
		height: 100rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 50rpx
			/* #endif */
	}
</style>
