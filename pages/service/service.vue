<template>
	<view>
		<view>
			<view class="topBox">
				<view class="leftBox">
					<image src="../../static/arrow.png" class="arrow"></image>
				</view>
				<view style="font-size: 40rpx;font-weight: 700;">服务中心</view>
			</view>
		</view>
		<view class="subjectBox" @click="OFF">
			<scroll-view scroll-y="true">
				<view v-for="(item,index) in list" :key='index'>
					<view v-if="item.name=='用户'">
						<view style="display: flex;justify-content: flex-end;align-items: center; margin-top: 40rpx;">
							<view style="padding: 10rpx 20rpx; background-color: #1afa29;">{{item.news}}</view>
							<image src="../../static/right.png"
								style="width: 30rpx;height: 40rpx;position: relative;right: 4rpx;"></image>
							<view>{{item.name}}</view>
						</view>
					</view>
					<view v-else>
						<view style="display: flex;align-items: center;margin-top: 40rpx;">
							<view>{{item.name}}</view>
							<image src="../../static/Left.png"
								style="width: 30rpx;height: 40rpx;position: relative;left: 4rpx;"></image>
							<view style="padding: 10rpx 20rpx; background-color: #FFFFFF;">{{item.news}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="bottomBox">
			<view style="display: flex;justify-content: space-around;align-items: center;">
				<view style="padding-top: 20rpx; " @click="ON">
					<image src="../../static/expression.png" class="arrow"></image>
				</view>
				<view>
					<input type="text" class="text" v-model="value" />
				</view>
				<view class="sendBox" @click="send">发送</view>
			</view>
			<view v-if="num==true">
				<scroll-view scroll-y="true" style="width: 100%; height: 200rpx; margin-top: 20rpx;">
					<view style="display: flex;flex-wrap: wrap;">
						<view v-for="(item,index) in img" :key="index">
							<view style="margin: 10rpx;" @click="imgbtn(item)">
								{{item}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	import img from '../../lib/emoji.js'
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				list: [],
				img: img,
				num: false
			}
		},
		methods: {
			send() {
				this.$socket.emit('event', {
					//传递的内容
					news: this.value,
					name: '用户'
				})
				this.value = ''
			},
			imgbtn(e) {
				this.value = this.value + e
			},
			ON() {
				this.num = !this.num
			},
			OFF() {
				this.num = false
			}
		},
		mounted() {
			this.$socket.on('broadcast', (res) => {
				//res接受内容
				this.list.push(res)
				// console.log(this.list);
			})
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
	.sendBox {
		background-color: rgb(65, 168, 99);
		color: #FFFFFF;
		padding: 16rpx 30rpx;
	}

	.arrow {
		width: 50rpx;
		height: 50rpx;
	}

	.topBox {
		top: 0;
		left: 0;
		right: 0;
		height: 80rpx;
		display: flex;
		position: fixed;
		align-items: center;
		background-color: #FFFFFF !important;
		justify-content: center;
		z-index: 99;
	}

	.leftBox {
		position: absolute;
		left: 20rpx;
	}

	.subjectBox {
		position: relative;
		height: 1100rpx;
		background-color: #F5F5F5;
		top: 90rpx;
		padding: 20rpx;
	}

	.bottomBox {
		position: fixed;
		bottom: 0rpx;
		left: 0;
		right: 0;
		padding: 20rpx;
		background-color: #F5F5F5;
	}

	.text {
		background-color: #FFFFFF;
		width: 500rpx;
		border-radius: 10rpx;
		height: 80rpx;
	}
</style>
