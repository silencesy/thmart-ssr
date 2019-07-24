 <template>
	<div class="login">
		<div class="container">
			<div class="loginBox">
				 <el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="Login via password" name="first">
						<el-input v-model="phoneNumber" placeholder="Phone/Username">
							<i slot="prefix" class="iconfont icon-zhanghao"></i>
						</el-input>
						<el-input v-model="password" type="password" placeholder="Password" @keyup.enter.native="loginPassword">
							<i slot="prefix" class="iconfont icon-mima1"></i>
						</el-input>
						<button class="btn" @click="loginPassword">Login</button>
						<div class="foot">
							<nuxt-link :to="{name: 'loginModule-signPhone'}">Sign Up</nuxt-link>
							<nuxt-link :to="{name: 'loginModule-passwordPhone'}">Forgot Password</nuxt-link>	
						</div>
						<div class="wechat">
							<span @click="wechatLogin" class="iconfont icon-weixin1"></span>
						</div>
				    </el-tab-pane>
				    <el-tab-pane label="Login via SMS" name="second">
						<el-input placeholder="Enter phone number" v-model='phoneNumber'>
							<i slot="prefix" class="iconfont icon-zhanghao"></i>
						</el-input>
						<button class="codeBtn" :class="{bg: sendMsgDisabled}" @click="sendCode">
							<span v-if="!sendMsgDisabled">Send Code</span>
							<span v-if="sendMsgDisabled">{{time}}s</span>
						</button>
						<el-input placeholder="Enter verification code" v-model="code" @keyup.enter.native="loginSms">
							<i slot="prefix" class="iconfont icon-mima1"></i>
						</el-input>
						<button class="btn" @click="loginSms">
							Login
						</button>
						<div class="foot">
							<nuxt-link :to="{name: 'loginModule-signPhone'}">Sign Up</nuxt-link>
							<nuxt-link :to="{name: 'loginModule-passwordPhone'}">Forgot Password</nuxt-link>	
						</div>
						<div class="wechat">
							<span @click="wechatLogin" class="iconfont icon-weixin1"></span>
						</div>
				    </el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<script>
	// 验证正则
	import v from "~/assets/js/validate"
	// 设置cookie
	import Cookie from 'js-cookie'
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	// 提示语
	import prompt from '~/assets/js/prompt'
	import utils from '~/assets/js/utils'
	export default {
		// 根据请求的路径来决定使用哪个布局
		layout ({ query }) {
			var path = query.ref || '';
			var websiteName = utils.signInWith(path);
			return websiteName
		},
	    data() {
	      return {
	        activeName: 'first',
	        phoneNumber: '',
	        password: '',
	        code: '',
	        sendMsgDisabled: false,
	        time: 60
	      };
	    },
	    mounted() {
				// this.alreadyRegistered();
			this.setGoBackUrl();
			// 设置登录注册忘记密码的标识，让登录注册忘记密码设置布局
			this.setLayoutFlag();
	    },
	    methods: {
				// 已经登录重定向首页
				// alreadyRegistered() {
				// 	var token = this.$store.state.token || null;
				// 	console.log(token);
				// 	if(token!='undefined') {
				// 		this.$router.push('/');
				// 	}
				// },
			// 设置登录注册忘记密码的标识，让登录注册忘记密码设置布局
			setLayoutFlag() {
				var path = this.$route.query.ref || '';
				Cookie.set('websiteflag',utils.signInWith(path));
				this.$store.commit('SET_LAYOUT', utils.signInWith(path));
			},
	    	setGoBackUrl() {
				var url = this.$route.fullPath.substr(23,this.$route.fullPath.length);
				console.log(this.$route.fullPath);
				var finallyUrl = unescape(url);
	    		if (finallyUrl) {
						if(finallyUrl.indexOf('urban-family.com') != -1 || finallyUrl.indexOf('urfamily.com') != -1) {
							console.log(finallyUrl);
							var goBackAddr = finallyUrl;
	    					localStorage.setItem('goback',goBackAddr);
						} else {
							var goBackAddr = window.location.origin + finallyUrl;
	    					localStorage.setItem('goback',goBackAddr);
						}
	    			
	    		} else {
					localStorage.removeItem('goback');
				}
	    	},
	      	handleClick(tab, event) {
					console.log(tab.name);
				if(tab.name == 'first') {
					this.code = '';
				} else if (tab.name == 'second') {
					this.password = '';
				}
	      	},
			// 密码登录
			loginPassword() {
				if (!this.phoneNumber) {
					this.$message({
						message: prompt.usernamenumber,
						type: 'warning'
			        });
		      		return false;
				  } else 
				if (!this.password) {
		      		this.$message({
						message: prompt.passwordLogin,
						type: 'warning'
			        });
		      		return false;
		      	}
				this.login();
		    },
		    // 短信登录
		    loginSms() {
		    	if (!v.tel(this.phoneNumber)) {
		      		this.$message({
						message: prompt.number,
						type: 'warning'
			        });
		      		return false;
		      	} else if (!v.required(this.code)) {
		      		this.$message({
						message: prompt.code,
						type: 'warning'
			        });
		      		return false;
		      	}
		    	this.login();
		    },
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
					} else if (!(/^1[34578]\d{9}$/.test(that.phoneNumber))) {
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
			},
			// 发送登录请求
			login() {
				var that = this;
				that.$axios.post(interfaceApi.userWelogin,{
					mobile: that.phoneNumber,
					password: that.password,
					code: that.code
				}).then(res=> {
					console.log(res);
					if (res.data.code==1) {
						// console.log(res);
						/**
						 * 登录成功之后设置store (token,nickname,headimgurl)
						 */

						console.log(res.data.data.token);
				  		Cookie.set('token', encodeURIComponent(res.data.data.token));
                        Cookie.set('nickname',encodeURIComponent(res.data.data.nickname));
                        Cookie.set('headimgurl',encodeURIComponent(res.data.data.headimgurl));
						that.$store.commit('SET_USER',res.data.data.token);
						that.$store.commit('NICKNAME',res.data.data.nickname);
						that.$store.commit('HEADIMGURL',res.data.data.headimgurl);
				    	that.user.JumpBackToPage();
				    } else if (res.data.code == 125) {
						window.sessionStorage.setItem("mobile",that.phoneNumber);
						window.sessionStorage.setItem("password",that.password);
						that.$router.push({
							name: 'loginModule-signPhoneThats'
						})
					}
				})
			},
			wechatLogin() {
				let path = window.localStorage.getItem('goback') || '';
				if(path.indexOf('urban-family.com') != -1 || path.indexOf('urfamily') != -1) {
					var goback = path + "|" + window.location.origin + '/loginModule/signPhoneWx'+ '|pc';
					window.location.href="https://open.weixin.qq.com/connect/qrconnect?appid=wxf62ca307a8f76a6e&redirect_uri=http%3A%2F%2Fapi.mall.thatsmags.com%2FthmartApi%2FUser%2FWx%2Flogin&response_type=code&scope=snsapi_login&state=" + goback;
				} else {
						var goback = window.location.origin + '/weChatLogin/login' + "|" + window.location.origin + '/loginModule/signPhoneWx'+ '|pc';
					window.location.href="https://open.weixin.qq.com/connect/qrconnect?appid=wxf62ca307a8f76a6e&redirect_uri=http%3A%2F%2Fapi.mall.thatsmags.com%2FthmartApi%2FUser%2FWx%2Flogin&response_type=code&scope=snsapi_login&state=" + goback;
					}
				
				}
	    }
	}
</script>
<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.login
		@include wh(100%, 500px)
		background: url("~static/images/lu.jpg") no-repeat center
		background-size: cover 
		overflow: hidden
		.container
			overflow: hidden
			.loginBox
				float: right
				margin-top: 100px
				@include wh(350px, 300px)
				background-color: #fff
		.btn 
			@include whch(310px, 36px, center, 36px)
			@include sc(16px, #fff) 
			background-color: $theme_color
			border-radius: $border_radius
		.foot 
			overflow: hidden 
			a 
				float: left
				@include sc(14px, #666)
				padding: 15px 0 5px 0
			a:last-child 
				float: right
		.wechat 
			text-align: center
			.icon-weixin1 
				color: #4CAF50
				font-size: 25px
				cursor: pointer
		.codeBtn 
			position: absolute
			@include whch(80px, 30px, center, 30px)
			@include sc(16px, #fff)
			background-color: $theme_color
			border-radius: $border_radius
			right: 5px 
			top: 5px
		.codeBtn.bg
			background-color: #ccc
</style>