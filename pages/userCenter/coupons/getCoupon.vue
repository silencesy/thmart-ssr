<template>
    <div class="getcoupon-container">
        <img class="banner-img" :src="discountlist.pic" alt="">
        <div class="list">
            <div class="item" v-for="(item,index) in discountlist.data" :key="index">
                <img class="item-img" :src="item.pic" alt="">
                <img class="received" v-if="item.isdiscount == 1" src="~static/images/lingqu.png" alt="">
                <span @click="bindUseCoupon(item.id)"></span>
                <button @click="bindGetCoupon(item.id,index)" v-if="item.isdiscount == 0">Get Now</button>
                <button @click="bindUseCoupon(item.id)" v-if="item.isdiscount == 1">Use Now</button>
            </div>
        </div>
        <div class="coupon-rule">
            <div class="title">
                Coupon rule:
            </div>
            <div class="coupon-text" v-html="discountlist.detail"></div>
        </div>
    </div>
</template>
<script>
// 接口API
import interfaceApi from '~/plugins/interfaceApi'
export default {
    async asyncData ({app,query,store}) {
        const discountlist = await app.$axios.post(interfaceApi.discountlist);
        // 获取分类
        const categoryList = await app.$axios.post(interfaceApi.categoryList,{fname: 0})
        store.commit('SET_CATEGORYLIST',categoryList.data.data);
        return { discountlist: discountlist.data.data }
    },
    methods: {
        // 领取优惠券
        bindGetCoupon(couponId,index) {
            var that = this;
            //判断用户是否登录
            if (!that.user.isLogin()) {
                that.$store.commit('LOGIN',true);
            } else {
                const param = {
                    id: couponId
                }
                that.$axios.post(interfaceApi.getCoupon,param).then(res=> {
                    console.log(res.data.code);
                    if(res.data.code == 1) {
                        that.discountlist.data[index].isdiscount = 1;
                    } 
                });
            }
        },
        // 优惠券列表页 
        bindUseCoupon(id) {
            this.$router.push({name: 'userCenter-coupons-id',params: {id: id}});
        }
    }
}
</script>
<style lang="sass" scoped>
.getcoupon-container
    background-color: #eee
    padding-bottom: 30px
    .coupon-rule
        width: 780px
        margin: 0 auto
        .title
            color: #555555
            font-size: 16px
            display: block
            padding: 10px 0
        .coupon-text
            color: #666666
            font-size: 16px
            line-height: 24px
.banner-img
    width: 100%
    height: auto
.list
    width: 780px
    display: flex
    margin: 0 auto
    flex-wrap: wrap
    justify-content: space-between
    padding: 10px 0
    .item
        width: 47%
        margin: 5px 0
        position: relative
        .item-img
            width: 100%
            height: auto
        .received
            width: 100px
            position: absolute
            right: 55px
            top: 10px
        button
            position: absolute
            right: 4px
            top: 106px
            width: 80px
            padding: 2px 0
            border-radius: 22px
            font-size: 14px
            background-color: #F9421E
            color: #fff
        span
            position: absolute
            width: 200px
            height: 35px
            background-color: transparent
            left: 0
            bottom: 6px
            z-index: 100
            cursor: pointer
</style>

