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
					<div>
						<button @click="pay" class="backOrder">Continue To Pay</button>
						<button @click="goHome" class="backHome">Home</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	//支付进度条组件
	import payNav from '~/components/layout/payNav.vue'
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'payHome',
		data() {
			return {
				isShowObj: {
                    oneIsShow: false,
                    twoIsShow: true,
                    threeIsShow: false
				},
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

			
		},
	  	computed: {  
		    
	  	},
		methods: {
			goHome() {
				this.$router.push('/')
			},
			pay() {
				this.$router.replace({path: '/payProcess/aliPay',query: {orderNumber: this.$route.query.orderNumber}})
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
						margin-left: 10px
						span
							float: left
						span:first-child
							width: 105px
							padding-right: 15px
							text-align: right
						span:nth-child(2)
							width: 270px
							text-align: left
						.price 
							color: $theme_color
						.icon-jingshi
							color: $theme_color
							font-weight: 600
							font-size: 18px
						.paid
							font-size: 18px
					>div 
						width: 100%
						padding-top: 5px
						overflow: hidden
						button
							display: block
							color: #fff
							@include whch(180px, 40px, center, 40px)
							background-color: $theme_color
							border-radius: $border_radius
							float: left
						.backHome
							margin-left: 30px

</style>
