<template>
    <div class="userLayout">
        <div class="userLeft">
            <ul>
                <li>
                    <nuxt-link to="/userCenter/user">
                        <div class="hasImg"><img :src="$store.state.headimgurl" alt=""></div>
                        <p>{{$store.state.nickname}}</p>
                    </nuxt-link>
                </li>
                <li :class="{active: active=='userCenter'}">
                    <nuxt-link to="/userCenter/user">User Center</nuxt-link>
                </li>
                <li :class="{active: active=='userInfo'}">
                    <nuxt-link to="/userCenter/userinfo">Personal Info</nuxt-link>
                </li>
                <li :class="{active: active=='orderList'}">
                    <nuxt-link to="/userCenter/orderlist/all">Orders</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/userCenter/cartModule/cart">Cart</nuxt-link>
                </li>
                <li :class="{active: active=='Wishlist'}">
                    <nuxt-link to="/userCenter/wish/wish">Wishlist</nuxt-link>
                </li>
                <li :class="{active: active=='Coupons'}">
                    <nuxt-link to="/userCenter/coupons/coupons">thMart-Coupons</nuxt-link>
                </li>
                <li :class="{active: active=='Address'}">
                    <nuxt-link to="/userCenter/address/addressList">Address Book</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="userRight">
            <slot name="userContent"></slot>           
        </div>
    </div>
</template> 
<script>
	export default {
        props: {
            active: {
                type: String,
                default: 'userCenter'
            }
        },
		data() {
            return {

            }
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass' 
    .userLayout 
        overflow: hidden
        .userLeft
            background-color: #eee
            @include wh(200px, 450px)
            float: left
            text-align: center
            padding-top: 20px 
            ul 
                li
                    border-left: 4px solid #eee
                    a 
                        display: inline-block
                        width: 100%
                        padding: 11px 0
                        .hasImg
                            display: inline-block
                            @include wh(80px, 80px)
                            background-color: #fff 
                            border-radius: 40px
                            img 
                                @include wh(80px, 80px)
                                border-radius: 40px
                                text-align: center
                                margin-bottom: 
                                display: block
                        p 
                            white-space: nowrap
                            text-overflow: ellipsis
                            overflow: hidden
                            padding: 0 15px
                li:first-child 
                    border-bottom: 1px solid #dfdfdf
                li.active
                    background-color: #fff
                    border-left: 4px solid $theme_color
        .userRight  
            width: 1000px
            float: left 
            border: $border
            padding: 15px
            min-height: 450px
    					
</style>