<template>
	<div class="user">
		<orderStatus type="3" :orderDetails="orderDetails" @reloadData="reloadData">
			<div slot="statusInfo" class="statusInfo">
				<p>
					<span><img src="~/static/images/icon-yuandian.png" alt=""></span>
					<span>You parcel has been received by the logistic company, and it is on the way now.</span>
				</p>

			</div>
		</orderStatus>
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	import orderStatus from "~/components/user/orderStatus"
	export default {
		layout: 'userHome',
		data() {
			return {
				
			}
		},
		middleware: 'userAuth',
		async asyncData ({app,query}) {
        	console.log(query.orderNumber)
			let param = {
				orderNumber: query.orderNumber,
			}
		 	const orderDetails = await app.$axios.post(interfaceApi.OrderDetail,param);
  			return { 
  				orderDetails: orderDetails.data.data
  			}
		},
		components: {
			orderStatus
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods: {
			reloadData() {
				var that = this;
				const param = {
					orderNumber: that.$route.query.orderNumber
				}
				that.$axios.post(interfaceApi.OrderDetail,param).then(res=> {
					that.orderDetails = res.data.data;
				})
			}
		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.user
		.statusInfo
			margin-left: 25px
			p 
				margin-bottom: 15px
				overflow: hidden 
				span 
					float: left
				span:first-child
					color: #666
					padding-right: 20px
					width: 35px
					line-height: 24px
					img 
						@include wh(13px, 13px)
						margin-right: 10px
					i.icon-dot
						color: #dfdfdf
						margin-right: 10px
						font-size: 13px
				span:nth-child(2)
					width: 500px
</style>
