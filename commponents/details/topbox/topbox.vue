<template>
	<view>
		<view :class="{'hide':num==0}">
			<view style="display: flex;height: 60rpx; align-items: center;" class="right">
				<view v-for="(item,index) in font" :key='index'>
					<view style="margin: 0rpx 10rpx;">
						<view :class="{'fontbox':num==index+1}">{{item}}</view>
						<view style="display: flex;justify-content: center;">
							<view class="CCG" :class="{'cent':num==index+1}"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			num: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				font: ['商品', '评价', '推荐', '详情'],
			}
		},
		methods: {

		},
		mounted() {

		},
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
	.hide {
		display: none;
	}

	.fontbox {
		color: #FF4500;
	}

	.right {
		/* #ifdef MP-WEIXIN */
		padding-right: 120rpx;
		/* #endif */
	}

	.CCG {
		margin-top: 5rpx;
		width: 40rpx;
		height: 5rpx;
	}

	.cent {
		margin-top: 5rpx;
		width: 40rpx;
		height: 5rpx;
		background-color: #FF4500;
	}
</style>
