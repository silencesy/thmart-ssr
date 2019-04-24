<template>
    <div class="hotProducts" :class="{container: styleObj.container}">
    	<div class="hotTitle" v-if="titleIsShow"><img src="~static/images/hot.png" alt=""></div>
    	<div class="products">
			<nuxt-link :to="{name: 'goods-id', params: {id: item.id}}" v-for="item in hotData" :key="item.id" :style="styleObj" target="_blank">
                <b class="hot">
                    <img class="group" style="width: 69px;height: auto;" v-if="item.saleType.type == 'group'" src="~static/images/group.png" alt="">
                    <img v-if="item.saleType.type == 'sale'" src="~static/images/sale.png" alt="">
                </b>
                <div :style="imgBox"><img :style="imgBox" v-lazy="item.pic" alt=""></div>
                <p>{{item.title}}</p>
                <span>¥{{item.price}}</span>
                <del v-if="item.originalPrice">¥{{item.originalPrice}}</del>
			</nuxt-link>
		</div>
        <div v-if="hotData.length == 0" class="no-result">No result</div>
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
			},
            styleObj: {
                type: Object,
                default: function() {
                    return {
                        width: '190px',
                        height: '285px',
                        container: true
                    }
                }
            },
            titleIsShow: {
                type: Boolean,
                default: false
            }
		},
        computed: {
            imgBox: function() {
                let imgBoxstyleObj = {};
                imgBoxstyleObj['width'] = (parseInt(this.styleObj.width) - 2) + 'px';
                imgBoxstyleObj['height'] = (parseInt(this.styleObj.width) - 2) + 'px';
                return imgBoxstyleObj;
            }
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass' 
    .hotProducts
    	.hotTitle
    		text-align: center
    		margin: 25px 0 15px 0
    	.products 
    		overflow: hidden
    		margin: 0 -6px
    		a
    			display: inline-block
    			position: relative
    			border-radius: $border_radius
    			float: left
    			border: $border
    			margin: 6px
    			div 
    				margin-bottom: 9px
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
    			span
    				color: $theme_color
    				display: inline-block 
    				margin-top: 10px
    			del
    				@include sc(14px, #999)
    			b
    				position: absolute
    				top: 5px
    				left: 5px
    				@include whch(38px, 18px, center, 18px)
    				border-radius: $border_radius 
    				img
    					@include wh(36px, auto)

    		a:hover
    			box-shadow: 0 0 10px #dfdfdf
    			transition: all .2s
    			-webkit-transition: all .2s
    			-moz-transition: all .2s
    			-o-transition: all .2s

    .hotProducts
        .products 
            padding-top: 5px
            
</style>