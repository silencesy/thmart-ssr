<template>  
    <div class="userNav">
        <div class="container">
            <div class="userHead">
                <div><a @click="goHome" class="iconfont icon-thmart left"></a></div>
                <div class="center">
                    <div class="userCenter">
                        <i v-show="searchTipsTextShow" class="iconfont icon-sousuo"> What are you looking for?</i>
                        <input type="search"  v-model="searchText" @focus="handleinput()" @blur="blurinput" @keyup.enter="searchBtn" value="" name="">
                        <button  @click="searchBtn">Search</button>
                    </div>
                </div>
                <div class="right"><img src="~static/images/thmartCode.jpg" alt=""></div>
            </div> 
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                searchText: '',
                searchTipsTextShow: true
            }
        },
        methods: {
            goHome() {
                let url = window.location.origin;
                window.location.href = url;
            },
            handleinput() {
                this.searchTipsTextShow = false
            },
            blurinput() {
                if (this.searchText.length>0) {
                    this.searchTipsTextShow = false;
                } else {
                    this.searchTipsTextShow = true;  
                }
            },
            searchBtn() {
                this.$router.push({path: '/searchModeule/search',query: {searchInfo: this.searchText,classification: 'categories'}});
            }
        }
    }
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass'
    .userNav
        background-color: $theme_color
    .userNav
        margin: 15px 0
        .container
            padding: 10px 0
    .userHead
        overflow: hidden
        @include hh(80px, 80px)
        a
            cursor: pointer
        >div
            float: left
        .left
            color: #fff     
            font-size: 45px 
            line-height: 80px         
        .right
            float: right
            img
                @include wh(80px, 80px)
                vertical-align: middle
        .center
            position: relative
            margin-left: 23%
            @include hh(80px, 80px)
            .userCenter
                background: #fff
                @include hh(40px, 40px)
                margin-top: 21px
                @include whh(500px, 40px, 40px)   
                border-radius: 4px  
                i
                    position: absolute
                    color: #999
                    left: 13px
                    top: 22px
                    z-index: 1
                input
                    position: absolute
                    @include whh(380px, 40px, 40px)
                    color: $describe_color
                    @include ttbb(4px, 0, 4px, 0) 
                    padding: 0 10px  
                    border: none
                    background: transparent
                    z-index: 2
                button
                    float: right
                    background-color: #eee
                    color: #666
                    @include whh(120px, 40px, 40px)
                    @include ttbb(0, 4px, 0, 4px)
                    cursor: pointer  
                    vertical-align: top    
</style>