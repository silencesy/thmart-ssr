<template>
	<div class="aliPay">
		<div class="container">
			<payNav :isShowObj="isShowObj" />
			<div class="payBox">
				<div>
					<p>
						<span>Order No. : </span>
						<span>{{details.orderNumber}}</span>
					</p>
					<p>
						<span>Ordered : </span>
						<span>{{details.orderTime}}</span>
					</p>
					<p>
						<span>Receiver : </span>
						<span>{{details.fullName}} {{details.phone}}</span>
					</p>
					<p>
						<span>Address : </span>
						<span>{{details.province}}{{details.city}}{{details.regionDetail}}</span>
					</p>
					<p>
						<span>Final Price :</span>
						<span class="theme_color">¥ {{details.priceTotal}}</span>
					</p>
					<p v-if="details.buyerRemark!=0">
						<span>Remark :</span>
						<span>{{details.buyerRemark}}</span>
					</p>
					<div>
						<button class="iconfont icon-zhifubao" @click="alipay"></button>
						<button class="iconfont icon-weixinzhifu" @click="wechatpay"></button>
					</div>
				</div>
			</div>
	        <!-- 微信支付框 -->
	        <el-dialog class="wechatBox" title="" :visible.sync="dialogWechatVisible">
	            <div class="box">
	                <span class="iconfont icon-weixinzhifu"></span>
	                <p class="priceBox">
						<span>Order number:{{details.orderNumber}}</span>
						<span>¥{{details.priceTotal}}</span>
	                </p>
	                <div class="saoyisao">
	                	<div class="left">
	                		<img :src="'http://api.mall.thatsmags.com/thmartApi/Wx/qrcode?data=' + details.jsApiParameters" alt="">
	                		<p><i class="iconfont icon-scan"></i> Scan the QR Code to Pay</p>
	                	</div>
	                	<img src="~static/images/iphone.jpg" alt="">
	                </div>
	            </div>
	        </el-dialog>
		</div>
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	//支付进度条组件
	import payNav from '~/components/layout/payNav.vue'
	export default {
		layout: 'payHome',
		data() {
			return {
				dialogWechatVisible: false,
				isShowObj: {
                    oneIsShow: false,
                    twoIsShow: true,
                    threeIsShow: false
				},
				timer: null
			}
		},
		middleware: 'userAuth',
		async asyncData ({app,query}) {
			let param = {
				orderNumber: query.orderNumber,
			}
		 	const details = await app.$axios.post(interfaceApi.payOrderDetail,param);
  			return { 
  				details: details.data.data
            }
		},
		components: {
			payNav
		},
		mounted() {
			if (window.history && window.history.pushState) {
				history.pushState(null, null, document.URL);
				window.addEventListener('popstate', this.goBack, false);
			}
			// 检测微信支付成功跳转
			this.weixinpayed();
		},
		destroyed(){
			window.removeEventListener('popstate', this.goBack, false);
		},
	  	computed: {  
		    
	  	},
	  	beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
			clearInterval(this.timer); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
			next()
		},
		methods: {
			// url 是支付宝回跳地址
			alipay() {
				var goback = window.location.hostname == 'thmart.com.cn'? 'http://api.mall.thatsmags.com/thmartApi/Alipay/alipayapiPc?orderNumber=':'http://api.mall.thatsmags.com/thmartApi/Alipay/alipayapiPc?orderNumber=';
				goback = goback + this.details.orderNumber + "&url="+ window.location.origin + '/payProcess/paid?orderNumber=' + this.details.orderNumber;
				// http://proj11.thatsmags.com/payProcess/paid?orderNumber=182130537986
				// window.location.href = "http://proj6.thatsmags.com/thmartApi/Alipay/alipayapiPc?orderNumber=" + this.details.orderNumber + "&url="+;
				window.location.href = goback;
			},
			goBack(){
			    this.$router.replace({path: '/payProcess/unPaid', query: {orderNumber: this.details.orderNumber}});
			},
			wechatpay() {
				this.dialogWechatVisible = true;
			},
			weixinpayed() {
				var that = this;
				that.timer = setInterval(function() {
					that.setIntervalAxios();
				}, 4000);
			},
			setIntervalAxios() {
				var that = this;
				that.$axios.post(interfaceApi.weixinpayed,{trade_no: that.$route.query.orderNumber}).then(res=> {
					console.log(res);
					if (res.data.code == 1) {
						clearInterval(that.timer);
						that.$router.push({path: '/payProcess/paid',query: {orderNumber: that.$route.query.orderNumber}})
						console.log(123);
					}
				})
			}

		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.aliPay
		background: url(~static/images/bg.png) no-repeat
		@include wh(100%, 100%)
		background-size: 100% 100%
		.container
			.payBox
				margin: 10px 0 70px 0
				border: $border
				box-shadow: 0 0 5px #dfdfdf
				position: relative
				width: 100%
				height: 365px
				text-align: center
				background: #fff
				>div 
					@include center
					>p 
						overflow: hidden
						margin-bottom: 15px
						span
							float: left
						span:first-child
							width: 105px
							padding-right: 15px
							text-align: right
						span:nth-child(2)
							width: 270px
							text-align: left
					>div 
						width: 100%
						padding-left: 63px
						padding-top: 5px
						button
							display: block
							color: #fff
							@include whch(250px, 40px, center, 40px)
						.icon-zhifubao
							background-color: #2196f3 
							margin-bottom: 15px
							font-size: 28px
							color: #fff
							border-radius: 4px
						.icon-weixinzhifu 
							background-color: #4caf50
							font-size: 29px
							border-radius: 4px
	.wechatBox
		.box
			height: 430px
			.icon-weixinzhifu 
				color: #4caf50
				font-size: 35px
				padding-left: 20px
			.priceBox
				background-color: #eee
				margin: 15px
				padding: 15px 100px
				overflow: hidden
				span 
					color: #222
					font-size: 16px
					float: left
				span:nth-child(2)
					color: $theme_color
					float: right
			.saoyisao
				width: 450px
				margin: 0 auto
				overflow: hidden
				.left 
					float: left
					border: 1px solid #dfdfdf
					img 
						width: 245px
					p 
						text-align: center
						font-size: 16px
						padding-bottom: 5px
					.icon-scan
						color: $theme_color
						font-size: 20px
						vertical-align: middle
				>img 
					float: left
					width: 153px
					margin-left: 50px

</style>
