<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view style="height: 50rpx;width: 100%;"></view>
		<!-- #endif -->
		<view style="display: flex;align-items: center;">
			<view @click="out">
				<image src="../../static/arrow.png"
					style="width: 40rpx;height: 40rpx;margin-bottom: 5rpx; padding: 20rpx;">
				</image>
			</view>
			<view style="font-size: 36rpx;font-weight: 700;margin: 20rpx 0rpx;">小米账号注册</view>
		</view>
		<cc-form :model.sync="model" :rules="rules" ref="form">
			<cc-form-item leftIcon="person" label="用户名" prop="username">
				<cc-field :value.sync="model.username" :border="false"></cc-field>
			</cc-form-item>
			<cc-form-item label="手机号" prop="mobile">
				<cc-field type="mobile" :value.sync="model.mobile" :border="false"></cc-field>
			</cc-form-item>
			<cc-form-item label="密码" prop="password">
				<cc-field type="password" :value.sync="model.password" :border="false"></cc-field>
			</cc-form-item>
			<cc-form-item label="验证码" prop="code">
				<cc-field type="code" :value.sync="model.code" :border="false"></cc-field>
				<view style="width: 460rpx;display: flex;align-items: center;">
					<view class="blue" :class="{'Gray':flag==false}" @click="btn">{{checking}}</view>
					<view :class="{'Gray':flag==false}" v-if="flag==false">:{{time}}S</view>
				</view>
			</cc-form-item>
		</cc-form>
		<!-- 下一步按钮 -->
		<view class='mright'>
			<cc-button round class='nex' type="primary" block @click="submit">注册</cc-button>
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
				model: {
					username: '',
					mobile: '',
					password: '',
					code: ''
				},
				rules: {
					username: [{
							required: true,
							message: '用户名不能为空',
							trigger: 'change'
						},
						{
							min: 1,
							max: 6,
							message: '用户名1-6位之间',
							trigger: 'change'
						}
					],
					mobile: [{
						required: true,
						message: '号码不能为空',
					}],
					code: [{
						required: true,
						message: '号码不能为空',
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				},
				checking: '获取验证码',
				flag: true,
				time: 60
			}
		},
		methods: {
			...loginActions(['getCode', 'register']),
			out() {
				uni.navigateBack()
			},
			submit() {
				// console.log(this.model);
				this.register({
					mobile: this.model.mobile,
					code: this.model.code,
					username: this.model.username,
					password: this.model.password
				})
			},
			btn() {
				if (this.model.mobile !== '') {
					this.getCode({
						mobile: this.model.mobile
					})
				}
				this.flag = false
				let timer = setInterval(() => {
					this.time--
					if (this.time === 0) {
						clearInterval(timer)
						this.time = 60
						this.flag = true
					}
				}, 1000)
			},
			password() {
				uni.navigateTo({
					url: `/pages/login/login`
				})
			},
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
	.blue {
		color: blue;
		font-size: 30rpx;
	}

	.Gray {
		color: Gray !important;
		pointer-events: none;
		font-size: 30rpx;
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
