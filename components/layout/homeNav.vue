<template>
    <div class="nav">
        <div class="container">
            <div class="homeHead">
                <div class="left">
                    <img @click="goHome" src="~static/images/thmart.png" alt="">
                </div>
                <div class="center">
                    <i v-show="searchTipsTextShow" class="iconfont icon-sousuo"> What are you looking for?</i>
                    <input type="search" v-model="searchText" @focus="handleinput" @blur="blurinput" @keyup.enter="searchBtn" value="" name="" id="">
                    <button @click="searchBtn">Search</button>
                </div>
                <div class="right"><img src="~static/images/thmartCode.jpg" alt=""></div>
            </div> 
            <div class="homeNav">
                <ul>
                    <li>
                        <nuxt-link to="">
                            <div>
                                <!-- <el-dropdown class="allCateBox" @command="handleCommand"> -->
                                <el-dropdown class="allCateBox" @command="handleCommand">
                                    <!-- <i class="iconfont icon-fenlei"></i>All Categories -->
                                    <el-button class="allCate">
                                        <i class="iconfont icon-fenlei"></i>All Categories
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <div class="dropdownBox">
                                            <div class="listPer">
                                                <div v-for="(item,index) in $store.state.categoryList" v-if="index>=0 && index <10" :key="index">
                                                    <el-dropdown-item :command="item.id+'|'" @mouseenter.native="showChild(item.id)">{{item.title}}</el-dropdown-item>
                                                    <div class="smallTitle" v-show="item.isSubShow">
                                                        <el-dropdown-item :command="item.id+'|'+item2.id" v-for="(item2,index2) in item.son" :key="index2">{{item2.title}}</el-dropdown-item>
                                                    </div>
                                                </div>
                                                <!-- <div><el-dropdown-item>Big title</el-dropdown-item></div>
                                                <div><el-dropdown-item>Big title</el-dropdown-item></div>
                                                <div><el-dropdown-item>Big title</el-dropdown-item></div>
                                                <div><el-dropdown-item>Big title</el-dropdown-item></div>
                                                <div><el-dropdown-item>Big title</el-dropdown-item></div>
                                                <div><el-dropdown-item>Big title</el-dropdown-item></div>
                                                <div><el-dropdown-item>Big title</el-dropdown-item></div>
                                                <div><el-dropdown-item>Big title</el-dropdown-item></div>
                                                <div><el-dropdown-item>Big title</el-dropdown-item></div> -->

                                                <!-- <el-dropdown-item v-for="(item,index) in $store.state.categoryList" v-if="index>0 && index <8" :key="index" :command="item.id">{{item.title}}</el-dropdown-item> -->
                                            </div>
                                            <div class="listPer">
                                                <div v-for="(item,index) in $store.state.categoryList" v-if="index>=10 && index <20" :key="index">
                                                    <el-dropdown-item :command="item.id + '|'" @mouseenter.native="showChild(item.id)">{{item.title}}</el-dropdown-item>
                                                    <div class="smallTitle" v-show="item.isSubShow">
                                                        <el-dropdown-item :command="item.id+'|'+item2.id" v-for="(item2,index2) in item.son" :key="index2">{{item2.title}}</el-dropdown-item>
                                                    </div>
                                                </div>

                                                <!-- <el-dropdown-item v-for="(item,index) in $store.state.categoryList" v-if="index>7 && index <15" :key="index" :command="item.id">{{item.title}}</el-dropdown-item> -->
                                            </div>  
                                        </div>
                                    </el-dropdown-menu>
                                </el-dropdown> 
                            </div>                           
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :class="{theme_color: $route.path == '/'}" to="/">Home</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :class="{theme_color: $route.fullPath == '/category/item?one=1' || $route.fullPath == '/category/item?one=1&two='}" :to="{name: 'category-item',query: {one: 1}}">Ticketing</nuxt-link>
                    </li>
<!--                     <li>
                        <nuxt-link to="">Family</nuxt-link>
                    </li> -->
                    <li>
                        <nuxt-link :class="{theme_color: $route.path == '/groupBuy/1'}" :to="{name: 'groupBuy-id',params: {id: 1}}">GroupBuy</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/article/articleList" :class="{theme_color: $route.path == '/article/articleList'}">Explore China</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :class="{theme_color: $route.path == '/shop/shopList'}" to="/shop/shopList">Shops</nuxt-link>
                    </li>
                </ul>
            </div>
        </div> 
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchText: '',
                searchTipsTextShow: true,
                activeCategoryData: ''
            }
        },
        methods: {
            goHome() {
                let url = window.location.origin;
                window.location.href = url;
            },
            handleinput() {
                this.searchTipsTextShow = false;
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
            },
            handleCommand(command) {
                var arr = command.split('|');
                if(arr[0] == 160) {
                    this.$router.push({path: '/article/articleList'});
                } else {
                    this.$router.push({path: '/category/item',query: {one: arr[0],two:arr[1]}});
                }
                
            },
            showChild(id) {
                this.$store.commit('SET_SHOW_CATEGORYLIST',id);
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
                @include wh(80px, 60px)
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
    .homeNav
        @include hh(40px, 40px)
        ul  
            overflow: hidden
            li 
                float: left
                a
                    padding: 0 62px 
                    display: inline-block
                    @include hh(40px, 40px)
            li:first-child
                @include wc(239px, center)
                background-color: $theme_color               
                a
                    color: #fff
                    padding: 0
                    width: 100% 
                i   
                    padding-right: 15px
            li:nth-child(2)
                a
                    padding-left: 123px
                    padding-right: 48px
            li:nth-child(3)
                a
                    padding-left: 78px
                    padding-right: 58px
            li:last-child
                a 
                    padding-right: 0
    .nav
        .line
            border-bottom: 1px solid $theme_color
    .allCateBox
        width: 100%
        height: 100%
        position: relative
        .allCate
            width: 100%
            height: 100%
            display: block
    .el-dropdown-menu 
        overflow: hidden
        background-color: rgba(0, 0, 0, .8)
        border: none
        right: 0
        margin-top: -1px
        height: 340px
        .dropdownBox
            width: 1200px
            margin: 0 auto
            padding: 0 38px
            .listPer
                float: left
                width: 50%
                padding-top: 5px
                li 
                    padding-left: 15px
                    color: #fff
                    padding-top: 0
                    height: 30px
                    line-height: 30px
                    font-size: 16px
                    display: inline-block
                .smallTitle
                    display: inline
                    li
                        color: #ffffffd1
                        font-size: 14px
                        height: 26px
                        line-height: 26px
                li:hover
                    background-color: rgba(0,0,0,0)
                    color: $theme_color
                li:active 
                    background-color: rgba(0,0,0,0)
                li:first-child
                    padding-top: 2px
                >div 
                    width: 100%
</style>