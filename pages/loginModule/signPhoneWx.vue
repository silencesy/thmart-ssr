<template>
	<div class="">
		<div class="sign">
			<div class="title">Verification of Mobile No.</div>
			<sendCode @childChangeNumber ="changePhoneNumber" />
			<div class="code">
				<input v-model="code" @keyup.enter="NextStep" type="text" placeholder="Enter verification code" value="" name="">
			</div>
			<div class="btn" @click="NextStep">
				<button>Submit</button>
			</div>
		</div>
	</div>
</template>
<script>
	import signStep from '~/components/layout/signStep.vue'
	import sendCode from '~/components/base/sendCode.vue'
	// 设置cookie
	import Cookie from 'js-cookie'
	// 统一验证
	import v from "~/assets/js/validate"
	// 统一接口
	import interfaceApi from '~/plugins/interfaceApi'
	// 提示语
	import prompt from '~/assets/js/prompt'
	import utils from '~/assets/js/utils'
	export default {
		layout ({ store }) {
			return utils.signInWith2(store.state.layoutFlag)
		},
		data() {
			return {
				phoneNumber: '',
				code: ''
			}
		},
		components: {
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
			    that.$axios.post(interfaceApi.wxPcBindMobile,{
			    	mobile: that.phoneNumber,
			    	code: that.code,
			    	openid: that.$route.query.openid,
			    	nickname: that.$route.query.nickname,
			    	sex: that.$route.query.sex,
			    	// city: that.$route.query.city,
			    	province: that.$route.query.province,
			    	country: that.$route.query.country,
			    	headimgurl: that.$route.query.headimgurl,
					unionid: that.$route.query.unionid,
					source: 'pc'
			    })
				.then(function (response) {
					if (response.data.code == 1) {
						Cookie.set('token', encodeURIComponent(response.data.data.token));
                        Cookie.set('nickname',encodeURIComponent(response.data.data.nickname));
                        Cookie.set('headimgurl',encodeURIComponent(response.data.data.headimgurl));
						that.$store.commit('SET_USER',response.data.data.token);
						that.$store.commit('NICKNAME',response.data.data.nickname);
						that.$store.commit('HEADIMGURL',response.data.data.headimgurl);
				    	that.user.JumpBackToPage();
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
		padding-top: 70px
		.title
			color: #666
			text-align: center
			padding: 20px 0
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
			margin-bottom: 150px
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