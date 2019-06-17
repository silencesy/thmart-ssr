<template>
    <div class="container">
        <div class="bottom">
        	<div class="bottomTop">
        		<ul>
        			<li>
                        <img @click="goHome" src="~static/images/thmart.png" alt="">
                    </li>
        			<li><img src="~static/images/pray.svg" alt=""> Special Offers Every Day</li>
        			<li><img src="~static/images/plus.svg" alt=""> Quality Guaranteed</li>
        			<li><img src="~static/images/car.svg" alt=""> Enjoy Free Shipping for All Purchases</li>
        		</ul>
        	</div>
        	<div class="bottomFoot">
        		<div class="left">
        			<img src="~static/images/thmartCode.jpg" alt="">
        			<span>Customer Service<br>Mon-Fri (9am-6pm)</span>
        		</div>
        		<div class="center">
        			<p><i class="iconfont icon-kefu"></i>After-sales Services</p>
        			<p>If you come across any problems with your thMart experience, please email us at <a href="mailto:thmart@urbanatomy.com">thmart@urbanatomy.com</a> with your name, mobile number and issue.</p>
      			<p>You can also scan the QR code at left to follow our official WeChat account, where you can directly message us about any issue.</p>
      			<p><nuxt-link to="/business/businessEn"><i class="iconfont icon-hezuo-copy"></i>Do Business With Us</nuxt-link></p>
        		</div>
        		<div class="right">
        			<img src="~static/images/thatCode.jpg" alt="">
        			<span>That's Shanghai</span>
        		</div>
        		<div class="right">
        			<img src="~static/images/ufCode.jpg" alt="">
        			<span>Urban Family</span>
        		</div>
        	</div>
            <div class="copy">
                <span>© 2017 SH Aoyang Advertising Co., Ltd. <a href=" http://www.beian.miit.gov.cn">沪ICP备12038926号-5</a></span>
            </div> 
            <div class="license">
                <a href="http://218.242.124.22:8081/businessCheck/verifKey.do?showType=extShow&serial=9031000020160509163750000000772558-SAIC_SHOW_310000-2018102416530034247&signData=MEUCIQC3t60+nlyg7KUeudY2jWBoeGkwSQK4vj+3hDgNkfkXVgIgV2um1aIINM4R4iqFT7WbvTYZgRb8Pk5bLeCdFBlcSLg="><img src="~/static/images/dzzyyz.png" alt=""></a>
            </div>
        </div>  
    </div>
</template>
<script>
export default {
    methods: {
        goHome() {
            let url = window.location.origin;
            window.location.href = url;
        }
    }
}
</script>

<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass'
    .bottom
        margin-top: 15px
        .bottomTop 
            ul
                overflow: hidden
                line-height: 45px
                border-bottom: $border_bottom
                padding-bottom: 10px
            li
                float: left
                margin-right: 120px;
            li:first-child
                img 
                    cursor: pointer
                    @include wh(107px, 45px)
            li:last-child
                margin-right: 0       
            img 
                vertical-align: middle
                margin-right: 5px

        .bottomFoot
            margin-top: 20px
            padding-bottom: 20px
            border-bottom: $border_bottom
            overflow: hidden
            > div
                float: left 
                width: 20%
            .left, .right
                @include wc(160px, center)
                img
                    @include wh(160px, 160px)
                span
                    display: block   
                    font-size: 14px
            div:nth-child(1),div:nth-child(3)
                margin-right: 35px
            .center
                width: 550px
                margin: 0 50px
                .iconfont
                    color: $theme_color    
                    padding-right: 5px
                .icon-hezuo-copy
                    color: $describe_color
                    font-size: 18px
                p:first-child
                    font-size: 18px
                    margin-top: 6px
                p:not(:first-child)
                    padding-left: 20px
                    line-height: 25px
                    color: $describe_color 
                p:nth-child(2)
                    a
                        color: #20ABF8
                p:last-child
                    margin-top: 15px
                    text-align: center
                    a
                        @include whch(260px, 37px, center, 34px)
                        color: $describe_color
                        border: $border
                        border-radius: $border_radius
                        display: inline-block
        
        .copy
            text-align: center
            margin: 10px 0
            @include sc(14px, $tips_color)
            a
                @include sc(14px, $tips_color)
                text-decoration: underline
        .license
            text-align: center
            padding-bottom: 5px
            img 
                @include wh(30px, 30px)
</style>