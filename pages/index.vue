<template>
	<div class="home">
		<mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">

			<!-- 轮播图 -->
			<SwiperComponent :swiperData="homeData.figure"/>
			<!-- today's deal -->
			<div class="deal">
				<div class="container">
					<nuxt-link to="/deals/1">
						<div class="deal-logo" :style="{backgroundImage:'url(' + homeData.deal.pic + ')'}"></div>
					</nuxt-link>
					<!-- <div class="deal-swiper">
					    <swiper v-swiper:mySwiper="swiperOption">
					      	<swiper-slide class="swiper-slide" v-for="(item,index) in homeData.ticketing.data" :key="index">
					      		<img class="icon" v-if="item.saleType.type == 'group'" src="~static/images/group.png" alt="">
            					<img class="icon" v-if="item.saleType.type == 'sale'" src="~static/images/sale.png" alt="">
								<nuxt-link :to="{name: 'goods-id', params: {id: item.id}}">
									<div class="dealSwiper">
										<div><img v-lazy="item.pic" alt=""></div>
										<div class="dealTxt">
											<p>{{item.title}}</p>
											<div>
												<span>¥{{item.price}}</span>
												<del v-if="item.originalPrice">¥{{item.originalPrice}}</del>
											</div>
										</div>
									</div>
								</nuxt-link>
					      	</swiper-slide>
					    </swiper>
						<div class="swiper-pagination swiper-pagination-bullets"></div>
					</div> -->
					<div v-swiper:mySwiper="swiperOption" style="overflow: hidden;">
					    <div class="swiper-wrapper" >
					      <div class="swiper-slide" v-for="(item,index) in homeData.deal.data" :key="index">
					        <img class="icon" style="width: 69px;" v-if="item.saleType.type == 'group'" src="~static/images/group.png" alt="">
        					<img class="icon" v-if="item.saleType.type == 'sale'" src="~static/images/sale.png" alt="">
							<nuxt-link :to="{name: 'goods-id', params: {id: item.id}}" target="_blank">
								<div class="dealSwiper">
									<div><img v-lazy="item.pic" alt=""></div>
									<div class="dealTxt">
										<p>{{item.title}}</p>
										<div>
											<span>¥{{item.price}}</span>
											<del v-if="item.originalPrice">¥{{item.originalPrice}}</del>
										</div>
									</div>
								</div>
							</nuxt-link>
					      </div>
					    </div>
					    <div class="swiper-button-next"></div>
					    <div class="swiper-button-prev"></div>
				  	</div>
				</div>
			</div>
			<div class="homeSection container">
				<!-- 商户组 -->
				<div class="hotShops">
					<div class="title">
						<img src="~static/images/shops.png" alt="">
						<nuxt-link to="/shop/shopList">More<i class="iconfont icon-combinedshapefuben"></i></nuxt-link>
					</div>
					<div class="pic">
						<a v-for="(item,index) in homeData.shop.data" :key="index"><img v-lazy="item.pic" @click="goShop(item.id)"></a>
					</div>
				</div>
				<!-- 团购组 -->
				<div class="groupBuy">
					<div class="title">
						<img src="~static/images/groupBuy.png" alt="">
						<nuxt-link to="/groupBuy/1">More<i class="iconfont icon-combinedshapefuben"></i></nuxt-link>
					</div>
					<div class="goods">
						<nuxt-link target="_blank" :to="{name: 'goods-id', params: {id: item.id}}" v-show="index<8" v-for="(item,index) in homeData.groupBuying.data" :key="index">
							<b class="hot">
			                    <img class="group" v-if="item.saleType.type == 'group'" src="~static/images/group.png" alt="">
			                    <img v-if="item.saleType.type == 'sale'" src="~static/images/sale.png" alt="">
			                </b>
							<div><img v-lazy="item.pic" alt=""></div>
							<p>{{item.title}}</p>
							<span>¥{{item.price}}</span>
							<del v-if="item.originalPrice">¥{{item.originalPrice}}</del>
						</nuxt-link>
					</div>
				</div>
			</div>
			<div class="editor container">
				<div class="title">
					<nuxt-link to="/article/articleList">
						<img :src="homeData.exploreChina.pic" alt="">
					</nuxt-link>
					<!-- <img src="~static/images/editor.png" alt="">
					<nuxt-link to="/article/articleList">More<i class="iconfont icon-combinedshapefuben"></i></nuxt-link> -->
				</div>
				<div class="articlePer">
					<nuxt-link v-for="(item,index) in homeData.exploreChina.data" :key="index" v-if="index<6" :to="{name: 'goods-id',params: {id: item.id}}">
						<p><img v-lazy="item.pic" alt=""></p> 
						<div class="per">
							<p>{{item.title}}</p>
							<span class="theme_color">￥{{item.price}}</span>
						</div>
					</nuxt-link>
					<!-- <nuxt-link class="more" to="/article/articleList">
						<p>More</p>
					</nuxt-link> -->
				</div>
			</div>
			<!-- <div class="homeAd container"><img src="~static/images/ad.jpg" alt=""></div> -->
			<!-- <floor :floorData="homeData.ticketing"/> -->
		<!-- 	<floor :floorData="homeData.flowers"/>
			<floor :floorData="homeData.thDispatcher"/>
			<floor :floorData="homeData.homeWare"/>
			<floor :floorData="homeData.babyProduct"/>
			<floor :floorData="homeData.toys"/>
			<floor :floorData="homeData.coupon"/>
			<floor :floorData="homeData.electronic"/> -->
			<floor v-for="(item,index) in homeData.category" :key="index"  :floorData="item"/>
			
			<goodsItem :hotData='hotData' :titleIsShow="titleIsShow" />

    	</mescroll-vue>
		
	</div>
