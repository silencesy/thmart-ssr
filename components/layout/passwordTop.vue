<template>
    <div>
        <div class="container">
            <div class="homeHead">
                <div class="left">
                    <img @click="goHome" src="~static/images/thmart.png" alt="">
                    <span class="loginName">FORGOT PASSWORD</span>
                </div>
                <div class="right"><img src="~static/images/thmartCode.jpg" alt=""></div>
            </div> 
        </div>
        <div class="line"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            goHome() {
                this.$router.push({
                    name: 'index'
                });
            }
        }
    }
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass'
    .homeHead
        margin: 15px 0
        overflow: hidden
        @include hh(80px, 80px)
        >div
            float: left
        .left, .right
            img
                vertical-align: middle
        .left
            img
                @include wh(80px, 60px)
                margin-right: 15px
                cursor: pointer
            .loginName 
                float: right
                display: inline-block
                padding-left: 15px 
                font-size: 30px
                font-family: "Bebas"
                padding-left: 15px
                border-left: $border
                line-height: 30px
                margin-top: 28px
                
        .right
            float: right
            img
                @include wh(80px, 80px) 
    .line 
        border: 2px solid $theme_color

</style>