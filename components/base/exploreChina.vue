<template>
	<div class="articleBox">
        <div class="articleList">
            <div class="list" v-for="item in articleData" :key="item.id">
                <nuxt-link :to="{name: 'goods-id',params: {id: item.id}}" target="_blank">
                    <div>
                        <img v-lazy="item.pic" alt="">
                    </div>
                    <div>                        
                        <p>{{item.title}}</p>
                        <span>{{item.description}}</span>
                        <i class="theme_color">￥ {{item.price}}</i>                       
                    </div>
                </nuxt-link>
            </div>
            <div class="no-result" v-if="articleData.length == 0">No result</div>
        </div>
    </div>
</template>
<script>
	export default {
        props: {
            articleData: {
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
    .articleBox 
        overflow: hidden
        .articleList
            overflow: hidden
            width: 942px
            .list:first-child, .list:nth-child(2)
                margin-top: 0
            .list 
                width: 463px
                float: left
                border: $border
                border-radius: $border_radius
                margin-top: 15px
                overflow: hidden
                padding: 15px  
                margin-right: 15px
                a 
                    display: inline-block 
                    >div 
                        float: left
                    >div:first-child
                        @include wh(130px, 130px)
                        margin-right: 10px
                        img 
                            @include wh(130px, 130px)
                    >div:nth-child(2)
                        width: 288px
                        p 
                            overflow: hidden
                            text-overflow: ellipsis
                            display: -webkit-box
                            -webkit-box-orient: vertical
                            -webkit-line-clamp: 2
                            line-height: 22px
                            height: 44px
                        span 
                            display: inline-block
                            overflow: hidden
                            text-overflow: ellipsis
                            display: -webkit-box
                            -webkit-box-orient: vertical
                            -webkit-line-clamp: 2
                            line-height: 22px
                            height: 44px
                            @include sc(14px, #666)
                        i 
                            display: block
                            margin-top: 20px
                            @include sc(14px, #999)
            .list:nth-child(even)
                margin-right: 0
            .list:hover
                box-shadow: 0 0 10px #dfdfdf
                transition: all .2s
                -webkit-transition: all .2s
                -moz-transition: all .2s
                -o-transition: all .2s

</style>