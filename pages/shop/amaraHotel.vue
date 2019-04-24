<template>
	<div class="shopHome peaceHotel">
		<div class="peaceLunbo">
		  	<el-carousel :interval="4000" type="card" height="410px">
		    	<el-carousel-item>
		      		<img src="~/static/images/amara1.jpg" alt="">
		    	</el-carousel-item>
		    	<el-carousel-item>
		      		<img src="~/static/images/amara2.jpg" alt="">
		    	</el-carousel-item>
		    	<el-carousel-item>
		      		<img src="~/static/images/amara3.jpg" alt="">
		    	</el-carousel-item>
		    	<el-carousel-item>
		      		<img src="~/static/images/amara4.jpg" alt="">
		    	</el-carousel-item>
		  	</el-carousel>			
		</div>		
		<div class="hotelContop">
			<div class="hotelContainer">
				<div class="title">
					<p>About Amara Hotels & Resorts</p>
					<p>Amara Hotels & Resorts is an award-winning regional hospitality group offering a fresh approach to modern travellers by creating tailored experiences and cherished moments. Amara’s portfolio consists of four properties in three Asian cities, including the flagship Amara Singapore, Amara Sanctuary Resort Sentosa, Amara Bangkok and Amara Signature Shanghai. Each property offers thoughtfully designed settings and facilities while embodying the Amara brand philosophy ‘Because This Moment Matters’, a commitment to authentic service and meaningful moments. For more information, visit amarahotels.com. </p>
				</div>
				<div class="center">
					<div class="left">
						<img src="~/static/images/amaratea.jpg" alt="">
						<div>
							<p>Splendid Afternoon Tea</p>
							<p>¥ 188/Two Persons</p>
							<p>Mini Hamburger ，Walnut Cake ，Snowseductive ，Mango Mousse Raspberry Mousse ，Fruit Cake ，Croissant Tuna Sandwich Fish Cookie ，French Puffs ，Fresh Fruit Coffee and Tea for Two Persons. </p>
							<a href="http://thmart.com.cn/goods/1110">Buy</a>
						</div>
					</div>
					<div class="right">
						<img src="~/static/images/amarahour.jpg" alt="">
						<div>
							<p>Indulge Live Music in FLO</p>
							<p>¥ 128 per person</p>
							<p>The Lobby Bar serves as the ideal destination for cocktailing, gatherings and music lovers that last late into the evening. A selection of handcrafted cocktails made with only the finest ingredients pays homage to time-honored recipes, while the impeccable service and a memorable…... </p>
							<a href="http://thmart.com.cn/goods/1136">Buy</a>
						</div>
					</div>
				</div>	
			</div>
			<div class="hotelAbout">
				<div class="aboutContainer">
					<p class="title">About Amara Signature Shanghai</p>
					<div class="aboutLunbo">
						<div class="left">Located in Shanghai’s Putuo District, bordering the vibrant Jing’An business and shopping belt, Amara Signature Shanghai is part of the 100AM mixed-use development with an adjoining retail mall and office tower. The hotel offers 343 spacious guest rooms and suites, including Club Rooms with exclusive access to the Club Lounge and an extensive range of amenities and services. With comprehensive dining and wellness facilities, as well as expansive event spaces, Amara Signature Shanghai is ideal for both business and leisure travellers. For more information, visit shanghai.amarahotels.com. </div>
						<div class="right">
						    <el-carousel :interval="3000" trigger="click" height="413px">
						      <el-carousel-item>
						        <img src="~/static/images/amara01.jpg" alt="">
						      </el-carousel-item>
						      <el-carousel-item>
						        <img src="~/static/images/amara02.jpg" alt="">
						      </el-carousel-item>
						      <el-carousel-item>
						        <img src="~/static/images/amara03.jpg" alt="">
						      </el-carousel-item>
						      <el-carousel-item>
						        <img src="~/static/images/amara04.jpg" alt="">
						      </el-carousel-item>
						      <el-carousel-item>
						        <img src="~/static/images/amara05.jpg" alt="">
						      </el-carousel-item>
						    </el-carousel>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
    import shopNav from '~/components/layout/shopNav.vue'
    // 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'shopHome',
		head () {
				return {
						title: 'Amara Signature Shanghai'
				}
			},
		data() {
			return {

			}
		},
		async asyncData ({app,params,store,redirect}) {
			try {
				const shopData = await app.$axios.post(interfaceApi.shop,{
			 		id: 103
			 	});
	  			return { shopData: shopData.data.data}
			} catch(e) {
				redirect('/')
			}
		 	
		},
		components: {
			shopNav,
		},
		mounted() {
			this.setShopInfo();
		},
		computed: {  
			
		},
		methods: {
			setShopInfo() {
				// 设置商户的信息在layout布局中的shopnav组件中使用数据
			 	this.$store.commit('SET_SHOP_INFO',this.shopData);
			}
		}
	}
</script>
<style lang='sass' scoped>
@import '~/assets/sass/common.sass'
.peaceHotel 
	.hotelContop
		background-image: url(~/static/images/amarabg.jpg)
		width: 100%
		height: 100%
		background-size: cover
		margin-bottom: 65px
		.hotelContainer
			width: 1168px 
			margin: 0 auto
			.title 
				@include wc(100%, center)
				padding: 80px 0 0 0
				p:first-child
					font-size: 40px
				p:nth-child(2)
					font-size: 16px
					padding-top: 28px
					line-height: 36px
			.center
				overflow: hidden
				padding-top: 60px
				padding-bottom: 129px
				> div:first-child
					margin-right: 88px
				> div 
					width: 540px
					float: left 
					position: relative							
					> div
						bottom: 9%
						text-align: center
						left: 11%
						position: absolute
						width: 427px
						p:nth-of-type(1)
							font-size: 26px
							padding-bottom: 20px
						p:nth-of-type(2)
							font-size: 18px
							padding-bottom: 20px
							color: #991E1E
						p:nth-of-type(3)
							height: 135px
							font-size: 14px
							line-height: 24px
							padding-bottom: 24px
						a 
							display: inline-block
							@include whch(110px, 36px, center, 36px)
							border: 1px solid #991E1E
							font-size: 16px
							color: #991E1E
						a:hover
							background: #2A2A2A
							color: #fff
							border: 1px solid #2A2A2A
		.hotelAbout
			height: 656px
			background: #c4b8ab4f
			.aboutContainer 
				width: 1168px
				margin: 0 auto
				.title
					text-align: center
					font-size: 40px
					padding: 60px 0 50px 0
				.aboutLunbo
					overflow: hidden
					.left
						float: left
						width: 400px
						font-size: 16px 
						line-height: 35px
						margin-right: 40px
					.right 
						float: left
						@include wh(727px, 413px)
						img 
							@include wh(727px, 413px)
						.el-carousel__indicators
							left: 50%
</style>