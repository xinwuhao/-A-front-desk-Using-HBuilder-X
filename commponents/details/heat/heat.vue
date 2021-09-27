<template>
	<view>
		<view style="display: flex; justify-content: center;">
			<view>
				<view class="textbox" @click="btn(0)" :class="{'textColor':a==0}">为你推荐</view>
				<view style="display: flex;justify-content: center;">
					<view :class="{'Line':a==0}"></view>
				</view>
			</view>
			<view>
				<view class="textbox" @click="btn(1)" :class="{'textColor':a==1}">爆款推荐</view>
				<view style="display: flex;justify-content: center;">
					<view :class="{'Line':a==1}"></view>
				</view>
			</view>
		</view>
		<view :class="{'hide':a==1}">
			<swiper indicator-dots style="height: 400rpx;">
				<swiper-item>
					<view style="display: flex; ">
						<view v-for="(item,index) in recommend.slice(0,3)" :key='index'>
							<view style="margin: 30rpx 20rpx;">
								<view>
									<image :src=item.cover style="width: 200rpx;height: 200rpx;"></image>
								</view>
								<view class="text-overflow">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view style="display: flex;">
						<view v-for="(item,index) in recommend.slice(3,6)" :key='index'>
							<view style="margin: 30rpx 20rpx;">
								<view>
									<image :src=item.cover style="width: 200rpx;height: 200rpx;"></image>
								</view>
								<view class="text-overflow">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view :class="{'hide':a==0}">
			<swiper indicator-dots style="height: 400rpx;">
				<swiper-item>
					<view style="display: flex; ">
						<view v-for="(item,index) in hot.slice(0,3)" :key='index'>
							<view style="margin: 30rpx 20rpx;">
								<view>
									<image :src=item.cover style="width: 200rpx;height: 200rpx;"></image>
								</view>
								<view class="text-overflow">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view style="display: flex;">
						<view v-for="(item,index) in hot.slice(3,6)" :key='index'>
							<view style="margin: 30rpx 20rpx;">
								<view>
									<image :src=item.cover style="width: 200rpx;height: 200rpx;"></image>
								</view>
								<view class="text-overflow">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let detailsModule = createNamespacedHelpers('details')
	let {
		mapState: detailsState,
		mapActions: detailsActions
	} = detailsModule

	export default {
		components: {},
		props: {},
		data() {
			return {
				a: 0
			}
		},
		methods: {
			...detailsActions(['getHot', 'getRecommend']),
			btn(e) {
				// console.log(e);
				this.a = e
			}
		},
		mounted() {
			this.getHot()
			this.getRecommend()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...detailsState(['hot', 'recommend'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.textColor {
		margin: 20rpx;
		color: #FF4500;
	}

	.Line {
		width: 80rpx;
		background-color: #FF4500;
		height: 5rpx;
	}

	.textbox {
		margin: 10rpx 20rpx;
	}

	.text-overflow {
		width: 200rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.hide {
		display: none;
	}
</style>
