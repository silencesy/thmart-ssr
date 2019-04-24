<template>
	<div class="phone">
		<input v-model="phoneNumber" type="text" placeholder="Enter phone number" name="" value="">
		<button :class="{bg: sendMsgDisabled}" @click="sendCode">
			<span v-if="!sendMsgDisabled">Send Code</span>
			<span v-if="sendMsgDisabled">{{time}}s</span>
		</button>
	</div>
</template>
<script>
	// 统一验证
	import v from "~/assets/js/validate"
	// 统一接口
	import interfaceApi from '~/plugins/interfaceApi'
	// 提示语
	import prompt from '~/assets/js/prompt'
	export default {
		data() {
			return {
				phoneNumber: '',
				sendMsgDisabled: false,
	        	time: 60
			}
		},
		methods: {
			// 发送验证码
	      	sendCode() {
	      		var that = this;
				if (!that.sendMsgDisabled) {
					if(!that.phoneNumber) {
						this.$message({
							message: prompt.number,
							type: 'warning'
				        });
						return false;
					} else if (!v.tel(that.phoneNumber)) {
						this.$message({
							message: prompt.number,
							type: 'warning'
				        });
						return false;
					}
					that.sendMsgDisabled = true;
				    let interval = window.setInterval(function() {
						if ((that.time--) <= 0) {
							that.time = 60;
							that.sendMsgDisabled = false;
							window.clearInterval(interval);
						}
				    }, 1000);
				    // 获取验证码
				    that.$axios.post(interfaceApi.UsermobileCode,{
				    	mobile: that.phoneNumber
				    })
					.then(function (response) {
						console.log(response);
					});
				}
			}
		},
		watch: {
			phoneNumber: function() {
				this.$emit("childChangeNumber",this.phoneNumber);
			}
		}
	}
</script>
<style  lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	input
		float: left
		@include wh(298px, 36px)
		padding-left: 10px
		border-radius: $border_radius
	button
		float: left
		background-color: $theme_color
		@include whch(90px, 36px, center, 36px)
		font-size: 14px
		color: #fff
		border-radius: $border_radius
		margin-left: 15px
	button.bg
		background-color: #ccc
</style>