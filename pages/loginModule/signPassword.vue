<template>
	<div class="">
		<signStep flag="2"/>
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
			<p>Have an account already? <nuxt-link :to="{name: 'loginModule-login'}">Login</nuxt-link></p>
		</div>
	</div>
</template>
<script>
	import signStep from '~/components/layout/signStep.vue'
	// 统一验证
	import v from "~/assets/js/validate"
	// 统一接口
	import interfaceApi from '~/plugins/interfaceApi'
	// 设置cookie
	import Cookie from 'js-cookie'
	// 提示语
	import prompt from '~/assets/js/prompt'
	export default {
		layout: 'signHome',
		data() {
			return {
				password: '',
				repeatPassword: ''
			}
		},
		components: {
			signStep
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
			    that.$axios.post(interfaceApi.mobileRegister,{
			    	mobile: that.$route.query.phone,
			    	code: that.$route.query.code,
			    	password: that.password,
			    	rePassword: that.repeatPassword
			    })
				.then(function (response) {
					if (response.data.code == 1) {
						Cookie.set('token', response.data.data.token);
						Cookie.set('nickname',response.data.data.nickname);
						Cookie.set('headimgurl',response.data.data.headimgurl);
						that.$store.commit('SET_USER',response.data.data.token);
						that.$store.commit('NICKNAME',response.data.data.nickname);
						that.$store.commit('HEADIMGURL',response.data.data.headimgurl);
						that.$router.push({name: 'loginModule-signSuccess'});
					}
				});
			},
			// 验证是否验证手机
			verificationPhone() {
				var phone = this.$route.query.phone || null;
				if (!phone) {
					this.$router.push({name: 'loginModule-signPhone'});
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