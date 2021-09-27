<template>
	<view>
		<!-- 顶部 -->
		<view class="topBox" :class="{'white':num!==0}">
			<view class="imgTop" @click="out">
				<image src="../../static/arrow.png" class="arrow"></image>
			</view>
			<Topbox :num='num'></Topbox>
		</view>
		<!-- 轮播图 -->
		<view>
			<cc-swiper :list="img" bottom="40" right="300" height='700'></cc-swiper>
		</view>
		<!-- 描述 名称-->
		<view style="padding:20rpx;">
			<view style="display: flex;">
				<view class="font700">￥{{arr.presentPrice}}</view>
				<view class="textColor">￥{{arr.originalPrice}}</view>
			</view>
			<view style="font-size: 38rpx;font-weight: 700;">{{arr.name}}</view>
			<view v-for="(item,index) in arr1" :key='index'>
				<view style="display: flex;">
					<view class="yuan">{{index+1}}</view>
					<view>{{item}}</view>
				</view>
			</view>
		</view>
		<view style="padding: 20rpx;">
			<!-- 滑动 -->
			<Slither v-if="params.length>0" :params='params'></Slither>
			<!-- 已选择 -->
			<Selected v-if="arr" :arr='arr'></Selected>
			<!-- 定位 -->
			<Place></Place>
			<!-- 评论 -->
			<Evaluate v-if="comment.length>0" :comment='comment'></Evaluate>
			<!-- 热卖 -->
			<Heat></Heat>
			<view style="display: flex; justify-content: center;">
				<view>
					<view class="textbox" @click="btn(0)" :class="{'textColora':a==0}">详情</view>
					<view style="display: flex;justify-content: center;">
						<view :class="{'Line':a==0}"></view>
					</view>
				</view>
				<view>
					<view class="textbox" @click="btn(1)" :class="{'textColora':a==1}">规格</view>
					<view style="display: flex;justify-content: center;">
						<view :class="{'Line':a==1}"></view>
					</view>
				</view>
			</view>
			<!-- 详情 -->
			<view v-html="arr.detail" style="margin-top: 40rpx;" :class="{'hide':a==1}"></view>
			<!-- 规格 -->
			<view v-html="arr.specParams" style="margin-top: 40rpx;" :class="{'hide':a==0}"></view>
		</view>
		<view style="width: 100%;height: 150rpx;"></view>
	</view>

</template>

<script>
	import Topbox from '../../commponents/details/topbox/topbox.vue'
	import Slither from '../../commponents/details/slither/slither.vue'
	import Selected from '../../commponents/details/selected/selected.vue'
	import Place from '../../commponents/details/place/place.vue'
	import Evaluate from '../../commponents/details/evaluate/evaluate.vue'
	import Heat from '../../commponents/details/heat/heat.vue'
	import dayjs from 'dayjs'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let detailsModule = createNamespacedHelpers('details')
	let {
		mapState: detailsState,
		mapActions: detailsActions
	} = detailsModule

	export default {
		components: {
			Topbox,
			Slither,
			Selected,
			Place,
			Evaluate,
			Heat
		},
		props: {},
		data() {
			return {
				id: '',
				img: [],
				arr: {},
				arr1: [],
				params: [],
				num: 0,
				a: 0,
				comment: []
			}
		},
		//方法事件
		methods: {
			...detailsActions(['goodsDetail']),
			onPageScroll(e) {
				// console.log(e.scrollTop)
				if (e.scrollTop >= 153) {
					this.num = 1
				} else {
					this.num = 0
				}
				if (e.scrollTop >= 300) {
					this.num = 2
				}
				if (e.scrollTop >= 500) {
					this.num = 3
				}
				if (e.scrollTop >= 700) {
					this.num = 4
				}
			},
			btn(e) {
				this.a = e
			},
			out() {
				uni.navigateBack()
			},
		},
		//进入执行
		mounted() {
			if (this.id !== '') {
				this.goodsDetail(this.id)
			}
		},
		onLoad(e) {
			// console.log(e)
			this.id = e.id
		},
		onShow() {

		},
		filters: {},
		computed: {
			...detailsState(['goodsList'])
		},
		// 监听
		watch: {
			goodsList(e) {
				this.comment = e.comment
				this.comment.map((item, index) => {
					if (item) {
						item.comment_time = dayjs(item.comment_time).format('YYYY/MM/DD')
					}
				})
				console.log(this.comment);
				this.arr = e
				this.arr1 = e.sellDesc[0].split("\n")
				this.params = this.arr.params
				e.pic.map((item) => {
					this.img.push({
						image: item
					})
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.h5 {
		width: 100%;
		height: 100rpx;
	}

	.topBox {
		width: 100%;
		position: fixed;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		/* #ifdef MP-WEIXIN */
		height: 100rpx;
		padding: 20rpx;
		/* #endif */
	}

	.white {
		background-color: #FFFFFF !important;
		width: 100%;
		/* #ifdef MP-WEIXIN */
		height: 100rpx;
		/* #endif */
	}

	.imgTop {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		background-color: #F5F5F5;
		border-radius: 100%;
		position: absolute;
		left: 10rpx;
		/* #ifdef H5 */
		top: 5rpx;
		/* #endif */
	}

	.arrow {
		width: 50rpx;
		height: 50rpx;
	}

	.font700 {
		font-size: 18px;
		color: #FF4500;
		font-weight: 700;
	}

	.textColor {
		margin-left: 10rpx;
		font-size: 15px;
		text-decoration: line-through;
		color: #C0C0C0;
	}

	.yuan {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 35rpx;
		height: 35rpx;
		border-radius: 100%;
		border: 1rpx solid #DCDCDC;
	}

	.Line {
		width: 80rpx;
		background-color: #FF4500;
		height: 5rpx;
	}

	.textColora {
		margin: 20rpx;
		color: #FF4500;
	}

	.textbox {
		margin: 10rpx 20rpx;
	}

	.text-overflow {
		width: 200rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.hide {
		display: none;
	}

	.ding {
		position: fixed;
		display: flex;
		justify-content: center;
		width: 100%;
	}
</style>
