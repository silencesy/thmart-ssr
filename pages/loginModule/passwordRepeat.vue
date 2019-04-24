<template>
	<div class="">
		<passwordStep flag="2"/>
		<div class="sign">
			<div class="password">
				<input v-model="password" type="password" placeholder="Enter password" name="" value="">
			</div>
			<div class="rePassword">
				<input v-model="repeatPassword" @keyup.enter="submit" type="password" placeholder="Please re-enter your password" value="" name="">
			</div>
			<div class="btn" @click="submit">
				<button>Submit</button>
			</div>
			<p>Have an account already? <nuxt-link :to="{name: 'loginModule-login'}">Log in</nuxt-link></p>
		</div>
	</div>
</template>
<script>
	import passwordStep from '~/components/layout/passwordStep.vue'
	// 统一验证
	import v from "~/assets/js/validate"
	// 统一接口
	import interfaceApi from '~/plugins/interfaceApi'
	// 提示语
	import prompt from '~/assets/js/prompt'
	export default {
		layout: 'passwordHome',
		data() {
			return {
				password: '',
				repeatPassword: ''
			}
		},
		components: {
			passwordStep
		},
		mounted() {
			this.verificationPhone();
		},
	  	computed: {  
		    
	  	},
		methods: {
			submit() {
				var that = this;
				if (!v.password(that.password)) {
					this.$message({
						message: prompt.password,
						type: 'warning'
			        });
					return false;
				} else if (that.password != that.repeatPassword) {
					this.$message({
						message: prompt.twoPasswords,
						type: 'warning'
			        });
					return false;
				}
				// 获取验证码
			    that.$axios.post(interfaceApi.resetPassword,{
			    	id: this.$route.query.id,
			    	password: that.password,
			    	rePassword: that.repeatPassword
			    })
				.then(function (response) {
					console.log(response)
					if (response.data.code == 1) {
						that.$router.push({name: 'loginModule-passwordSuccess'});
					}
				});
			},
			// 验证是否验证手机
			verificationPhone() {
				var id = this.$route.query.id || null;
				if (!id) {
					this.$router.push({name: 'loginModule-passwordPhone'});
				}
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
		.password
			input
				@include wh(400px, 36px)
				padding-left: 10px
				border-radius: $border_radius
		.rePassword
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