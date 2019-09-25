<template>
    <div class="userStatus">
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item to="/userCenter/user">User Center</el-breadcrumb-item>
              <el-breadcrumb-item v-if="orderDetails.status == 4" to="/userCenter/orderlist/all"><a>Orders</a></el-breadcrumb-item>
              <el-breadcrumb-item v-if="orderDetails.status == 0" to="/userCenter/orderlist/unpaid"><a>Orders</a></el-breadcrumb-item>
              <el-breadcrumb-item  v-if="orderDetails.status == 1" to="/userCenter/orderlist/unshipped"><a>Orders</a></el-breadcrumb-item>
              <el-breadcrumb-item  v-if="orderDetails.status == 2" to="/userCenter/orderlist/progress"><a>Orders</a></el-breadcrumb-item>
              <el-breadcrumb-item  v-if="orderDetails.status == 3" to="/userCenter/orderlist/shipped"><a>Orders</a></el-breadcrumb-item>
              <el-breadcrumb-item>Order No. :{{orderDetails.orderNumber}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container statusContainer">
            <div class="statusStep">
                <div class="step" :class="{activeStep: type==1 || type==2 || type==3 || type==4}">
                    <span class="iconfont icon-daifukuan"></span>
                    <span>Unpaid</span>
                </div>
                <div class="iconfont icon-jindutiao1-copy" :class="{activeStep: type==2 || type==3 || type==4}"></div>
                <div class="step" :class="{activeStep: type==2 || type==3 || type==4}">
                    <span class="iconfont icon-fahuo"></span>
                    <span>Unshipped</span>
                </div>
                <div class="iconfont icon-jindutiao1-copy" :class="{activeStep: type==3 || type==4}"></div>
                <div class="step" :class="{activeStep: type==3 || type==4}">
                    <span class="iconfont icon-yunshu"></span>
                    <span>In Progress</span>
                </div>
                <div class="iconfont icon-jindutiao1-copy" :class="{activeStep: type==4}"></div>
                <div class="step" :class="{activeStep: type==4}">
                    <span class="iconfont icon-daishouhuo"></span>
                    <span>Shipped</span>
                </div>
            </div>
            <div class="info">
                <div>
                    <div class="infoLeft">
                        <div class="left">
                            <span>Order No. :</span>
                            <span>Ordered :</span>
                            <span v-if="orderDetails.payTime != 0">payTime :</span>
                            <span v-if="orderDetails.sendTime != 0">sendTime :</span>
                            <span>Receiver :</span>
                            <span class="address">Address :</span>
                            <span v-if="orderDetails.buyerRemark != 0">Remark: </span>
                            <span v-if="orderDetails.feeTotal!=0">Shipping :</span>
                            <!-- <span>Quantity Discount :</span> -->
                            <!-- <span>thMart-Coupons :</span> -->
                            <span>Final Price :</span>
                        </div>
                        <div class="right">
                            <span>{{orderDetails.orderNumber}}</span>
                            <span>{{orderDetails.orderTime}}</span>
                            <span v-if="orderDetails.payTime != 0">{{orderDetails.payTime}}</span>
                            <span v-if="orderDetails.sendTime != 0">{{orderDetails.sendTime}}</span>
                            <span>{{orderDetails.fullName}} {{orderDetails.phone}}</span>
                            <span class="address">{{orderDetails.province}}{{orderDetails.city}}{{orderDetails.regionDetail}}</span>
                            <span v-if="orderDetails.buyerRemark != 0">{{orderDetails.buyerRemark}}</span>
                            <span v-if="orderDetails.feeTotal!=0">¥ {{orderDetails.feeTotal}}</span>
                            <!-- <span>¥ 10</span> -->
                            <!-- <span>¥ 5</span> -->
                            <span>¥ {{orderDetails.priceTotal}} <button @click="pay" v-if="orderDetails.status == 0" class="redColor">Pay</button></span>

                        </div>
                        <div class="qr" v-for="(item,index) in orderDetails.data.ticketqrs" :key="index">
                            <div>Please show your QR code to the ticketing staff on site.</div>
                            <div>
                                <img @click="showQr(item.pic)" v-lazy="item.pic" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="statusRight">
                        <slot name="statusInfo"></slot>
                    </div>
                </div>
            </div>
            <div class="statusOrder">
                <div class="title">
                    <span>Product Name</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Tracking your Order</span>
                    <span>Final Price</span>
                </div>
                <div class="details" v-for="(item,index) in orderDetails.data.brand" :key="index">
                    <div class="titleDetails">
                        <div>
                            <span class="iconfont icon--dianpu"></span>
                            <span>{{item.brandName}}</span>
                        </div>
                        <div class="iconfont icon-combinedshapefuben"></div>
                    </div>
                    <div class="detailsLeft">
                        <div class="listPer" v-for="val in item.data" :key="val.skuId">
                            <div class="goods">
                                <nuxt-link :to="{name: 'goods-id', params: {id: val.goodsId}}">
                                    <div><img v-lazy="val.pic" alt=""></div>
                                    <div>
                                        <p>{{val.title}}</p>
                                        <span>
                                            <i v-for="(value,index) in val.skuPropName" :key="index">
                                                {{value[0]}}
                                            </i>
                                        </span>
                                    </div>
                                </nuxt-link>
                            </div>
                            <div class="price">
                                <div>
                                    <span>¥{{val.price}}</span>
                                    <!-- <del>¥129</del> -->
                                </div>
                            </div>
                            <div class="number price">
                                <div>
                                    <span>{{val.number}}</span>
                                </div>
                            </div>
                            <div class="wuliu price">
                                <div>
                                    <a :class="{disable: orderDetails.status == 0 || orderDetails.status == 1 || orderDetails.status == 4}" @click="tracking(val.company,val.logistics)">Tracking your Order</a>
                                    <a v-if="orderDetails.status == 3" :class="{disable:val.hasComment==1}" @click="addReviews(val.id,val.hasComment)">Review</a>
                                </div>
                            </div>
                        </div>
                                              
                    </div>
                    <div class="detailsRight">
                        <div class="right" :style="{height: item.data.length * 114 + 'px'}">
                            <div>
                                <p>¥ {{item.total}}</p>
                                <!-- <span>RMB10 shipping fee included</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="noticeService">
                <span><i class="iconfont icon-xinxi"></i>Notice</span>
                <span><nuxt-link to="/"><i class="iconfont icon-kefu"></i>Customer Service</nuxt-link> </span>
            </div>
            <p class="tips">If you need after-sales service, please contact us within 7 days after you receive the parcel. We will not accept the request if overdue. Thanks for your cooperation and understanding.</p>
        </div>
        <!-- 二维码弹框 -->
        <el-dialog
            title="Please show your QR code to the ticketing staff on site."
            :visible.sync="QRdialogVisible"
            width="20%"
            >
            <div class="qr-img-box">
                <img v-lazy="QRimg" alt="">
            </div>
        </el-dialog>
    </div>
</template>
<script>
    // 提示语
    import prompt from '~/assets/js/prompt'
	export default {
        props: {
            type: {
                type: String,
                default: ' '
            },
            flag: {
                type: String,
                default: ' '
            },
            orderDetails: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
	    data() {
            return {
                QRdialogVisible: false,
                QRimg: ''
            }
        },
        methods: {
            showQr(e) {
                this.QRdialogVisible = true;
                this.QRimg = e;
            },
            // 去支付
            pay() {
                this.$router.push({path: '/payProcess/aliPay',query: {orderNumber: this.$route.query.orderNumber}});
            },
            tracking(company,logistics) {
                if (this.orderDetails.status == 0 || this.orderDetails.status == 1 || this.orderDetails.status == 4) {
                    this.$notify.info({
                      title: prompt.nologisticsinformation,
                      message: ''
                    });
                } else {
                    this.$router.push({name: 'userCenter-orderStatus-logistics',query: {logistics: logistics,company: company}})
                }
            },
            addReviews(id,hasComment) {
                if(hasComment == 1) {
                    this.$message({
                        message: prompt.commented,
                        type: 'warning'
                    });
                } else {
                    this.$router.push({name: 'userCenter-review',query: {id: id}});
                }
            }
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
@import '~/assets/sass/common.sass'
.qr-img-box
    text-align: center
    img
        width: 100%
        height: 100%
.qr
    display: flex
    div:nth-child(1)
        width: 310px
        color: #666
        align-self: center
    div:nth-child(2)
        width: 100px
        align-self: center
        text-align: right
        img
            width: 80px
            height: 80px
            cursor: pointer
.disable
    background: #dfdfdf !important
.redColor
    background-color: $theme_color
    @include sc(16px, #fff)
    padding: 6px 50px
    border-radius: $border_radius
    margin-left: 60px
.iconfont.icon-jindutiao1-copy
    color: #dfdfdf
    padding: 17px 20px 0 20px
.activeStep.iconfont.icon-jindutiao1-copy
    color: $theme_color 
.userStatus
    .bread 
        width: 100%
        background-color: #eee
        margin-bottom: 15px
        .el-breadcrumb
            @include hh(36px, 36px)
            width: 1200px
            margin: 0 auto
    .statusContainer
        border: $border
        margin-bottom: 15px
        padding: 15px
        .statusStep 
            overflow: hidden
            margin-left: 205px
            margin-bottom: 20px
            >div 
                float: left
            .step 
                width: 85px 
                text-align: center
                >span 
                    display: block
                    color: #c9c9c9
                >.iconfont 
                    font-size: 30px
            .activeStep
                span
                    color: $theme_color
        .info
            >div 
                overflow: hidden
                >div 
                    float: left
                .infoLeft
                    width: 440px
                    overflow: hidden
                    border-right: $border
                    >div 
                        float: left
                        span 
                            display: block
                            height: 33px
                    .left 
                        width: 145px
                        span 
                            color: #666
                            text-align: right
                            padding-right: 7px
                            font-size: 16px
                        span.address 
                            height: 44px
                        span:last-child 
                            margin-bottom: 0
                    .right 
                        width: 276px
                        span
                            font-size: 16px
                        span:last-child 
                            margin-bottom: 0
                        span.address
                            overflow: hidden
                            text-overflow: ellipsis
                            display: -webkit-box
                            -webkit-box-orient: vertical
                            -webkit-line-clamp: 2
                            font-size: 14px
                            line-height: 22px
                            height: 44px
        .statusOrder
            .title 
                border-bottom: $border 
                padding: 30px 0 10px 0
                margin-bottom: 15px
                span 
                    color: #666
                    display: inline-block
                    width: 195px
                    text-align: center
                span:first-child
                    width: 405px
                span:last-child
                    width: 175px
        .details 
            overflow: hidden 
            border: $border
            margin-bottom: 15px
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
                        @include wh(390px, 114px) 
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
                        @include wh(195px, 114px)
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
                    .wuliu 
                        >div 
                            a 
                                display: inline-block
                                @include whch(145px, 30px, center, 30px)
                                @include sc(14px, #fff)
                                background-color: #F9421E
                                border-radius: 4px 
                                cursor: pointer
                                margin-bottom: 5px
                    .wuliuGrey
                        >div 
                            a 
                                background-color: #ccc
                                cursor: default                                    
                .listPer:last-child 
                    border-bottom: none
            .detailsRight 
                overflow: hidden
                float: left
                .right 
                    float: left
                    width: 175px
                    position: relative
                    >div
                        @include center
                .right:first-child
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
    .tips
        @include sc(14px, #666)
    .noticeService
        margin: 15px 0
        i 
            padding-right: 10px
        span:nth-child(2)
            a
                @include sc(14px, #666)
                .iconfont 
                    color: $theme_color
                    padding-left: 50px

.titleDetails
    padding-top: 15px
    padding-bottom: 10px
    border-bottom: $border
    cursor: pointer
    overflow: hidden
    div:first-child
        float: left
        .icon--dianpu
            padding-left: 15px
            padding-right: 10px
            font-size: 21px
    div:nth-child(2)
        float: right
        padding-right: 15px


</style>