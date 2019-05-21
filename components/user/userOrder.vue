<template>
    <div class="userOrder">
        <div class="orderDetail">
            <div class="date">
                <!-- <span>2018-08-16 13:94:23</span> -->
                <span>Order No. : {{orderDataList.orderNumber}}</span>
                <!-- <span><i class="iconfont icon--dianpu"></i> Amor flor</span> -->
                <div class="dateRight">
                    <span :class="{status: type=='unpaid'}">Unpaid</span>
                    <span class="del" :class="{status: type=='closed'}" @click="deleteOrderItem(orderDataList.orderNumber)"><i class="iconfont icon-shanchu"></i> Closed</span>
                    <span :class="{status: type=='unshipped'}">Unshipped</span>
                    <span :class="{status: type=='progress'}">In Progress</span>
                    <span :class="{status: type=='spell'}">Share with Your Friend, {{orderDataList.number_left}} Vacancy Left</span>
                    <span class="del" :class="{status: type=='shipped'}" @click="deleteOrderItem(orderDataList.orderNumber)"><i class="iconfont icon-shanchu"></i> Shipped</span>
                </div>
            </div>
            <div class="details">
            
                <div class="detailsLeft">
                    <div class="listPer" v-for="item in orderDataList.skuList" :key="item.skuId">
                        <div class="goods">
                            <nuxt-link :to="{name: 'goods-id', params: {id: item.goodsId}}">
                                <div><img v-lazy="item.pic" alt=""></div>
                                <div>
                                    <p>{{item.title}}</p>
                                    <span>
                                        <i v-for="(val,index) in item.skuPropName" :key="index">
                                            {{val[0]}}
                                        </i>
                                    </span>
                                </div>
                            </nuxt-link>
                        </div>
                        <div class="price">
                            <div>
                                <span>¥{{item.price}}</span>
                                <!-- <del>¥129</del> -->
                            </div>
                        </div>
                        <div class="number price">
                            <div>
                                <span>{{item.number}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detailsRight">
                    <div class="right" :style="{height: 114.5*orderDataList.skuList.length + 'px'}">
                        <div>
                            <p>¥{{orderDataList.priceTotal}}</p>
                            <span v-if="orderDataList.feeTotal != 0">RMB10 shipping fee included</span>
                        </div>
                    </div>
                    <div class="right rightBtn" :style="{height: 114.5*orderDataList.skuList.length + 'px'}">
                        <div :class="{statusBtn: flag=='pay'}">
                            <button class="redColor" @click="pay(orderDataList.orderNumber)">Pay</button>
                            <button class="greyColor" @click="goDetails(orderDataList.status,orderDataList.orderNumber)">Details</button>  
                        </div>
                        <div :class="{statusBtn: flag=='spell'}">
                            <button class="redColor spell" @click="bindSpell(orderDataList.orderNumber)">Invite Your Friends</button>
                            <button class="greyColor" @click="goDetails(orderDataList.status,orderDataList.orderNumber)">Details</button>  
                        </div>
                        <div :class="{statusBtn: flag=='details'}">
                            <button class="greyColor" @click="goDetails(orderDataList.status,orderDataList.orderNumber)">Details</button>
                        </div>
                        <div :class="{statusBtn: flag=='track'}">
                            <button class="greyColor" @click="goDetails(orderDataList.status,orderDataList.orderNumber)">Details</button>
                            <!-- <nuxt-link to="/" >Tracking your Order >></nuxt-link> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 接口API
    import interfaceApi from '~/plugins/interfaceApi'
	export default {
        props: {
            flag: {
                type: String,
                default: 'pay'
            },
            type: {
                type: String,
                default: 'unpaid'
            },
            orderDataList: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            index: {
                type: Number,
                default: 0
            }
        },
	    data() {
            return {

            }
        },
        methods: {
            // 跳转详情页
            goDetails(status,orderNumber) {
                if (status == 0) { // 未支付
                    this.$router.push({path: '/userCenter/orderStatus/orderUnpaid',query: {orderNumber: orderNumber}})
                } else if (status == 1) { // 支付
                    this.$router.push({path: '/userCenter/orderStatus/orderPaid',query: {orderNumber: orderNumber}}) 
                } else if (status == 2) {// 运输中
                    this.$router.push({path: '/userCenter/orderStatus/orderProgress',query: {orderNumber: orderNumber}})
                } else if (status == 3) { // 到货
                    this.$router.push({path: '/userCenter/orderStatus/orderShipped',query: {orderNumber: orderNumber}})
                } else if (status == 4) { // 关闭
                    this.$router.push({path: '/userCenter/orderStatus/orderClosed',query: {orderNumber: orderNumber}})
                }
            },
            pay(orderNumber) {
                this.$router.push({path: '/payProcess/aliPay',query: {orderNumber: orderNumber}})
            },
            deleteOrderItem(orderNumber) {
                var that =this;
                
                that.$confirm('Are you sure to delete the order?', '', {
                    confirmButtonText: 'Done',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                })
                .then(_ => {

                    that.$axios.post(interfaceApi.orderDelete,{
                        orderNumber: orderNumber
                    }).then(function (response) {
                        that.$emit('delete',that.index);
                    });
                    
                })
                .catch(_ => {});

                
            },
            bindSpell(orderNumber) {
                this.$emit('bindSpell',orderNumber);
            }
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
@import '~/assets/sass/common.sass' 
.userOrder
    .orderDetail
        margin-top: 15px
        border: $border
        .date
            @include hh(36px, 36px)
            background-color: #eee
            padding: 0 15px
            span 
                padding-right: 100px
                @include sc(14px, #666)
                .icon--dianpu 
                    padding-right: 5px
            .dateRight
                float: right
                span
                    padding-right: 0
                    display: none
                    color: #F9421E
                span.del
                    cursor: pointer
                    color: #666
                    .icon-shanchu 
                        color: #AAA
                .status
                    display: block
        .details 
            overflow: hidden 
            width: 100%
            .detailsLeft
                float: left
                overflow: hidden
                .listPer
                    overflow: hidden
                    border-bottom: $border
                    >div 
                        float: left
                    .goods
                        overflow: hidden
                        margin-left: 15px
                        padding-right: 15px
                        @include wh(325px, 114px) 
                        border-right: $border
                        a 
                            display: inline-block 
                            padding: 15px 0
                            >div 
                                float: left
                            >div:first-child
                                @include wh(80px, 80px)
                                margin-right: 10px
                                img 
                                    @include wh(80px, 80px)
                            >div:nth-child(2)
                                width: 200px
                                p 
                                    overflow: hidden
                                    text-overflow: ellipsis
                                    display: -webkit-box
                                    -webkit-box-orient: vertical
                                    -webkit-line-clamp: 2
                                    line-height: 22px
                                    min-height: 44px
                                span 
                                    display: block
                                    @include sc(14px, #666)
                                    padding-top: 15px
                    .price 
                        @include wh(160px, 114px)
                        text-align: center
                        border-right: $border
                        position: relative
                        >div
                            @include center 
                            span 
                                display: block
                                color: $theme_color
                            del 
                                @include sc(14px, #666)
                                display: inline-block
                                padding-top: 10px
                    .number.price 
                        >div 
                            span 
                                color: #666
                .listPer:last-child 
                    border-bottom: none
            .detailsRight 
                overflow: hidden
                float: left
                .right 
                    float: left
                    width: 152px
                    position: relative
                    >div
                        @include center
                .right:first-child
                    border-right: $border
                    text-align: center 
                    p 
                        color: $theme_color
                        margin-bottom: 10px
                    span 
                        @include sc(14px, #666)
                        display: block
                        width: 130px
                .rightBtn
                    >div
                        display: none 
                        button
                            @include whch(100px, 30px, center, 30px)
                            border-radius: $border_radius
                            margin-bottom: 15px
                        .redColor
                            background-color: $theme_color
                            @include sc(16px, #fff)
                        .redColor.spell
                            font-size: 12px
                            width: 125px
                        .greyColor
                            background-color: #fff 
                            border: $border
                            font-size: 16px
                        a 
                            @include sc(14px, $theme_color)
                            display: inline-block
                            padding-left: 8px
                    .statusBtn
                        display: block 
                        text-align: center                         					
</style>