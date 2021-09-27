<template>
	<view>
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
				<cc-form :model.sync="model" :rules="rules" ref="form">
					<cc-form-item leftIcon="person" label="用户名" prop="username">
						<cc-field :value.sync="model.username" :border="false"></cc-field>
					</cc-form-item>
					<cc-form-item label="密码" prop="password">
						<cc-field type="password" :value.sync="model.password" :border="false"></cc-field>
					</cc-form-item>
				</cc-form>
				<!-- 下一步按钮 -->
				<view class='mright'>
					<cc-button round class='nex' type="primary" block @click="submit">
						登录</cc-button>
				</view>
				<view style="display: flex; justify-content: center;margin-top: 30rpx;">
					<view style="color: #999999;" @click="password">手机登录</view>
					<view style="margin: 0rpx 10rpx;color: #999999;">|</view>
					<view style="color: #999999;" @click="register">立即注册</view>
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
				model: {
					username: '',
					password: '',
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
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			...loginActions(['userLogin']),
			submit() {
				console.log(this.model);
				this.userLogin({ 
					username:this.model.username,
					password:this.model.password
				})
			},
			register() {
				uni.navigateTo({
					url: `/pages/login/register`
				})
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
