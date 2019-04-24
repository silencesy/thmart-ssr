<template>
    <div>
        <div class="container">
            <div class="homeHead">
                <div class="left">
                    <img @click="goHome" src="~static/images/thmart.png" alt="">
                    <div class="shopName">
                        <span>{{$store.state.shopInfo.name}}</span>
                        <span class="noselect" :class="{theme_color: $store.state.shopInfo.isCollect==1}" @click="favourite"><i class="iconfont icon-review"></i>Favourite</span>
                    </div>
                </div>
                <div class="center">
                    <i v-show="searchTipsTextShow" class="iconfont icon-sousuo"> What are you looking for?</i>
                    <input v-model="searchText" @blur="blurinput" type="search" @focus="handleinput()" @keyup.enter="searchBtn" value="" name="" id="">
                    <button @click="searchBtn">Search</button>
                    <button  @click="shopSearchBtn" class="btnShop">Shop</button>
                </div>
                <div class="right"><img src="~static/images/thmartCode.jpg" alt=""></div>
            </div> 
        </div>
        <div class="shopTopPic"><img :src="$store.state.shopInfo.banner" alt=""></div>
        <div class="container shopContainer" v-show="show">
            <div class="shopTitle">
                <a style="cursor: pointer;" :class="{theme_color: $route.name == 'shop-id'||$route.name == 'shop-peaceHotel'}" @click="goShop">Home</a>
                <nuxt-link :to="{path: '/shop/shopGoodsListALL',query: {id: $store.state.shopInfo.id?$store.state.shopInfo.id:$route.query.id}}" :class="{theme_color: $route.name == 'shop-shopGoodsListAll'}">All</nuxt-link>
                <nuxt-link :to="{path: '/shop/shopGoodsListSale',query: {id: $store.state.shopInfo.id?$store.state.shopInfo.id:$route.query.id}}" :class="{theme_color: $route.name == 'shop-shopGoodsListSale'}">Sales</nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
    // 接口API
    import interfaceApi from '~/plugins/interfaceApi'
    export default {
        props: {
            infoData: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            show: {
                type: Boolean,
                default: true
            }
            // configObj: 
        },
        data() {
            return {
                searchText: '',
                searchTipsTextShow: true
            }
        },
        mounted() {
            this.searchTextFun();
            this.blurinput();
        },
        methods: {
            goHome() {
                this.$router.push({
                    name: 'index'
                });
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
            },
            shopSearchBtn() {
                if (this.$route.name == 'shop-shopGoodsListSearch') {
                    this.$router.push({path: '/shop/shopGoodsListSearch',query: {searchInfo: this.searchText,id: this.$route.params.id || this.$route.query.id}});
                    setTimeout(function(){
                        window.location.reload();
                    },20);
                } else {
                    this.$router.push({path: '/shop/shopGoodsListSearch',query: {searchInfo: this.searchText,id: this.$store.state.shopInfo.id}});
                    // console.log(this.$store.state.shopInfo.id);
                }
            },
            favourite() {
                var that = this;
                // 公共函数里面的方法
                if (!that.user.isLogin()) {
                    that.$store.commit('LOGIN',true);
                } else {
                    var copy = that.$store.state.shopInfo;
                    copy.isCollect = copy.isCollect==0?1:0;
                    that.$store.commit('SET_SHOP_INFO',copy);
                    const param = {
                        contentId: that.$store.state.shopInfo.id,
                        type: 2,
                        isCollect: that.$store.state.shopInfo.isCollect
                    }
                    that.$axios.post(interfaceApi.Collect,param).then(res=> {
                        // that.$notify({
                        //   title: '收藏成功',
                        //   message: '',
                        //   type: 'success'
                        // });
                    });
                }
                
            },
            searchTextFun() {
                this.searchText = this.$route.query.searchInfo || '';
            },
            goShop() {
                // :to="{name: 'shop-id',params: {id: $store.state.shopInfo.id?$store.state.shopInfo.id:$route.query.id}}"
                var id = this.$store.state.shopInfo.id || this.$route.query.id;
                if (id == 32) {
                    this.$router.push('/shop/peaceHotel');
                } else if (id == 103) {
                    this.$router.push('/shop/amaraHotel');
                } else {
                    this.$router.push({name: 'shop-id',params: {id: id}});
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
                @include wh(95px, 60px)
                padding-right: 15px
                border-right: $border
            .shopName 
                float: right
                padding-left: 15px 
                @include whh(245px, 80px, 10px)
                span
                    display: block
                    font-size: 14px
                    padding-top: 20px
                    height: 35px
                span:first-child 
                    white-space: nowrap
                    overflow: hidden
                    text-overflow: ellipsis    
                span:nth-child(2)
                    color: #666
                    cursor: pointer 
                i
                    font-size: 14px
                    padding-right: 5px
        .right
            float: right
            img
                @include wh(80px, 80px)
        .center
            position: relative
            margin-left: 15px
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
            button.btnShop 
                background-color: #FFB510
                border-radius: $border_radius
                margin-left: 15px
    .shopTopPic
        img
            width: 100%
    .container.shopContainer
        text-align: center
        padding: 10px 0
    .shopTitle 
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
</style>