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
			<cc-search :value.sync="value">
				<template #action>
					<view @click="goto(value)">搜索</view>
				</template>
			</cc-search>
			<!-- #endif -->
		</view>
		<!-- 搜索结果 -->
		<!-- #ifdef H5 -->
		<view :class="{'mask':value}">
			<view v-if="value">
				<view class="white">
					<view v-for="(item,index) in searchList">
						<view class="textwhite" @click="goto(item.name)">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->

		<view>
			<view class="deleteBox">
				<view class="text">搜索历史</view>
				<image src="../../static/delete.png" class="arrowimg"></image>
			</view>
			<view style="display: flex;padding: 20rpx;">
				<view v-for="(item,index) in arr" :key='index'>
					<view class="textColor" @click="goto(item.name)">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="text">搜索发现</view>
			<view class="word">
				<view class="textbox" @click="goto('')">全部商品</view>
				<view v-for="(item,index) in words" :key='index'>
					<view class="textbox" @click="goto(item.name)">{{item.name}}</view>
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
				arr: []
			}
		},
		methods: {
			...searchActions(['getSearchWords', 'search']),
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
			}

		},
		mounted() {
			this.getSearchWords()
		},
		onLoad() {

		},
		onShow() {
			this.arr = this.$utils.getHistory({
					key: 'name'
				}),
				console.log(this.arr);
		},
		filters: {},
		computed: {
			...searchState(['words', 'searchList'])
		},
		watch: {
			value(e) {
				console.log(e);
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

	.text {
		font-size: 36rpx;
		font-weight: 700;
	}

	.textbox {
		margin-bottom: 20rpx;
		width: 250rpx;
		padding: 20rpx;
	}

	.textColor {
		padding: 15rpx 30rpx;
		background-color: #F5F5F5;
		border-radius: 50rpx;
	}

	.deleteBox {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
	}

	.word {
		display: flex;
		justify-content: space-between;
		padding: 40rpx;
		flex-wrap: wrap;
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
