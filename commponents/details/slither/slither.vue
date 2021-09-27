<template>
	<view>
		<view style="width:100vw;height: 1px;background-color: #F5F5F5;"></view>
		<scroll-view scroll-x="true" style="padding: 20rpx 0rpx;">
			<view style="display: flex;">
				<view v-for="(item,index) in params" :key='index'>
					<view class="box">
						<view style="display: flex;justify-content: center;align-items: center;">
							<image :src=item.url class="img"></image>
						</view>
					</view>
					<view class="box">{{item.name}}</view>
					<view class="box">{{item.desc}}</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			params: {
				type: Array,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {},
		mounted() {},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.img {
		width: 50rpx;
		height: 50rpx;
	}

	.box {
		width: 200rpx;
		margin: 0rpx 10rpx;
		text-align: center;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
