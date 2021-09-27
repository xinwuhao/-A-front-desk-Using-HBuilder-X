<template>
	<view>
		<scroll-view scroll-x="true" class="box">
			<view style="display: flex;">
				<view v-for="(item,index) in getRecommendNavList" :key='index'>
					<view style="margin: 20rpx;" @click="btn(index)">
						<view class="fontSize" :class="{'color':abc==index}">{{item.name}}</view>
						<view style="white-space: nowrap;" :class="{'boxColor':abc==index}">{{item.desc}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view style="display: flex;flex-wrap: wrap;">
			<view v-for="(item,index) in getNavGoodsList" in :key='index'>
				<view @click="goto(item)">
					<image :src=item[0].cover class="img"></image>
					<view style="padding: 10rpx 20rpx; margin: 0rpx 26rpx;">
						<view class="text">{{item[0].name}}</view>
						<view class="fontColor">￥{{item[0].presentPrice}}</view>
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
	let homepageModule = createNamespacedHelpers('homepage')
	let {
		mapState: homepageState,
		mapActions: homepageActions
	} = homepageModule

	export default {
		components: {},
		props: {},
		data() {
			return {
				arr: [],
				id: '',
				abc: 0
			}
		},
		//方法事件
		methods: {
			...homepageActions(['getRecommendNav', 'getNavGoods']),
			btn(index) {
				this.abc = index
				this.id = this.arr[index]._id
				this.getNavGoods({
					id: this.id
				})
			},
			goto(item) {
				// console.log(item[0]._id)
				let a = item[0]._id
				uni.navigateTo({
					url: `/pages/details/details?id=${a}`
				})
			}
		},
		//进入执行
		mounted() {
			this.getRecommendNav()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homepageState(['getRecommendNavList', 'getNavGoodsList'])
		},
		// 监听
		watch: {
			getRecommendNavList(e) {
				this.arr = e
				this.id = this.arr[0]._id
				this.getNavGoods({
					id: this.id
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.box {
		white-space: nowrap;
		width: 100vw;
	}

	.fontSize {
		font-size: 40rpx;
		font-weight: 700;
		text-align: center;
		margin-bottom: 10rpx;
	}

	.img {
		width: 320rpx;
		height: 320rpx;
		margin: 0rpx 26rpx;
	}

	.color {
		color: #FF4500 !important;
	}

	.boxColor {
		color: #FFFFFF !important;
		background-color: #FF4500 !important;
		border-radius: 50rpx;
	}

	.fontColor {
		font-size: 18px;
		font-weight: 700;
		color: #FF4500;
	}

	.text {
		width: 300rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