</template>
<script>
	// 引入mescroll的vue组件
	import MescrollVue from '~/components/home/mescroll.js/mescroll.vue'
	import SwiperComponent from "~/components/base/Swiper"
	import floor from '~/components/home/floor'
	import goodsItem from '~/components/base/goodsItem'
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'indexHome',
		layout (context) {
			return 'indexHome'
		},
		data() {
			return {
				//Deals轮播
				swiperOption: {
			      	autoplay: 3000,
			      	slidesPerView: 5,
			      	spaceBetween: 0,
			      	navigation: {
			        	nextEl: '.swiper-button-next',
			        	prevEl: '.swiper-button-prev',
			        	el: '.swiper-pagination',
            			dynamicBullets: true
			   	  	}
			    },
				// 上拉加载数据
				hotData: [],
				hotGoodsPara: {
					pageSize: 6,
					page: 0,
				},
				totalPage: -1,
				mescrollDown: {
					isLock: true
				},
				mescrollUp: {
					callback: this.upCallback,
					offset: 1000,
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 30, //每页数据条数,默认10
					}
				},
				mescroll: null,
				titleIsShow: true
			}
		},
		async asyncData ({app,store}) {
		 	const homeData = await app.$axios.post(interfaceApi.home,{terminal: 'PC'});
		 	// 获取分类
		 	const categoryList = await app.$axios.post(interfaceApi.categoryList,{fname: 0})
		 	store.commit('SET_CATEGORYLIST',categoryList.data.data);
		 	store.commit('SET_TOPBANNER',homeData.data.data.topBanner);
  			return { homeData: homeData.data.data}
		},
		components: {
			SwiperComponent,
			floor,
			goodsItem,
			MescrollVue
		},
	  	computed: {  
		    
	  	},
	  	beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
			next(vm => {
				vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
			})
		},
		beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
			this.mescroll.destroy() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
			next()
		},
		methods: {
			mescrollInit (mescroll) {
			    this.mescroll = mescroll
			},
			upCallback (page, mescroll) {
				var that = this;
				that.hotGoodsPara.page = page.num;
				that.hotGoodsPara.pageSize = page.size;
				that.$axios.post('Item/hotProducts',that.hotGoodsPara).then(res=> {
					mescroll.endSuccess(res.data.data.data.length)
					that.totalPage = res.data.data.totalPage;
					res.data.data.data.length = parseInt(res.data.data.data.length/6) * 6;
					that.hotData = that.hotData.concat(res.data.data.data);

				})
			},
			goShop(id) {
		    	if (id == 32) {
		    		let routeData = this.$router.resolve('/shop/peaceHotel');
					window.open(routeData.href, '_blank');
		    	} else if (id == 103) {
					let routeData = this.$router.resolve('/shop/amaraHotel');
					window.open(routeData.href, '_blank');
				} else {
		    		let routeData = this.$router.resolve({name: 'shop-id',params: {id: id}});
					window.open(routeData.href, '_blank');
		    	}
		    }
		}
	}
	// 123123123
