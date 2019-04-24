<template>
	<div class="user">
		<div class="container">
			<userLayout active="userCenter">
				<div class="" slot="userContent">
					<div class="userTitle">
		                <ul>
		                    <li>
		                        <nuxt-link to="/userCenter/orderlist/all">All</nuxt-link>
		                    </li>
		                    <li>
		                        <nuxt-link to="/userCenter/orderlist/unpaid">Unpaid</nuxt-link>
		                    </li>
		                    <li>
		                        <nuxt-link to="/userCenter/orderlist/unshipped">Unshipped</nuxt-link>
		                    </li>
		                    <li>
		                        <nuxt-link to="/userCenter/orderlist/progress">In Progress</nuxt-link>
		                    </li>
		                    <li>
		                        <nuxt-link to="/userCenter/orderlist/shipped">Shipped</nuxt-link>
		                    </li>
		                </ul>               
		            </div>
		            <div class="userCenter">
		            	<div>
		            		<div class="title">Delivery Status</div>
			            	<div class="status">
			            		<div v-for="(item,index) in userLogistics" :key="index" v-if="userLogistics.length != 0">
			            			<div><img src="~/static/images/flower.jpg" alt=""></div>
			            			<div>
			            				<p>{{item.info.remark}}</p>
			            				<span>{{item.info.datetime}}<nuxt-link :to="{name: 'userCenter-orderStatus-logistics',query: {
			            				logistics: item.logistics,
			            				company: item.company
			            				}}">Tracking Your Order >></nuxt-link></span>
			            			</div>
			            		</div>
			            		<!-- 没有订单状态的情况 -->
			            		<div class="noOrder" v-if="userLogistics.length == 0"><p>No more delivery status</p></div>
			            	</div>
			            </div>
			            <div>
			            	<div class="title">Wishlist</div>
			            	<div class="wishList">
			            		<div class="wishBox goods" v-if="goodsList.length>0">
				            		<nuxt-link v-for="item in goodsList" :key="item.id" :to="{name: 'goods-id', params: {id: item.id}}"  class="boxPer">
				            			<div>
					            			<div>
					            				<img v-lazy="item.pic" alt="">
					            			</div>
					            			<p>{{item.title}}</p>
					            			<span>¥{{item.price}}</span>
					            		</div>
				            		</nuxt-link>								
				            	</div>
				            	<div class="wishBox shop" v-if="shopList.length>0">
				            		<nuxt-link v-for="item in shopList" :key="item.contentId" :to="{name: 'shop-id',params: {id: item.contentId}}" class="boxPer">
				            			<div>
					            			<div>
					            				<img v-lazy="item.pic" alt="">
					            			</div>
					            			<p>{{item.name}}</p>
					            		</div>
				            		</nuxt-link>
				            	</div>
				            	<!-- 没有收藏的情况 -->
				            	<div class="noWish" v-if="shopList.length==0 && goodsList.length==0"><p>No more wishlist</p></div>
			            	</div> 
			            </div>
		            </div>				
				</div>
			</userLayout>
			<goodsItem :titleIsShow="titleIsShow" :hotData='hotData' />
		</div>
	</div>
</template>
<script>
	import goodsItem from "~/components/base/goodsItem"
	import userLayout from "~/components/user/userLayout"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'userHome',
		head () {
    		return {
      			title: 'User Center'
        	}
  		},
		data() {
			return {
				titleIsShow: true,
			}
		},
		middleware: 'userAuth',
		async asyncData ({app}) {
			const goodsPara = {
				type: 1,
				page: 1,
				pageSize: 4
			}
			const shopPara = {
				type: 2,
				page: 1,
				pageSize: 4
			}
			let param2 = {
				id: 12,
				pageSize: 12,
				page: 0,
				sort: 'order_asc'
			}
		 	const hotData = await app.$axios.post(interfaceApi.adsList,param2);
		 	const goodsList = await app.$axios.post(interfaceApi.CollectList,goodsPara);
		 	const shopList = await app.$axios.post(interfaceApi.CollectList,shopPara);
		 	const userLogistics = await app.$axios.post(interfaceApi.userLogistics);
  			return { 
  				goodsList: goodsList.data.data.data,
  				shopList: shopList.data.data.data,
  				hotData: hotData.data.data.data,
  				userLogistics: userLogistics.data.data
  			}
		},
		components: {
			goodsItem, 
			userLayout
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods: {

		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.user 
		.container
			.userTitle
				background-color: #eee
				width: 968px
				overflow: hidden
				ul 
					overflow: hidden
				li 
					width: 20%
					float: left 
					text-align: center
					a 
						width: 100% 
						padding: 20px 0
						display: inline-block 
					a:after 
						content: "|"
						float: right
						color: #dfdfdf
				li:last-child
					a:after
						content: " "
			.userCenter
				overflow: hidden
				margin-top: 14px
				>div:first-child 
					margin-right: 15px
				>div
					float: left 
					border: $border
					width: 476px
					.title 
						@include hh(35px, 35px)
						padding-left: 15px
						border-bottom: $border 
					.status 
						overflow: hidden
						height: 309px
						>div 
							overflow: hidden
							float: left
							padding: 15px
							width: 100%
							margin-bottom: 3px
							>div:first-child
								float: left
								@include wh(70px, 70px)
								margin-right: 10px
								img 
									@include wh(70px, 70px)
							>div:nth-child(2)
								float: left
								width: 363px
								p 
									display: inherit
									padding: 10px 0
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 1;
									height: 36px;
									line-height: 36px;
								span 
									margin-top: 10px
									display: inline-block
									font-size: 14px
									color: #666
									a 
										color: $theme_color
					.wishList
						padding: 15px
						height: 309px
						.wishBox 
							overflow: hidden
							.boxPer
								float: left
								width: 99px
								text-align: center
								margin-right: 16px
								>div
									>div 
										@include wh(77px, 77px)
										margin-bottom: 5px
										text-align: center
										display: inline-block
										img 
											@include wh(77px, 77px)
									p 
										overflow: hidden
										text-overflow: ellipsis
										display: -webkit-box
										-webkit-box-orient: vertical
										-webkit-line-clamp: 2
										line-height: 22px
										height: 44px
										margin-bottom: 5px
									span 
										color: $theme_color
							.boxPer:last-child 
								margin-right: 0	
						.wishBox.shop
							margin-top: 20px
							.boxPer
								>div
									p
										overflow: hidden
										text-overflow: ellipsis
										white-space: nowrap
										display: block
										min-height: 22px
	.noOrder
		position: relative
		height: 305px
		p 
			@include center
			color: #999
	.noWish
		position: relative
		height: 279px
		p 
			@include center
			color: #999
</style>
