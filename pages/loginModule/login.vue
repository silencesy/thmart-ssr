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
						<button class="btn" :disabled="isDisable" @click="loginPassword">Login</button>
						<div class="foot">
							<nuxt-link :to="{name: 'loginModule-signPhone'}">Sign Up</nuxt-link>
							<nuxt-link :to="{name: 'loginModule-passwordPhone'}">Forgot Password</nuxt-link>	
						</div>
						<div class="wechat-Login-tip-box">
							<div class="wechat-Login-tip">Wechat Login</div>
							<div class="line"></div>
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
						<button class="btn" :disabled="isDisable" @click="loginSms">
							Login
						</button>
						<div class="foot">
							<nuxt-link :to="{name: 'loginModule-signPhone'}">Sign Up</nuxt-link>
							<nuxt-link :to="{name: 'loginModule-passwordPhone'}">Forgot Password</nuxt-link>	
						</div>
						<div class="wechat-Login-tip-box">
							<div class="wechat-Login-tip">Wechat Login</div>
							<div class="line"></div>
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
			isDisable: false,
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
				that.isDisable = true;
				setTimeout(() => {
					that.isDisable = false;
				}, 3000);
				that.$axios.post(interfaceApi.userWelogin,{
					mobile: that.phoneNumber,
					password: that.password,
					code: that.code
				}).then(res=> {
					if (res.data.code==1) {
						// console.log(res);
						/**
						 * 登录成功之后设置store (token,nickname,headimgurl)
						 */
						var data = res.data.data;

						// 后台返回数据混乱，有时候返回主域名有时候不反回 （如果多返回主域名那么前端把它去掉）
						if(data.headimgurl) {
							if(data.headimgurl.indexOf('thirdwx.qlogo.cn') != -1) {
								data.headimgurl = data.headimgurl.replace('http://api.mall.thatsmags.com','');
							}
						}
				  		Cookie.set('token', encodeURIComponent(data.token));
                        Cookie.set('nickname',encodeURIComponent(data.nickname));
                        Cookie.set('headimgurl',encodeURIComponent(data.headimgurl));
						that.$store.commit('SET_USER',data.token);
						that.$store.commit('NICKNAME',data.nickname);
						that.$store.commit('HEADIMGURL',data.headimgurl);
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
				margin-top: 80px
				@include wh(350px, 350px)
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
		.wechat-Login-tip-box
			height: 40px
			position: relative
			.wechat-Login-tip
				text-align: center
				color: #666666
				width: 120px
				height: 40px
				line-height: 40px
				background-color: #fff
				position: absolute
				left: 0
				right: 0
				top: 0
				bottom: 0
				margin: auto
				z-index: 2
			.line
				width: 100%
				height: 1px
				background-color: #DFDFDF
				position: absolute
				top: 20px
				left: 0
				z-index: 1
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