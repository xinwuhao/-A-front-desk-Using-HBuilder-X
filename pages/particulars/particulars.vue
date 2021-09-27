<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="arrowbox">
			<image src="../../static/arrow.png" class="arrowimg"></image>
			<view>小米Lite</view>
		</view>
		<!-- #endif -->
		<view>
			<!-- #ifdef MP-WEIXIN -->
			<cc-search :value.sync="value" round>
				<template #action>
					<view @click="goto(value)">搜索</view>
				</template>
			</cc-search>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<cc-search :value.sync="value" @input="cheng">
				<template #action>
					<view @click="goto(value)">搜索</view>
				</template>
			</cc-search>
			<!-- #endif -->
		</view>
		<!-- 搜索结果 -->
		<view :class="{'mask':num==1}">
			<view v-if="num==1">
				<view class="white">
					<view v-for="(item,index) in searchList">
						<view class="textwhite" @click="goto(item.name)">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>

		<view>
			<view v-for="(item,index) in searchList" :key='index'>
				<view style="display: flex;align-items: center;" @click="go(item._id)">
					<view>
						<image :src=item.cover class="cover"></image>
					</view>
					<view style="margin-left: 20rpx;">
						<view style="font-weight: 700;">{{item.name}}</view>
						<view class="text-overflow">{{item.introduction}}</view>
						<view style="display: flex;">
							<view class="OrangeRed">￥{{item.presentPrice}}</view>
							<view v-if="item.presentPrice!==item.originalPrice">
								<view class="Gray">￥{{item.originalPrice}}</view>
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
	let searchModule = createNamespacedHelpers('search')
	let {
		mapState: searchState,
		mapActions: searchActions
	} = searchModule

	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				arr: [],
				num: 0
			}
		},
		methods: {
			...searchActions(['search']),
			goto(e) {
				uni.navigateTo({
					url: `/pages/particulars/particulars?name=${e}`
				})
				this.value = ''
				if (e !== '') {
					this.$utils.saveHistory({
						key: 'name',
						data: e,
						attr: 'name'
					})
				}
			},
			go(e) {
				uni.navigateTo({
					url: `/pages/details/details?id=${e}`
				})
			},
			cheng() {
				// console.log(123);
				this.num = 1
			}
		},
		mounted() {},
		onLoad(e) {
			this.value = e.name
		},
		onShow() {},
		filters: {},
		computed: {
			...searchState(['searchList'])
		},
		watch: {
			value(e) {
				// console.log(e);
				this.search({
					current: 1,
					pageSize: 10,
					query: e
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.cover {
		width: 250rpx;
		height: 250rpx;
	}

	.OrangeRed {
		font-weight: 700;
		font-size: 38rpx;
		color: OrangeRed;
	}

	.Gray {
		color: Gray;
		text-decoration: line-through;
	}

	.text-overflow {
		color: Gray;
		width: 450rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.arrowimg {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.arrowbox {
		display: flex;
		align-items: flex-end;
		height: 130rpx;
		padding-left: 20rpx;
	}

	.mask {
		position: fixed;
		top: 90rpx;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 94vh;
	}

	.white {
		width: 100%;
		background-color: #FFFFFF;
	}

	.textwhite {
		padding: 20rpx;
		border-bottom: 2rpx solid #C0C0C0;
	}
</style>
