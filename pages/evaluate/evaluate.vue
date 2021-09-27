<template>
	<view style="background-color: #F1F1F1; height: 100vh;">
		<view class="topBox">
			<view class="leftBox">
				<image src="../../static/arrow.png" class="arrow"></image>
			</view>
			<view style="font-size: 40rpx;font-weight: 700;">评价中心</view>
		</view>
		<view class="subjectBox">
			<view v-if="evaluate.goods" style="display: flex;align-items: center;">
				<view>
					<image :src=evaluate.goods.cover class="imgbox"></image>
				</view>
				<view style="margin-left: 20rpx;">{{evaluate.goods.name}}</view>
			</view>
			<view style="display: flex;">
				<view>评价等级：</view>
				<cc-rate @change="change" :value.sync="value"></cc-rate>
			</view>
			<view>
				<view>评价内容：</view>
				<cc-field :maxlength="200" show-word-limit :value.sync="value1" type="textarea" rows="10"
					style="background-color: #000000 !important; ">
				</cc-field>
				<view style="display: flex;margin-top: 20rpx;">
					<view>是否匿名：</view>
					<cc-switch :value.sync="checked" @change='onChange'></cc-switch>
				</view>
				<cc-button style="margin: 60rpx 0" type="primary" block @click='Submit'>提交</cc-button>
				<view class="imgup">
					<cc-upload :action="action" @uplpadSuccess="uplpadSuccess" :header='abc'></cc-upload>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let evaluateModule = createNamespacedHelpers('evaluate')
	let {
		mapState: evaluateState,
		mapActions: evaluateActions
	} = evaluateModule

	export default {
		components: {},
		props: {},
		data() {
			return {
				evaluate: {},
				action: 'http://localhost:7001/app/upload',
				//评价等级
				value: 0,
				abc: {
					Authorization: localStorage.getItem('token')
				},
				//输入内容
				value1: '',
				id: '',
				ordersId: '',
				img: '',
				checked: false
			}
		},
		methods: {
			...evaluateActions(['createComment']),
			// 评价等级
			change(val) {
				this.value = val
				console.log(this.value)
			},
			//上传图片
			uplpadSuccess(data) {
				this.img = data.data.data
				console.log(this.img)
			},
			onChange(val) {
				this.checked = val
				console.log(this.checked);
			},
			Submit() {
				this.createComment({
					user_id: this.id,
					goods_id: this.evaluate._id,
					order_id: this.ordersId,
					rate: this.value,
					content: this.value1,
					pic: this.img,
					isAnonymous: this.checked,
					comment_time: new Date()
				})
			}
		},
		mounted() {
			this.evaluate = uni.getStorageSync('evaluate')
			this.ordersId = uni.getStorageSync('ordersId')
			this.id = uni.getStorageSync('login')._id
			console.log(this.id, this.evaluate);
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...evaluateState([])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.arrow {
		width: 50rpx;
		height: 50rpx;
	}

	.imgup {
		position: relative;
		bottom: 600rpx;
		right: 20rpx;
		width: 100%;
		display: flex;
	}

	.topBox {
		top: 0;
		left: 0;
		right: 0;
		height: 80rpx;
		display: flex;
		position: fixed;
		align-items: center;
		justify-content: center;
	}

	.leftBox {
		position: absolute;
		left: 20rpx;
	}

	.subjectBox {
		position: relative;
		top: 90rpx;
		height: 1020rpx;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 50rpx;
		background-color: #FFFFFF;
	}

	.imgbox {
		width: 150rpx;
		height: 150rpx;
	}
</style>
