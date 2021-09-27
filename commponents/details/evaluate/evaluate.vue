<template>
	<view>
		<view>用户评价</view>
		<view style="display: flex; margin-top: 40rpx;">
			<view v-for="(item,index) in comment" :key='index'>
				<view v-if="item" class="box">
					<view style="display: flex;align-items: center;">
						<image src="../../../static/icon-user-selected.png" class="imgBox"></image>
						<view style="margin-left: 20rpx;">
							<view>{{item.user.username}}</view>
							<view>{{item.comment_time}}</view>
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<view>{{item.content}}</view>
						<view style="margin-top: 20rpx;">
							<image :src=item.pic class="tuBox"></image>
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
			comment: {
				type: Array,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {},
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
	.imgBox {
		width: 80rpx;
		height: 80rpx;
		background-color: #C8C7CC;
		border-radius: 100%;
		padding: 20rpx;
	}

	.tuBox {
		width: 200rpx;
		height: 200rpx;
		border: 1rpx solid #C0C0C0;
		border-radius: 20rpx;
	}

	.box {
		padding: 20rpx;
		width: 400rpx;
		border: 2rpx solid #C0C0C0;
		border-radius: 20rpx;
	}
</style>
