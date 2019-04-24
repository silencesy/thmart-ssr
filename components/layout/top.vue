<template>
    <div class="thTop">
        <div class="container">
            <div class="top">
                <div class="left">
                    <span>That’s making your life easier!!!</span> 
                    <div class="login" v-if="!$store.state.token || $store.state.nickname=='undefined'">
                        <a @click="login">Login</a>
                        <a @click="signUp">Sign up</a>
                    </div>
                    <div class="logged" v-if="$store.state.token && $store.state.nickname!='undefined'">
                        <el-dropdown>
                            <nuxt-link to="/userCenter/user" class="el-dropdown-link">
                                {{$store.state.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </nuxt-link>
                            <el-dropdown-menu slot="dropdown">
                                <div class="dropdownBox">
                                    <nuxt-link to="/userCenter/user" class="userPic">
                                        <div class="headImg"><img :src="$store.state.headimgurl" alt=""></div>
                                    </nuxt-link>
                                    <div class="dropdownRightBox">
                                        <nuxt-link to="/userCenter/user" class="info">
                                            <p>{{$store.state.nickname}}</p>
                                        </nuxt-link>
                                        <p @click="logout">Log out</p>
                                    </div>
                                </div>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="right">
                    <nuxt-link to="/userCenter/cartModule/cart" class="cart">
                        <i class="iconfont icon-gouwuche"></i>Cart
                        <!-- <span class="number">12</span> -->
                    </nuxt-link>
                    <nuxt-link to="/userCenter/orderList/all">My Order</nuxt-link>
                    <nuxt-link to="/business/businessEn">Do Business With Us</nuxt-link>
                </div>
            </div> 
        </div>
        <div class="topLine"></div>

        <!-- 登录框 -->
        <el-dialog title="Please login first!" :visible.sync="$store.state.dialogFormVisible">
            <div class="loginBox">
                 <el-tabs v-model="activeName">
                    <el-tab-pane label="Login via password" name="first">
                        <el-input v-model="phoneNumber" placeholder="Phone">
                            <i slot="prefix" class="iconfont icon-zhanghao"></i>
                        </el-input>
                        <el-input v-model="password" type="password" placeholder="Password">
                            <i slot="prefix" class="iconfont icon-mima1"></i>
                        </el-input>
                        <button class="btn" @click="loginPassword">Login</button>
                        <div class="foot">
                            <a @click="signUp">Sign Up</a>
                            <a @click="resetPassword">Forgot Password</a>    
                        </div>
                        <div class="wechat">
                            <span class="iconfont icon-weixin1" @click="weixinLogin"></span>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Login via SMS" name="second">
                        <el-input placeholder="Enter phone number" v-model='phoneNumber'>
                            <i slot="prefix" class="iconfont icon-zhanghao"></i>
                        </el-input>
                        <button class="codeBtn" :class="{bg: sendMsgDisabled}" @click="sendCode">
                            <span v-if="!sendMsgDisabled">Send Code</span>
                            <span v-if="sendMsgDisabled">{{time}}</span>
                        </button>
                        <el-input placeholder="Enter verification code" v-model="code">
                            <i slot="prefix" class="iconfont icon-mima1"></i>
                        </el-input>
                        <button class="btn" @click="loginSms">
                            Login
                        </button>
                        <div class="foot">
                            <a @click="signUp">Sign Up</a>
                            <a @click="resetPassword">Forgot Password</a>    
                        </div>
                        <div class="wechat">
                            <span class="iconfont icon-weixin1" @click="weixinLogin"></span>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
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
    export default {
        data() {
            return {
                activeName: 'first',
                phoneNumber: '',
                password: '',
                code: '',
                sendMsgDisabled: false,
                time: 60
            }
        },
        methods: {
            // 微信登录
            weixinLogin() {
                this.user.SetComebackAddress();
                var goback = window.location.origin + '/weChatLogin/login' + "|" + window.location.origin + '/loginModule/signPhoneWx' + '|pc';
                window.location.href="https://open.weixin.qq.com/connect/qrconnect?appid=wxf62ca307a8f76a6e&redirect_uri=http%3A%2F%2Fapi.mall.thatsmags.com%2FthmartApi%2FUser%2FWx%2Flogin&response_type=code&scope=snsapi_login&state=" + goback;
            },
            // 去登陆页面
            login() {
                this.user.SetComebackAddress();
                // 登录成功关闭弹出框
                this.$store.commit('LOGIN',false);  
                this.$router.push({name: 'loginModule-login'});

            },
            // 去注册页面
            signUp() {
                this.user.SetComebackAddress();
                this.$router.push({name: 'loginModule-signPhone'});
            },
            // 下线
            logout() {
                this.user.SetComebackAddress();
                // 下线
                Cookie.remove('token');
                this.$store.commit('SET_USER','');
                Cookie.remove('nickname');
                Cookie.remove('headimgurl');
                this.$store.commit('NICKNAME','');
                this.$store.commit('HEADIMGURL','');
                this.$router.push({path: '/'})
            },
            // 去重置密码页面
            resetPassword () {
                this.user.SetComebackAddress();
                // 登录成功关闭弹出框
                this.$store.commit('LOGIN',false);  
                this.$router.push({name: 'loginModule-passwordPhone'});
                
            },
            // 密码登录
            loginPassword() {
                if (!v.tel(this.phoneNumber)) {
                    this.$message({
                        message: prompt.number,
                        type: 'warning'
                    });
                    return false;
                } else if (!v.password(this.password)) {
                    this.$message({
                        message: prompt.password,
                        type: 'warning'
                    });
                    return false;
                }
                this.loginAxios();
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
                this.loginAxios();
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
            loginAxios() {
                var that = this;
                that.$axios.post(interfaceApi.login,{
                    mobile: that.phoneNumber,
                    password: that.password,
                    code: that.code
                }).then(res=> {
                    if (res.data.code==1) {
                        // console.log(res);
                        /**
                         * 登录成功之后设置store (token,nickname,headimgurl)
                         */
                        Cookie.set('token', encodeURIComponent(res.data.data.token));
                        Cookie.set('nickname',encodeURIComponent(res.data.data.nickname));
                        Cookie.set('headimgurl',encodeURIComponent(res.data.data.headimgurl));
                        that.$store.commit('SET_USER',res.data.data.token);
                        that.$store.commit('NICKNAME',res.data.data.nickname);
                        that.$store.commit('HEADIMGURL',res.data.data.headimgurl);
                        // 登录成功关闭弹出框
                        that.$store.commit('LOGIN',false);  
                        setTimeout(function(){
                            window.location.reload();
                        },20);
                    }
                })
            }
        }
    }
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass'
    .top
        padding: 10px 0  
        overflow: hidden  
        .left
            float: left
            span
                @include sc(14px, $describe_color)
                margin-right: 50px
            .login
                display: inline-block
                a   
                    cursor: pointer
                    @include sc(14px, $describe_color)     
                a:after
                    @include line
                    padding-left: 15px
                a:last-child:after 
                    content: ''
                a:last-child
                    padding-left: 15px
            .logged 
                display: inline-block
                .el-dropdown 
                    cursor: pointer
                .el-icon--right
                    padding-left: 5px
                .popper__arrow
                    display: none 
                .el-dropdown:active 
                    border: none                      
        .right  
            float: right
            a
                @include sc(14px, $describe_color)
            a:after
                @include line
            a:first-child:after
                padding-left: 15px
            a:nth-child(2)
                padding-left: 15px
            a:nth-child(2):after
                padding-left: 15px
            a:nth-child(3)
                padding-left: 15px
            a:last-child:after 
                content: ''
                padding: 0
            .icon-gouwuche
                padding-right: 5px
            .cart
                position: relative
                .number
                    position: absolute
                    left: 48px
                    top: -5px
                    font-size: 12px
                    background-color: $theme_color
                    color: #fff
                    border-radius: 50%
                    @include whch(16px, 16px, center, 16px)
    .topLine
        border-bottom: $border_bottom
    .dropdownBox
        overflow: hidden
        padding: 5px
        padding-top: 15px
        p
            @include sc(14px, #999)
            margin-top: 30px
            cursor: pointer
        a 
            float: left
            display: inline-block
            padding-bottom: 10px
            width: 88px
            overflow: hidden
        >a 
            width: 70px
        .dropdownRightBox
            float: left
            width: 85px
        .userPic
            margin-right: 10px
            .headImg
                display: inline-block 
                @include wh(60px, 60px)
                img 
                    @include wh(60px, 60px)
                    border-radius: 50%
        .info
            p:first-child
                margin-top: 10px

    .loginBox
            @include wh(80%, 300px)
            background-color: #fff
            margin: 0 auto
    .btn 
        @include whch(100%, 36px, center, 36px)
        @include sc(16px, #fff) 
        background-color: $theme_color
        border-radius: $border_radius
    .foot 
        overflow: hidden 
        a 
            float: left
            @include sc(14px, #666)
            padding: 15px 0 5px 0
            cursor: pointer
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
        @include whch(30%, 30px, center, 30px)
        @include sc(16px, #fff)
        background-color: $theme_color
        border-radius: $border_radius
        right: 5px 
        top: 5px
    .codeBtn.bg
        background-color: #ccc               

</style>