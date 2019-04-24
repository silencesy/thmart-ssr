<template>
    <div class="nav">
        <div class="container">
            <div class="homeHead">
                <div class="left"><img @click="goHome" src="~static/images/thmart.png" alt=""></div>
                <div class="right">
                    <img src="~static/images/process1.png" alt="" v-if="isShowObj.oneIsShow">
                    <img src="~static/images/process2.png" alt="" v-if="isShowObj.twoIsShow">
                    <img src="~static/images/process3.png" alt="" v-if="isShowObj.threeIsShow">
                </div>
            </div> 
        </div> 
    </div>
</template>

<script>
    export default {
        props: {
            isShowObj: {
                type: Object,
                default: function() {
                    return {
                        oneIsShow: true,
                        twoIsShow: false,
                        threeIsShow: false
                    }
                }
            }
        },
        data() {
            return {
                searchText: '',
                searchTipsTextShow: true,
                activeCategoryData: ''
            }
        },
        components: {

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
            sss() {
                alert(123);
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
                width: 680px

</style>