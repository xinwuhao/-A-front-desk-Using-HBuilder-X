<template>
	<view>
		<view class="topBox">
			<image src="../../static/arrow.png" class="arrow" @click="out"></image>
			<view style="font-weight: 700;">确认订单</view>
		</view>
		<view class="subjectBox">
			<scroll-view scroll-x="ture" style="width: 100%;">
				<view style="display: flex;">
					<view>秒杀时间：</view>
					<view v-for="(item,index) in timer" :key='index'>
						<view style="width: 160rpx;" @click="btn(index)">
							<view style="text-align: center;" :class="{'timeText':index==num}">{{item}}</view>
							<view style="display: flex;justify-content: center;">
								<view v-if="index==num" class="underwayBox">抢购中</view>
								<view v-else>即将开始</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view style="margin-top: 40rpx;">
				<view v-for="(item,index) in list1" :key='index'>
					<view v-if="item.time==timer[num]&&t<=item.end_time">
						<view style="display: flex;justify-content: space-between;">
							<view style="display: flex; align-items: center;">
								<view>
									<image :src=item.goods.cover class="imgBox"></image>
								</view>
								<view>
									<view>{{item.goods.name}}</view>
									<view style="display: flex;">
										<view>￥{{item.price}}</view>
										<view>￥{{item.goods.presentPrice}}</view>
									</view>
								</view>
							</view>
							<view class="robBox">
								<view style="color: #FFFFFF;" @click="go(item.goods)">去抢购</view>
								<cc-progress
									:percentage="Number(((t-item.start_time)/(item.end_time-item.start_time))*100).toFixed(0)"
									bg-color="#fff">
								</cc-progress>
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
	let seckillModule = createNamespacedHelpers('seckill')
	let {
		mapState: seckillState,
		mapActions: seckillActions
	} = seckillModule
	import dayjs from 'dayjs'
	import * as _ from 'lodash'

	export default {
		components: {},
		props: {},
		data() {
			return {
				list: [],
				list1: [],
				timer: [],
				t: dayjs(new Date()).valueOf(),
				num: 0
			}
		},
		methods: {
			...seckillActions(['getSeckill']),
			out() {
				uni.navigateBack()
			},
			btn(e) {
				this.num = e
			},
			go(e) {
				uni.navigateTo({
					url: `/pages/details/details?id=${e._id}`
				})
			}
		},
		mounted() {
			this.getSeckill()
			let timer = setInterval(() => {
				this.t = dayjs(new Date()).valueOf()
			}, 1000)
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...seckillState(['seckill'])
		},
		watch: {
			seckill(e) {
				if (e) {
					e.map(item => {
						this.list.push({
							end_time: dayjs(item.end_time).valueOf(),
							start_time: dayjs(item.start_time).valueOf(),
							goods: item.goods,
							price: item.price,
							isShow: item.isShow,
							id: item._id,
							number: item.goods_number,
							time: dayjs(item.start_time).format('HH:mm')
						})
					})
					this.list.map(item => {
						if (item.end_time >= this.t) {
							this.list1.push(item)
							this.timer.push(item.time)
						}
					})
					this.timer = _.uniq(this.timer)
					// console.log(this.list1);
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.robBox {
		position: relative;
		width: 200rpx;
		top: 60rpx;
		border-radius: 20rpx;
		padding: 20rpx 20rpx 0rpx 20rpx;
		background-color: #FF4500;
		height: 90rpx;
	}

	.topBox {
		position: fixed;
		/* #ifdef H5 */
		top: 0;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 50rpx;
		/* #endif */
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding: 20rpx;
		background-color: #FFFFFF;
		z-index: 999;
	}

	.arrow {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.subjectBox {
		position: relative;
		/* #ifdef H5 */
		top: 100rpx;
		/* #endif */
		padding: 20rpx;
		/* #ifdef MP-WEIXIN */
		top: 130rpx;
		/* #endif */
	}

	.timeText {
		color: #FF4500;
		font-weight: 700;
	}

	.underwayBox {
		border-radius: 50rpx;
		background-color: #FF4500;
		color: #FFFFFF;
	}

	.imgBox {
		width: 200rpx;
		height: 200rpx;
	}
</style>
