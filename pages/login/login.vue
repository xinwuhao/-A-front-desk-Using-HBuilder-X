<template>
	<view>
		<view :class="{'hide':ent==1}">
			<image src="../../static/background.d3d7d2dd.png" class="backdrop"></image>
			<view class="box">
				<view style="margin-top: 200rpx;">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/icon-xiaomiguishu.png" class="imgbox"></image>
					</view>
					<view style="color: #808080; margin: 25rpx; text-align: center;">
						让每个人都能享受科技的乐趣
					</view>
					<view style="width: 580rpx;height: 150rpx;"></view>
					<view style="font-size: 36rpx;font-weight: 700;margin: 20rpx 0rpx;">小米账号登录</view>
					<!-- 输入框 -->
					<view class="textbox" :class="{'surface':num!==0}">
						<view style="font-size: 36rpx;font-weight: 700;">+86</view>
						<view>
							<image src="../../static/rightArrow.png" class="imBox"></image>
						</view>
						<input type="text" class="text" v-model="value" @blur='nbc' />
					</view>
					<view class="hide" :class="{'red':num==1}">手机号码输入有误，请重新输入</view>
					<view class="hide" :class="{'red':num==2}">手机号码不能为空</view>
					<!-- 下一步按钮 -->
					<view class='mright'>
						<cc-button round class='nex' type="primary" block @click="nextbox" :disabled=abc>
							下一步</cc-button>
					</view>
					<view style="display: flex; justify-content: center;margin-top: 30rpx;">
						<view style="color: #999999;" @click="password">用户密码登录</view>
						<view style="margin: 0rpx 10rpx;color: #999999;">|</view>
						<view style="color: #999999;" @click="register">立即注册</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下一步的框 -->
		<view :class="{'hide':ent==0}">
			<view style="padding: 20rpx;" @click="superior">
				<image src="../../static/arrow.png" style="width: 50rpx;height: 40rpx;"></image>
			</view>
			<view style="padding-left: 20rpx;">
				<view style="font-size: 50rpx;font-weight: 700;">小米账号登录</view>
				<view style="display: flex;justify-content: space-between;padding: 20rpx 30rpx;">
					<view>验证码已发送至+86 {{value}}</view>
					<view style="color: #007AFF;" @click="sade">修改</view>
				</view>
				<view class="textbox" style="margin-top: 60rpx;">
					<input type="text" class="text" v-model="code" @blur='' />
					<view class="Reset">
						<view style="color: #007AFF;" :class="{'Gray':time!==60}" @click="dian">重新发送</view>
						<view v-if="time!==60" :class="{'Gray':time!==60}">{{time}}s</view>
					</view>
				</view>
				<view class='mright'>
					<cc-button round class='nex' type="primary" block @click="deng">
						登录</cc-button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let loginModule = createNamespacedHelpers('login')
	let {
		mapState: loginState,
		mapActions: loginActions
	} = loginModule

	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				code: '',
				num: 0,
				abc: true,
				ent: 0,
				time: 60
			}
		},
		methods: {
			...loginActions(['getCode', 'mobileLogin']),
			//用户密码登录
			password() {
				uni.navigateTo({
					url: `/pages/login/password`
				})
			},
			//注册
			register() {
				uni.navigateTo({
					url: `/pages/login/register`
				})
			},
			//修改
			sade() {
				this.ent = 1
			},
			// 重发
			dian() {
				let timer = setInterval(() => {
					this.time--
					if (this.time === 0) {
						clearInterval(timer)
						this.time = 60
					}
				}, 1000)
				// 发请求
				this.getCode({
					mobile: this.value
				})
			},
			//手机登路
			deng() {
				this.mobileLogin({
					mobile: this.value,
					code: this.code
				})
			},
			//输入框，更改值的时候变化
			nbc() {
				// console.log(123, this.value);
				if (this.value == '') {
					this.num = 2
				}
			},
			//返回上一步
			superior() {
				uni.navigateTo({
					url: `/pages/login/login`
				})
			},
			//手机登录下一步
			nextbox() {
				let a =
					/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
				// console.log(this.value);
				if (a.test(this.value)) {
					this.ent = 1
					let timer = setInterval(() => {
						this.time--
						if (this.time === 0) {
							clearInterval(timer)
							this.time = 60
						}
					}, 1000)
					// 发请求
					this.getCode({
						mobile: this.value
					})
				} else {
					this.num = 1
				}
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...loginState([])
		},
		watch: {
			value(e) {
				if (e.length >= 11) {
					this.abc = false
				} else {
					this.abc = true
				}
				this.num = 0
				if (e == '') {
					this.num = 2
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.Gray {
		color: Gray !important;
		pointer-events: none;
	}

	.Reset {
		display: flex;
		position: fixed;
		right: 30rpx;
	}

	.nex {
		margin-top: 50rpx;
		/* #ifdef H5 */
		padding: 55rpx;
		/* #endif */
	}

	.mright {
		/* #ifdef MP-WEIXIN */
		padding-left: 30rpx;
		/* #endif */
	}

	.surface {
		border: 1rpx solid red;
	}

	.backdrop {
		width: 100%;
		height: 800rpx;
	}

	.hide {
		display: none;
	}

	.red {
		color: red;
		display: block;
		margin-top: 10rpx;
		position: fixed;
	}

	.text {
		padding-left: 30rpx;
		font-size: 36rpx;
		font-weight: 700;
	}

	.imgbox {
		width: 80rpx;
		height: 80rpx;
	}

	.imBox {
		width: 30rpx;
		height: 50rpx;
	}

	.textbox {
		/* #ifdef H5 */
		width: 95%;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		width: 95%;
		margin-bottom: 40rpx;
		margin-left: 20rpx;
		/* #endif */
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		background-color: #F5F5F5;
		/* #ifdef H5 */
		padding: 40rpx 0rpx 40rpx 30rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding: 25rpx 0rpx 25rpx 30rpx;
		/* #endif */
	}

	.box {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		display: flex;
		position: absolute;
		justify-content: center;
	}
</style>
