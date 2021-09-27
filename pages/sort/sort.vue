<template>
	<view style="padding: 20rpx;">
		<view class="top">
			<view class="searchBox" @click="gotoSearch">
				<image src="../../static/sousuo.png" class="imgSearch"></image>
				<view style="font-size: 38rpx;color: #999999;">搜索商品</view>
			</view>
		</view>
		<view style="display: flex;justify-content: space-around;">
			<view>
				<scroll-view scroll-y="true">
					<view v-for="(item,index) in category" :key='index'>
						<view style="padding:30rpx 10rpx;" @click="flees(index)">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="width: 75%;">
				<view>
					<scroll-view scroll-x="true" style="width: 100%;">
						<view style="display: flex;">
							<view v-for="(item,index) in list" :key='index'>
								<view @click="spot(index)">
									<view class="textbox" :class="{'fontbox':a==index}">
										{{item.name}}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view v-for="(item,index) in spotList[0]" :key='index'>
						<view class="goodsBox">
							<view>
								<image :src=item.cover class="imgbox"></image>
							</view>
							<view>
								<view class="text">{{item.name}}</view>
								<view class="text">￥{{item.presentPrice}}起</view>
							</view>
						</view>
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
	let sortModule = createNamespacedHelpers('sort')
	let {
		mapState: sortState,
		mapActions: sortActions
	} = sortModule

	export default {
		components: {},
		props: {},
		data() {
			return {
				arr: [],
				list: [],
				spotList: [],
				a: 0
			}
		},
		methods: {
			...sortActions(['getCategory']),
			flees(e) {
				this.a = 0
				// console.log(e);
				this.spotList = []
				this.list = this.arr[e].list
				if (this.list[0].list) {
					this.spotList = this.list[0].list[0]
				}
				this.spotList = Object.values(this.spotList)
			},
			spot(e) {
				this.a = e
				// console.log(this.a);
				this.spotList = []
				if (this.list[e].list) {
					this.spotList = this.list[e].list[0]
				}
				this.spotList = Object.values(this.spotList)
			},
			gotoSearch() {
				uni.navigateTo({
					url: `/pages/search/search`
				})
			}
		},
		mounted() {
			this.getCategory()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...sortState(['category'])
		},
		watch: {
			category(e) {
				this.arr = e
				this.list = this.arr[0].list
				this.spotList = this.list[0].list[0]
				this.spotList = Object.values(this.spotList)
			}
		},
	}
</script>

<style scoped lang="scss">
	.searchBox {
		/* #ifdef H5 */
		width: 93%;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		width: 450rpx;
		/* #endif */
		padding: 20rpx;
		border-radius: 50rpx;
		display: flex;
		align-items: flex-end;
		background-color: #F5F5F5;
	}

	.imgSearch {
		width: 50rpx;
		height: 50rpx;
		margin: 0rpx 20rpx;
	}

	.imgbox {
		width: 150rpx;
		height: 150rpx;
		background-color: #FFFFFF;
	}

	.text {
		margin: 10rpx;
	}

	.textbox {
		white-space: nowrap;
		padding: 20rpx;
		margin: 20rpx;
	}

	.fontbox {
		white-space: nowrap;
		padding: 20rpx;
		margin: 20rpx;
		background-color: #DCDCDC;
	}

	.top {
		/* #ifdef MP-WEIXIN */
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: flex-end;
		/* #endif */
	}

	.goodsBox {
		display: flex;
		align-items: center;
		background-color: #F5F5F5;
		padding: 5rpx;
		margin: 10rpx;
	}

	.notyet {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}

	.hide {
		display: none;
	}
</style>
