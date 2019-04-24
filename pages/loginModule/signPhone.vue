<template>
	<div class="">
		<signStep />
		<div class="sign">
			<sendCode @childChangeNumber ="changePhoneNumber" />
			<div class="code">
				<input v-model="code" @keyup.enter="NextStep" type="text" placeholder="Enter verification code" value="" name="">
			</div>
			<div class="btn" @click="NextStep">
				<button>Next Step</button>
			</div>
			<p>Have an account already? <nuxt-link :to="{name: 'loginModule-login'}">Login</nuxt-link></p>
		</div>
	</div>
</template>
<script>
	import signStep from '~/components/layout/signStep.vue'
	import sendCode from '~/components/base/sendCode.vue'
	// 统一验证
	import v from "~/assets/js/validate"
	// 统一接口
	import interfaceApi from '~/plugins/interfaceApi'
	// 提示语
	import prompt from '~/assets/js/prompt'
	export default {
		layout: 'signHome',
		data() {
			return {
				phoneNumber: '',
				code: ''
			}
		},
		components: {
			signStep,
			sendCode
		},
		mounted() {
			
			
		},
	  	computed: {  
		    
	  	},
		methods: {
			// 改变电话号码
			changePhoneNumber(number) {
				this.phoneNumber=number
			},
			// 下一步
			NextStep() {
				var that = this;
				if (!v.tel(that.phoneNumber)) {
					this.$message({
						message: prompt.number,
						type: 'warning'
			        });
					return false;
				} else if (!v.required(that.code)) {
					this.$message({
						message: prompt.code,
						type: 'warning'
			        });
					return false;
				}
				// 获取验证码
			    that.$axios.post(interfaceApi.mobileRegisterByPc,{
			    	mobile: that.phoneNumber,
			    	code: that.code
			    })
				.then(function (response) {
					if (response.data.code == 1) {
						that.$router.push({name: 'loginModule-signPassword',query: {phone: that.phoneNumber,code: that.code}})
					}
				});
			}
		}
	}
</script>
<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.sign 
		width: 413px
		margin: 0 auto
		padding-left: 5px
		.phone
			overflow: hidden
			
		.code
			input
				@include wh(400px, 36px)
				padding-left: 10px
				margin-top: 15px
				border-radius: $border_radius 
		.btn 
			@include whch(400px, 36px, center, 36px)
			background-color: $theme_color
			margin-top: 25px
			border-radius: $border_radius
			cursor: pointer
			button
				color: #fff
				background: no-repeat
				font-size: 16px
		p 
			@include sc(14px, $describe_color)
			text-align: center
			margin-top: 20px
			margin-bottom: 200px
			a 
				@include sc(14px, $theme_color)
</style>