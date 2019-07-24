<template>
    <div class="uf-en-bottom">
        <div class="info">
            <div class="left">
                <a href="http://www.urfamily.com.cn/">
                    <img class="uf-logo" src="~static/images/logoCN.png" alt="">
                </a>
            </div>
            <div class="right">
                <span>关于我们</span>
                <span> | </span>
                <span>联系我们</span>
            </div>
        </div>
        <div class="copyright">
            © 2018 Aoyang Advertising Co., Ltd. 沪ICP备12038926号-2
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="sass" scoped>
@import '~/assets/sass/common.sass'
.uf-en-bottom
    padding: 20px 0
    background-color: #000
    color: #fff
    .info
        width: 1200px
        line-height: 64px
        margin: 0 auto
        overflow: hidden
        .right
            float: right
        .left
            float: left
            img
                width: 120px
    .copyright
        text-align: center
</style>