</script>
<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.deal
		padding: 15px 0
		background-color: #eee
		.container
			height: 274px
			background-color: #fff
			.deal-logo
				float: left
				@include wh(240px,274px)
			.deal-swiper
				float: left
				overflow: hidden
				@include wh(960px,274px)
				background-color: #fff
				position: relative
				.slide-item
					@include wh(100%,100%)

	.homeAd
		img 
			width: 100%
			margin-top: 15px 
	.editor 
		// padding: 0 15px 
		border: $border 
		margin-top: 15px
		.title 
			border-bottom: $border
			overflow: hidden
			@include hh(116px, 116px)
			img
				float: left
				width: 100%
				height: auto
				vertical-align: middle
				// margin-top: 3px
			a 
				float: right
				vertical-align: middle
				.icon-combinedshapefuben 
					padding-left: 5px
		.articlePer  
			overflow: hidden
			padding: 0 15px
			.more
				width: 380px
				height: 132px
				line-height: 132px
				text-align: center
				p
					width: 369px
					height: 102px
					line-height: 102px
					text-align: center
					font-size: 18px
					color: #222
			a
				float: left
				display: inline-block
				overflow: hidden
				padding: 15px
				border-right: $border 
				border-bottom: $border
				>p 					
					float: left
					@include wh(100px, 100px)
					margin-right: 15px
					img 
						@include wh(100px, 100px)
				.per 
					float: left
					width: 253px
					p 
						overflow: hidden 
						text-overflow: ellipsis 
						display: -webkit-box 
						-webkit-box-orient: vertical
						-webkit-line-clamp: 2 
						line-height: 22px 
						height: 44px
						
					span 
						@include sc(16px, #999)
						display: inline-block 
						margin-top: 35px
			a:first-child 
				padding-left: 0
				padding-right: 15px
			a:nth-child(3) 
				padding-right: 0 
				border-right: 0
			a:nth-child(4) 
				border-bottom: 0 
				padding-left: 0
			a:nth-child(5) 
				border-bottom: 0 
			a:nth-child(6) 
				padding-right: 0 
				border-right: 0
				border-bottom: 0 
	.homeSection
		overflow: hidden
		margin-top: 15px
		overflow: hidden
		.hotShops	
			float: left	
			width: 590px 
			height: 510px
			border: $border	
			padding: 0 15px 15px 15px 
			margin-right: 20px
			a 
				cursor: pointer
			.title 
				border-bottom: $border
				overflow: hidden
				@include hh(60px, 60px)
				img
					float: left
					vertical-align: middle
					margin-top: 14px
				a 
					float: right
					vertical-align: middle
					.icon-combinedshapefuben 
						padding-left: 5px
			.pic 
				width: 558px 
				padding-top: 15px
				a
					margin-right: 7px
					margin-bottom: 7px
					display: inline-block
					@include wh(134px, 134px)
					img 	
						width: 134px 
						height: 134px
				a:nth-child(4)
					margin-right: 0
				a:nth-child(8)
					margin-right: 0
				a:nth-child(12)
					margin-right: 0 
		.groupBuy
			float: left		
			width: 590px 
			height: 510px
			border: $border	
			padding: 0 15px 15px 15px 
			.title 
				border-bottom: $border
				overflow: hidden
				@include hh(60px, 60px)
				img
					float: left
					vertical-align: middle
					margin-top: 15px
				a 
					float: right
					vertical-align: middle
					.icon-combinedshapefuben 
						padding-left: 5px 
			.goods 
				overflow: hidden
				margin-top: 15px
				a 
					float: left
					width: 134px
					min-height: 205px
					position: relative
					margin-right: 7px
					margin-bottom: 12px
					div
						@include wh(134px, 134px)
						img
							@include wh(134px, 134px)
					p 
						overflow: hidden
						text-overflow: ellipsis 
						display: -webkit-box 
						-webkit-box-orient: vertical 
						-webkit-line-clamp: 2
						line-height: 22px 
						height: 44px 
						margin-top: 4px
						margin-bottom: 5px
						text-align: center
						padding: 0 5px
					span 
						color: $theme_color 
					del 
						@include sc(14px, #999)
						position: absolute 
						bottom: 0 
						right: 8px 
					b
	                    position: absolute
	                    top: 5px
	                    left: 5px
	                    @include whch(38px, 18px, center, 18px)
	                    border-radius: $border_radius 
	                    img
	                        @include wh(36px, 18px)
	                    img.group
	                    	@include wh(69px, 18px)
				a:nth-child(4) 
					margin-right: 0 
				a:nth-child(8) 
					margin-right: 0		
	.swiper-slide
		@include wh(192px, 274px)
		border-right: $border
		.icon
			position: absolute
			top: 5px
			left: 5px
			width: 36px
			height: 18px
			z-index: 1000
		a
			display: block
			@include wh(100%, 100%)
			.dealSwiper
				padding: 0 7px
				position: relative
				
				>div:first-child
					@include wh(176px,176px)
					margin-bottom: 10px 
					img 
						@include wh(100%, 100%)
				.dealTxt
					p
						overflow: hidden
						text-overflow: ellipsis
						display: -webkit-box
						-webkit-box-orient: vertical
						-webkit-line-clamp: 2
						height: 44px
						line-height: 22px
						text-align: center
					>div 
						overflow: hidden
						padding: 10px 5px 0
						text-align: center
						>span 
							color: #f9421e
						del 
							@include sc(14px, #999)
							padding-left: 10px
	.swiper-button-next
		background-image: url("~/static/images/ar.png")
	.swiper-button-prev
		background-image: url("~/static/images/al.png")
	.swiper-button-next, .swiper-button-prev
		background-color: rgba(31, 45, 61, .25)
		@include wh(40px, 40px)
		background-size: auto
		top: 44%
	.swiper-button-next:active, .swiper-button-prev:active
		outline: none
	.swiper-button-next:focus, .swiper-button-prev:focus
		outline: none
	.swiper-button-next:hover, .swiper-button-prev:hover
		background-color: rgba(31, 45, 61, .45)
</style>