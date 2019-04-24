<template>
    <div class="floor container">
        <div class="top">
            <div class="topLeft"> 
                <nuxt-link :to="{name: 'category-item',query: {one: floorData.id}}"> 
                    <img v-lazy="floorData.pic" alt="">
                </nuxt-link>
            </div>
            <div class="topList">
                <div class="listTop">
                    <div v-for="(item,index) in floorTopFourPic" :key="index">
                        <nuxt-link  :to="{name: 'goods-id', params: {id: item.id}}" target="_blank">
                            <img class="icon group" v-if="item.saleType.type == 'group'" src="~static/images/group.png" alt="">
                            <img class="icon" v-if="item.saleType.type == 'sale'" src="~static/images/sale.png" alt="">
                            <div>
                                <p>{{item.title}}</p>
                                <span>￥{{item.price}}</span>
                                <img v-lazy="item.pic" alt="">
                            </div>
                        </nuxt-link> 
                    </div>
                    <!-- <div>
                        <nuxt-link to="/">
                            <p>BRITA Marella 3.5L(blue)+Maxtra Filter Cartridge</p>
                            <span>¥1499</span>
                            <img src="~static/images/flower.jpg" alt="">
                        </nuxt-link> 
                    </div> -->
                   
                </div> 
                <div class="listBottom">
                    <nuxt-link :to="{name: 'goods-id', params: {id: item.id}}" v-for="(item,index) in floorCenterFourPic" :key="index" target="_blank">
                        <img class="icon group" v-if="item.saleType.type == 'group'" src="~static/images/group.png" alt="">
                        <img class="icon" v-if="item.saleType.type == 'sale'" src="~static/images/sale.png" alt="">
                        <p class="smallPic">
                            <img v-lazy="item.pic" alt="">
                        </p>
                        <div>
                            <p>{{item.title}}</p>
                            <span>¥ {{item.price}}</span>
                            <del v-if="item.originalPrice">¥ {{item.originalPrice}}</del>
                        </div>
                    </nuxt-link>
                    <!-- <nuxt-link to="/">
                        <p class="smallPic"><img src="~static/images/flower.jpg" alt=""></p>
                        <div>
                            <p>BRITA Marella 3.5L(blue)+Maxtra Filter Cartridge</p>
                            <span>¥1499</span>
                            <del>¥1599</del>
                        </div>
                    </nuxt-link> -->
                </div>
            </div>
        </div>
        <div class="bottom">
            <nuxt-link :to="{name: 'goods-id', params: {id: item.id}}" v-for="(item,index) in floorBootomFourPic" :key="index" target="_blank">
                <img class="icon group" v-if="item.saleType.type == 'group'" src="~static/images/group.png" alt="">
                <img class="icon" v-if="item.saleType.type == 'sale'" src="~static/images/sale.png" alt="">
                <p class="smallPic">
                    <img v-lazy="item.pic" alt="">
                </p>
                <div>
                    <p>{{item.title}}</p>
                    <span>¥ {{item.price}}</span>
                    <del v-if="item.originalPrice">¥ {{item.originalPrice}}</del>
                </div>
            </nuxt-link>
           <!--  <nuxt-link to="/">
                <p class="smallPic">
                    <img src="~static/images/flower.jpg" alt="">
                    <span><i>SALE</i></span>
                </p>
                <div>
                    <p>BRITA Marella 3.5L(blue)+Maxtra Filter Cartridge</p>
                    <span>¥1499</span>
                    <del>¥1599</del>
                </div>
            </nuxt-link> -->
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            floorData: {
                type: Object,
                default: function() {
                    return {
                        data:[],
                        pic: ""
                    }
                }
            }
        },
        data() {
            return {

            }
        },
        computed: {
            floorTopFourPic: function() {
                return this.floorData.data.slice(0,4);
            },
            floorCenterFourPic: function() {
                return this.floorData.data.slice(5,9);
            },
            floorBootomFourPic: function() {
                return this.floorData.data.slice(10,15);
            }
        }
    }
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass'
    .icon.group
        width: 69px !important
        height: auto !important
    .floor 
        margin-top: 15px
        overflow: hidden
        .top
            overflow: hidden
            .topLeft 
                float: left
                @include wh(240px, 360px)
                img
                   @include wh(240px, 360px) 
            .topList
                float: left
                overflow: hidden
                border: $border
                border-left: none 
                @include wh(960px, 360px)
                .listTop  
                    @include wh(960px, 240px)
                    position: relative
                    >div 
                        float: left   
                        @include wh(240px, 240px)         
                        position: relative 
                        padding: 15px
                        border-right: $border
                        border-bottom: $border            
                        a
                            display: inline-block
                            width: 100%
                            height: 100%
                            p 
                                overflow: hidden
                                text-overflow: ellipsis
                                display: -webkit-box
                                -webkit-box-orient: vertical
                                -webkit-line-clamp: 2
                                line-height: 22px
                                height: 44px
                            span
                                color: $theme_color
                                display: inline-block
                                margin-top: 15px
                            img 
                                position: absolute
                                @include wh(140px, 140px)
                                bottom: 10px
                                right: 10px
                                -webkit-transition: all .3s ease
                                -moz-transition: all .3s ease
                                -ms-transition: all .3s ease
                                -o-transition: all .3s ease
                                transition: all .3s ease
                            img.icon
                                position: absolute
                                top: 110px
                                left: 5px
                                width: 36px
                                height: auto
                                z-index: 100
                    >div:hover 
                        img 
                            right: 15px 
                .listBottom
                    @include wh(960px, 120px)
                    overflow: hidden
                    position: relative
                    a   
                        display: inline-block
                        float: left
                        @include wh(240px, 120px)
                        position: relative 
                        padding: 15px
                        overflow: hidden
                        border-right: $border
                        img.icon
                            position: absolute
                            top: 5px
                            left: 5px
                            width: 36px
                            height: auto
                        .smallPic
                            @include whh(104px, 90px, 90px)
                            float: left
                            img
                               @include wh(86px, 86px)
                            span 
                                position: absolute
                                top: 10px
                                left: 10px
                                @include whch(38px, 18px, center, 18px) 
                                border-radius: $border_radius 
                                img
                                    @include wh(36px, 18px)                        
                        div 
                            float: left
                            width: 105px
                            p 
                                overflow: hidden
                                text-overflow: ellipsis
                                display: -webkit-box
                                -webkit-box-orient: vertical
                                -webkit-line-clamp: 2
                                line-height: 22px
                                height: 44px
                            span 
                                color: $theme_color 
                                display: inline-block
                                margin-top: 20px  
                            del
                                @include sc(14px, #999)
                                position: absolute 
                                right: 10px
                                bottom: 25px
        .bottom
            overflow: hidden
            position: relative
            a:first-child 
                border-left: $border 
                .smallPic
                    @include whh(103px, 90px, 90px)
            a   
                border-right: $border 
                border-bottom: $border
                display: inline-block
                float: left
                @include wh(240px, 120px)
                position: relative 
                padding: 15px
                overflow: hidden
                img.icon
                    position: absolute
                    top: 5px
                    left: 5px
                    width: 36px
                    height: auto
                .smallPic
                    @include whh(104px, 90px, 90px)
                    float: left 
                    img
                       @include wh(86px, 86px)
                    span 
                        position: absolute
                        top: 10px
                        left: 10px
                        @include whch(38px, 18px, center, 18px) 
                        border-radius: $border_radius 
                        img
                            @include wh(36px, 18px)                     
                div 
                    float: left
                    width: 105px
                    p 
                        overflow: hidden
                        text-overflow: ellipsis
                        display: -webkit-box
                        -webkit-box-orient: vertical
                        -webkit-line-clamp: 2
                        line-height: 22px
                        height: 44px
                    span 
                        color: $theme_color 
                        display: inline-block
                        margin-top: 20px  
                    del
                        @include sc(14px, #999)
                        position: absolute 
                        right: 10px
                        bottom: 25px
</style>