<template>
    <div class="back">
        <div class="fixBottom">
            <nuxt-link to="/business/costEn">Previous Page</nuxt-link>
        </div>
    </div>
</template>
<script>
	export default {
        head () {
            return {
                title: 'Do Business With Us'
            }
        },
        data () {
            return {

            }
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass'
    .fixBottom
        position: fixed 
        left: 0
        bottom: 0
        right: 0
        @include whch(100%, 40px, center, 40px)
        background-color: #d4d4d4
        a 
            color: $theme_color	
            @include wh(100%, 100%)
            display: inline-block		
</style>