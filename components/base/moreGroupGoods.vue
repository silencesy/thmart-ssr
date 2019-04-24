<template>
    <div class="moreProducts">
    	<div class="moreTitle">Coming events</div>
    	<div class="products">
			<nuxt-link to="/">
				<b class="hot"><i>SALE</i></b>
				<div class="hasPic"><img src="~static/images/flower.jpg" alt=""></div>
				<p>Kellogg's Corn Flake Copy 5</p>
				<span class="cash">¥14999</span>
				<del>¥15999</del>               
                <!-- <div class="countDown">
                    <span>15</span><i>:</i><span>35</span><i>:</i><span>20</span><i>:</i><span>24</span>
                </div> -->
                <div class="countDownGrey">
                    <span>Start at x/x/2018 xx:xx</span>
                </div>
			</nuxt-link>
            <nuxt-link to="/">
                <b class="hot"><i>SALE</i></b>
                <div class="hasPic"><img src="~static/images/flower.jpg" alt=""></div>
                <p>Kellogg's Corn Flake Copy 5</p>
                <span class="cash">¥14999</span>
                <del>¥15999</del>
                <!-- <div class="countDown">
                    <span>15</span><i>:</i><span>35</span><i>:</i><span>20</span><i>:</i><span>24</span>
                </div> -->
                <div class="countDownGrey">
                    <span>Start at x/x/2018 xx:xx</span>
                </div>
            </nuxt-link>
		</div>
    </div>
</template>
<script>
	export default {
		props: {
			hotData: {
				type: Array,
				default: function() {
					return []
				}
			}
		}
	}
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass' 
    .moreProducts
        width: 240px 
        border-radius: $border_radius 
        border: $border 
        float: right
        .moreTitle
            @include whch(238px, 35px, center, 35px)
            background-color: #eee
        .products
            overflow: hidden           
            a 
                display: inline-block
                @include wh(210px, 320px)
                position: relative
                float: left 
                padding: 15px 0
                margin: 0 15px
                border-bottom: $border
                .hasPic
                    @include wh(210px, 210px) 
                    margin-bottom: 9px
                    img 
                        @include wh(210px, 210px) 
                p 
                    overflow: hidden 
                    text-overflow: ellipsis 
                    display: -webkit-box 
                    -webkit-box-orient: vertical 
                    -webkit-line-clamp: 2
                    line-height: 22px 
                    height: 44px 
                    text-align: center 
                    padding: 0 15px 
                .cash 
                    padding-left: 15px
                    color: $theme_color 
                    display: inline-block 
                    margin-top: 10px
                del 
                    position: absolute 
                    right: 15px 
                    bottom: 15px 
                    @include sc(14px, #999)
                b 
                    position: absolute 
                    top: 20px
                    left: 5px
                    background-color: $theme_color 
                    @include whch(38px, 18px, center, 18px) 
                    border-radius: $border_radius 
                    i 
                        @include sc(12px, #fff) 
            a:last-child
                border-bottom: none
    					
    .moreProducts
        .countDown
            @include whch(100%, 26px, center, 26px)
            position: absolute
            top: 150px
            background-color: #FFB510
            color: #fff
            span
                @include whch(20px, 20px, center, 21px)
                background-color: #0000005c
                font-size: 14px
                border-radius: $border_radius
                display: inline-block
            i 
                padding: 0 5px
    .moreProducts
        .countDownGrey
            @include whch(100%, 26px, center, 27px)
            position: absolute
            top: 199px
            background-color: #dfdfdf
            color: #fff
            span
                @include sc(14px, #666)
</style>