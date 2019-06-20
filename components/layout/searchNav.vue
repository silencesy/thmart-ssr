<template>
    <div class="nav">
        <div class="container">
            <div class="homeHead">
                <div class="left"><img @click="goHome" src="~static/images/thmart.png" alt=""></div>
                <div class="center">
                    <i v-show="searchTipsTextShow" class="iconfont icon-sousuo"> What are you looking for?</i>
                    <input type="search" @focus="handleinput()" @blur="blurInput" @keyup.enter="bindSearch" v-model="searchText" name="" id="">
                    <button @click="bindSearch">Search</button>
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
                searchTipsTextShow: false
            }
        },
        created() {
           
        },
        mounted() {
            this.blurInput();
        },
        methods: {
            goHome() {
                let url = window.location.origin;
                window.location.href = url;
            },
            // 搜索框获取焦点
            handleinput() {
                this.searchTipsTextShow = false
            },
            // 搜索框失去焦点
            blurInput() {
                if (this.searchText) {
                    this.searchTipsTextShow = false
                } else {
                    this.searchTipsTextShow = true
                }
            },
            // 开始搜索
            bindSearch() {
                // 页面？后面的值改变了不会刷新页面获取数据 所以强制刷新一下
                this.$router.push({path: '/searchModeule/search',query: {searchInfo: this.$store.state.searchText,classification: this.$store.state.classification}});
                setTimeout(function(){
                    window.location.reload();
                },20);
            }
        },
        computed: {
            searchText: {
                get () {
                    return this.$store.state.searchText
                },
                set (val) {
                    this.$store.commit('SET_SEARCH', val)
                }
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
                cursor: pointer
                @include wh(142px, 60px)
        .right
            float: right
            img
                @include wh(80px, 80px)
        .center
            position: relative
            margin-left: 23%
            @include hh(80px, 80px)
            i
                position: absolute
                color: #999
                left: 13px
                top: 3px
                z-index: -1
            input
                @include whh(380px, 40px, 40px)
                color: $describe_color
                @include ttbb(4px, 0, 4px, 0) 
                padding: 0 10px 
                background: transparent  
                box-sizing: border-box
            button
                background-color: $theme_color
                @include sc(16px, #fff)
                @include whh(120px, 40px, 40px)
                @include ttbb(0, 4px, 0, 4px)
                cursor: pointer
                vertical-align: top
                margin-top: 21px 

</style>