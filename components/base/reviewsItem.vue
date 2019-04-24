<template>
	<div class="item">
        <img class="user-img" :src="data.headimgUrl" alt="">
        <div class="info">
            <div class="username">{{data.username}}</div>
            <div class="reviews-text">{{data.comment}}</div>
            <div class="img-box" v-if="data.picList">
                <div class="img" :class="{active: active==item}" @click="showBigImg(item)" v-for="(item,index) in data.picList" :key="index" :style="{backgroundImage:'url('+ item +')'}"></div>
            </div>
            <div class="big-img">
                <img v-if="active" :src="active" alt="">
            </div>
            <div class="bottom-info">
                <span v-for="(item,index) in JSON.parse(data.prop)" :key="index">{{index}}: {{item[0]}}</span>
                <span>{{data.orderTime}}</span>
            </div>
            <div class="replay" v-if="data.reply">
                <span>Replay</span>: {{data.reply}}
            </div>
        </div>
    </div>
</template>
<script>
	export default {
        props: {
            data: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data() {
            return {
                active: ''
            }
        },
        methods: {
            showBigImg(item) {
                if (this.active == item) {
                    this.active = '';
                } else {
                    this.active = item
                }
            }
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
@import '~/assets/sass/common.sass'
.active
    border: 1px solid #F9421E
.item
    padding: 15px 0
    overflow: hidden
    border-bottom: 1px solid #DFDFDF
    .user-img
        width: 60px
        height: 60px
        float: left
        margin-right: 15px
        border-radius: 50%
    .info
        width: 835px
        float: left
        line-height: 20px
        .username
            color: #666
            font-size: 14px
            padding-bottom: 3px
        .reviews-text
            color: #222222
            font-size: 14px
        .img-box
            overflow: hidden
            padding: 10px 0
            .img
                width: 100px
                height: 66px
                float: left
                margin-right: 10px
                background-size: cover
                cursor: pointer
            .img:hover
                border: 1px solid #F9421E
        .big-img
            img
                height: 200px
        .bottom-info
            color: #666666
            font-size: 14px
            padding: 5px 0
            span
                margin-right: 15px
        .replay
            font-size: 14px
            color: #666
            padding-top: 8px
            margin-top: 8px
            border-top: 1px dashed #DFDFDF
            span
                color: #F9421E
</style>