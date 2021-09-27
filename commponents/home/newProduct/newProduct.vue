<template>
	<view style="padding: 20rpx;">
		<view class="fontSizeNew">人气上新</view>
		<view class="boxnew">
			<view v-for="(item,index) in getNewList" :key='index'>
				<view v-if="index<3">
					<image :src=item.cover class="New_imgbox"></image>
					<view class="overflowNew">{{item.name}}</view>
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
			...homepageActions(['getNew']),
		},
		mounted() {
			this.getNew()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homepageState(['getNewList'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.boxnew {
		width: 750rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.fontSizeNew {
		font-size: 50rpx;
		font-weight: 700;
		margin: 15rpx 0rpx;
	}

	.New_imgbox {
		width: 200rpx;
		height: 200rpx;
		margin: 0rpx 20rpx;
	}

	.overflowNew {
		width: 200rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
